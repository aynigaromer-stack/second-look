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
- Supabase Auth (magic link + Google OAuth trigger)

## Environment variables

Create these in Vercel and locally:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Supabase auth settings you must add

In Supabase → Authentication → URL Configuration:

- Site URL: your production URL, e.g. `https://second-look-indol.vercel.app`
- Redirect URLs:
  - `https://second-look-indol.vercel.app/studio`
  - `http://localhost:3000/studio`

For Google login, also enable the Google provider in Supabase Auth.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## What works now

- `/join` sends a real magic link via Supabase
- `/studio` checks session and only shows the writing UI when logged in
- Sign out works

## Next MVP steps

- Add profiles table for nickname/avatar
- Add real photo source connections (WebDAV / Google Drive)
- Replace mock data in `lib/data.ts` with real queries
- Save drafts and published posts in Supabase
