import { prisma } from "../../lib/prisma.js";

export class SidebarTabsService {
  static async getAll() {
    return prisma.sidebarTab.findMany({
      include: { module: true },
      orderBy: { order: "asc" },
    });
  }

  static async getById(id: string) {
    return prisma.sidebarTab.findUnique({
      where: { id },
      include: { module: true },
    });
  }

  static async create(data: any) {
    return prisma.sidebarTab.create({ data });
  }

  static async update(id: string, data: any) {
    return prisma.sidebarTab.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.sidebarTab.delete({ where: { id } });
  }
}
