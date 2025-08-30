"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Check,
  X,
  Star,
  Calendar,
  Anchor,
  Wind,
  MapPin,
  Camera,
  Utensils,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"

interface PackageType {
  id: string
  name: string
  description: string
  inclusions: string[]
  exclusions: string[]
  upgrades: { name: string; price: string }[]
  pricing: { duration: string; price: string; originalPrice?: string }[]
  itinerary: {
    day: number
    title: string
    description: string
    image: string
    activities: string[]
  }[]
}

const packages: PackageType[] = [
  {
    id: "antigua-safari",
    name: "Antigua Kitesafari",
    description:
      "7-day luxury catamaran kitesafari in Antigua & Barbuda with consistent trade winds and protected bays.",
    inclusions: [
      "7-day luxury catamaran accommodation",
      "Professional IKO certified instructor",
      "All meals and snacks included",
      "Rescue boat surveillance and assistance",
      "Launch kites directly from the boat",
      "Snorkeling gear and water activities",
      "Yacht fuel and marina fees",
      "Safety equipment and briefings",
      "Limited to 6 spots maximum",
      "Caribbean trade wind guarantee",
    ],
    exclusions: [
      "Kite equipment rental (available)",
      "Individual coaching sessions",
      "Alcoholic beverages",
      "Crew gratuity (recommended)",
      "International flights to Antigua",
      "Travel insurance",
    ],
    upgrades: [
      { name: "Equipment Package", price: "+€200/week" },
      { name: "Private Coaching", price: "+€300/week" },
      { name: "Premium Cabin", price: "+€150/week" },
    ],
    pricing: [{ duration: "7 Days", price: "€1,900", originalPrice: "€2,100" }],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Yacht Orientation",
        description: "Welcome aboard, safety briefing, equipment setup, and first anchorage.",
        image: "/antigua-jolly-harbor-kiting.png",
        activities: ["Yacht boarding", "Safety briefing", "Equipment setup", "Welcome dinner"],
      },
      {
        day: 2,
        title: "Hansons Bay Session",
        description: "Flat-water playground on northwest coast, ideal for beginners and freestyle sessions.",
        image: "/kiteboarding-lesson-turquoise-water.png",
        activities: ["Flat water kiting", "Freestyle practice", "Boat launches", "Snorkeling"],
      },
      {
        day: 3,
        title: "Nonsuch Bay & Green Island",
        description: "Protected by reef with butter-flat water and scenic green hills - perfect for learning tricks.",
        image: "/advanced-kiteboarding-jumping.png",
        activities: ["Protected bay kiting", "Trick progression", "Island exploration", "Wildlife watching"],
      },
      {
        day: 4,
        title: "Great Bird Island",
        description: "Remote and reef-protected with turquoise water, wildlife, and stunning sunsets.",
        image: "/private-yacht-champagne-welcome.png",
        activities: ["Remote spot access", "Sea turtle watching", "Sunset kiting", "Beach exploration"],
      },
      {
        day: 5,
        title: "Barbuda Adventure",
        description: "Coco Point shallow waters and Spanish Point wilder conditions with endless space.",
        image: "/secluded-kiteboarding-lagoon.png",
        activities: ["Shallow water kiting", "Pink beach visit", "Advanced conditions", "Photography"],
      },
      {
        day: 6,
        title: "Codrington Lagoon",
        description: "Large shallow lagoon with safe conditions and steady wind - great for progression.",
        image: "/group-welcome-dinner-yacht.png",
        activities: ["Lagoon sessions", "Skill progression", "Group activities", "Cultural exploration"],
      },
      {
        day: 7,
        title: "Falmouth Harbor Farewell",
        description: "Historic harbor near Nelson's Dockyard with cultural exploration and departure.",
        image: "/group-kiteboarding-session.png",
        activities: ["Final session", "Cultural tour", "Farewell dinner", "Departure prep"],
      },
    ],
  },
  {
    id: "greece-safari",
    name: "Greece Kitesafari",
    description:
      "Ultimate kitesurfing adventure in Greece with pristine islands, consistent meltemi winds, and boutique catamaran comfort.",
    inclusions: [
      "Luxury catamaran accommodation",
      "Professional guide and safety support",
      "Daily meltemi wind sessions",
      "Secluded bays and lagoons access",
      "Warm Aegean water launches",
      "Fresh Greek cuisine onboard",
      "Cultural Mediterranean evenings",
      "Snorkeling and water activities",
      "Small group experience",
    ],
    exclusions: [
      "Kite equipment rental",
      "Individual lessons",
      "Shore excursions",
      "Alcoholic beverages",
      "Flights to Greece",
      "Travel insurance",
    ],
    upgrades: [
      { name: "Equipment Package", price: "Quote on request" },
      { name: "Private Instruction", price: "Quote on request" },
      { name: "Cultural Tours", price: "Quote on request" },
    ],
    pricing: [{ duration: "Coming Soon", price: "Contact Us" }],
    itinerary: [
      {
        day: 1,
        title: "Athens to Aegean Islands",
        description: "Transfer to catamaran and sail to first kite spot with meltemi wind briefing.",
        image: "/custom-arrival-experience.png",
        activities: ["Athens transfer", "Catamaran boarding", "Meltemi briefing", "First anchorage"],
      },
    ],
  },
  {
    id: "sardinia-safari",
    name: "Sardinia Kitesafari",
    description:
      "Year-round kitesurfing from our home base at Punta Trettu with consistent conditions and Mediterranean lifestyle.",
    inclusions: [
      "Home base accommodation",
      "Year-round conditions access",
      "Local wind pattern expertise",
      "Comfortable launch facilities",
      "Mediterranean lifestyle experience",
      "Professional safety support",
      "Equipment storage facilities",
      "Cultural immersion activities",
    ],
    exclusions: [
      "Kite equipment rental",
      "Accommodation upgrades",
      "Meals (local restaurants available)",
      "Transportation",
      "Travel insurance",
    ],
    upgrades: [
      { name: "Equipment Package", price: "Quote on request" },
      { name: "Accommodation Upgrade", price: "Quote on request" },
      { name: "Meal Package", price: "Quote on request" },
    ],
    pricing: [{ duration: "Coming Soon", price: "Contact Us" }],
    itinerary: [
      {
        day: 1,
        title: "Punta Trettu Welcome",
        description: "Arrival at our home base with local conditions briefing and equipment setup.",
        image: "/custom-arrival-experience.png",
        activities: ["Base arrival", "Local briefing", "Equipment setup", "Welcome session"],
      },
    ],
  },
]

export function PackageTabs() {
  const [activeTab, setActiveTab] = useState("antigua-safari")
  const [expandedDays, setExpandedDays] = useState<number[]>([])
  const activePackage = packages.find((pkg) => pkg.id === activeTab)!

  const toggleDayExpansion = (dayNumber: number) => {
    setExpandedDays((prev) => (prev.includes(dayNumber) ? prev.filter((d) => d !== dayNumber) : [...prev, dayNumber]))
  }

  const getActivityIcon = (day: number, title: string) => {
    if (title.toLowerCase().includes("arrival") || title.toLowerCase().includes("orientation")) return Anchor
    if (title.toLowerCase().includes("session") || title.toLowerCase().includes("kiting")) return Wind
    if (title.toLowerCase().includes("island") || title.toLowerCase().includes("bay")) return MapPin
    if (title.toLowerCase().includes("adventure") || title.toLowerCase().includes("exploration")) return Camera
    if (title.toLowerCase().includes("dinner") || title.toLowerCase().includes("farewell")) return Utensils
    if (title.toLowerCase().includes("group") || title.toLowerCase().includes("lagoon")) return Users
    return Wind // Default to wind icon
  }

  const getDayName = (dayNumber: number) => {
    const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    return days[(dayNumber - 1) % 7]
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Vertical Tabs */}
      <div className="lg:w-1/4">
        <div className="space-y-2">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setActiveTab(pkg.id)}
              className={`w-full text-left p-4 rounded-lg transition-all duration-300 border-l-4 ${
                activeTab === pkg.id
                  ? "bg-deep-navy text-white border-turquoise shadow-lg"
                  : "bg-sand-beige text-deep-navy border-transparent hover:border-gold hover:shadow-md"
              }`}
            >
              <h3 className="font-montserrat font-semibold text-lg mb-1">{pkg.name}</h3>
              <p className="font-open-sans text-sm opacity-80">{pkg.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="lg:w-3/4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-turquoise to-turquoise/80 text-white p-6">
            <h2 className="font-montserrat font-bold text-3xl mb-2">{activePackage.name} Package</h2>
            <p className="font-open-sans text-lg opacity-90">{activePackage.description}</p>
          </div>

          <div className="p-6 space-y-8">
            {/* Pricing Preview */}
            <div className="bg-sand-beige rounded-lg p-6">
              <h3 className="font-montserrat font-semibold text-xl mb-4 text-deep-navy">Pricing Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activePackage.pricing.map((option, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 text-center border-2 border-transparent hover:border-turquoise transition-colors"
                  >
                    <div className="font-montserrat font-semibold text-lg text-deep-navy">{option.duration}</div>
                    <div className="font-montserrat font-bold text-2xl text-turquoise mt-2">{option.price}</div>
                    {option.originalPrice && (
                      <div className="font-open-sans text-sm text-gray-500 line-through">{option.originalPrice}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-montserrat font-semibold text-xl mb-4 text-deep-navy flex items-center">
                  <Check className="w-5 h-5 text-turquoise mr-2" />
                  Included
                </h3>
                <ul className="space-y-2">
                  {activePackage.inclusions.map((item, index) => (
                    <li key={index} className="font-open-sans flex items-start">
                      <Check className="w-4 h-4 text-turquoise mr-2 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-montserrat font-semibold text-xl mb-4 text-deep-navy flex items-center">
                  <X className="w-5 h-5 text-coral-orange mr-2" />
                  Not Included
                </h3>
                <ul className="space-y-2">
                  {activePackage.exclusions.map((item, index) => (
                    <li key={index} className="font-open-sans flex items-start">
                      <X className="w-4 h-4 text-coral-orange mr-2 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Upgrade Options */}
            <div>
              <h3 className="font-montserrat font-semibold text-xl mb-4 text-deep-navy flex items-center">
                <Star className="w-5 h-5 text-gold mr-2" />
                Available Upgrades
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activePackage.upgrades.map((upgrade, index) => (
                  <div key={index} className="bg-sand-beige rounded-lg p-4 border-l-4 border-gold">
                    <div className="font-montserrat font-semibold text-deep-navy">{upgrade.name}</div>
                    <div className="font-open-sans text-gold font-semibold mt-1">{upgrade.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Itinerary */}
            <div>
              <h3 className="font-montserrat font-semibold text-xl mb-6 text-deep-navy flex items-center">
                <Calendar className="w-5 h-5 text-turquoise mr-2" />
                Sample Itinerary
              </h3>
              <div className="relative">
                <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-gradient-to-b from-turquoise via-coral-orange to-gold hidden md:block"></div>
                <div className="space-y-6">
                  {activePackage.itinerary.map((day, index) => {
                    const IconComponent = getActivityIcon(day.day, day.title)
                    const isExpanded = expandedDays.includes(day.day)
                    const dayName = getDayName(day.day)

                    return (
                      <div
                        key={index}
                        className="relative group"
                        role="article"
                        aria-labelledby={`day-${day.day}-title`}
                      >
                        <div className="absolute left-12 top-8 w-8 h-8 bg-white border-4 border-turquoise rounded-full z-10 hidden md:flex items-center justify-center group-hover:border-coral-orange transition-colors duration-300">
                          <div className="w-2 h-2 bg-turquoise rounded-full group-hover:bg-coral-orange transition-colors duration-300"></div>
                        </div>
                        <div className="md:ml-24 bg-gradient-to-br from-white to-sand-beige/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-sand-beige/50 hover:border-turquoise/30">
                          <div
                            className="p-6 cursor-pointer"
                            onClick={() => toggleDayExpansion(day.day)}
                            role="button"
                            tabIndex={0}
                            aria-expanded={isExpanded}
                            aria-controls={`day-${day.day}-content`}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault()
                                toggleDayExpansion(day.day)
                              }
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div
                                  className="w-16 h-16 bg-gradient-to-br from-turquoise to-turquoise/80 rounded-full flex items-center justify-center shadow-lg group-hover:from-coral-orange group-hover:to-coral-orange/80 transition-all duration-300"
                                  title={`${day.title} activities`}
                                >
                                  <IconComponent className="w-8 h-8 text-white" aria-hidden="true" />
                                </div>
                                <div>
                                  <div className="bg-gradient-to-r from-coral-orange to-coral-orange/80 text-white px-4 py-1 rounded-full inline-block mb-2">
                                    <span className="font-montserrat font-bold text-sm">
                                      Day {day.day} • {dayName}
                                    </span>
                                  </div>
                                  <h4
                                    id={`day-${day.day}-title`}
                                    className="font-montserrat font-bold text-xl text-deep-navy group-hover:text-turquoise transition-colors duration-300"
                                  >
                                    {day.title}
                                  </h4>
                                  <p className="font-open-sans text-gray-600 mt-1 line-clamp-2">{day.description}</p>
                                </div>
                              </div>
                              <div className="text-turquoise group-hover:text-coral-orange transition-colors duration-300">
                                {isExpanded ? (
                                  <ChevronUp className="w-6 h-6" aria-hidden="true" />
                                ) : (
                                  <ChevronDown className="w-6 h-6" aria-hidden="true" />
                                )}
                              </div>
                            </div>
                          </div>
                          <div
                            id={`day-${day.day}-content`}
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${
                              isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="px-6 pb-6">
                              <div className="border-t border-sand-beige pt-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                                    <Image
                                      src={
                                        day.image || "/placeholder.svg?height=200&width=300&query=kiteboarding activity"
                                      }
                                      alt={`${day.title} - Day ${day.day} kiteboarding safari activity showing ${day.activities.join(", ")}`}
                                      fill
                                      className="object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                  </div>
                                  <div className="space-y-4">
                                    <div>
                                      <h5 className="font-montserrat font-semibold text-deep-navy mb-2">
                                        Full Description
                                      </h5>
                                      <p className="font-open-sans text-gray-700 leading-relaxed">
                                        {day.description} Experience the perfect blend of adventure and relaxation as
                                        you explore this unique location with expert guidance and top-quality equipment.
                                      </p>
                                    </div>
                                    <div>
                                      <h5 className="font-montserrat font-semibold text-deep-navy mb-3">
                                        Activities & Highlights
                                      </h5>
                                      <div className="grid grid-cols-2 gap-2">
                                        {day.activities.map((activity, actIndex) => (
                                          <div
                                            key={actIndex}
                                            className="bg-white px-3 py-2 rounded-lg text-sm font-open-sans text-deep-navy border border-turquoise/20 hover:border-turquoise/50 transition-colors duration-200 flex items-center"
                                          >
                                            <div className="w-2 h-2 bg-turquoise rounded-full mr-2 flex-shrink-0"></div>
                                            {activity}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="md:ml-24 mt-6 text-center">
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gold to-gold/80 text-white rounded-full font-montserrat font-semibold shadow-lg">
                    <Star className="w-5 h-5 mr-2" />
                    End of Safari Adventure
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-6 border-t border-gray-200">
              <Link href="/booking">
                <button className="bg-coral-orange hover:bg-coral-orange/90 text-white font-montserrat font-semibold px-8 py-4 rounded-lg transition-colors duration-300 text-lg">
                  Book {activePackage.name} Package
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
