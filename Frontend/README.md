# EduBridge

EduBridge is a Next.js website project with pages for home, about, contact, courses, and signup.

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS

## Requirements

- Node.js 18+ (recommended: latest LTS)
- npm 9+

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Quality Checks

```bash
npm run lint
npm run build
```

## Important Project Files

- `package.json`: scripts and dependencies (must be committed)
- `package-lock.json`: locked dependency versions for reproducible installs (must be committed)
- `jsconfig.json`: alias config (`@/*`) for cleaner imports (must be committed)
- `next.config.mjs`: Next.js runtime/build config (must be committed)

## Security Notes

- Do not commit real secrets.
- Keep any local environment values in `.env.local` only.
- `.gitignore` is configured to ignore all `.env*` files.
