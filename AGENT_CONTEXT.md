# AGENT_CONTEXT.md

## Project Name

Mentorly (TutorMap)

Bangladesh's Production-Grade Tutor Booking Marketplace Platform

---

## Mandatory Documentation

Before generating any code, always read:

1. docs/PROJECT_PRD.md
2. docs/ARCHITECTURE_AUDIT.md
3. docs/DATABASE_DESIGN.md
4. docs/API_SPECIFICATION.md

Never ignore project documentation.

Documentation has higher priority than assumptions.

---

## Tech Stack

### Frontend

* Next.js 15
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Query
* Zustand
* React Hook Form
* Zod

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL
* Prisma ORM

### Infrastructure

* Redis
* Socket.IO
* Cloudinary
* Nodemailer

### Deployment

* Vercel
* Railway

---

## Architecture Rules

Follow Clean Architecture principles.

Use modular domain-based architecture.

Each module must contain:

* controller
* service
* route
* validation
* interface
* constants

Never place business logic inside controllers.

Controllers should only:

* receive request
* call service
* return response

---

## API Standards

Base URL:

/api/v1

Standard Response Format:

{
"success": true,
"message": "Operation successful",
"data": {}
}

Never return inconsistent response structures.

---

## Database Rules

Use Prisma ORM.

Never execute raw SQL unless absolutely necessary.

Always:

* create indexes where needed
* use transactions for financial operations
* use soft delete when required
* validate relational integrity

Never modify schema without approval.

---

## Authentication Rules

Use:

* Access Token (15 minutes)
* Refresh Token (7 days)
* HttpOnly Cookies

Protected routes must use:

* authenticate middleware
* role guard middleware

---

## Security Rules

Always implement:

* Zod validation
* Password hashing with bcrypt
* JWT verification
* Rate limiting
* Secure cookies
* Input sanitization

Never expose:

* passwordHash
* refreshToken
* secret keys

---

## Coding Standards

Use TypeScript strict mode.

Avoid any.

Use interfaces and types.

Use async/await.

Use centralized error handling.

Use meaningful naming conventions.

Example:

createTutorProfile()

instead of:

create()

---

## Folder Structure

backend/src/modules

Example:

modules/
├── auth
├── user
├── tutor
├── student
├── booking
├── payment
├── review
├── notification
├── chat

---

## Development Order

Follow this sequence:

1. Foundation Setup
2. Prisma Setup
3. Auth Module
4. User Module
5. Tutor Module
6. Student Module
7. Tuition Request Module
8. Tutor Application Module
9. Booking Module
10. Payment Module
11. Review Module
12. Notification Module
13. Socket.IO Chat
14. Admin Dashboard

Do not skip steps.

---

## Project Goal

Build a scalable, secure, production-grade tutor marketplace platform.

Code quality is more important than speed.

Prioritize:

* Maintainability
* Scalability
* Security
* Performance

over quick implementation.
