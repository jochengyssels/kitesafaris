import { Navigation } from "@/components/navigation"
import { TestimonialGrid } from "@/components/testimonial-grid"
import { JsonLd, generateTouristTripSchema } from "@/components/seo/JsonLd"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Antigua Kite Safari December 6-13, 2025 | Book Caribbean Kiteboarding Adventure",
  description:
    "Book your Antigua kite safari December 6-13, 2025! 7-day luxury catamaran kiteboarding adventure from €1,900. Perfect trade winds, expert guides, max 6 guests. Book now!",
  keywords:
    "Antigua kite safari December 2025, Caribbean kiteboarding December 6, catamaran kite trip Antigua, book kiteboarding holiday December",
  alternates: {
    canonical: "https://kitesafaris.com/antigua-kite-safari-december-6-2025",
  },
  openGraph: {
    title: "Antigua Kite Safari December 6-13, 2025 | Caribbean Kiteboarding Adventure",
    description:
      "Book your December 2025 Antigua kite safari! 7-day luxury catamaran adventure with perfect trade winds.",
    url: "https://kitesafaris.com/antigua-kite-safari-december-6-2025",
    images: [
      {
        url: "/antigua-december-kite-safari.jpg",
        width: 1200,
        height: 630,
        alt: "Antigua kite safari December 2025 Caribbean catamaran kiteboarding adventure",
      },
    ],
  },
}

export default function AntiguaDecember6Page() {
  // TouristTrip schema for Antigua December 2025 safari
  const antiguaTripSchema = generateTouristTripSchema({
    name: "Antigua Kite Safari December 6-13, 2025",
    description: "7-day luxury catamaran kiteboarding adventure in Antigua & Barbuda with perfect trade winds and expert guidance",
    destination: "Antigua & Barbuda",
    price: "1900",
    priceCurrency: "EUR",
    duration: "P7D",
    provider: "KiteSafaris",
    url: "https://kitesafaris.com/antigua-kite-safari-december-6-2025",
    image: "/antigua-december-kite-safari.jpg",
    touristType: "Kitesurfing enthusiasts",
    includes: [
      "Luxury catamaran accommodation",
      "Professional IKO certified instructor",
      "All meals and beverages",
      "Rescue boat assistance",
      "Access to remote kite spots",
      "Snorkeling gear and safety equipment"
    ],
    departureDate: "2025-12-06",
    returnDate: "2025-12-13"
  })

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={antiguaTripSchema} />
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/80 to-deep-navy/40 z-10"></div>
          <Image
            src="https://daggzx92agk0rfom.public.blob.vercel-storage.com/antigua:img-catamaran-sunset.jpg"
            alt="Antigua kite safari December 2025 Caribbean catamaran kiteboarding perfect trade winds"
            fill
            className="object-cover"
            priority
          />

          <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="font-montserrat text-4xl md:text-6xl font-bold mb-6">
              Antigua Kite Safari
              <br />
              <span className="text-coral-orange">December 6-13, 2025</span>
            </h1>
            <p className="font-open-sans text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Experience the ultimate Caribbean kiteboarding adventure aboard our luxury catamaran. Perfect trade winds,
              crystal waters, and expert guidance await.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-coral-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-coral-orange/90 transition-colors"
              >
                Book This Trip - €1,900
              </Link>
              <Link
                href="#details"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-deep-navy transition-colors"
              >
                View Itinerary
              </Link>
            </div>
          </div>
        </section>

        {/* Trip Highlights */}
        <section className="py-16 bg-sand-beige">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-deep-navy mb-4">
                December 6-13, 2025 Trip Highlights
              </h2>
              <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
                Peak season conditions with consistent 15-25 knot trade winds and perfect Caribbean weather.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-coral-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">7</span>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">Days</h3>
                <p className="font-open-sans text-gray-600">
                  Saturday to Saturday luxury catamaran experience with 3 double cabins
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">6</span>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">Max Guests</h3>
                <p className="font-open-sans text-gray-600">
                  Small group experience with personalized attention from IKO certified instructors
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">€1,900</span>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">All-Inclusive</h3>
                <p className="font-open-sans text-gray-600">
                  Accommodation, meals, instruction, rescue support, and remote kite spots
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Itinerary */}
        <section id="details" className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-deep-navy mb-4">
                7-Day Antigua Kite Safari Itinerary
              </h2>
              <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
                December 6-13, 2025 - Experience the best kite spots in Antigua & Barbuda
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  day: "Saturday, Dec 6",
                  title: "Arrival & Welcome",
                  description:
                    "Board your luxury catamaran, meet your crew and fellow kiters. Welcome dinner and safety briefing.",
                  location: "Jolly Harbour Marina",
                },
                {
                  day: "Sunday, Dec 7",
                  title: "Hansons Bay",
                  description:
                    "Perfect beginner-friendly conditions with shallow turquoise waters and consistent trade winds.",
                  location: "Hansons Bay, Antigua",
                },
                {
                  day: "Monday, Dec 8",
                  title: "Nonsuch Bay",
                  description:
                    "Advanced kiting in protected bay conditions. Boat launches and rescue support available.",
                  location: "Nonsuch Bay, Antigua",
                },
                {
                  day: "Tuesday, Dec 9",
                  title: "Great Bird Island",
                  description: "Remote island adventure with pristine beaches and excellent wind conditions.",
                  location: "Great Bird Island",
                },
                {
                  day: "Wednesday, Dec 10",
                  title: "Barbuda Exploration",
                  description:
                    "Discover Barbuda's famous pink beaches and untouched kite spots accessible only by catamaran.",
                  location: "Barbuda",
                },
                {
                  day: "Thursday, Dec 11",
                  title: "Codrington Lagoon",
                  description:
                    "Flat water paradise perfect for freestyle and progression in stunning natural surroundings.",
                  location: "Codrington Lagoon, Barbuda",
                },
                {
                  day: "Friday, Dec 12",
                  title: "Final Session & Celebration",
                  description:
                    "Last kiting session at your favorite spot, followed by farewell dinner and celebration.",
                  location: "Best conditions spot",
                },
                {
                  day: "Saturday, Dec 13",
                  title: "Departure",
                  description: "Final breakfast and departure from Jolly Harbour Marina.",
                  location: "Jolly Harbour Marina",
                },
              ].map((day, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-24 h-24 bg-coral-orange rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Day {index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-sand-beige rounded-lg p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="font-montserrat font-bold text-xl text-deep-navy">{day.title}</h3>
                        <span className="font-open-sans text-sm text-turquoise font-medium">{day.day}</span>
                      </div>
                      <p className="font-open-sans text-gray-700 mb-2">{day.description}</p>
                      <p className="font-open-sans text-sm text-gray-500">📍 {day.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="py-16 bg-deep-navy text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-6">
              Ready for Your December 2025 Adventure?
            </h2>
            <p className="font-open-sans text-xl mb-8 max-w-2xl mx-auto">
              Only 6 spots available for this exclusive December 6-13, 2025 departure. Book now to secure your Caribbean
              kite safari experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-coral-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-coral-orange/90 transition-colors"
              >
                Book Now - €1,900 per person
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
