import { prisma } from "../../lib/prisma.js";

export class ModulesService {
  static async getAll() {
    return prisma.module.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async getById(id: string) {
    return prisma.module.findUnique({ where: { id } });
  }

  static async create(data: any) {
    return prisma.module.create({ data });
  }

  static async update(id: string, data: any) {
    return prisma.module.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return prisma.module.delete({ where: { id } });
  }
}
