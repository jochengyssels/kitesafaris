import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import HighlightCards from "@/components/highlight-cards"
import DestinationsMap from "@/components/destinations-map"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { SardinianAwakeningCTA } from "@/components/sardinian-awakening-cta"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "undefined",
  description:
    "Experience the ultimate Caribbean kite safari on luxury catamarans. Expert kiteboarding coaching, small groups, guaranteed wind. Book your kitesurf adventure today!",
  keywords: "caribbean catamaran, kitesurf caribbean, kitesurfing caribbean, kiteboarding caribbean, kitesurf packages, catamaran cruises caribbean, kitesurfing trips, kiteboarding vacations",
  alternates: {
    canonical: "https://kitesafaris.com",
  },
  openGraph: {
    title: "Caribbean Kite Safari | Luxury Catamaran Kiteboarding Adventures",
    description: "Experience the ultimate Caribbean kite safari on luxury catamarans. Expert kiteboarding coaching, small groups, guaranteed wind.",
    url: "https://kitesafaris.com",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://kitesafaris.com/images/caribbean-kite-safari-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Caribbean kite safari catamaran adventure",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caribbean Kite Safari | Luxury Catamaran Kiteboarding Adventures",
    description: "Experience the ultimate Caribbean kite safari on luxury catamarans. Expert kiteboarding coaching, small groups, guaranteed wind.",
    images: ["https://kitesafaris.com/images/caribbean-kite-safari-hero.jpg"],
  },
}

// Destinations data
const destinations = [
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

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "KiteSafaris",
            description: "Luxury Caribbean kite safari adventures on catamarans",
            url: "https://kitesafaris.com",
            logo: "https://kitesafaris.com/logo.png",
            serviceType: "Kiteboarding Adventures",
            areaServed: "Caribbean",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Caribbean Kite Safari Packages",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Caribbean Kite Safari",
                    description: "Luxury catamaran kiteboarding adventures"
                  },
                  price: "1900",
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                  validFrom: "2025-12-06",
                  validThrough: "2026-04-26",
                  url: "https://kitesafaris.com/booking"
                }
              ]
            },
            address: {
              "@type": "PostalAddress",
              addressCountry: "Caribbean"
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              email: "info@kitesafaris.com"
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "127"
            }
          }),
        }}
      />
      <HeroSection />
      
      {/* Discover Our Kite Safari Destinations Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-deep-navy font-montserrat mb-6 text-balance">
              Kite Safari Destinations
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-open-sans max-w-3xl mx-auto leading-relaxed">
              Three extraordinary destinations. One unforgettable adventure. Experience world-class kiteboarding aboard
              luxury catamarans in the Caribbean, Greece, and Sardinia.
            </p>
          </div>

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
        </div>
      </section>

      <HighlightCards />

      <SardinianAwakeningCTA variant="homepage" />

      <DestinationsMap />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl text-navy mb-4">Kite Safari Experts</h2>
            <p className="font-open-sans text-gray-600 max-w-2xl mx-auto">
              We deliver unforgettable kitesurfing adventures with a perfect track record of reliability and premium
              catamaran experiences.
            </p>
          </div>
          <TestimonialCarousel />
        
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
</div>
      </section>
    </main>
  )
}
