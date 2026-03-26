import type { Request, Response } from "express";
import { RolesService } from "./roles.service.js";
import { logger } from "../../lib/logger.js";

export class RolesController {
  static async getAll(req: Request, res: Response) {
    try {
      const roles = await RolesService.getAll();
      res.status(200).json({ status: "success", data: roles });
    } catch (error: any) {
      logger.error(`Error getting all roles: ${error.message}`);
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const role = await RolesService.getById(req.params["id"] as string);
      if (!role) return res.status(404).json({ status: "error", message: "Role not found" });
      res.status(200).json({ status: "success", data: role });
    } catch (error: any) {
      logger.error(`Error getting role by id: ${error.message}`);
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const role = await RolesService.create(req.body);
      res.status(201).json({ status: "success", data: role });
    } catch (error: any) {
      logger.error(`Error creating role: ${error.message}`);
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const role = await RolesService.update(req.params["id"] as string, req.body);
      res.status(200).json({ status: "success", data: role });
    } catch (error: any) {
      logger.error(`Error updating role: ${error.message}`);
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await RolesService.delete(req.params["id"] as string);
      res.status(200).json({ message: "Role deleted successfully" });
    } catch (error: any) {
      logger.error(`Error deleting role: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  }
}
