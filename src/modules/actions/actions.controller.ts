import type { Request, Response } from "express";
import { ActionsService } from "./actions.service.js";
import { logger } from "../../lib/logger.js";

export class ActionsController {
  static async getAll(req: Request, res: Response) {
    try {
      const actions = await ActionsService.getAll();
      res.status(200).json({ status: "success", data: actions });
    } catch (error: any) {
      logger.error(`Error getting all actions: ${error.message}`);
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const action = await ActionsService.getById(req.params["id"] as string);
      if (!action) return res.status(404).json({ status: "error", message: "Action not found" });
      res.status(200).json({ status: "success", data: action });
    } catch (error: any) {
      logger.error(`Error getting action by id: ${error.message}`);
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const action = await ActionsService.create(req.body);
      res.status(201).json({ status: "success", data: action });
    } catch (error: any) {
      logger.error(`Error creating action: ${error.message}`);
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const action = await ActionsService.update(req.params["id"] as string, req.body);
      res.status(200).json({ status: "success", data: action });
    } catch (error: any) {
      logger.error(`Error updating action: ${error.message}`);
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await ActionsService.delete(req.params["id"] as string);
      res.status(200).json({ message: "Action deleted successfully" });
    } catch (error: any) {
      logger.error(`Error deleting action: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  }
}
