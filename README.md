# EduBridge

EduBridge is a modern learning platform focused on practical, guided skill development with a clean, responsive interface.

## Highlights

- Responsive, production-grade UI with consistent visual system across all pages
- Auth flows with signup, login, password strength checks, and reset password
- Profile gate that prompts login for protected access
- Course enrollment + progress tracking with local persistence
- Structured contact lead capture with validation and quick email actions
- Theme toggle with Auto/Light/Dark modes and persistent preference
- Scroll-based reveal animations and ambient hero motion

## Features

### Authentication (Frontend)
- Signup with strong password rules and confirm-password flow
- Login with session storage and user greeting in the navbar
- Reset password page (local demo only; OTP verification requires backend)
- Profile page gated behind login

### Courses
- Enroll/unenroll per course
- Completion tracking per enrolled course
- Summary metrics for enrolled count and average completion

### Contact
- Structured lead form with validation
- Local lead persistence with timestamps
- Tap-to-copy for email/phone
- Compose email (mail app + Gmail shortcut)

### UI/UX
- Consistent page hero styling across sections
- Scroll-in animations (elements appear as they enter view)
- Ambient hero background orbs with smooth motion

## Pages

- Home: `/`
- About: `/about`
- Courses: `/courses`
- Contact: `/contact`
- Login: `/login`
- Sign Up: `/signup`
- Reset Password: `/reset-password`
- Profile: `/profile`

## Repository Layout

- `Frontend/` - Production-ready Next.js application
- `Backend/` - Placeholder for future APIs and data services

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- ESLint (Next.js core web-vitals profile)

## Local Development

```bash
cd Frontend
npm install
npm run dev
```

App URL: `http://localhost:3000`

## LAN Testing (Phone + Laptop)

```bash
cd Frontend
npm run dev:lan
```

Open on mobile (same Wi-Fi): `http://<your-laptop-ip>:3000`

## Quality Gates

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

## Notes

- Authentication, password reset, and progress are stored locally for the current demo.
- OTP verification and secure password handling should be implemented in the backend before real users.

## Security

- Authentication is demo-only and uses browser localStorage.
- For production, move auth to the backend with hashed passwords, OTP/email verification, and secure session handling.

## License

This project is licensed under the terms specified in `Frontend/LICENSE`.
