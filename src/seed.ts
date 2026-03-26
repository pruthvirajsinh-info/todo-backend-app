import { prisma } from "./lib/prisma.js";

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
      update: {},
      create: role,
    });
  }

  // 2. Seed Modules
  const modules = [
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
      update: {},
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

  console.log("Seeding completed.");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
