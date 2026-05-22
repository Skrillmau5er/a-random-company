# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
```

No test suite is configured.

## Architecture

Next.js 16 App Router app. All pages are client components (`"use client"`) because they call `initializePendo()` on mount.

**Pendo integration** is the core purpose of this app. The Pendo agent script is injected in `app/layout.tsx` using `PENDO_INT_KEY` from `.env`. `lib/pendo.ts` wraps `window.pendo.initialize()` with visitor identity logic: a UUID is stored in the `pendo_visitor_id` cookie (1-year expiry); on first visit fake user data is generated via `@faker-js/faker` and passed to Pendo. Each page calls `initializePendo()` in a `useEffect`.

**Pages:**
- `/` (`app/page.tsx`) — homepage with interactive demo components
- `/dashboard` (`app/dashboard/page.tsx`) — mock metrics dashboard with sliders
- `/user` (`app/user/page.tsx`) — profile/settings form

**UI components** are in `components/ui/` — shadcn/ui primitives (Button, Card, Input, Badge, Tabs, Slider, Switch). `components/nav.tsx` uses `usePathname` for active link highlighting.

`PENDO_INT_KEY` in `.env` is the Pendo subscription key used to load the agent from `cdn.pendo-link.pendo-dev.com` (dev environment).
