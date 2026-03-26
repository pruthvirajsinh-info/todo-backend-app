import { prisma } from "../../lib/prisma.js";

export class TodosService {
  static async getAll(userId: string, isAdmin: boolean) {
    if (isAdmin) {
      return prisma.todo.findMany({
        include: { user: { select: { name: true, email: true } } },
        orderBy: { createdAt: "desc" },
      });
    }
    return prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getById(id: string, userId: string, isAdmin: boolean) {
    const todo = await prisma.todo.findUnique({
      where: { id },
      include: { user: { select: { name: true, email: true } } },
    });

    if (!todo) return null;
    if (!isAdmin && todo.userId !== userId) {
      throw new Error("Access denied: You do not own this todo");
    }

    return todo;
  }

  static async create(data: any, userId: string) {
    return prisma.todo.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  static async update(id: string, data: any, userId: string, isAdmin: boolean) {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) throw new Error("Todo not found");
    if (!isAdmin && todo.userId !== userId) {
      throw new Error("Access denied: You do not own this todo");
    }

    return prisma.todo.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string, userId: string, isAdmin: boolean) {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) throw new Error("Todo not found");
    if (!isAdmin && todo.userId !== userId) {
      throw new Error("Access denied: You do not own this todo");
    }

    return prisma.todo.delete({ where: { id } });
  }
}
