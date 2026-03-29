# EduBridge

EduBridge is a modern learning platform focused on practical, guided skill development through a clean and responsive user experience.

## Overview

- Product-first frontend built with the App Router architecture
- Consistent visual system across Home, About, Courses, Contact, and Signup
- Responsive interactions optimized for desktop and mobile browsers
- Theme support with persistent mode preference

## Repository Layout

- `Frontend/` - Production-ready Next.js application
- `Backend/` - Service layer scaffold for upcoming API implementation

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS
- ESLint (Next.js core web-vitals profile)

## Local Development

1. Open terminal at repository root.
2. Run:

```bash
cd Frontend
npm install
npm run dev
```

App URL: `http://localhost:3000`

## LAN Testing (Phone + Laptop)

Run the app on your local network:

```bash
cd Frontend
npm run dev:lan
```

Open on mobile (same Wi-Fi): `http://<your-laptop-ip>:3000`

## Quality Gates

Run static checks before every commit:

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

## Available Scripts (Frontend)

- `npm run dev` - Starts local development server
- `npm run dev:lan` - Starts development server accessible on LAN
- `npm run lint` - Runs ESLint checks
- `npm run build` - Builds optimized production bundle
- `npm run start` - Serves production build

## Current UX Highlights

- Refined hero motion with smooth timing and mobile-aware ambient animation
- Compact theme toggle with persistent preference (Auto, Light, Dark)
- Improved contact actions including tap-to-copy support
- Polished chatbot panel layout and interaction behavior
- Balanced card layouts and improved readability on image-based headers

## Roadmap

- Backend API integration for authentication and dynamic course data
- Progress tracking and learner dashboard modules
- Enhanced analytics and engagement instrumentation

## License

This project is licensed under the terms specified in `Frontend/LICENSE`.
