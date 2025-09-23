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

- Smooth scrolling + scroll-snap rails use [`lenis`](https://www.npmjs.com/package/lenis) and GSAP, ancak `prefers-reduced-motion` açık olduğunda otomatik devre dışı kalır.
- Hero / “How it works” medyası görünümde AVIF poster → muted MP4’a swap olur; reduce açıkken poster sabit kalır.
- CTA, tutar chip’leri ve SSS akordeonları klavye/focus desteğini korur; coral CTA tek animasyonlu elemandır.
- Hem `/` hem `/tr` rotası aynı `Landing` motion pipeline’ını paylaşır.
- Pointer-tracked glow, magnetik CTA hover ve exit-intent modal animasyonları yalnız hareket izinliyse çalışır.

## Content & CTA Wiring

Adjust copy, stats, and links in `app/page.tsx`:
- Update the `EN_CONTENT` / `TR_CONTENT` objects for copy, media paths, and CTA destinations.
- Asset budget: hero + step/story videos ≤1.2 MB muted loops; posters exported as AVIF/WebP in `public/images`.
- Event tracking helper `trackEvent` pushes to `dataLayer` when present—wire analytics by reading those custom events.
- Hero `liveCounter` config drives the rolling donor ticker; update increments/interval to match prod data.

## QA Checklist

Before shipping changes:
- `npm run lint -- --max-warnings 0`
- `npx tsc --noEmit`
- Smoke the scroll-snap hero rail (hero → how it works → stories → impact) with and without reduced motion.
- Validate hero media swap (poster → video), live counter, and story clips respect `prefers-reduced-motion`.
- Trigger hover + exit intent on desktop to confirm modal shows once and CTA events fire.
- Run Lighthouse mobile (performance ≥90, accessibility ≥95) once final assets drop.

## Trust & Compliance

- Home hero now surfaces live donor ticker, urgency bar, and social proof cards. Update copy via `hero.socialProof`, `hero.urgency`, and `hero.ticker` inside `app/page.tsx`.
- The new `trust` block renders Charity Commission proof, audit notes, team bios, and media mentions—refresh assets and contact details there.
- Footer exposes verified contact, registration number, and quick links to legal/press pages.

## Additional Routes

- `/about` — mission, timeline, and team bios.
- `/transparency` — document downloads plus live data feeds.
- `/press` — media contact and asset bundles.
- `/privacy` & `/terms` — compliance text managed in repo.

Update these pages when documents, contact info, or policies change to keep trust signals accurate.
