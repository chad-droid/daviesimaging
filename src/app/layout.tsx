import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";
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
  title: "Davies Imaging Group | Marketing Assets That Move Homes",
  description:
    "DIG builds revenue-driving marketing assets designed for website conversion, sales center storytelling, paid media performance, and buyer connection.",
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
        <main className="flex-1">{children}</main>
        <Footer />
        <EmailCaptureModal />
      </body>
    </html>
  );
}
