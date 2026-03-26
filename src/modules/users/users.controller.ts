import type { Request, Response } from "express";
import { UsersService } from "./users.service.js";
import { logger } from "../../lib/logger.js";

export class UsersController {
  static async getAll(req: Request, res: Response) {
    try {
      const users = await UsersService.getAll();
      res.status(200).json({ status: "success", data: users });
    } catch (error: any) {
      logger.error(`Error getting all users: ${error.message}`);
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const user = await UsersService.getById(req.params["id"] as string);
      if (!user) return res.status(404).json({ status: "error", message: "User not found" });
      res.status(200).json({ status: "success", data: user });
    } catch (error: any) {
      logger.error(`Error getting user by id: ${error.message}`);
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const user = await UsersService.create(req.body);
      res.status(201).json({ status: "success", data: user });
    } catch (error: any) {
      logger.error(`Error creating user: ${error.message}`);
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const user = await UsersService.update(req.params["id"] as string, req.body);
      res.status(200).json({ status: "success", data: user });
    } catch (error: any) {
      logger.error(`Error updating user: ${error.message}`);
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await UsersService.delete(req.params["id"] as string);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
      logger.error(`Error deleting user: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  }
}
