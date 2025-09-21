import type { Metadata } from "next";
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
  title: "Angels Haven for Paws | Sponsor a Turkish Rescue Dog",
  description:
    "Support Tülay's Angels Haven for Paws to rescue, rehabilitate, and match Turkish street dogs with loving UK homes.",
  metadataBase: new URL("https://angels-haven.vercel.app"),
  openGraph: {
    title: "Help a Turkish Rescue Dog Reach a Safe Home",
    description:
      "Your monthly gift funds rescue, vet care, and adoption journeys from Türkiye to the UK.",
    url: "https://angels-haven.vercel.app",
    siteName: "Angels Haven for Paws",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Angels Haven for Paws",
    description:
      "Join the mission to move rescued Turkish dogs from the street to the sofa in 60 days.",
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
        {children}
      </body>
    </html>
  );
}
