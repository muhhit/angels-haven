import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Poppins } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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
      <body
        className={`${dmSans.variable} ${poppins.variable} bg-background text-foreground antialiased`}
      >
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "tehnfzseua");`}
        </Script>
        {children}
      </body>
    </html>
  );
}
