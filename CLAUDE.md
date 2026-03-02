# שיחת לו״ז זוגית — Couple Weekly Schedule App

## Project Overview
Hebrew (RTL) Progressive Web App that guides couples through a structured weekly 
planning conversation, tracks intentions, and follows up mid-week and end-of-week.
Based on the methodology of Naama & Daniel Kishinovsky (Gveret Rabia).

## Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS v3 with RTL support (@tailwindcss/rtl or logical properties)
- Framer Motion for page transitions
- localStorage for data persistence (no backend)
- PWA via vite-plugin-pwa
- React Router v6 for navigation

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
- `npm run type-check` — run TypeScript compiler check

## Project Structure
src/
├── components/
│   ├── ui/              # Button, Card, Input, TextArea, ProgressBar, EmojiSelector
│   ├── session/         # SessionStep1 through SessionStep7, Checkpoint
│   ├── dashboard/       # WeekStatus, IntentionsStickyNote, StatsRow
│   └── layout/          # AppLayout, Header, Footer
├── pages/
│   ├── Onboarding.tsx
│   ├── Dashboard.tsx
│   ├── Session.tsx      # Orchestrates 7-step guided flow
│   ├── MidWeekCheckin.tsx
│   ├── WeekReview.tsx
│   ├── History.tsx
│   └── Summary.tsx      # "תלוי על הדלת" printable view
├── store/
│   ├── useSettingsStore.ts   # Zustand store for couple settings
│   └── useSessionStore.ts    # Zustand store for sessions data
├── types/
│   └── index.ts
├── utils/
│   ├── storage.ts       # localStorage read/write helpers
│   ├── dates.ts         # Hebrew date formatting, week calculations
│   └── strings.ts       # All Hebrew UI strings (single source of truth)
├── App.tsx
└── main.tsx

## Design System
- Direction: RTL (set on <html> and in Tailwind config)
- Fonts: "Heebo" (body: 300/400/500/700) + "Rubik" (headings: 500/700) via Google Fonts
- Colors (CSS variables in index.css):
  --color-bg: #FDF6EC (warm cream)
  --color-primary: #C4704B (terracotta)
  --color-primary-light: #E8A87C
  --color-success: #7D9B76 (sage green)
  --color-highlight: #E8836B (soft coral)
  --color-text: #3D2C2C (deep brown)
  --color-card: #FFFFFF
  --color-sticky: #FEF3C7 (sticky note yellow)
- Spacing: generous padding (p-6 on cards), rounded-2xl corners
- Shadows: warm-tinted, soft (shadow-md)
- Mobile-first: max-w-md mx-auto, min touch target h-12

## Key UX Rules (IMPORTANT — follow these strictly)
1. Auto-save on every input change (debounce 500ms via Zustand middleware)
2. Session can be paused at any step and resumed later
3. New session MUST start by showing last week's intentions for review
4. Tone: gentle, encouraging, NEVER guilt ("שמחים שחזרתם 💛" not "פספסתם שבוע")
5. Checkpoints (pause screens) after Steps 3 and 5
6. Rest is a valid intention ("פוך וסדרה" philosophy)
7. All user-facing text comes from src/utils/strings.ts — never hardcode Hebrew in components

## Testing
- Use Vitest for unit tests
- Test store logic and utility functions
- Run `npm test` before considering any task complete
