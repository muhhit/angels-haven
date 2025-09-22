# Angels Haven for Paws

Cinematic, single-focus donation funnel for the Angels Haven UK/TR rescue network. The build pairs elevated storytelling with transparent metrics so £1 donors immediately see the impact they fund.

## Getting Started

```bash
npm install
npm run dev
```

Key scripts:
- `npm run lint -- --max-warnings 0` — lint with zero warning budget.
- `npx tsc --noEmit` — type-check the codebase without building assets.
- `npm run build` — production build (Turbopack).
- `npm run dev` + visit `/tr` for Turkish localisation preview.

## Design System Cheatsheet

- **Typography** — Body locked at `1rem/1.5`. Headings follow a major third scale (`h6` 1.25rem → `h1` 3.8rem) with line-height easing from 1.32 → 1.18 and tightened letter-spacing (-1% to -2.8%). Utilities live in `app/globals.css`.
- **Spacing & Grid** — Sections and shells use the 8pt scale (`--space-*` tokens) with a 12/8/4 responsive column rhythm. Max content width sits at 1200px; gutters widen on large screens via `.section-shell`.
- **Color** — 60/30/10 palette split across background neutrals, primary forest ink, and an ambient teal secondary. All tokens are surfaced under the `@theme inline` block for Tailwind usage and meet WCAG AA contrast.
- **Surfaces** — Card radii and shadows are codified as `--radius-*` & `--shadow-*` tokens to keep elevated tiles cohesive.

## Motion & Accessibility

- Smooth scrolling uses [`lenis`](https://www.npmjs.com/package/lenis) + GSAP ScrollTrigger. It automatically downgrades when `prefers-reduced-motion` is set, destroying Lenis and removing the extra RAF loop.
- Hero intro choreography re-runs or cancels on the same preference toggle, while hero media stops autoplaying for reduced-motion visitors and falls back to the poster frame.
- Global CSS already clamps transitions/animations to near-zero for reduced motion; new utilities respect the same flag.
- Motion and smooth scroll initialise inside the shared `Landing` component so `/` and `/tr` routes stay in sync with a single implementation.

## Content & CTA Wiring

Adjust copy, stats, and links in `app/page.tsx`:
- CTA endpoints: `CTA_PRIMARY`, `CTA_REPORT`, `CTA_FACEBOOK` constants.
- Metrics & timeline data: `heroStats`, `impactStats`, `timelineBeats`, and `transparencyBreakdown` arrays.
- Placeholder media lives under `public/videos/hero-loop.mp4` and `public/images/*`; swap with final assets when ready.

## QA Checklist

Before shipping changes:
- `npm run lint -- --max-warnings 0`
- `npx tsc --noEmit`
- Smoke the hero + scroll sequences with and without reduced motion enabled.
- Spot-check Lighthouse (performance + accessibility) once final assets drop.
