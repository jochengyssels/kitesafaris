import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { DestinationsGallery } from "@/components/destinations-gallery"
import { EnhancedFooter } from "@/components/enhanced-footer"

export const metadata: Metadata = {
  title: "Destinations Gallery - See Where Your Adventure Takes You | KiteSafaris.com",
  description:
    "Explore breathtaking moments from our kite safaris across the Caribbean and Mediterranean. Stunning photography showcasing our destinations and adventures.",
  keywords: "kiteboarding gallery, Caribbean photography, Mediterranean destinations, kite safari photos, adventure photography, travel gallery",
  alternates: {
    canonical: "https://kitesafaris.com/destinations/gallery",
  },
  openGraph: {
    title: "Destinations Gallery - See Where Your Adventure Takes You | KiteSafaris.com",
    description:
      "Explore breathtaking moments from our kite safaris across the Caribbean and Mediterranean. Stunning photography showcasing our destinations and adventures.",
    url: "https://kitesafaris.com/destinations/gallery",
    siteName: "KiteSafaris.com",
    images: [
      {
        url: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/antigua:img-catamaran-sunset.jpg",
        width: 1200,
        height: 630,
        alt: "Stunning kiteboarding photography from KiteSafaris destinations",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Destinations Gallery - See Where Your Adventure Takes You | KiteSafaris.com",
    description:
      "Explore breathtaking moments from our kite safaris across the Caribbean and Mediterranean.",
    images: ["https://daggzx92agk0rfom.public.blob.vercel-storage.com/antigua:img-catamaran-sunset.jpg"],
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
}

export default function DestinationsGalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "KiteSafaris Destinations Gallery",
            description:
              "Photography showcase from kiteboarding safaris across Caribbean and Mediterranean destinations",
            provider: {
              "@type": "Organization",
              name: "KiteSafaris.com",
              url: "https://kitesafaris.com",
              logo: "https://kitesafaris.com/logo.png",
            },
            contentLocation: [
              {
                "@type": "Place",
                name: "Caribbean",
              },
              {
                "@type": "Place",
                name: "Mediterranean",
              },
            ],
            url: "https://kitesafaris.com/destinations/gallery",
          }),
        }}
      />
      <main className="pt-20">
        <DestinationsGallery />
      </main>
      <EnhancedFooter />
    </div>
  )
}
