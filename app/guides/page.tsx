import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { GuideGrid } from "@/components/guide-grid"

export const metadata: Metadata = {
  title: "Kite Cruise Guides & Expert Tips | KiteSafaris.com",
  description:
    "Expert guides for catamaran kite cruising. Learn techniques, safety protocols, and destination insights from our experienced crew.",
}

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-sand-beige">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4 font-montserrat">
              Catamaran Kite Cruise Guides
            </h1>
            <p className="text-lg text-navy/80 max-w-2xl mx-auto font-open-sans">
              Master catamaran kite cruising with expert guides, safety protocols, and destination insights from our
              experienced crew.
            </p>
          </div>
          <GuideGrid />
        </div>
      </main>
    </div>
  )
}
