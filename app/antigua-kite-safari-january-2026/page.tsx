import { Navigation } from "@/components/navigation"
import { TestimonialGrid } from "@/components/testimonial-grid"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Antigua Kite Safari January 2026 | Caribbean Kiteboarding Peak Season",
  description:
    "Book Antigua kite safari January 2026! Peak season Caribbean kiteboarding with perfect trade winds. 7-day luxury catamaran adventures from €1,900. Multiple departures available.",
  keywords:
    "Antigua kite safari January 2026, Caribbean kiteboarding peak season, catamaran kite trip January, book kiteboarding holiday January 2026",
  alternates: {
    canonical: "https://kitesafaris.com/antigua-kite-safari-january-2026",
  },
  openGraph: {
    title: "Antigua Kite Safari January 2026 | Peak Season Caribbean Kiteboarding",
    description:
      "Experience peak season Caribbean kiteboarding in January 2026! Perfect trade winds and luxury catamaran adventures.",
    url: "https://kitesafaris.com/antigua-kite-safari-january-2026",
    images: [
      {
        url: "/antigua-january-kite-safari.jpg",
        width: 1200,
        height: 630,
        alt: "Antigua kite safari January 2026 peak season Caribbean catamaran kiteboarding",
      },
    ],
  },
}

export default function AntiguaJanuary2026Page() {
  const januaryDepartures = [
    { date: "January 4-11, 2026", available: true },
    { date: "January 11-18, 2026", available: true },
    { date: "January 18-25, 2026", available: true },
    { date: "January 25-Feb 1, 2026", available: true },
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
            name: "Antigua Kite Safari January 2026",
            description: "Peak season 7-day luxury catamaran kiteboarding adventures in Antigua & Barbuda",
            startDate: "2026-01-04",
            endDate: "2026-02-01",
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
            src="https://daggzx92agk0rfom.public.blob.vercel-storage.com/antigua:img-catamaran-sailing.jpg"
            alt="Antigua kite safari January 2026 peak season Caribbean catamaran kiteboarding perfect conditions"
            fill
            className="object-cover"
            priority
          />

          <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="font-montserrat text-4xl md:text-6xl font-bold mb-6">
              Antigua Kite Safari
              <br />
              <span className="text-coral-orange">January 2026 - Peak Season</span>
            </h1>
            <p className="font-open-sans text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Experience peak season Caribbean kiteboarding with the most consistent trade winds, perfect weather, and
              ultimate luxury catamaran adventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-coral-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-coral-orange/90 transition-colors"
              >
                Book January Trip - €1,900
              </Link>
              <Link
                href="#departures"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-deep-navy transition-colors"
              >
                View Departures
              </Link>
            </div>
          </div>
        </section>

        {/* Peak Season Benefits */}
        <section className="py-16 bg-sand-beige">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-deep-navy mb-4">
                Why January is Peak Season for Caribbean Kiteboarding
              </h2>
              <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
                January offers the most consistent conditions and perfect weather for your Antigua kite safari.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-coral-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">20-25</span>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">Knot Winds</h3>
                <p className="font-open-sans text-gray-600">
                  Most consistent trade winds of the season, perfect for all skill levels
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">28°C</span>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">Perfect Weather</h3>
                <p className="font-open-sans text-gray-600">
                  Ideal temperatures with minimal rainfall and maximum sunshine
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">95%</span>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">Wind Reliability</h3>
                <p className="font-open-sans text-gray-600">
                  Highest wind consistency rate throughout the Caribbean season
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-deep-navy rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">4</span>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">Weekly Trips</h3>
                <p className="font-open-sans text-gray-600">
                  Multiple departure dates throughout January for maximum flexibility
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* January Departures */}
        <section id="departures" className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-deep-navy mb-4">
                January 2026 Departure Dates
              </h2>
              <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
                Choose your perfect week for the ultimate Caribbean kite safari experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {januaryDepartures.map((departure, index) => (
                <div
                  key={index}
                  className="bg-sand-beige rounded-lg p-6 border-2 border-transparent hover:border-coral-orange transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">{departure.date}</h3>
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
                      <span className="font-open-sans text-gray-600">Max guests:</span>
                      <span className="font-semibold text-deep-navy">6 people</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-open-sans text-gray-600">Includes:</span>
                      <span className="font-semibold text-deep-navy">Everything</span>
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
              Book Your January 2026 Peak Season Adventure
            </h2>
            <p className="font-open-sans text-xl mb-8 max-w-2xl mx-auto">
              January is our most popular month with the best conditions. Secure your spot now for the ultimate
              Caribbean kite safari experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-coral-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-coral-orange/90 transition-colors"
              >
                Book January Trip - €1,900
              </Link>
              <Link
                href="/blog/antigua-kitesafari-packing-guide"
                className="bg-turquoise text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-turquoise/90 transition-colors"
              >
                Packing List Antigua
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
