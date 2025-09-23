import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Angels Haven",
  description: "Review the conditions that apply when you donate, volunteer, or use Angels Haven digital products.",
};

const TERMS = [
  {
    title: "1. Acceptance",
    body: "Using our website, donating, or registering interest as a volunteer means you accept these terms.",
  },
  {
    title: "2. Donations",
    body: "All donations are processed by Stripe or PayPal. Recurring gifts can be paused or cancelled instantly via your receipt. Refunds are available within 14 days by emailing support@angelshaven.org.",
  },
  {
    title: "3. Use of funds",
    body: "Funds are applied to meals, medical care, transport, and operational compliance. Restricted gifts (eg, emergency appeals) are ring-fenced.",
  },
  {
    title: "4. Transparency commitments",
    body: "We publish monthly ledgers, annual audits, and safeguarding logs. If evidence is missing, donors can request it within 48 hours.",
  },
  {
    title: "5. Volunteer obligations",
    body: "Volunteers must complete DBS checks, training modules, and follow safety protocols. Failure may result in suspension.",
  },
  {
    title: "6. Content ownership",
    body: "Images, video, and copy on this site belong to Angels Haven unless stated. Media may use assets under the provided license terms.",
  },
  {
    title: "7. Liability",
    body: "We are not liable for indirect or consequential losses. This does not limit liability for fraud, negligence, or anything not permitted under UK law.",
  },
  {
    title: "8. Changes",
    body: "Terms may change; material updates are emailed to donors and posted on this page with revision dates.",
  },
  {
    title: "9. Governing law",
    body: "These terms are governed by the laws of England & Wales, with disputes handled in UK courts.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0f1412] pb-24 text-white">
      <section className="section-shell space-y-8 pt-36">
        <div className="max-w-3xl space-y-5">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white/60">Terms
          </span>
          <h1 className="display-hero">Terms that keep donors, volunteers, and dogs protected.</h1>
          <p className="text-base text-white/70">We keep the legalese plain. Read this before you donate, sign up for field work, or reuse our creative assets.</p>
        </div>
        <div className="space-y-6">
          {TERMS.map((section) => (
            <article key={section.title} className="rounded-3xl border border-white/12 bg-white/[0.08] p-6">
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <p className="mt-2 text-sm text-white/70">{section.body}</p>
            </article>
          ))}
        </div>
        <p className="rounded-[3rem] border border-white/10 bg-white/[0.06] p-8 text-sm text-white/70 backdrop-blur">Last updated: 18 March 2025. Questions? Email <a className="underline" href="mailto:support@angelshaven.org">support@angelshaven.org</a>.</p>
      </section>
    </main>
  );
}
