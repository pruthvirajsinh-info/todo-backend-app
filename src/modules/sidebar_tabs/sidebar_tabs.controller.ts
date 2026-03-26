import type { Request, Response } from "express";
import { SidebarTabsService } from "./sidebar_tabs.service.js";
import { logger } from "../../lib/logger.js";

export class SidebarTabsController {
  static async getAll(req: Request, res: Response) {
    try {
      const tabs = await SidebarTabsService.getAll();
      res.status(200).json(tabs);
    } catch (error: any) {
      logger.error(`Error getting sidebar tabs: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const tab = await SidebarTabsService.getById(req.params["id"] as string);
      if (!tab) return res.status(404).json({ message: "Sidebar tab not found" });
      res.status(200).json(tab);
    } catch (error: any) {
      logger.error(`Error getting sidebar tab by id: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const tab = await SidebarTabsService.create(req.body);
      res.status(201).json(tab);
    } catch (error: any) {
      logger.error(`Error creating sidebar tab: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const tab = await SidebarTabsService.update(req.params["id"] as string, req.body);
      res.status(200).json(tab);
    } catch (error: any) {
      logger.error(`Error updating sidebar tab: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await SidebarTabsService.delete(req.params["id"] as string);
      res.status(200).json({ message: "Sidebar tab deleted successfully" });
    } catch (error: any) {
      logger.error(`Error deleting sidebar tab: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  }
}
