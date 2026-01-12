import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/features/WhatsAppButton";
import { SchemaMarkup } from "@/components/features/SchemaMarkup";

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
    default: "Lugvia | Luxury Airport Transfers, Chauffeur Service & Hotel Booking",
    template: "%s | Lugvia Premium Travel",
  },
  description: "Book reliable airport transfers, VIP chauffeur services, and luxury hotels worldwide. Best rates for transfers in Dubai, Istanbul, Paris, London, and Makkah.",
  keywords: ["Airport Transfer", "Chauffeur Service", "Luxury Travel", "Hotel Booking", "Dubai Transfers", "Istanbul Taxi", "Makkah Umrah Taxi", "VIP Transport", "City to City Transfer"],
  authors: [{ name: "Lugvia Travel" }],
  creator: "Lugvia",
  publisher: "Lugvia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Lugvia | Premium Airport Transfers & Luxury Travel",
    description: "Experience the ultimate in travel comfort. Book private airport transfers, chauffeur services, and luxury hotels globally with Lugvia.",
    url: "https://lugvia.com",
    siteName: "Lugvia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero/dubai.jpg", // We use our local hero image as default OG image
        width: 1200,
        height: 630,
        alt: "Lugvia Luxury Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lugvia | Premium Airport Transfers & Luxury Travel",
    description: "Book reliable airport transfers and chauffeur services worldwide. Best rates guaranteed.",
    images: ["/images/hero/dubai.jpg"],
  },
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Lugvia',
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
      >
        <SchemaMarkup />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
