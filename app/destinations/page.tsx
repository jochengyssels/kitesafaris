import { Navigation } from "@/components/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kitesurfing Destinations | Caribbean & Mediterranean",
  description: "Explore KiteSafaris destinations: Antigua, Greece, Sardinia and more. Compare kite spots, lessons, and packages.",
  keywords: "kitesurfing destinations, Caribbean kitesurfing, Mediterranean kitesurfing, Antigua, Greece, Sardinia, kite spots",
  openGraph: {
    title: "Kitesurfing Destinations | Caribbean & Mediterranean",
    description: "Explore KiteSafaris destinations: Antigua, Greece, Sardinia and more. Compare kite spots, lessons, and packages.",
    type: "website",
  },
}

interface Destination {
  id: string
  name: string
  location: string
  headline: string
  description: string
  image: string
  icon: string
  available: boolean
}

// Fallback destinations data (will be replaced with API data when client-side issues are resolved)
const destinations: Destination[] = [
  {
    id: "antigua",
    name: "Antigua",
    location: "Antigua & Barbuda",
    headline: "Trade Wind Paradise",
    description: "Experience consistent 15-25 knot trade winds, crystal-clear turquoise waters, and luxury catamaran living in the heart of the Caribbean.",
    image: "/antigua-aerial-harbor-view.jpg",
    icon: "Anchor",
    available: true,
  },
  {
    id: "greece",
    name: "Greece",
    location: "Aegean Islands",
    headline: "Meltemi Wind Magic",
    description: "Sail through ancient waters with powerful Meltemi winds, explore hidden coves, and discover the perfect blend of history and kiteboarding.",
    image: "/greek-aegean-islands-kiteboarding-destination.png",
    icon: "MapPin",
    available: true,
  },
  {
    id: "sardinia",
    name: "Sardinia",
    location: "Mediterranean Coast",
    headline: "Mistral Wind Adventure",
    description: "Ride the legendary Mistral winds along pristine Mediterranean coastlines with dramatic landscapes and world-class kiteboarding conditions.",
    image: "/sardinia-punta-trettu-kiteboarding-mediterranean-c.png",
    icon: "Waves",
    available: true,
  },
]

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Kite Safari Destinations",
              description: "Premium kiteboarding destinations for luxury catamaran adventures",
              itemListElement: destinations.map((dest, index) => ({
                "@type": "Place",
                position: index + 1,
                name: `${dest.name} Kite Safari`,
                description: dest.description,
                offers: {
                  "@type": "Offer",
                  price: "1900",
                  priceCurrency: "EUR",
                },
              })),
            }),
          }}
        />

        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-deep-navy font-montserrat mb-6 text-balance">
              Discover Our Kite Safari Destinations
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-open-sans max-w-3xl mx-auto leading-relaxed">
              Three extraordinary destinations. One unforgettable adventure. Experience world-class kiteboarding aboard
              luxury catamarans in the Caribbean, Greece, and Sardinia.
            </p>
          </div>

          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {destinations.map((destination) => {
                return (
                  <div
                    key={destination.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                    role="article"
                    aria-labelledby={`destination-${destination.id}-title`}
                  >
                    {/* Image Container */}
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      <Image
                        src={destination.image || "/placeholder.svg"}
                        alt={`${destination.name} kiteboarding destination with luxury catamaran and perfect wind conditions`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                      {/* Destination Icon */}
                      <div className="absolute top-6 left-6 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-turquoise-light shadow-lg">
                        {/* Using simple emoji icons instead of lucide-react to avoid import issues */}
                        <span className="text-2xl">
                          {destination.icon === "Anchor" ? "⚓" : destination.icon === "MapPin" ? "📍" : "🌊"}
                        </span>
                      </div>

                      {/* Location Badge */}
                      <div className="absolute top-6 right-6 bg-deep-navy/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                        {destination.location}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h3
                        id={`destination-${destination.id}-title`}
                        className="text-2xl md:text-3xl font-bold text-deep-navy font-montserrat mb-3"
                      >
                        {destination.name}
                      </h3>
                      <p className="text-gray-600 font-open-sans mb-6 line-clamp-3">
                        {destination.description}
                      </p>
                      <Link
                        href={`/destinations/${destination.id}`}
                        className="inline-flex items-center text-coral-orange font-semibold hover:text-orange-500 transition-colors group"
                        aria-label={`Explore ${destination.name} kite safari destination`}
                      >
                        Explore {destination.name}
                        <svg
                          className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          ></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="text-center bg-gradient-to-r from-turquoise-light/10 to-coral-orange/10 rounded-3xl p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-6">Ready for Your Kite Safari Adventure?</h2>
            <p className="text-lg text-gray-600 font-open-sans max-w-2xl mx-auto mb-8 leading-relaxed">
              Join us for an unforgettable kiteboarding experience aboard luxury catamarans. Expert instruction, perfect conditions, and memories that last a lifetime.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-deep-navy hover:bg-deep-navy/90 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-deep-navy/30 shadow-lg hover:shadow-xl"
            >
              Start Planning Your Trip
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </section>
        </div>
      </main>
    </div>
  )
}
