import type { Request, Response } from "express";
import { ModulesService } from "./modules.service.js";
import { logger } from "../../lib/logger.js";

export class ModulesController {
  static async getAll(req: Request, res: Response) {
    try {
      const modules = await ModulesService.getAll();
      res.status(200).json({ status: "success", data: modules });
    } catch (error: any) {
      logger.error(`Error getting all modules: ${error.message}`);
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const module = await ModulesService.getById(req.params["id"] as string);
      if (!module) return res.status(404).json({ status: "error", message: "Module not found" });
      res.status(200).json({ status: "success", data: module });
    } catch (error: any) {
      logger.error(`Error getting module by id: ${error.message}`);
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const module = await ModulesService.create(req.body);
      res.status(201).json({ status: "success", data: module });
    } catch (error: any) {
      logger.error(`Error creating module: ${error.message}`);
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const module = await ModulesService.update(req.params["id"] as string, req.body);
      res.status(200).json({ status: "success", data: module });
    } catch (error: any) {
      logger.error(`Error updating module: ${error.message}`);
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await ModulesService.delete(req.params["id"] as string);
      res.status(200).json({ message: "Module deleted successfully" });
    } catch (error: any) {
      logger.error(`Error deleting module: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  }
}
