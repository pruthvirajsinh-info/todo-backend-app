import type { Response } from "express";
import { SidebarTabsService } from "./sidebar_tabs.service.js";
import { logger } from "../../lib/logger.js";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";

export class SidebarTabsController {
  static async getAll(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "User context missing" });
      }

      const isSuperAdmin = req.user?.roles.includes("superadmin") || false;
      const tabs = await SidebarTabsService.getForUser(userId, isSuperAdmin);
      
      res.status(200).json({ status: "success", data: tabs });
    } catch (error: any) {
      logger.error(`Error getting sidebar tabs: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req: AuthRequest, res: Response) {
    try {
      const tab = await SidebarTabsService.getById(req.params["id"] as string);
      if (!tab) return res.status(404).json({ message: "Sidebar tab not found" });
      res.status(200).json({ status: "success", data: tab });
    } catch (error: any) {
      logger.error(`Error getting sidebar tab by id: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }

  static async create(req: AuthRequest, res: Response) {
    try {
      const tab = await SidebarTabsService.create(req.body);
      res.status(201).json({ status: "success", data: tab });
    } catch (error: any) {
      logger.error(`Error creating sidebar tab: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const tab = await SidebarTabsService.update(req.params["id"] as string, req.body);
      res.status(200).json({ status: "success", data: tab });
    } catch (error: any) {
      logger.error(`Error updating sidebar tab: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      await SidebarTabsService.delete(req.params["id"] as string);
      res.status(200).json({ status: "success", message: "Sidebar tab deleted successfully" });
    } catch (error: any) {
      logger.error(`Error deleting sidebar tab: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  }
}
