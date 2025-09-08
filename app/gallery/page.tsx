import { Navigation } from "@/components/navigation"
import { GalleryGrid } from "@/components/gallery-grid"
import { generateImageStructuredData } from "@/lib/image-sitemap"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kite Safari Photos | Catamaran Kitesurfing Gallery | KiteSafaris.com",
  description:
    "Explore stunning kite safari photos and catamaran kitesurfing gallery from our luxury adventures across Caribbean & Mediterranean. See the magic!",
}

export default function GalleryPage() {
  const structuredData = generateImageStructuredData()

  return (
    <div className="min-h-screen bg-deep-navy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
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
