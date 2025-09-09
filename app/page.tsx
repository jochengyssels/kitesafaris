import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import HighlightCards from "@/components/highlight-cards"
import DestinationsMap from "@/components/destinations-map"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { SardinianAwakeningCTA } from "@/components/sardinian-awakening-cta"
import BlogOverview from "@/components/blog-overview"
import { KAIteFloatingWidget } from "@/components/kaite-floating-widget"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Luxury Kite Safari Adventures | Caribbean & Mediterranean | KiteSafaris",
  description:
    "Discover luxury kite safari adventures on catamaran kitesurfing trips across Caribbean, Greece & Sardinia. Book your unforgettable kitesurfing vacation today!",
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
    <>
    <main>
      <Navigation />
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
              luxury catamarans in the <Link href="/destinations/antigua" className="text-coral-orange hover:text-orange-500 font-semibold">Caribbean</Link>, 
              <Link href="/destinations/greece" className="text-coral-orange hover:text-orange-500 font-semibold"> Greece</Link>, and 
              <Link href="/destinations/sardinia" className="text-coral-orange hover:text-orange-500 font-semibold"> Sardinia</Link>. 
              Each destination offers unique wind conditions and cultural experiences perfect for your 
              <Link href="/packages" className="text-coral-orange hover:text-orange-500 font-semibold"> luxury kite safari adventure</Link>.
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
                      <div className="flex gap-3">
                        <Link
                          href="/booking"
                          className="text-sm text-gray-600 hover:text-coral-orange transition-colors"
                        >
                          Book your {destination.name} adventure →
                        </Link>
                        <Link
                          href="/packages"
                          className="text-sm text-gray-600 hover:text-coral-orange transition-colors"
                        >
                          View packages →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <HighlightCards />

      <SardinianAwakeningCTA variant="homepage" />

      <BlogOverview />

      {/* You Might Also Like Section */}
      <section className="py-16 bg-gradient-to-br from-turquoise-50 to-sand-beige-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-4">
              You Might Also Like
            </h2>
            <p className="text-lg text-gray-600 font-open-sans max-w-2xl mx-auto">
              Discover more about our kite safari experiences and prepare for your adventure.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/guides" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-turquoise-200 transition-colors">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">Expert Guides</h3>
                <p className="text-sm text-gray-600 font-open-sans">Learn from IKO certified instructors</p>
              </div>
            </Link>
            <Link href="/faq" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-coral-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-coral-orange/20 transition-colors">
                  <span className="text-2xl">❓</span>
                </div>
                <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">FAQ</h3>
                <p className="text-sm text-gray-600 font-open-sans">Get answers to common questions</p>
              </div>
            </Link>
            <Link href="/reviews" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">Reviews</h3>
                <p className="text-sm text-gray-600 font-open-sans">Read guest experiences</p>
              </div>
            </Link>
            <Link href="/contact" className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">Contact Us</h3>
                <p className="text-sm text-gray-600 font-open-sans">Plan your perfect trip</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <DestinationsMap />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl text-navy mb-4">Kite Safari Experts</h2>
            <p className="font-open-sans text-gray-600 max-w-2xl mx-auto">
              We deliver unforgettable kitesurfing adventures with a perfect track record of reliability and premium
              catamaran experiences. Read our <Link href="/reviews" className="text-coral-orange hover:text-orange-500 font-semibold">guest reviews</Link> and 
              <Link href="/booking" className="text-coral-orange hover:text-orange-500 font-semibold"> book your adventure</Link> today.
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>
    </main>

    {/* kAIte Floating Widget */}
    <KAIteFloatingWidget />
    </>
  )
}
