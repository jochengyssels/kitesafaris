import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { GuideGrid } from "@/components/guide-grid"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Kitesurfing Guides | Kite Safari Tips | KiteSafaris.com",
  description:
    "Master kitesurfing with expert guides and kite safari tips from our experienced crew. Learn techniques, safety protocols & destination insights!",
  alternates: {
    canonical: "https://www.kitesafaris.com/guides"
  },
}

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-sand-beige">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <BreadcrumbNavigation items={[{ label: "Guides" }]} />
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4 font-montserrat">
              Catamaran Kite Cruise Guides
            </h1>
            <p className="text-lg text-navy/80 max-w-2xl mx-auto font-open-sans">
              Master catamaran kite cruising with expert guides, safety protocols, and destination insights from our
              experienced crew. Ready to put your skills to the test? 
              <Link href="/destinations" className="text-coral-orange hover:text-orange-500 font-semibold"> Explore our destinations</Link> and 
              <Link href="/booking" className="text-coral-orange hover:text-orange-500 font-semibold"> book your adventure</Link>.
            </p>
          </div>
          <GuideGrid />
        </div>
      </main>
    </div>
  )
}
