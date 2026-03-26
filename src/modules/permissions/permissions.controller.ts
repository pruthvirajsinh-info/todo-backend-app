import type { Request, Response } from "express";
import { PermissionsService } from "./permissions.service.js";
import { logger } from "../../lib/logger.js";

export class PermissionsController {
  static async getAll(req: Request, res: Response) {
    try {
      const permissions = await PermissionsService.getAll();
      res.status(200).json({ status: "success", data: permissions });
    } catch (error: any) {
      logger.error(`Error getting all permissions: ${error.message}`);
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const permission = await PermissionsService.getById(req.params["id"] as string);
      if (!permission) return res.status(404).json({ status: "error", message: "Permission not found" });
      res.status(200).json({ status: "success", data: permission });
    } catch (error: any) {
      logger.error(`Error getting permission by id: ${error.message}`);
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const permission = await PermissionsService.create(req.body);
      res.status(201).json({ status: "success", data: permission });
    } catch (error: any) {
      logger.error(`Error creating permission: ${error.message}`);
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const permission = await PermissionsService.update(req.params["id"] as string, req.body);
      res.status(200).json({ status: "success", data: permission });
    } catch (error: any) {
      logger.error(`Error updating permission: ${error.message}`);
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await PermissionsService.delete(req.params["id"] as string);
      res.status(200).json({ message: "Permission deleted successfully" });
    } catch (error: any) {
      logger.error(`Error deleting permission: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  }
}
