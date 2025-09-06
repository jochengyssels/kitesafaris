import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import HighlightCards from "@/components/highlight-cards"
import DestinationsMap from "@/components/destinations-map"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { SardinianAwakeningCTA } from "@/components/sardinian-awakening-cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Caribbean Kite Safari | Luxury Catamaran Kiteboarding Adventures | KiteSafaris",
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
    </main>
  )
}
