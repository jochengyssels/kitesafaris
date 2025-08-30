import { PremiumEquipmentPage } from "@/components/premium-equipment-page"
import { Navigation } from "@/components/navigation"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { FloatingActionButtons } from "@/components/floating-action-buttons"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Premium Equipment | KiteSafaris.com",
  description:
    "Latest kite gear, performance meets safety. Professional equipment from top brands for the ultimate kiteboarding safari experience.",
  keywords:
    "kiteboarding equipment, premium kite gear, safety equipment, North Kiteboarding, Cabrinha, professional kite gear",
  alternates: {
    canonical: "https://kitesafaris.com/premium-equipment",
  },
  openGraph: {
    title: "Premium Equipment | Latest Kite Gear | KiteSafaris.com",
    description:
      "Latest kite gear where performance meets safety. Professional equipment from top brands for the ultimate kiteboarding safari experience.",
    url: "https://kitesafaris.com/premium-equipment",
    siteName: "KiteSafaris.com",
    images: [
      {
        url: "https://kitesafaris.com/premium-kiteboarding-equipment-on-luxury-yacht-dec.png",
        width: 1200,
        height: 630,
        alt: "Premium kiteboarding equipment and luxury catamaran with professional gear",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Equipment | Latest Kite Gear | KiteSafaris.com",
    description: "Latest kite gear where performance meets safety. Professional equipment from top brands.",
    images: ["https://kitesafaris.com/premium-kiteboarding-equipment-on-luxury-yacht-dec.png"],
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

export default function PremiumEquipmentPageRoute() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Premium Kiteboarding Equipment",
            description:
              "Latest kite gear where performance meets safety. Professional equipment from top brands including North Kiteboarding, Cabrinha, and safety gear.",
            provider: {
              "@type": "Organization",
              name: "KiteSafaris.com",
              url: "https://kitesafaris.com",
              logo: "https://kitesafaris.com/logo.png",
            },
            serviceType: "Equipment Rental",
            category: "Kiteboarding Equipment",
            brand: [
              {
                "@type": "Brand",
                name: "North Kiteboarding",
              },
              {
                "@type": "Brand",
                name: "Cabrinha",
              },
              {
                "@type": "Brand",
                name: "Duotone",
              },
            ],
            offers: {
              "@type": "Offer",
              description: "Premium kiteboarding equipment included in safari packages",
              availability: "https://schema.org/InStock",
            },
            url: "https://kitesafaris.com/premium-equipment",
          }),
        }}
      />
      <PremiumEquipmentPage />
      <FloatingActionButtons />
      <EnhancedFooter />
    </div>
  )
}
