import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { SpeedInsights } from "@vercel/speed-insights/next";

const clashDisplay = localFont({ src: "../fonts/ClashDisplay-Variable.woff2" });
const satoshi = localFont({
  src: "../fonts/Satoshi-Variable.woff2",
  display: "swap",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Free podcast hosting | Kcast",
  description:
    " Your free podcast hosting destination. Unlimited hosting, easy-to-use interface, seamless distribution, and advanced analytics. Join our vibrant community and start podcasting today!",
  keywords: [
    "Podcast hosting",
    "Free podcast platform",
    "Podcast distribution",
    "Podcast creation",
    "Podcast analytics",
    "Podcast community",
    "Podcasting tools",
    "Podcast management",
    "Audio content hosting",
    "Podcast collaboration",
  ],
  authors: [{ name: "Okoji Kelechi Emeka", url: "https://byokoji.vercel.app" }],
  category: "Podcasting",
  metadataBase: new URL("https://kcast.vercel.app"),
  openGraph: {
    title: "Free podcast hosting | Kcast",
    description:
      " Your free podcast hosting destination. Unlimited hosting, easy-to-use interface, seamless distribution, and advanced analytics. Join our vibrant community and start podcasting today!",
    images: [
      {
        url: "https://kcast.vercel.app/img/logo.svg",
      },
    ],
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
        className={`${clashDisplay.className} antialiased ${satoshi.variable} ${GeistSans.variable}`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
