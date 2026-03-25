import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";
import { PageTransition } from "@/components/PageTransition";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: {
    default: "Davies Imaging Group | Marketing Assets That Move Homes",
    template: "%s | Davies Imaging Group",
  },
  description:
    "DIG builds revenue-driving marketing assets designed for website conversion, sales center storytelling, paid media performance, and buyer connection.",
  metadataBase: new URL("https://daviesimaging.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Davies Imaging Group",
    title: "Davies Imaging Group | Marketing Assets That Move Homes",
    description:
      "Photography, staging, and video designed for homebuilder marketing teams that need to sell faster.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Davies Imaging Group",
    description:
      "Photography, staging, and video designed for homebuilder marketing teams that need to sell faster.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-light text-text-body">
        <Nav />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <EmailCaptureModal />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
