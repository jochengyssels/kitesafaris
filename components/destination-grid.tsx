"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Wind, Calendar } from "lucide-react"

interface Destination {
  id: string
  name: string
  region: string
  image: string
  windStats: string
  bestSeason: string
  intro: string
  highlights: string[]
  alt: string
  price: string
}

const destinations: Destination[] = [
  {
    id: "antigua",
    name: "Antigua & Barbuda",
    region: "Caribbean",
    image: "/antigua-jolly-harbor-kiting.png",
    windStats: "15-25 knots",
    bestSeason: "Dec - Apr",
    intro: "7-day luxury catamaran kitesafari with consistent trade winds and protected bays.",
    highlights: [
      "Hansons Bay flat water",
      "Nonsuch Bay & Green Island",
      "Great Bird Island wildlife",
      "Barbuda pink beaches",
    ],
    alt: "Kiteboarders in Antigua's protected bays with consistent Caribbean trade winds",
    price: "€1,900",
  },
  {
    id: "greece",
    name: "Aegean Islands",
    region: "Greece",
    image: "/greek-aegean-islands-kiteboarding-meltemi-winds.png",
    windStats: "15-25 knots",
    bestSeason: "Jun - Sep",
    intro: "Experience the ultimate kitesurfing adventure with consistent meltemi winds and pristine islands.",
    highlights: ["Daily meltemi breezes", "Secluded bays & lagoons", "Warm Aegean waters", "Mediterranean culture"],
    alt: "Kiteboarding in the Greek Aegean islands with meltemi winds and ancient culture",
    price: "Coming Soon",
  },
  {
    id: "sardinia",
    name: "Punta Trettu",
    region: "Sardinia",
    image: "/sardinia-punta-trettu-kiteboarding-mediterranean-c.png",
    windStats: "12-22 knots",
    bestSeason: "All Year",
    intro: "Year-round kitesurfing from our home base location with consistent conditions and easy launches.",
    highlights: ["Year-round conditions", "Home base location", "Comfortable launches", "Mediterranean lifestyle"],
    alt: "Kiteboarding at Punta Trettu Sardinia with year-round conditions and Mediterranean charm",
    price: "Coming Soon",
  },
]

export function DestinationGrid() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {destinations.map((destination) => (
        <div
          key={destination.id}
          className="bg-sand-beige rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
          onMouseEnter={() => setHoveredCard(destination.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={destination.image || "/placeholder.svg"}
              alt={destination.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {hoveredCard === destination.id && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
                <div className="text-white text-center p-4">
                  <h4 className="font-montserrat font-semibold mb-2">Trip Highlights</h4>
                  <ul className="font-open-sans text-sm space-y-1">
                    {destination.highlights.map((highlight, index) => (
                      <li key={index}>• {highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-turquoise font-montserrat mb-2">{destination.name}</h3>
            <p className="text-deep-navy font-montserrat text-sm mb-3">{destination.region}</p>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-deep-navy" />
                <span className="text-sm font-open-sans text-gray-700">{destination.windStats}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-deep-navy" />
                <span className="text-sm font-open-sans text-gray-700">{destination.bestSeason}</span>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-sm font-open-sans text-gray-600">From: </span>
              <span className="text-lg font-bold text-coral-orange font-montserrat">{destination.price}</span>
            </div>

            <p className="text-gray-600 font-open-sans text-sm mb-6 leading-relaxed">{destination.intro}</p>

            <Link href={`/destinations/${destination.id}`} className="block">
              <button className="w-full bg-deep-navy text-white font-montserrat font-semibold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-deep-navy focus:ring-offset-2">
                View Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
