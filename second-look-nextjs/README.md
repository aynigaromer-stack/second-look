# Second Look — deployable Next.js skeleton

A minimal multi-page Next.js starter based on the product and visual direction we shaped together.

## Included pages

- `/` — Magazine homepage
- `/article/[slug]` — Article detail page
- `/studio` — Writing page with daily photos
- `/join` — Sign up and photo-source onboarding page

## Stack

- Next.js (App Router)
- TypeScript
- Plain CSS
- lucide-react icons

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy to Vercel

1. Create a GitHub repo and push this folder.
2. Import the repo into Vercel.
3. Vercel will detect Next.js automatically.
4. Click deploy.

## Next MVP steps

- Add Supabase auth (email magic link + Google)
- Add database tables for users, photos, posts, follows
- Add real photo source connections (WebDAV / Google Drive)
- Replace mock data in `lib/data.ts` with real queries
