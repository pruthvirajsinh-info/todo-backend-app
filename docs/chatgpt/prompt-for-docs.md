You are an expert AI software architect and documentation engineer.

Your task is to analyze this entire chat/project and convert it into a structured, reusable engineering system.

## 🎯 Objectives

1. Extract and organize ALL knowledge from this conversation:

   * Requirements
   * Architecture decisions
   * Tech stack choices
   * Trade-offs and reasoning

2. Track DEVELOPMENT HISTORY:

   * What we built (step-by-step)
   * Phase-wise progress
   * Feature additions

3. Capture DEBUGGING KNOWLEDGE:

   * Errors we encountered
   * Root cause of each issue
   * Exact fixes/solutions applied
   * Lessons learned

4. Extract ALL ARTIFACTS:

   * Code snippets
   * Config files
   * Commands used
   * Folder structures
   * API contracts
   * DB schemas

---

## 📦 OUTPUT STRUCTURE (VERY IMPORTANT)

Generate everything in clean markdown files.

### 1. `project-overview.md`

* Project goal
* Tech stack
* High-level architecture
* Key features

---

### 2. `architecture.md`

* System design
* Backend architecture (modules, services)
* Frontend architecture
* Data flow
* Multi-tenant / RBAC / auth (if present)

---

### 3. `phase-wise-development/`

Create multiple files:

* `phase-1.md`
* `phase-2.md`
* ...

Each phase should include:

* Goal
* Implementation steps
* Commands used
* Code snippets
* Output/Result

---

### 4. `errors-and-solutions.md`

For EACH error:

* Error message
* When it occurred
* Root cause
* Fix (code + explanation)
* Prevention tip

---

### 5. `artifacts/`

Break into multiple files:

* `db-schema.md`
* `api-contracts.md`
* `folder-structure.md`
* `env-config.md`
* `scripts-and-commands.md`

---

### 6. `decisions-and-reasoning.md`

* Why we chose specific tools (e.g., Prisma, Redis, NestJS)
* Alternatives considered
* Trade-offs

---

### 7. `rules-and-guidelines.md` ⭐ (MOST IMPORTANT)

Create a reusable system for future projects:

Include:

* Project setup rules
* Folder structure standards
* Naming conventions
* API design rules
* Error handling patterns
* Auth & RBAC guidelines
* Performance best practices
* Code quality rules
* When to use which tech

This file should act like a **playbook for building future projects**.

---

### 8. `project-template.md`

Create a reusable template so I can start a new project using the same structure.

Include:

* Initial setup steps
* Base folder structure
* Boilerplate configs
* Recommended stack

---

## ⚙️ OUTPUT RULES

* Use clean, production-level markdown
* Use proper headings and formatting
* Keep it structured and readable
* Avoid duplication
* Be concise but complete
* Assume this will be reused by senior engineers

---

## 🚀 FINAL GOAL

Convert this entire chat into:
👉 A reusable engineering system
👉 A project blueprint
👉 A knowledge base for future builds

Do not skip anything important.
Be thorough and systematic.
