import type { Response } from "express";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";
import { TodosService } from "./todos.service.js";
import { logger } from "../../lib/logger.js";

export class TodosController {
  static async getAll(req: AuthRequest, res: Response) {
    try {
      const isAdmin = req.user?.roles.some(r => ["superadmin", "admin"].includes(r)) ?? false;
      const todos = await TodosService.getAll(req.user!.id, isAdmin);
      res.status(200).json(todos);
    } catch (error: any) {
      logger.error(`Error getting todos: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req: AuthRequest, res: Response) {
    try {
      const id = req.params["id"] as string;
      const isAdmin = req.user?.roles.some(r => ["superadmin", "admin"].includes(r)) ?? false;
      const todo = await TodosService.getById(id, req.user!.id, isAdmin);
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      res.status(200).json(todo);
    } catch (error: any) {
      logger.error(`Error getting todo by id: ${error.message}`);
      res.status(error.message.includes("Access denied") ? 403 : 500).json({ message: error.message });
    }
  }

  static async create(req: AuthRequest, res: Response) {
    try {
      const todo = await TodosService.create(req.body, req.user!.id);
      res.status(201).json(todo);
    } catch (error: any) {
      logger.error(`Error creating todo: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const id = req.params["id"] as string;
      const isAdmin = req.user?.roles.some(r => ["superadmin", "admin"].includes(r)) ?? false;
      const todo = await TodosService.update(id, req.body, req.user!.id, isAdmin);
      res.status(200).json(todo);
    } catch (error: any) {
      logger.error(`Error updating todo: ${error.message}`);
      res.status(error.message.includes("Access denied") ? 403 : 400).json({ message: error.message });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      const id = req.params["id"] as string;
      const isAdmin = req.user?.roles.some(r => ["superadmin", "admin"].includes(r)) ?? false;
      await TodosService.delete(id, req.user!.id, isAdmin);
      res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error: any) {
      logger.error(`Error deleting todo: ${error.message}`);
      res.status(error.message.includes("Access denied") ? 403 : 400).json({ message: error.message });
    }
  }
}
