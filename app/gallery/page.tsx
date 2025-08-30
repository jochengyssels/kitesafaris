import { Navigation } from "@/components/navigation"
import { GalleryGrid } from "@/components/gallery-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery - KiteSafaris.com",
  description:
    "Explore stunning photos and videos from our catamaran kite cruises across the Caribbean and Mediterranean",
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-deep-navy">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-montserrat mb-4">Kite Cruise Gallery</h1>
            <p className="text-xl text-gray-300 font-open-sans max-w-3xl mx-auto">
              Experience the magic of catamaran kite cruising through stunning photography and videos from remote
              islands across the Caribbean and Mediterranean.
            </p>
          </div>
          <GalleryGrid />
        </div>
      </main>
    </div>
  )
}
