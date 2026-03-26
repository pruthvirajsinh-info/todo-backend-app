# Database Schema (`/artifacts/db-schema.md`)

This describes the exact Prisma schema generated to facilitate RBAC and task management.

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  roles     Role[]   @relation("UserRoles")
  todos     Todo[]
  sidebarTabs UserSidebarTab[]
}

model Role {
  id          String       @id @default(uuid())
  name        String       @unique
  description String?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  users       User[]       @relation("UserRoles")
  permissions Permission[]
}

model Permission {
  id        String   @id @default(uuid())
  roleId    String
  actionId  String
  moduleId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  role      Role     @relation(fields: [roleId], references: [id], onDelete: Cascade)
  action    Action   @relation(fields: [actionId], references: [id], onDelete: Cascade)
  module    Module   @relation(fields: [moduleId], references: [id], onDelete: Cascade)

  @@unique([roleId, actionId, moduleId])
}

model Module {
  id          String       @id @default(uuid())
  name        String       @unique
  description String?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  permissions Permission[]
  sidebarTabs UserSidebarTab[]
}

model Action {
  id          String       @id @default(uuid())
  name        String       @unique
  description String?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  permissions Permission[]
}

model UserSidebarTab {
  id        String   @id @default(uuid())
  userId    String
  moduleId  String
  order     Int      @default(0)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  module    Module   @relation(fields: [moduleId], references: [id], onDelete: Cascade)

  @@unique([userId, moduleId])
}

model Todo {
  id          String    @id @default(uuid())
  title       String
  description String?
  status      String    @default("pending") // pending, in_progress, completed
  priority    String    @default("medium")  // low, medium, high
  dueDate     DateTime?
  userId      String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```
