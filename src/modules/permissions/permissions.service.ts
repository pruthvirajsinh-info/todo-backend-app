import { prisma } from "../../lib/prisma.js";

export class PermissionsService {
  static async getAll() {
    return prisma.permission.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async getById(id: string) {
    return prisma.permission.findUnique({ where: { id } });
  }

  static async create(data: any) {
    return prisma.permission.create({ data });
  }

  static async update(id: string, data: any) {
    return prisma.permission.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return prisma.permission.delete({ where: { id } });
  }
}
