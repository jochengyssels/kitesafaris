import { Navigation } from "@/components/navigation"
import { TestimonialGrid } from "@/components/testimonial-grid"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Antigua Kite Safari February 2026 | Valentine's Caribbean Kiteboarding",
  description:
    "Book Antigua kite safari February 2026! Perfect for couples and Valentine's getaways. 7-day luxury catamaran kiteboarding adventures from €1,900. Romantic Caribbean escape.",
  keywords:
    "Antigua kite safari February 2026, Valentine's kiteboarding Caribbean, couples kite safari, romantic catamaran trip Antigua, February kiteboarding holiday",
  alternates: {
    canonical: "https://kitesafaris.com/antigua-kite-safari-february-2026",
  },
  openGraph: {
    title: "Antigua Kite Safari February 2026 | Valentine's Caribbean Kiteboarding",
    description:
      "Perfect Valentine's escape! February 2026 Antigua kite safari with luxury catamaran adventures and romantic Caribbean sunsets.",
    url: "https://kitesafaris.com/antigua-kite-safari-february-2026",
    images: [
      {
        url: "/antigua-february-valentines-kite-safari.jpg",
        width: 1200,
        height: 630,
        alt: "Antigua kite safari February 2026 Valentine's romantic Caribbean catamaran kiteboarding",
      },
    ],
  },
}

export default function AntiguaFebruary2026Page() {
  const februaryDepartures = [
    { date: "February 1-8, 2026", theme: "New Month Adventure", available: true },
    { date: "February 8-15, 2026", theme: "Valentine's Special", available: true },
    { date: "February 15-22, 2026", theme: "Post-Valentine's Escape", available: true },
    { date: "February 22-Mar 1, 2026", theme: "End of February", available: true },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EventSeries",
            name: "Antigua Kite Safari February 2026",
            description:
              "Romantic Valentine's themed 7-day luxury catamaran kiteboarding adventures in Antigua & Barbuda",
            startDate: "2026-02-01",
            endDate: "2026-03-01",
            location: {
              "@type": "Place",
              name: "Antigua & Barbuda",
              geo: {
                "@type": "GeoCoordinates",
                latitude: 17.0608,
                longitude: -61.7964,
              },
            },
            offers: {
              "@type": "Offer",
              price: "1900",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              url: "https://kitesafaris.com/booking",
            },
          }),
        }}
      />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/80 to-deep-navy/40 z-10"></div>
          <Image
            src="https://daggzx92agk0rfom.public.blob.vercel-storage.com/antigua:img-catamaran-sunset.jpg"
            alt="Antigua kite safari February 2026 Valentine's romantic Caribbean catamaran kiteboarding sunset"
            fill
            className="object-cover"
            priority
          />

          <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="font-montserrat text-4xl md:text-6xl font-bold mb-6">
              Antigua Kite Safari
              <br />
              <span className="text-coral-orange">February 2026 - Valentine's Special</span>
            </h1>
            <p className="font-open-sans text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Perfect for couples seeking adventure and romance. Experience Caribbean kiteboarding with stunning
              sunsets, luxury accommodations, and unforgettable moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-coral-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-coral-orange/90 transition-colors"
              >
                Book Valentine's Trip - €1,900
              </Link>
              <Link
                href="#romantic-features"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-deep-navy transition-colors"
              >
                Romantic Features
              </Link>
            </div>
          </div>
        </section>

        {/* Romantic Features */}
        <section id="romantic-features" className="py-16 bg-sand-beige">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-deep-navy mb-4">
                Perfect Valentine's Caribbean Escape
              </h2>
              <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
                February combines perfect kiteboarding conditions with romantic Caribbean ambiance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-coral-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💕</span>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">Couples Friendly</h3>
                <p className="font-open-sans text-gray-600">
                  Private double cabins perfect for couples, with romantic sunset sailing
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🌅</span>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">Stunning Sunsets</h3>
                <p className="font-open-sans text-gray-600">
                  February offers the most spectacular Caribbean sunsets of the season
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🥂</span>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">Special Dinners</h3>
                <p className="font-open-sans text-gray-600">
                  Romantic candlelit dinners on deck under the Caribbean stars
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-deep-navy rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🏝️</span>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">Private Beaches</h3>
                <p className="font-open-sans text-gray-600">
                  Secluded beaches and lagoons accessible only by catamaran
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-coral-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🪁</span>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">Perfect Conditions</h3>
                <p className="font-open-sans text-gray-600">
                  Consistent 18-22 knot trade winds ideal for couples learning together
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📸</span>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">Photo Memories</h3>
                <p className="font-open-sans text-gray-600">
                  Professional photos of your romantic Caribbean adventure included
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* February Departures */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-deep-navy mb-4">
                February 2026 Romantic Departures
              </h2>
              <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
                Choose your perfect romantic week in the Caribbean paradise.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {februaryDepartures.map((departure, index) => (
                <div
                  key={index}
                  className="bg-sand-beige rounded-lg p-6 border-2 border-transparent hover:border-coral-orange transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-1">{departure.date}</h3>
                      <p className="font-open-sans text-coral-orange font-medium mb-2">{departure.theme}</p>
                      <p className="font-open-sans text-gray-600">7-day luxury catamaran experience</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        departure.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {departure.available ? "Available" : "Sold Out"}
                    </span>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="font-open-sans text-gray-600">Price per person:</span>
                      <span className="font-semibold text-coral-orange">€1,900</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-open-sans text-gray-600">Perfect for:</span>
                      <span className="font-semibold text-deep-navy">Couples</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-open-sans text-gray-600">Special features:</span>
                      <span className="font-semibold text-deep-navy">Romance included</span>
                    </div>
                  </div>

                  <Link
                    href="/booking"
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                      departure.available
                        ? "bg-coral-orange text-white hover:bg-coral-orange/90"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {departure.available ? "Book This Date" : "Sold Out"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="py-16 bg-deep-navy text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-6">
              Create Unforgettable Valentine's Memories
            </h2>
            <p className="font-open-sans text-xl mb-8 max-w-2xl mx-auto">
              February offers the perfect blend of adventure and romance in the Caribbean. Book your couples' kite
              safari for an unforgettable Valentine's experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-coral-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-coral-orange/90 transition-colors"
              >
                Book Valentine's Trip - €1,900
              </Link>
              <Link
                href="https://wa.me/32492576427"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-deep-navy transition-colors"
              >
                WhatsApp Questions
              </Link>
            </div>
          </div>
        </section>

        <TestimonialGrid />
      </main>
    </div>
  )
}
