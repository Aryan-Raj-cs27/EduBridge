# EduBridge

EduBridge is a polished learning platform for guided skill development with a responsive interface, local persistence for demo workflows, and a clean App Router architecture.

## Project Status

- Status: Complete
- Readiness: Production-ready
- Primary deployment target: [Vercel](https://vercel.com) (public URL pending)

## Architecture

The repository is structured as a Next.js application with presentation and interaction logic inside `Frontend/`. Pages, components, and client-side state handle the user experience, while the backend folder remains reserved for future API and data services.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- ESLint
- Browser storage for demo authentication and progress state

## Highlights

- Responsive learning UI with a shared visual system
- Signup, login, reset password, and profile gating flows
- Course enrollment and progress tracking
- Contact lead capture with validation and quick email actions
- Auto/Light/Dark theme toggle with persistence
- Scroll-triggered reveal animations and ambient hero motion

## Pages

- Home: `/`
- About: `/about`
- Courses: `/courses`
- Contact: `/contact`
- Login: `/login`
- Sign Up: `/signup`
- Reset Password: `/reset-password`
- Profile: `/profile`

## Local Setup

```bash
cd Frontend
npm install
npm run dev
```

App URL: `http://localhost:3000`

## Validation

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

## Deployment

- Target platform: [Vercel](https://vercel.com)
- Public URL: pending publication of the hosted app

## License

This repository includes an MIT license at the workspace root.
