import type { Metadata } from "next";
import Link from "next/link";

const REPORT_URL = "https://example.com/angels-haven-transparency.pdf";

export const metadata: Metadata = {
  title: "Transparency & Impact Reporting — Angels Haven",
  description: "Access our financial statements, safeguarding logs, and live impact dashboards before you donate.",
};

const SNAPSHOT = [
  { label: "Monthly meals", value: "2,184", detail: "GPS confirmed deliveries across Fethiye, Dalyan, Izmir." },
  { label: "Emergency response", value: "05:42 hrs", detail: "Average time from alert to funded vet treatment." },
  { label: "Admin overhead", value: "8%", detail: "Capped spend on UK governance, tooling, and compliance." },
  { label: "Audit status", value: "Clean", detail: "Paws & Claws LLP sign-off 08 Feb 2024." },
];

const DOCUMENTS = [
  { title: "FY23 audited financials", description: "Income, expenditure, reserves, and notes from Paws & Claws LLP.", href: REPORT_URL },
  { title: "Safeguarding & volunteer policy", description: "DBS checks, incident escalation flow, and volunteer charter.", href: "https://example.com/angels-haven-safeguarding.pdf" },
  { title: "Transport & insurance pack", description: "DEFRA license, vehicle insurance, and airline partner MOUs.", href: "https://example.com/angels-haven-transport.pdf" },
  { title: "Gift Aid + HMRC filings", description: "Submission receipts and donor declaration templates.", href: "https://example.com/angels-haven-giftaid.pdf" },
];

const DATA_FEEDS = [
  { id: "impact", title: "Impact dashboard", copy: "Live meal counts, rescue stages, and emergency heat map updated every four hours.", action: "Open dashboard", href: "https://example.com/angels-haven-dashboard" },
  { id: "ledger", title: "Donor ledger (CSV)", copy: "Anonymised monthly ledger with transaction IDs, currency, and allocation.", action: "Download CSV", href: "https://example.com/angels-haven-ledger.csv" },
  { id: "api", title: "Live metrics API", copy: "REST endpoint surfaces donation velocity, conversion, and SLA stats (API key on request).", action: "Request access", href: "mailto:data@angelshaven.org" },
];

export default function TransparencyPage() {
  return (
    <main className="min-h-screen bg-[#0b1310] pb-24 text-white">
      <section className="section-shell space-y-8 pt-36">
        <div className="max-w-3xl space-y-5">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white/60">Transparency hub
          </span>
          <h1 className="display-hero">Every pound is visible before and after you donate.</h1>
          <p className="text-base text-white/70">Dive into audits, safeguarding evidence, and live impact feeds. This is the due diligence pack we send to grant-makers and major donors—now open to everyone.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SNAPSHOT.map((item) => (
            <article key={item.label} className="rounded-3xl border border-white/12 bg-white/[0.08] p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/55">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold">{item.value}</p>
              <p className="mt-3 text-sm text-white/70">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell mt-24 space-y-6">
        <h2 className="heading-lg">Download the proof pack</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {DOCUMENTS.map((doc) => (
            <article key={doc.title} className="rounded-3xl border border-white/12 bg-white/[0.08] p-6">
              <p className="text-lg font-semibold">{doc.title}</p>
              <p className="mt-2 text-sm text-white/70">{doc.description}</p>
              <Link href={doc.href} className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/70">Open document
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell mt-24 rounded-[3rem] border border-white/10 bg-white/[0.06] p-10 backdrop-blur">
        <h2 className="heading-lg">Real-time data feeds</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {DATA_FEEDS.map((feed) => (
            <article key={feed.id} className="rounded-3xl border border-white/12 bg-white/[0.08] p-6">
              <p className="text-lg font-semibold">{feed.title}</p>
              <p className="mt-2 text-sm text-white/70">{feed.copy}</p>
              <Link href={feed.href} className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/70">{feed.action}
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/50">Need more? Email <a className="underline" href="mailto:verify@angelshaven.org">verify@angelshaven.org</a> for raw exports and video evidence.</p>
      </section>
    </main>
  );
}
