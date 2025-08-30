import { Navigation } from "@/components/navigation"
import { PackageTabs } from "@/components/package-tabs"
import { PricingCalculator } from "@/components/pricing-calculator"
import { RouteMap } from "@/components/route-map"
import { AntiguaTripCalendar } from "@/components/antigua-trip-calendar"

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-deep-navy to-deep-navy/90 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6 text-balance">Kite Safari Packages</h1>
          <p className="font-open-sans text-lg md:text-xl max-w-3xl mx-auto text-pretty opacity-90">
            7-day luxury catamaran kitesafaris in Antigua & Barbuda. Each safari features 3 double cabins for up to 6
            guests, with departures every Saturday from December 6, 2025 through April 2026.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-4">Available Departures</h2>
            <p className="text-lg text-gray-600 font-open-sans max-w-2xl mx-auto">
              Saturday-to-Saturday departures with 3 double cabins available per trip. Book your preferred week for the
              ultimate Caribbean kitesafari experience.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <AntiguaTripCalendar />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-4">Tour Route Map</h2>
            <p className="text-lg text-gray-600 font-open-sans max-w-2xl mx-auto">
              Explore the sailing routes and key kitesurfing waypoints for our Antigua & Barbuda safari
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <RouteMap
              title="Antigua & Barbuda Kitesafari Route"
              description="7-day sailing route with premium kitesurfing spots and cultural stops"
              waypoints={[
                {
                  name: "Jolly Harbor",
                  coordinates: { lat: 17.0475, lng: -61.8658 },
                  description: "Starting point with marina facilities and restaurants",
                },
                {
                  name: "Hansons Bay",
                  coordinates: { lat: 17.1167, lng: -61.8833 },
                  description: "Flat-water playground perfect for beginners and freestyle",
                },
                {
                  name: "Nonsuch Bay",
                  coordinates: { lat: 17.0833, lng: -61.7167 },
                  description: "Protected by reef with butter-flat water conditions",
                },
                {
                  name: "Great Bird Island",
                  coordinates: { lat: 17.1167, lng: -61.6833 },
                  description: "Remote wildlife sanctuary with pristine conditions",
                },
                {
                  name: "Barbuda - Coco Point",
                  coordinates: { lat: 17.5833, lng: -61.8167 },
                  description: "Shallow waters and pink sand beaches",
                },
                {
                  name: "Codrington Lagoon",
                  coordinates: { lat: 17.6333, lng: -61.8167 },
                  description: "Large shallow lagoon with safe progression conditions",
                },
                {
                  name: "Falmouth Harbor",
                  coordinates: { lat: 17.0167, lng: -61.7667 },
                  description: "Historic harbor near Nelson's Dockyard",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section id="booking" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <PricingCalculator />
          </div>
        </div>
      </section>

      {/* Package Tabs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <PackageTabs />
        </div>
      </section>
    </div>
  )
}
