import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { QueryProvider } from "@/components/prooviders/query-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qubot.online"),
  title: {
    default: "Qubot - AI Chat Assistant",
    template: "%s | Qubot"
  },
  description: "Your advanced AI chat assistant for efficient communication and problem-solving. Chat with multiple AI models, get instant answers, and boost your productivity.",
  keywords: [
    "AI chat",
    "AI assistant",
    "chatbot",
    "artificial intelligence",
    "GPT",
    "chat AI",
    "AI conversation",
    "virtual assistant",
    "Qubot",
    "AI chatbot online"
  ],
  authors: [{ name: "Qubot" }],
  creator: "Qubot",
  publisher: "Qubot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://qubot.online",
    title: "Qubot - AI Chat Assistant",
    description: "Your advanced AI chat assistant for efficient communication and problem-solving. Chat with multiple AI models, get instant answers, and boost your productivity.",
    siteName: "Qubot",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Qubot - AI Chat Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qubot - AI Chat Assistant",
    description: "Your advanced AI chat assistant for efficient communication and problem-solving.",
    images: ["/og-image.png"],
    creator: "@qubot",
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
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#D1FE17" },
    { media: "(prefers-color-scheme: dark)", color: "#D1FE17" },
  ],
  verification: {
    google: "GTyrrbs3oYsSRQXPCgPB79K-MaxrUztHl5i7UxiWg2Q",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Qubot",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "description": "Your advanced AI chat assistant for efficient communication and problem-solving. Chat with multiple AI models, get instant answers, and boost your productivity.",
    "url": "https://qubot.online",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0.0",
    "author": {
      "@type": "Organization",
      "name": "Qubot"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
