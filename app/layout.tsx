import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "../components/CookieConsent";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Angels Haven for Paws",
  "url": "https://angels-haven.vercel.app",
  "logo": "https://angels-haven.vercel.app/images/hero-poster.avif",
  "slogan": "£1 = One Meal",
  "email": "support@angelshaven.org",
  "telephone": "+44 20 7946 0958",
  "areaServed": ["United Kingdom", "Turkey"],
  "foundingDate": "2021-01-12",
  "sameAs": [
    "https://instagram.com/angelshavenpaws",
    "https://youtube.com/@angelshaven",
    "https://www.linkedin.com/company/angelshaven",
    "https://www.facebook.com/groups/480707493946285"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "18 Market Walk",
    "addressLocality": "London",
    "postalCode": "N1 7SR",
    "addressCountry": "GB"
  },
  "memberOf": {
    "@type": "Organization",
    "name": "Hackney CVS"
  },
  "knowsAbout": [
    "Dog rescue",
    "Animal welfare",
    "Micro-donations",
    "Transparency reporting"
  ],
  "taxID": "1204821"
};

const donationSchema = {
  "@context": "https://schema.org",
  "@type": "DonateAction",
  "name": "Sponsor a rescue dog",
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": "https://angels-haven.vercel.app/#donate"
  },
  "recipient": {
    "@type": "NGO",
    "name": "Angels Haven for Paws",
    "taxID": "1204821"
  },
  "result": {
    "@type": "Thing",
    "name": "Safe transport, vet care, and meals for rescue dogs"
  }
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Angels Haven for Paws — Donate to Dog Rescue (UK/TR)",
  description:
    "£1 = one meal. Transparent, secure donations for rescue dogs across the UK & Turkey. Sponsor a paw today.",
  metadataBase: new URL("https://angels-haven.vercel.app"),
  keywords: [
    "dog rescue donations",
    "turkey dog adoption",
    "animal sanctuary transparency",
    "sponsor rescue flight",
    "monthly dog charity"
  ],
  openGraph: {
    title: "Angels Haven for Paws — Donate to Dog Rescue (UK/TR)",
    description:
      "£1 = one meal. Transparent, secure donations for rescue dogs across the UK & Turkey. Sponsor a paw today.",
    url: "https://angels-haven.vercel.app",
    siteName: "Angels Haven for Paws",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Angels Haven for Paws — Donate to Dog Rescue (UK/TR)",
    description:
      "£1 = one meal. Transparent, secure donations for rescue dogs across the UK & Turkey. Sponsor a paw today.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${display.variable} bg-background text-foreground antialiased`}
      >
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "tehnfzseua");`}
        </Script>
        <Script id="ld-organization" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(structuredData)}
        </Script>
        <Script id="ld-donate" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(donationSchema)}
        </Script>
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
