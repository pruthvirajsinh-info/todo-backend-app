import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma.js";
import { logger } from "../../lib/logger.js";
import type { RegisterInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from "./auth.schema.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

export class AuthService {
  static async register(data: RegisterInput) {
    const { name, email, password } = data;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and assign "user" role
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // Find "user" role
      const userRole = await tx.role.findUnique({ where: { name: "user" } });
      if (userRole) {
        await tx.userRole.create({
          data: {
            userId: newUser.id,
            roleId: userRole.id,
          },
        });
      }

      return newUser;
    });

    logger.info(`User registered: ${user.email}`);
    return user;
  }

  static async login(data: LoginInput) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user || !user.isActive) {
      throw new Error("Invalid credentials or account inactive");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Extract permissions
    const permissions = user.userRoles.flatMap((ur) =>
      ur.role.rolePermissions.map((rp) => rp.permission.name)
    );

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        roles: user.userRoles.map((ur) => ur.role.name),
        permissions: [...new Set(permissions)],
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    logger.info(`User logged in: ${user.email}`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  static async forgotPassword(data: ForgotPasswordInput) {
    // In a real app, send email with token. Here we just return its creation.
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new Error("User not found");

    const resetToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    logger.info(`Password reset requested for: ${user.email}`);
    
    // Placeholder for email sending
    return resetToken; 
  }

  static async resetPassword(data: ResetPasswordInput) {
    const { token, password } = data;

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: { id: decoded.id },
        data: { password: hashedPassword },
      });

      logger.info(`Password reset successfully for user ID: ${decoded.id}`);
    } catch (error) {
      throw new Error("Invalid or expired reset token");
    }
  }
}
