import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Angels Haven for Paws",
  description: "Meet the founders, operations model, and impact milestones that keep Angels Haven transparent and fast.",
};

const TIMELINE = [
  { year: "2019", title: "Street team roots", copy: "Weekend rescue runs in Fethiye grow into a structured volunteer rota covering food drops and vet runs." },
  { year: "2021", title: "Charity registration", copy: "Angels Haven secures Charity Commission status (#1204821) with dual UK/TR governance." },
  { year: "2022", title: "Transparency dashboard", copy: "Donor portal launches with live vet receipts, GPS route logs, and WhatsApp mission updates." },
  { year: "2023", title: "Flight corridor", copy: "DEFRA transport license unlocks routine London–Istanbul airlift slots for urgent medical cases." },
  { year: "2024", title: "Audit maturity", copy: "Independent Paws & Claws LLP audit signs off on cross-border spend and safeguarding." },
];

const TEAM = [
  { id: "tulay", name: "Tülay Demir", role: "Founder & Field Ops", bio: "Co-ordinates search, rescue, and foster placements across Muğla with a 40-volunteer network.", image: "/images/founder-tulay.png" },
  { id: "aaron", name: "Aaron Blake", role: "UK Programs & Compliance", bio: "Former Charity Commission analyst handling filings, Gift Aid, and risk governance." },
  { id: "seda", name: "Seda Yıldız", role: "Veterinary Partnerships", bio: "Builds the 18-clinic coalition that keeps emergency care under six hours." },
  { id: "leila", name: "Leila Khan", role: "Donor Experience", bio: "Hosts livestreams, manages WhatsApp feeds, and ships weekly transparency digests." },
];

const VALUES = [
  { title: "Radical transparency", copy: "Every donation unlocks receipts, route screenshots, and safeguarding logs—not annual PDFs." },
  { title: "Local first", copy: "Turkish vets, feeders, and transporters lead field work; UK HQ handles compliance and donor experience." },
  { title: "Ethical urgency", copy: "We use urgency to feed dogs faster, not to pressure donors—clear goals, honest progress bars, no dark patterns." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0f1412] pb-24 text-white">
      <section className="section-shell space-y-10 pt-36">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white/60">Our story
          </span>
          <h1 className="display-hero">Angels Haven is a binational rescue corridor run like a logistics company.</h1>
          <p className="text-base text-white/70">We started as night-time feeders pulling strays off the streets of Fethiye. Today the team balances UK governance with Turkish field expertise so £1 meals, vet care, and flights are documented from the moment you tap donate.</p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-white/60">
            <span>Registered charity • #1204821</span>
            <span>DEFRA transport license</span>
            <span>Independent audit 2024</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/transparency" className="cta-primary inline-flex items-center gap-2 px-8 py-3 text-sm uppercase tracking-[0.32em]">Explore transparency
            </Link>
            <Link href="/#donate" className="cta-muted inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.32em] text-white/70">Donate now
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell mt-20 grid gap-10 rounded-[3rem] border border-white/10 bg-white/[0.06] p-10 backdrop-blur">
        <h2 className="heading-lg">Milestones on the road from street rescue to regulated corridor.</h2>
        <ol className="grid gap-6 md:grid-cols-2">
          {TIMELINE.map((item) => (
            <li key={item.year} className="rounded-3xl border border-white/12 bg-white/[0.08] p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/55">{item.year}</p>
              <p className="mt-2 text-lg font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-white/70">{item.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section-shell mt-24 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
        <div className="space-y-5">
          <h2 className="heading-lg">Core team</h2>
          <p className="text-sm text-white/70">A small, accountable crew connects donors, vets, and on-the-ground volunteers. Everyone listed below is DBS vetted and insured.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {TEAM.map((person) => (
            <article key={person.id} className="glass-card flex flex-col gap-3 rounded-[2rem] border border-white/15 bg-white/[0.08] p-6">
              {person.image ? (
                <Image src={person.image} alt={person.name} width={240} height={240} className="h-32 w-32 rounded-3xl object-cover" />
              ) : null}
              <p className="text-lg font-semibold">{person.name}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">{person.role}</p>
              <p className="text-sm text-white/70">{person.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell mt-24 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="space-y-5">
          <h2 className="heading-lg">Operating values</h2>
          <p className="text-sm text-white/70">These principles keep the rescue fast without losing donor trust.</p>
        </div>
        <div className="grid gap-6">
          {VALUES.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/12 bg-white/[0.08] p-6">
              <p className="text-lg font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-white/70">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell mt-24 grid gap-8 rounded-[3rem] border border-white/10 bg-white/[0.06] p-10 backdrop-blur md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="space-y-4">
          <h2 className="heading-lg">Quick facts</h2>
          <ul className="space-y-3 text-sm text-white/70">
            <li>Safeguarding: annual DBS checks, in-person volunteer training, buddy system for night feeds.</li>
            <li>Insurance: public liability, pet transport, and professional indemnity renewed July 2024.</li>
            <li>Risk management: weekly logistics stand-ups, redundant vets in every region, and heatwave contingency plan.</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="heading-sm">Contact</h3>
          <p className="text-sm text-white/70">Need proof, partnership details, or speaking slots? Reach out.</p>
          <div className="space-y-2 text-sm text-white">
            <a href="mailto:verify@angelshaven.org" className="block text-white hover:text-white/80">verify@angelshaven.org</a>
            <a href="tel:+442079460958" className="block text-white hover:text-white/80">+44 20 7946 0958</a>
            <span>HQ: 18 Market Walk, Islington, London N1 7SR</span>
            <span>TR Ops: Calis Mah. 112. Sokak No:4, Fethiye / Muğla</span>
          </div>
          <Link href="/press" className="cta-muted inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/70">Press toolkit
          </Link>
        </div>
      </section>
    </main>
  );
}
