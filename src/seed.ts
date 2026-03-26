import { prisma } from "./lib/prisma.js";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database...");

  // 1. Seed Roles
  const roles = [
    { name: "superadmin", description: "Full system access" },
    { name: "admin", description: "Administrative access" },
    { name: "user", description: "Standard user access" },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: role,
    });
  }

  // 2. Seed Modules
  const modules = [
    { name: "dashboard", description: "Dashboard analytics" },
    { name: "users", description: "User management" },
    { name: "roles", description: "Role management" },
    { name: "permissions", description: "Permission management" },
    { name: "modules", description: "Module management" },
    { name: "actions", description: "Action management" },
    { name: "todos", description: "Todo management" },
    { name: "sidebar_tabs", description: "Sidebar tab management" },
  ];

  for (const module of modules) {
    await prisma.module.upsert({
      where: { name: module.name },
      update: { description: module.description },
      create: module,
    });
  }

  // 3. Seed Actions
  const actions = [
    { name: "create" },
    { name: "read" },
    { name: "update" },
    { name: "delete" },
    { name: "all" },
  ];

  for (const action of actions) {
    await prisma.action.upsert({
      where: { name: action.name },
      update: {},
      create: action,
    });
  }

  // 4. Seed Permissions (flat strings)
  console.log("Seeding permissions...");
  const dbModules = await prisma.module.findMany();
  const dbActions = await prisma.action.findMany();

  for (const m of dbModules) {
    for (const a of dbActions) {
      const permName = `${m.name}:${a.name}`;
      await prisma.permission.upsert({
        where: { name: permName },
        update: {},
        create: {
          name: permName,
          description: `Permission to ${a.name} ${m.name}`,
        },
      });
    }
  }

  // 5. Assign all permissions to superadmin role
  console.log("Assigning permissions to superadmin...");
  const superadminRole = await prisma.role.findUnique({ where: { name: "superadmin" } });
  const allPermissions = await prisma.permission.findMany();

  if (superadminRole) {
    for (const perm of allPermissions) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: superadminRole.id,
            permissionId: perm.id,
          },
        },
        update: {},
        create: {
          roleId: superadminRole.id,
          permissionId: perm.id,
        },
      });
    }
  }

  // 6. Seed Superadmin User
  console.log("Seeding superadmin user...");
  const hashedPassword = await bcrypt.hash("Password123!", 10);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@aura.com" },
    update: { password: hashedPassword },
    create: {
      name: "Aura Admin",
      email: "admin@aura.com",
      password: hashedPassword,
      isActive: true,
    },
  });

  // Assign superadmin role to admin user
  if (superadminRole) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: adminUser.id,
          roleId: superadminRole.id,
        },
      },
      update: {},
      create: {
        userId: adminUser.id,
        roleId: superadminRole.id,
      },
    });
  }

  // 7. Seed Sidebar Tabs
  console.log("Seeding sidebar tabs...");
  const sidebarData = [
    { module: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "/dashboard", order: 1 },
    { module: "todos", label: "Todos", icon: "CheckSquare", path: "/todos", order: 2 },
    { module: "users", label: "Users", icon: "Users", path: "/users", order: 3 },
    { module: { name: "roles" }, label: "Roles", icon: "ShieldCheck", path: "/roles", order: 4 },
    { module: { name: "permissions" }, label: "Permissions", icon: "Settings", path: "/permissions", order: 5 },
    { module: { name: "modules" }, label: "Modules", icon: "Layers", path: "/modules", order: 6 },
    { module: { name: "actions" }, label: "Actions", icon: "Terminal", path: "/actions", order: 7 },
  ];

  for (const item of sidebarData) {
    const moduleName = typeof item.module === "string" ? item.module : item.module.name;
    const dbModule = await prisma.module.findUnique({ where: { name: moduleName } });
    if (dbModule) {
      await prisma.sidebarTab.upsert({
        where: { moduleId: dbModule.id },
        update: {
          label: item.label,
          icon: item.icon,
          path: item.path,
          order: item.order,
        },
        create: {
          moduleId: dbModule.id,
          label: item.label,
          icon: item.icon,
          path: item.path,
          order: item.order,
        },
      });
    }
  }

  // 8. Seed User Sidebar Tabs for Admin
  console.log("Seeding user-specific sidebar tabs for admin...");
  const dbTabs = await prisma.sidebarTab.findMany();
  for (const tab of dbTabs) {
    const existing = await prisma.userSidebarTab.findUnique({
      where: {
        userId_sidebarTabId: {
          userId: adminUser.id,
          sidebarTabId: tab.id,
        },
      },
    });

    if (existing) {
      await prisma.userSidebarTab.update({
        where: { id: existing.id },
        data: { isActive: true },
      });
    } else {
      await prisma.userSidebarTab.create({
        data: {
          userId: adminUser.id,
          sidebarTabId: tab.id,
          isActive: true,
        },
      });
    }
  }

  console.log("Seeding completed successfully.");
  console.log("Credentials -> Email: admin@aura.com | Password: Password123!");
}

seed()
  .catch((e) => {
    console.error("Seeding failed!");
    console.error(JSON.stringify(e, null, 2));
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
