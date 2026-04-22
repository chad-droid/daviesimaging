import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { AdminSiteOverlay } from "@/components/AdminSiteOverlay";
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
    images: [
      {
        url: "https://6pcw74e8rdx0ig2m.public.blob.vercel-storage.com/site-assets/shawood-aspen-v2-8.webp",
        width: 1200,
        height: 630,
        alt: "Davies Imaging Group — Premium homebuilder photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Davies Imaging Group",
    description:
      "Photography, staging, and video designed for homebuilder marketing teams that need to sell faster.",
    images: ["https://6pcw74e8rdx0ig2m.public.blob.vercel-storage.com/site-assets/shawood-aspen-v2-8.webp"],
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
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1347969750485127');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1347969750485127&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "6100626";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://px.ads.linkedin.com/collect/?pid=6100626&fmt=gif"
            alt=""
          />
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-bg-light text-text-body">
        <SiteShell>{children}</SiteShell>
        <AdminSiteOverlay />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-TK4943YBZM" />
      </body>
    </html>
  );
}
