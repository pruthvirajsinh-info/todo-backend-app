import { prisma } from "../../lib/prisma.js";

export class ActionsService {
  static async getAll() {
    return prisma.action.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async getById(id: string) {
    return prisma.action.findUnique({ where: { id } });
  }

  static async create(data: any) {
    return prisma.action.create({ data });
  }

  static async update(id: string, data: any) {
    return prisma.action.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return prisma.action.delete({ where: { id } });
  }
}
