import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import HighlightCards from "@/components/highlight-cards"
import DestinationsMap from "@/components/destinations-map"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { InstagramFeed } from "@/components/instagram-feed"
import { SardinianAwakeningCTA } from "@/components/sardinian-awakening-cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Caribbean Kite Safari Antigua | Book Luxury Catamaran Kiteboarding Adventures",
  description:
    "Experience the ultimate Caribbean kite safari in Antigua! 7-day luxury catamaran kiteboarding trips from €1,900. Saturday departures Dec 2025-Apr 2026. Book now!",
  alternates: {
    canonical: "https://kitesafaris.com",
  },
}

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Caribbean Kite Safari Antigua",
            description:
              "7-day luxury catamaran kiteboarding adventure in Antigua with expert guides and premium equipment",
            brand: {
              "@type": "Brand",
              name: "KiteSafaris.com",
            },
            offers: {
              "@type": "Offer",
              price: "1900",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              validFrom: "2025-12-06",
              validThrough: "2026-04-26",
              url: "https://kitesafaris.com/booking",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "127",
            },
          }),
        }}
      />
      <HeroSection />
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
        </div>
      </section>
      <InstagramFeed />
    </main>
  )
}
