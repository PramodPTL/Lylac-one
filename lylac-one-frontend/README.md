# Lylac One

Frontend for **Lylac One** — a pharmacy / healthcare delivery product. The
homepage (search, upload prescription, nearby pharmacies, promo banners,
categories, orders) is built; other routes (Categories, Orders, Health,
Cart) are placeholders wired into real routes, ready for content.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.js` needed)
- shadcn/ui primitives (New York style, `components.json` configured for the CLI)
- Framer Motion
- React Router v7 (data router, lazy-loaded routes, animated transitions)
- TanStack Query v5 (+ devtools in dev)
- Lucide React icons

## Getting started

```bash
npm install
npm run dev       # start dev server
npm run build     # type-check + production build
npm run lint      # oxlint
npm run preview   # preview the production build
```

## Folder structure

```
src/
├── components/
│   ├── ui/          shadcn/ui primitives (Button, ...). Add more via
│   │                 `npx shadcn add <component>` — components.json is preconfigured.
│   ├── layout/       App shell: Header (+ desktop nav), BottomNav, Layout
│   └── common/       Shared, feature-agnostic building blocks
│       (TailContainer, PagePlaceholder, RouteLoader, SkipLink,
│        AnimatedOutlet, ThemeToggle)
├── features/
│   └── home/         Everything specific to the homepage, colocated:
│       ├── components/   SearchBar, UploadPrescriptionCard, PharmacyCard,
│       │                 NearbyPharmaciesSection, PromoBannerCard,
│       │                 PromotionalBannersSection, CategoryGrid, OrdersSection
│       ├── data/          Mock data (swap for a TanStack Query hook later)
│       └── types.ts       Pharmacy, Category, PromoBanner, OrderAction, AccentScheme
├── pages/            One file per route, default-exported, lazy-loaded
├── routes/           Router config (AppRoutes.tsx)
├── providers/         App-wide providers (QueryProvider, ThemeProvider)
├── config/           Static app config (navigation.ts = nav items + route paths)
├── hooks/            Shared hooks (useMediaQuery, useRouteChangeAnnouncement)
├── lib/              Framework-agnostic utilities:
│       utils.ts (cn), motion.ts (shared Framer Motion variants),
│       colorSchemes.ts (brand/accent/amber → Tailwind class maps),
│       format.ts (number formatting)
├── types/            Truly cross-cutting TypeScript types only
├── assets/           Static images/icons bundled by Vite
└── index.css         Tailwind entry point + design tokens (@theme, dark mode)
```

New features should follow the `home` pattern: colocate a feature's
components/data/types under `src/features/<name>/` rather than spreading
them across the top-level `components/` and `data/` folders.

## Design tokens

All color, font, radius, and shadow tokens live in `src/index.css` under
`@theme`. Green primary (medicine/delivery/trust), blue secondary/accent
(promos), warm off-white neutrals. Semantic aliases (`--color-background`,
`--color-primary`, `--color-border`, etc.) sit on top of the raw
`brand-*` / `accent-*` / `surface-*` scales — prefer semantic tokens in
components so a rebrand only touches this one file.

**Dark mode**: toggle in the header (`ThemeToggle`), backed by
`ThemeProvider` (persists to `localStorage`, respects system preference).
Works with almost no per-component changes because most components consume
the semantic CSS variables directly — `.dark { }` in `index.css` overrides
them once, at the root.

Fonts: **Plus Jakarta Sans** (display/body) with **Inter** fallback, and
**JetBrains Mono** for utility/tabular text. Loaded via Google Fonts in
`index.html`.

## Layout & responsiveness

`components/layout/Layout.tsx` is the app shell: `Header` → routed page
content (animated transitions via `AnimatedOutlet`) → `BottomNav`.

- **Mobile/tablet**: `BottomNav` (fixed bottom tab bar) is the primary nav.
- **Desktop (`lg+`)**: `BottomNav` hides; `Header` shows a horizontal nav
  instead, driven by the same `NAV_ITEMS` config.
- `TailContainer` wraps page/section content for consistent max-width +
  gutter (`px-4 sm:px-6 lg:px-8 xl:px-10`) instead of hand-rolled classes.

## Routing

Routes and bottom-nav/desktop-nav metadata are defined once in
`src/config/navigation.ts` (`ROUTES`, `NAV_ITEMS`). Route changes move
focus to the main landmark and announce the new page to screen readers via
`useRouteChangeAnnouncement` (SPA navigation has no native equivalent of a
full page load for assistive tech).

## Accessibility

Skip-to-content link, semantic landmarks, decorative icons marked
`aria-hidden`, accessible names on icon-only controls, visible focus rings,
`prefers-reduced-motion` respected for both CSS transitions and Framer
Motion's JS-driven animations (`useReducedMotion` in `AnimatedOutlet`).

## Next steps

- Build out Categories, Orders, Health, and Cart pages (currently `PagePlaceholder`).
- Pull in more shadcn/ui primitives as needed (`Card`, `Input`, `Badge`, `Sheet`, ...).
- Replace `src/features/home/data/homeMockData.ts` with real API calls via
  TanStack Query — component props are already shaped for that swap.
