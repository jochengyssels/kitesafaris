import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Caribbean Kite Safari Antigua | Luxury Catamaran Kiteboarding Trips | KiteSafaris.com",
  description:
    "Book your Caribbean kite safari in Antigua! 7-day luxury catamaran kiteboarding adventures from €1,900. Saturday departures Dec 2025-Apr 2026. Max 6 guests per trip.",
  keywords:
    "Caribbean kite safari, Antigua kiteboarding trip, catamaran safari Antigua, book kiteboarding holiday Caribbean, luxury kite safari, Antigua kite spots, Caribbean kitesurfing vacation",
  generator: "v0.app",
  openGraph: {
    title: "Caribbean Kite Safari Antigua | Luxury Catamaran Kiteboarding Adventures",
    description:
      "Experience the ultimate Caribbean kite safari in Antigua aboard luxury catamarans. 7-day trips with expert guides, premium equipment, and unforgettable adventures.",
    url: "https://kitesafaris.com",
    siteName: "KiteSafaris.com",
    images: [
      {
        url: "/antigua-jolly-harbor-kiting.png",
        width: 1200,
        height: 630,
        alt: "Caribbean catamaran kite safari Antigua luxury kiteboarding adventure",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caribbean Kite Safari Antigua | Luxury Catamaran Adventures",
    description: "Book your Caribbean kite safari in Antigua! 7-day luxury catamaran kiteboarding trips from €1,900.",
    images: ["/antigua-jolly-harbor-kiting.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "KiteSafaris.com",
              description: "Luxury Caribbean kite safari adventures in Antigua aboard premium catamarans",
              url: "https://kitesafaris.com",
              telephone: "+32 492 57 64 27",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BE",
              },
              sameAs: ["https://www.instagram.com/kitesafaris", "https://www.facebook.com/kitesafaris"],
              offers: {
                "@type": "Offer",
                name: "Caribbean Kite Safari Antigua",
                description: "7-day luxury catamaran kiteboarding adventure in Antigua",
                price: "1900",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${montserrat.variable}`}>
        {children}
        <EnhancedFooter />
        <WhatsAppButton />
      </body>
    </html>
  )
}
