import { Navigation } from "@/components/navigation"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kitesurfing Destinations | Caribbean & Mediterranean | KiteSafaris.com",
  description: "Explore premium kitesurfing destinations and kite safari locations across Caribbean & Mediterranean. Discover Antigua, Greece, Sardinia & more!",
  keywords: "kitesurfing destinations, Caribbean kitesurfing, Mediterranean kitesurfing, Antigua, Greece, Sardinia, kite spots",
  alternates: {
    canonical: "https://www.kitesafaris.com/destinations"
  },
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
    image: "https://daggzx92agk0rfom.public.blob.vercel-storage.com/greece:img-catamaran.jpg",
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
          <BreadcrumbNavigation items={[{ label: "Destinations" }]} />
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-deep-navy font-montserrat mb-6 text-balance">
              Discover Our Kite Safari Destinations
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-open-sans max-w-3xl mx-auto leading-relaxed">
              Three extraordinary destinations. One unforgettable adventure. Experience world-class kiteboarding aboard
              luxury catamarans in the <Link href="/destinations/antigua" className="text-coral-orange hover:text-orange-500 font-semibold">Caribbean</Link>, 
              <Link href="/destinations/greece" className="text-coral-orange hover:text-orange-500 font-semibold"> Greece</Link>, and 
              <Link href="/destinations/sardinia" className="text-coral-orange hover:text-orange-500 font-semibold"> Sardinia</Link>. 
              Each offers unique <Link href="/guaranteed-wind" className="text-coral-orange hover:text-orange-500 font-semibold">wind conditions</Link> and 
              <Link href="/packages" className="text-coral-orange hover:text-orange-500 font-semibold">luxury kite safari packages</Link>.
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
                        alt={`${destination.name} kitesurfing spot aerial view luxury catamaran kitesurfing kite safari`}
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
                      <div className="space-y-3">
                        <Link
                          href={`/destinations/${destination.id}`}
                          className="inline-flex items-center text-coral-orange font-semibold hover:text-orange-500 transition-colors group"
                          aria-label={`Explore ${destination.name} kite safari destination`}
                        >
                          {destination.id === 'antigua' ? 'Luxury kite safari in Antigua' : 
                           destination.id === 'greece' ? 'Professional kitesurfing in Greece' : 
                           'Small group catamaran experience in Sardinia'}
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
                        <div className="flex flex-wrap gap-3 text-sm">
                          <Link
                            href="/booking"
                            className="text-gray-600 hover:text-coral-orange transition-colors"
                          >
                            Book your {destination.name} adventure →
                          </Link>
                          <Link
                            href="/packages"
                            className="text-gray-600 hover:text-coral-orange transition-colors"
                          >
                            View packages →
                          </Link>
                          <Link
                            href="/guides"
                            className="text-gray-600 hover:text-coral-orange transition-colors"
                          >
                            Expert guides →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Related Content Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-4">
                Plan Your Perfect Kite Safari
              </h2>
              <p className="text-lg text-gray-600 font-open-sans max-w-2xl mx-auto">
                Everything you need to know for your luxury kiteboarding adventure.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/packages" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-16 h-16 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-turquoise-200 transition-colors">
                    <span className="text-2xl">📦</span>
                  </div>
                  <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">Packages</h3>
                  <p className="text-sm text-gray-600 font-open-sans">All-inclusive kite safari packages</p>
                </div>
              </Link>
              <Link href="/guides" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-16 h-16 bg-coral-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-coral-orange/20 transition-colors">
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                  <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">Expert Guides</h3>
                  <p className="text-sm text-gray-600 font-open-sans">IKO certified instructors</p>
                </div>
              </Link>
              <Link href="/faq" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
                    <span className="text-2xl">❓</span>
                  </div>
                  <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">FAQ</h3>
                  <p className="text-sm text-gray-600 font-open-sans">Common questions answered</p>
                </div>
              </Link>
              <Link href="/contact" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">Contact</h3>
                  <p className="text-sm text-gray-600 font-open-sans">Plan your perfect trip</p>
                </div>
              </Link>
            </div>
          </section>

          <section className="text-center bg-gradient-to-r from-turquoise-light/10 to-coral-orange/10 rounded-3xl p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-6">Ready for Your Kite Safari Adventure?</h2>
            <p className="text-lg text-gray-600 font-open-sans max-w-2xl mx-auto mb-8 leading-relaxed">
              Join us for an unforgettable kiteboarding experience aboard luxury catamarans. Expert instruction, perfect conditions, and memories that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center bg-coral-orange hover:bg-coral-orange/90 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-coral-orange/30 shadow-lg hover:shadow-xl"
              >
                Book Your Adventure
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center bg-deep-navy hover:bg-deep-navy/90 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-deep-navy/30 shadow-lg hover:shadow-xl"
              >
                Start Planning Your Trip
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
