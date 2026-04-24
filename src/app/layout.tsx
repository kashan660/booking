import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/features/WhatsAppButton";
import { SchemaMarkup } from "@/components/features/SchemaMarkup";
import { AffiliateScript } from "@/components/features/AffiliateScript";
import { GoogleAdSense } from "@/components/features/GoogleAdSense";
import { GoogleAnalytics } from "@/components/features/GoogleAnalytics";
import { LanguageCurrencyProvider } from "@/contexts/LanguageCurrencyContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lugvia.com"),
  title: {
    default: "Lugvia Movers | Packers and Movers in USA",
    template: "%s",
  },
  description:
    "Packers and movers in the USA for local and long-distance moves. Optional packing, supplies, storage, and commercial moving. Get a fast quote today.",
  keywords: [
    "Packers and Movers",
    "Moving Company USA",
    "Local Moving",
    "Long Distance Moving",
    "Residential Moving",
    "Commercial Moving",
    "Packing Services",
    "Moving Supplies",
    "Storage",
    "Furniture Moving",
  ],
  authors: [{ name: "Lugvia Movers" }],
  creator: "Lugvia Movers",
  publisher: "Lugvia Movers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Lugvia Movers | Packers and Movers in USA",
    description:
      "Local and long-distance moving services across the USA. Transparent quotes, packing, storage, and careful handling.",
    url: "https://lugvia.com",
    siteName: "Lugvia Movers",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero/dubai.jpg",
        width: 1200,
        height: 630,
        alt: "Lugvia Movers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lugvia Movers | Packers and Movers in USA",
    description: "Request a moving quote for local or long-distance moves. Packing, storage, and careful handling.",
    images: ["/images/hero/dubai.jpg"],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Lugvia Movers',
    statusBarStyle: 'black-translucent',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "1crFdyQXzB9k8Km-jgyOtveDZ-UZXCUBU7rZvmsriGY",
  },
  alternates: {
    canonical: "https://lugvia.com",
    languages: {
      "en-US": "https://lugvia.com",
    },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <LanguageCurrencyProvider>
          <GoogleAnalytics />
          <SchemaMarkup />
          <AffiliateScript />
          <GoogleAdSense />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </LanguageCurrencyProvider>
      </body>
    </html>
  );
}
