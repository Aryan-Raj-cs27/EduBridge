# EduBridge

EduBridge is a web platform project organized for clean separation between frontend and backend.

## Repository Structure

- `Frontend/` - Next.js 15 web application (implemented)
- `Backend/` - Backend placeholder for future API/service implementation

## Frontend Stack

- Next.js 15
- React 19
- Tailwind CSS

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

## Run Locally

```bash
cd Frontend
npm install
npm run dev
```

Open: `http://localhost:3000`

## Quality and Build Checks

```bash
cd Frontend
npm run lint
npm run build
```

## Production Run

```bash
cd Frontend
npm run build
npm run start
```

## Important Notes

- `Frontend/.eslintrc.json` is intentionally kept to make linting non-interactive and consistent across machines.
- Secrets should never be committed. Keep local values only in `.env.local`.
- Install dependencies from lockfile for reproducible setup: `npm install` inside `Frontend`.

## Final Project Readiness

- Repository is structured for clarity (`Frontend` and `Backend`).
- Frontend builds and lints successfully.
- Files in version control are limited to project-required code and configuration.
