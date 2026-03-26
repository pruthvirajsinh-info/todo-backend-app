import express, { type Application, type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { httpLogger } from "./middlewares/logger.middleware.js";
import { logger } from "./lib/logger.js";
import authRoutes from "./modules/auth/auth.routes.js";
import usersRoutes from "./modules/users/users.routes.js";
import rolesRoutes from "./modules/roles/roles.routes.js";
import permissionsRoutes from "./modules/permissions/permissions.routes.js";
import modulesRoutes from "./modules/modules/modules.routes.js";
import actionsRoutes from "./modules/actions/actions.routes.js";
import todosRoutes from "./modules/todos/todos.routes.js";
import sidebarTabsRoutes from "./modules/sidebar_tabs/sidebar_tabs.routes.js";

const app: Application = express();
const PORT = process.env.PORT || 4001;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(httpLogger);

// Swagger Documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check route
/**
 * @openapi
 * /health:
 *   get:
 *     description: Returns the health status of the application
 *     responses:
 *       200:
 *         description: OK
 */
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "up",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/roles", rolesRoutes);
app.use("/api/v1/permissions", permissionsRoutes);
app.use("/api/v1/modules", modulesRoutes);
app.use("/api/v1/actions", actionsRoutes);
app.use("/api/v1/todos", todosRoutes);
app.use("/api/v1/sidebar-tabs", sidebarTabsRoutes);

// Error handling - catch 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}: http://localhost:${PORT}/health`);
  logger.info(`Docs available at: http://localhost:${PORT}/docs`);
});
