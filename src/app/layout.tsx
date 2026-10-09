import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "@/style/theme.css";
import "@/style/globals.css";
import "@/style/components.css";
import "@/style/utils.css";
import AOSObserver from "@/components/AOSObserver";
import PreloadImages from "@/components/PreloadImages";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Ensia Sport & Culture Club",
    template: "%s | Ensia Sport & Culture Club",
  },
  description:
    "Ensia Sport & Culture Club (ESCC) — a dynamic student community at ENSIA fostering passion, creativity, and teamwork through sports, arts, and culture.",
  keywords: [
    "ENSIA",
    "ESCC",
    "Ensia Sport and Culture Club",
    "student club",
    "sports",
    "culture",
    "university",
    "events",
    "Algeria",
  ],
  authors: [{ name: "Ensia Sport & Culture Club" }],
  creator: "Ensia Sport & Culture Club",
  publisher: "Ensia Sport & Culture Club",
  metadataBase: new URL("https://escc.ensia.dz"),
  openGraph: {
    title: "Ensia Sport & Culture Club (ESCC)",
    description:
      "Join Ensia Sport & Culture Club — where passion meets creativity. Explore our events, teams, and community spirit.",
    url: "https://escc.ensia.dz",
    siteName: "Ensia Sport & Culture Club",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ensia Sport & Culture Club (ESCC)",
    description:
      "Discover the vibrant world of Ensia Sport & Culture Club — where ENSIA students unite through sports, art, and culture.",
    images: ["/images/og-banner.jpg"],
    creator: "@ensia.sport.culture.club",
  },
  category: "Education, Sports, Culture",
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#3323a0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-white text-gray-900`}
      >
        <PreloadImages />
        <AOSObserver />
        {children}
      </body>
    </html>
  );
}
