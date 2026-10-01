import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { GoogleTagManagerBody, GoogleTagManagerHead } from "./components/GoogleTagManager";
import ConsentModeSync from "./components/ConsentModeSync";
import AdSenseAutoAds from "./components/AdSenseAutoAds";
import AdBlockingRecovery from "./components/AdBlockingRecovery";
import GoogleTag from "./components/GoogleTag";
import JsonLd from "./components/JsonLd";
import SiteLayout from "./components/SiteLayout";
import SwgBasicScript from "./components/SwgBasicScript";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

const ADSENSE_CLIENT = "ca-pub-2495432679632375";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Shirwell Shipping | Shipping & Logistics Worldwide`,
    template: `%s | Shirwell Shipping`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: "Shirwell Shipping",
  authors: [{ name: "Shirwell Shipping", url: siteConfig.url }],
  creator: "Shirwell Shipping",
  publisher: "Shirwell Shipping",
  category: "shipping",
  alternates: {
    canonical: "/home",
    types: {
      "application/rss+xml": absoluteUrl("/feed.xml"),
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/home"),
    siteName: "Shirwell Shipping",
    title: `Shirwell Shipping | Shipping & Logistics Worldwide`,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl("/ship.png"),
        width: 1024,
        height: 1024,
        alt: "Shirwell Shipping — shipping logo",
      },
      {
        url: absoluteUrl("/hero-ship.png"),
        width: 1536,
        height: 1024,
        alt: "Shirwell Shipping cargo ship delivery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Shirwell Shipping | Shipping & Logistics Worldwide`,
    description: siteConfig.description,
    images: [absoluteUrl("/ship.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/ship.png", type: "image/png", sizes: "any" },
    ],
    shortcut: ["/ship.png"],
    apple: [{ url: "/ship.png", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  // Meta tag verification method (most reliable for Next.js)
  other: {
    "google-adsense-account": ADSENSE_CLIENT,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable} antialiased`}>
      <head>
        {/* Exact AdSense snippet for site ownership verification (must match Google HTML) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2495432679632375"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: "window.adsbygoogle = window.adsbygoogle || [];",
          }}
        />
        {/* AdSense ad blocking recovery (Funding Choices) */}
        <AdBlockingRecovery />
        {/* Google Tag Manager */}
        <GoogleTagManagerHead />
        {/* Google tag (gtag.js) */}
        <GoogleTag />
      </head>
      <body>
        {/* Google Tag Manager (noscript) — immediately after <body> */}
        <GoogleTagManagerBody />
        <ConsentModeSync />
        <AdSenseAutoAds />
        <SwgBasicScript />
        <JsonLd />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
