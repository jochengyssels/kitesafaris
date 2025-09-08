import { Navigation } from "@/components/navigation"
import { ShopPage } from "@/components/shop-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kitesurfing Merchandise | Kite Safari Gear | KiteSafaris.com",
  description:
    "Shop premium kitesurfing merchandise and kite safari gear! Discover KiteSafaris branded apparel, accessories & lifestyle products for ocean lovers.",
  keywords: "kiteboarding merchandise, KiteSafaris gear, sailing apparel, ocean lifestyle, branded clothing",
  alternates: {
    canonical: "https://www.kitesafaris.com/shop"
  },
  openGraph: {
    title: "KiteSafaris Gear - Premium Kiteboarding Merchandise",
    description: "Discover premium KiteSafaris branded gear and accessories for your next adventure",
    images: ["/shop-hero-kitesafaris-gear.jpg"],
  },
}

export default function Shop() {
  return (
    <>
      <Navigation />
      <main>
        <ShopPage />
      
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "KiteSafaris",
        "description": "Luxury Caribbean kite safari adventures",
        "url": "https://kitesafaris.com",
        "logo": "https://kitesafaris.com/logo.png"
      })
    }}
  />

</main>
    </>
  )
}
