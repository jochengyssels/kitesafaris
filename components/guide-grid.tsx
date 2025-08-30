"use client"

import { useState } from "react"
import { SmartImage } from "@/components/smart-image"
import Link from "next/link"
import { Clock, User, MapPin, Tag } from "lucide-react"

interface Guide {
  id: string
  title: string
  slug: string
  coverImage: string
  mapSvg: string
  skillLevel: "beginner" | "intermediate" | "advanced"
  readTime: number
  author: string
  summary: string
  tripType: string
  destination?: string
}

const guides: Guide[] = [
  {
    id: "1",
    title: "Launching Kites from Catamarans: Complete Guide",
    slug: "catamaran-kite-launching-guide",
    coverImage: "/kiteboarding-equipment-selection.png",
    mapSvg: "/guide-map-equipment.png",
    skillLevel: "beginner",
    readTime: 8,
    author: "Captain Tomaz Kodelja",
    summary:
      "Master the art of launching kites directly from luxury catamarans with professional guidance and safety protocols for remote Caribbean locations.",
    tripType: "Boat Techniques",
    destination: "antigua",
  },
  {
    id: "7",
    title: "Best Flights from Europe to Antigua for Kite Safaris",
    slug: "../blog/best-flights-europe-antigua-kite-safaris",
    coverImage: "/antigua-jolly-harbor-kiting.png",
    mapSvg: "/guide-map-travel.png",
    skillLevel: "beginner",
    readTime: 15,
    author: "KiteSafaris Travel Team",
    summary:
      "Complete guide to the 10 best flight routes from Europe to Antigua during high season (December-April), including direct flights and one-stop connections with detailed pricing and booking tips.",
    tripType: "Travel Tips",
    destination: "antigua",
  },
  {
    id: "2",
    title: "Antigua's Best Kite Spots: Hansons Bay to Barbuda",
    slug: "antigua-kite-spots-guide",
    coverImage: "/antigua-jolly-harbor-kiting.png",
    mapSvg: "/guide-map-advanced.png",
    skillLevel: "intermediate",
    readTime: 12,
    author: "IKO Certified Instructor",
    summary:
      "Explore Antigua's premier kitesurfing locations from Hansons Bay's flat water to Barbuda's pink beaches, accessible only by catamaran.",
    tripType: "Destinations",
    destination: "antigua",
  },
  {
    id: "3",
    title: "Caribbean Trade Winds: Timing Your Kitesafari",
    slug: "caribbean-trade-winds-guide",
    coverImage: "/antigua-jolly-harbor-kiting.png", // replaced missing wind conditions image with existing Antigua image
    mapSvg: "/guide-map-weather.png",
    skillLevel: "beginner",
    readTime: 10,
    author: "Captain Tomaz Kodelja",
    summary:
      "Understand Caribbean trade wind patterns from December to April for optimal kitesurfing conditions during our Antigua season.",
    tripType: "Weather",
    destination: "antigua",
  },
  {
    id: "4",
    title: "Small Group Safety: Why We Limit to 6 People",
    slug: "small-group-safety-protocols",
    coverImage: "/antigua-jolly-harbor-kiting.png",
    mapSvg: "/guide-map-safety.png",
    skillLevel: "beginner",
    readTime: 6,
    author: "IKO Safety Instructor",
    summary:
      "Learn why our maximum 6-person groups ensure personalized attention, safety, and the best possible kitesafari experience.",
    tripType: "Safety",
    destination: "antigua",
  },
  {
    id: "5",
    title: "Packing for Your Antigua Kitesafari",
    slug: "antigua-packing-essentials",
    coverImage: "/kiteboarding-lesson-turquoise-water.png",
    mapSvg: "/guide-map-basics.png",
    skillLevel: "beginner",
    readTime: 7,
    author: "KiteSafaris Team",
    summary:
      "Complete packing checklist for your 7-day luxury catamaran kitesafari in Antigua, including gear recommendations and what's provided.",
    tripType: "Travel Tips",
    destination: "antigua",
  },
  {
    id: "6",
    title: "Greece & Sardinia: Coming Soon Destinations",
    slug: "upcoming-destinations-preview",
    coverImage: "/greek-aegean-islands-kiteboarding-destination.png",
    mapSvg: "/greece-sardinia-destinations-map-guide.png",
    skillLevel: "intermediate",
    readTime: 9,
    author: "KiteSafaris Team",
    summary:
      "Preview of our upcoming Greece (meltemi winds) and Sardinia (year-round) kitesafari destinations with early booking opportunities.",
    tripType: "Coming Soon",
    destination: "greece",
  },
]

const tripTypes = ["All", "Boat Techniques", "Destinations", "Weather", "Safety", "Travel Tips", "Coming Soon"]
const skillLevels = ["All", "beginner", "intermediate", "advanced"]

export function GuideGrid() {
  const [selectedTripType, setSelectedTripType] = useState("All")
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("All")

  const filteredGuides = guides.filter((guide) => {
    const tripTypeMatch = selectedTripType === "All" || guide.tripType === selectedTripType
    const skillLevelMatch = selectedSkillLevel === "All" || guide.skillLevel === selectedSkillLevel
    return tripTypeMatch && skillLevelMatch
  })

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div>
      {/* Filter Controls */}
      <div className="mb-8 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-navy mb-2 font-montserrat">Filter by Topic:</h3>
          <div className="flex flex-wrap gap-2">
            {tripTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedTripType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTripType === type
                    ? "bg-turquoise text-white"
                    : "bg-white text-navy border border-navy/20 hover:bg-turquoise/10"
                }`}
                aria-pressed={selectedTripType === type}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-navy mb-2 font-montserrat">Filter by Skill Level:</h3>
          <div className="flex flex-wrap gap-2">
            {skillLevels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedSkillLevel(level)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  selectedSkillLevel === level
                    ? "bg-navy text-white"
                    : "bg-white text-navy border border-navy/20 hover:bg-navy/10"
                }`}
                aria-pressed={selectedSkillLevel === level}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuides.map((guide) => (
          <article
            key={guide.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Cover Image */}
            <div className="relative h-48 overflow-hidden">
              <SmartImage
                src={guide.coverImage || "/placeholder.svg"}
                alt={`Cover image for ${guide.title} - kiteboarding guide`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                destination={guide.destination || "caribbean"}
                context={`${guide.tripType.toLowerCase()} ${guide.title.toLowerCase()}`}
                fallbackKeywords={[
                  "kiteboarding",
                  "kitesurfing",
                  guide.destination || "caribbean",
                  guide.tripType.toLowerCase().replace(" ", ""),
                  "catamaran",
                  "sailing",
                ]}
                onReplacement={(newSrc) => {
                  console.log(`[v0] Guide image replaced for "${guide.title}": ${newSrc}`)
                }}
              />
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSkillLevelColor(guide.skillLevel)}`}
                >
                  {guide.skillLevel.charAt(0).toUpperCase() + guide.skillLevel.slice(1)}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-coral-orange text-white px-2 py-1 rounded text-xs font-medium">
                  {guide.tripType}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Illustrated Map SVG Placeholder */}
              <div className="mb-4 h-16 bg-turquoise/10 rounded flex items-center justify-center">
                <MapPin className="w-8 h-8 text-turquoise" />
                <span className="ml-2 text-sm text-turquoise font-medium">KiteSafaris Guide</span>
              </div>

              <h2 className="text-xl font-bold text-navy mb-3 font-montserrat hover:text-turquoise transition-colors">
                <Link href={`/guides/${guide.slug}`} className="block">
                  {guide.title}
                </Link>
              </h2>

              <p className="text-navy/70 mb-4 font-open-sans leading-relaxed">{guide.summary}</p>

              {/* Meta Information */}
              <div className="flex items-center justify-between text-sm text-navy/60 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{guide.readTime} min read</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{guide.author}</span>
                  </div>
                </div>
              </div>

              {/* Destination Link */}
              {guide.destination && (
                <div className="mb-4">
                  <Link
                    href={`/destinations/${guide.destination}`}
                    className="inline-flex items-center text-turquoise hover:text-turquoise/80 text-sm font-medium"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Related Destination
                  </Link>
                </div>
              )}

              {/* Read More Button */}
              <Link
                href={`/guides/${guide.slug}`}
                className="inline-block w-full text-center bg-navy text-white py-3 px-6 rounded-lg hover:bg-navy/90 transition-colors font-medium"
                aria-label={`Read full guide: ${guide.title}`}
              >
                Read Full Guide
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* No Results Message */}
      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <div className="text-navy/60 mb-4">
            <Tag className="w-12 h-12 mx-auto mb-4" />
            <p className="text-lg font-medium">No guides found</p>
            <p className="text-sm">Try adjusting your filters to see more results.</p>
          </div>
        </div>
      )}
    </div>
  )
}
