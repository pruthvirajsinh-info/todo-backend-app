# frd

## requirments

- todo app with rbac
- backend with express.js + tsx
- frontend with next.js
- db: prisma + postgres with connection string from supabase

### unclear requirments

- client wants to dynamic sidebar tabs but we just change status active/inactive for each user


## db

## tables 

1. users
2. roles
- superadmin, admin, user.
3. permissions
- "module:action"
4. user_roles
5. role_permissions
6. modules
- user,roles,permissions,modules,actions,sidebar_tabs
7. actions
- create,read,update,delete,all
8. sudebar_tabs

# backend

- middleware for auth, rbac, logging(pino)
- modules folder with controller, service, routes,
- auth functionality apis : login, logout, register, forgot password, reset password
- crud apis for all modules like : users, roles, permissions, modules, actions, todos, sidebar_tabs
- use swagger for all apis documentation
- lib
  1. express : for web framework
  2. prisma : for orm
  3. pino : for logging
  4. cors : for cross origin resource sharing
  5. helmet : for security
  6. dotenv : for environment variables
  7. jsonwebtoken : for authentication
  8. bcryptjs : for password hashing
  9. tsx : for typescript
  10. typescript : for typescript
  11. ts-node-dev : for development
  12. pg : for postgresql
  13. @prisma/adapter-pg : for postgresql
  14. @prisma/client : for postgresql
  15. swagger-ui-express : for swagger documentation
  16. swagger-jsdoc : for swagger documentation
  17. zod : for validation
  
  
# frontend

- header : logo, app name, user avatar (with dropdown for profile, logout)
- sidebar : all modules like users, roles, permissions, modules, actions, todos, sidebar_tabs
- main content : listing page with table,filters, search, pagination, add button, select columns
- we can choose columns to display in table 
- each record: edit button, delete button, view button(not editable)
- edit page : with dynamic route, form with all fields, save button, cancel button

- lib :
  1. reduxjs/toolkit : for state management
  2. tailwindcss : for styling
  3. react-hook-form : for form handling
  4. zod : for validation
  5. ag-grid : for listing table
  6. react-hot-toast : for toasters
  7. framer-motion : for animations
  8. lucide-react : for icons
  9. shadcn/ui : for ui components
  

# rules:

- search for latest stable dependencies versions and check for latest docs and configuration.
- first discuss with me about library and dependencies with its skills and commands and then about table columns and then each form fields with its validations and then unclear requirments
- dont add any library or dependencies without my permission
- make plan, discuss with me, ask que with options like a,b,c.. before any implemntation
- i want git commit for diff steps and manual testing before each step so after complete one step give me steps for testing


#

Email: admin@aura.com
Password: Password123!