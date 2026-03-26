import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma.js";

export class UsersService {
  static async getAll() {
    return prisma.user.findMany({
      include: {
        userRoles: {
          include: { role: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });
  }

  static async create(data: any) {
    const { roleIds, password, ...userData } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        userRoles: {
          create: roleIds.map((roleId: string) => ({
            role: { connect: { id: roleId } },
          })),
        },
      },
    });
  }

  static async update(id: string, data: any) {
    const { roleIds, password, ...userData } = data;
    const updateData: any = { ...userData };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    if (roleIds) {
      // Simple approach: delete all and re-create
      await prisma.userRole.deleteMany({ where: { userId: id } });
      updateData.userRoles = {
        create: roleIds.map((roleId: string) => ({
          role: { connect: { id: roleId } },
        })),
      };
    }

    return prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  static async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
