import { prisma } from "../../lib/prisma.js";

export class RolesService {
  static async getAll() {
    return prisma.role.findMany({
      include: {
        rolePermissions: {
          include: { permission: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getById(id: string) {
    return prisma.role.findUnique({
      where: { id },
      include: {
        rolePermissions: {
          include: { permission: true },
        },
      },
    });
  }

  static async create(data: any) {
    const { permissionIds, ...roleData } = data;
    return prisma.role.create({
      data: {
        ...roleData,
        rolePermissions: {
          create: permissionIds?.map((pid: string) => ({
            permission: { connect: { id: pid } },
          })),
        },
      },
    });
  }

  static async update(id: string, data: any) {
    const { permissionIds, ...roleData } = data;
    const updateData: any = { ...roleData };

    if (permissionIds) {
      await prisma.rolePermission.deleteMany({ where: { roleId: id } });
      updateData.rolePermissions = {
        create: permissionIds.map((pid: string) => ({
          permission: { connect: { id: pid } },
        })),
      };
    }

    return prisma.role.update({
      where: { id },
      data: updateData,
    });
  }

  static async delete(id: string) {
    return prisma.role.delete({ where: { id } });
  }
}
