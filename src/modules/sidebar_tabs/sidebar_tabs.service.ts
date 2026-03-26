import { prisma } from "../../lib/prisma.js";

export class SidebarTabsService {
  /**
   * Get filtered tabs for a specific user.
   * If user is superadmin, returns all tabs.
   * Otherwise, only returns tabs where UserSidebarTab.isActive is true.
   */
  static async getForUser(userId: string, isSuperAdmin: boolean) {
    if (isSuperAdmin) {
      return prisma.sidebarTab.findMany({
        include: { module: true },
        orderBy: { order: "asc" },
      });
    }

    // Join with UserSidebarTab to filter by isActive
    // If no record exists for this user/tab, we can decide the default.
    // Based on requirements, only show if active in UserSidebarTab.
    const userTabs = await prisma.userSidebarTab.findMany({
      where: {
        userId,
        isActive: true,
      },
      include: {
        sidebarTab: {
          include: { module: true },
        },
      },
      orderBy: {
        sidebarTab: {
          order: "asc",
        },
      },
    });

    return userTabs.map((ut: any) => ut.sidebarTab);
  }

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
