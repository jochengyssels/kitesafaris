import { Navigation } from "@/components/navigation"
import { ShopPage } from "@/components/shop-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "KiteSafaris Gear - Wear Your Adventure | Premium Kiteboarding Merchandise",
  description:
    "Shop premium KiteSafaris branded merchandise including apparel, accessories, and lifestyle products. High-quality gear for kiteboarding enthusiasts and ocean lovers.",
  keywords: "kiteboarding merchandise, KiteSafaris gear, sailing apparel, ocean lifestyle, branded clothing",
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
      </main>
    </>
  )
}
