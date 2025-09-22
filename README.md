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

- **Typography** — `--font-heading` (Bricolage Grotesque) powers display headlines, `--font-body` (`Inter`) drives paragraphs. Heading tracking is tightened for a cinematic feel while body copy stays at `1rem/1.6`.
- **Spacing & Rhythm** — Shell gutters sit at 24–64px with `scroll-snap` applied to the four hero rail sections. Tokens live in `app/globals.css` for consistent spacing + curvature.
- **Color** — Transparent dark mode palette with a single coral accent (`--color-accent`) reserved for primary CTAs. Overlays adjust automatically for light/dark OS themes.
- **Surfaces** — `glass-card` utility applies blur, subtle border, and volumetric shadows; CTA helpers (`cta-primary`, `cta-muted`) keep hierarchy consistent.

## Motion & Accessibility

- Smooth scrolling + scroll-snap rails use [`lenis`](https://www.npmjs.com/package/lenis) and GSAP, but automatically disable when `prefers-reduced-motion` is active.
- Hero and “How it works” media swap from AVIF poster → muted MP4 only when in view; reduced motion keeps the still image.
- CTA, amount chips, and FAQ accordions expose focus rings and keyboard control; only the coral primary button carries motion shadows.
- Both `/` and `/tr` share the same motion pipeline through the exported `Landing` component.
- Pointer-tracked gradient glows and magnetic CTA hovers run only when motion is allowed (handled by `usePointerShift`).

## Content & CTA Wiring

Adjust copy, stats, and links in `app/page.tsx`:
- Update the `EN_CONTENT` / `TR_CONTENT` objects for copy, media paths, and CTA destinations.
- Asset budget: hero + step/story videos ≤1.2 MB muted loops; posters exported as AVIF/WebP in `public/images`.
- Event tracking helper `trackEvent` pushes to `dataLayer` when present—wire analytics by reading those custom events.

## QA Checklist

Before shipping changes:
- `npm run lint -- --max-warnings 0`
- `npx tsc --noEmit`
- Smoke the scroll-snap hero rail (hero → how it works → stories → impact) with and without reduced motion.
- Validate hero media swap (poster → video) and story clips respect `prefers-reduced-motion`.
- Run Lighthouse mobile (performance ≥90, accessibility ≥95) once final assets drop.
