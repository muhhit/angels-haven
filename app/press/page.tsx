import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press & Media — Angels Haven",
  description: "Download story assets, book interviews, and access field footage from Angels Haven for Paws.",
};

const ASSETS = [
  { title: "Brand & logo pack", description: "SVG logo lockups, colour palette, and typography guidance.", href: "https://example.com/angelshaven-brand-kit.zip" },
  { title: "Hero imagery", description: "AVIF stills from rescue missions with negative space for titles.", href: "https://example.com/angelshaven-hero-pack.zip" },
  { title: "B-roll footage", description: "6–8 second clips from street rescues, foster arrivals, and vet surgeries.", href: "https://example.com/angelshaven-broll.zip" },
];

const STORY_STARTERS = [
  { headline: "Micro-donations powering a UK–TR rescue airlift", blurb: "How £1 meals and emergency funds cross borders within hours." },
  { headline: "Safeguarding in animal rescue", blurb: "What it takes to vet volunteers and transport partners across two countries." },
  { headline: "Data-first charity ops", blurb: "Live dashboards, route logs, and audits as a default—not a perk." },
];

export default function PressPage() {
  return (
    <main className="min-h-screen bg-[#0b1310] pb-24 text-white">
      <section className="section-shell space-y-8 pt-36">
        <div className="max-w-3xl space-y-5">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white/60">Press room
          </span>
          <h1 className="display-hero">Ready-to-run resources for media, partners, and creators.</h1>
          <p className="text-base text-white/70">We keep footage, interviews, and data at your fingertips so you can cover Angels Haven without waiting on an email thread.</p>
        </div>
        <div className="rounded-[3rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur">
          <h2 className="heading-sm">Media contact</h2>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <span>Leila Khan — Donor & Media Relations</span>
            <a href="mailto:press@angelshaven.org" className="text-white hover:text-white/80">press@angelshaven.org</a>
            <a href="tel:+442079460958" className="text-white hover:text-white/80">+44 20 7946 0958</a>
            <span>Whatsapp: +44 7300 900 512</span>
          </div>
        </div>
      </section>

      <section className="section-shell mt-24 space-y-6">
        <h2 className="heading-lg">Download assets</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {ASSETS.map((asset) => (
            <article key={asset.title} className="rounded-3xl border border-white/12 bg-white/[0.08] p-6">
              <p className="text-lg font-semibold">{asset.title}</p>
              <p className="mt-2 text-sm text-white/70">{asset.description}</p>
              <Link href={asset.href} className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/70">Download
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell mt-24 rounded-[3rem] border border-white/10 bg-white/[0.06] p-10 backdrop-blur">
        <h2 className="heading-lg">Angles you can run with</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {STORY_STARTERS.map((story) => (
            <article key={story.headline} className="rounded-3xl border border-white/12 bg-white/[0.08] p-6">
              <p className="text-lg font-semibold">{story.headline}</p>
              <p className="mt-2 text-sm text-white/70">{story.blurb}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/50">Need custom footage or a case study? Email <a className="underline" href="mailto:press@angelshaven.org">press@angelshaven.org</a>.</p>
      </section>
    </main>
  );
}
