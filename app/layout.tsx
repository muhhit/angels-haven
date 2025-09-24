import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

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
    "https://www.linkedin.com/company/angelshaven"
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

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Angels Haven for Paws — Donate to Dog Rescue (UK/TR)",
  description:
    "£1 = one meal. Transparent, secure donations for rescue dogs across the UK & Turkey. Sponsor a paw today.",
  metadataBase: new URL("https://angels-haven.vercel.app"),
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
      <body className={`${manrope.variable} ${playfair.variable} bg-background text-foreground antialiased`}>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"
          strategy="beforeInteractive"
        />
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
        {children}
      </body>
    </html>
  );
}
