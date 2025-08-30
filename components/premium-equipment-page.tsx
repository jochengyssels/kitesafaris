"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Shield, Zap, Settings, Award, MapPin, Radio, Wrench, ChevronRight } from 'lucide-react'
import { SocialSharing } from "@/components/social-sharing"
import { FeaturePageCrossLinks } from "@/components/feature-page-cross-links"

const equipmentCategories = [
  {
    id: "kites",
    name: "Kites",
    icon: "🪁",
    items: [
      {
        name: "North Kiteboarding Rebel",
        image: "/premium-kite-north-rebel-kiteboarding.png",
        sizes: "5m, 7m, 9m, 12m, 14m",
        features: ["All-terrain performance", "Easy relaunch", "Durable construction"],
        condition: "2024 Model - Excellent",
      },
      {
        name: "Cabrinha Switchblade",
        image: "/cabrinha-switchblade-kite-premium-equipment.png",
        sizes: "6m, 8m, 10m, 12m, 14m",
        features: ["Versatile performance", "Stable flight", "Progressive power"],
        condition: "2024 Model - Excellent",
      },
    ],
  },
  {
    id: "boards",
    name: "Boards",
    icon: "🏄",
    items: [
      {
        name: "North Kiteboarding Pro Series",
        image: "/premium-kiteboard-north-pro-series.png",
        sizes: "134cm, 138cm, 142cm",
        features: ["Carbon construction", "Responsive flex", "Comfortable ride"],
        condition: "2024 Model - Excellent",
      },
      {
        name: "Cabrinha Custom Board",
        image: "/cabrinha-custom-kiteboard-premium.png",
        sizes: "136cm, 140cm, 144cm",
        features: ["Lightweight design", "Superior control", "All-level friendly"],
        condition: "2024 Model - Excellent",
      },
    ],
  },
  {
    id: "safety",
    name: "Safety Gear",
    icon: "🛡️",
    items: [
      {
        name: "Impact Vests",
        image: "/premium-impact-vest-kiteboarding-safety.png",
        sizes: "XS, S, M, L, XL, XXL",
        features: ["CE certified", "Flexible foam", "Secure fit"],
        condition: "Regularly inspected",
      },
      {
        name: "Helmets",
        image: "/kiteboarding-helmet-safety-equipment.png",
        sizes: "S, M, L, XL",
        features: ["Multi-impact protection", "Ventilation system", "Adjustable fit"],
        condition: "Regularly inspected",
      },
    ],
  },
]

const brandPartners = [
  { name: "North Kiteboarding", logo: "/north-kiteboarding-logo.png", specialty: "Kites & Boards" },
  { name: "Cabrinha", logo: "/cabrinha-logo.png", specialty: "Complete Systems" },
  { name: "Mystic", logo: "/mystic-logo.png", specialty: "Harnesses & Wetsuits" },
  { name: "ION", logo: "/ion-logo.png", specialty: "Safety Equipment" },
]

const technologyFeatures = [
  {
    icon: MapPin,
    title: "GPS Tracking",
    description: "Real-time location monitoring for all participants with emergency beacon capability",
  },
  {
    icon: Radio,
    title: "Radio Communication",
    description: "VHF marine radios for constant communication between boats and shore",
  },
  {
    icon: Zap,
    title: "Weather Monitoring",
    description: "Professional weather stations and satellite data for optimal conditions",
  },
  {
    icon: Shield,
    title: "Emergency Systems",
    description: "Comprehensive rescue equipment and emergency response protocols",
  },
]

export function PremiumEquipmentPage() {
  const [selectedCategory, setSelectedCategory] = useState("kites")
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null)

  const currentCategory = equipmentCategories.find((cat) => cat.id === selectedCategory)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-96 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/premium-kiteboarding-equipment-luxury-yacht-deck.png"
            alt="Latest kite gear and premium equipment on luxury catamaran deck"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-deep-navy/40" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6">
          <div className="text-center max-w-4xl">
            <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center justify-center gap-2 text-sm font-open-sans text-turquoise-100">
                <li>
                  <Link href="/" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded px-1">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="w-4 h-4 text-turquoise-200" />
                </li>
                <li className="text-white font-medium" aria-current="page">Premium Equipment</li>
              </ol>
            </nav>

            <h1 className="font-montserrat text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 text-balance">
              Latest Kite Gear
            </h1>
            <p className="font-open-sans text-lg sm:text-xl md:text-2xl text-turquoise-100 mb-6 sm:mb-8 text-pretty px-4">
              Performance Meets Safety - Professional equipment from top brands for the ultimate experience
            </p>

            <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap px-4">
              <div className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <span className="font-montserrat text-white font-medium text-sm sm:text-base">2024 Latest Models</span>
              </div>
              <div className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <span className="font-montserrat text-white font-medium text-sm sm:text-base">Daily Inspections</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Showcase */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-sand-beige to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-deep-navy mb-4">Equipment Showcase</h2>
            <p className="font-open-sans text-base sm:text-lg text-gray-700 max-w-2xl mx-auto px-4">
              Explore our comprehensive collection of premium kiteboarding equipment, maintained to the highest
              standards
            </p>
          </div>

          <div className="flex justify-center mb-8 sm:mb-12 px-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1 sm:p-2 shadow-lg border border-white/40 w-full max-w-2xl">
              <div className="grid grid-cols-3 gap-1 sm:flex sm:justify-center">
                {equipmentCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-montserrat font-medium transition-all duration-300 text-sm sm:text-base min-h-[44px] focus:outline-none focus:ring-2 focus:ring-coral-orange focus:ring-opacity-50 ${
                      selectedCategory === category.id
                        ? "bg-coral-orange text-white shadow-lg"
                        : "text-gray-700 hover:bg-white/60"
                    }`}
                    aria-pressed={selectedCategory === category.id}
                    role="tab"
                    aria-controls={`equipment-panel-${category.id}`}
                  >
                    <span className="mr-1 sm:mr-2" aria-hidden="true">{category.icon}</span>
                    <span className="hidden sm:inline">{category.name}</span>
                    <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
            role="tabpanel"
            id={`equipment-panel-${selectedCategory}`}
            aria-labelledby={`tab-${selectedCategory}`}
          >
            {currentCategory?.items.map((item, index) => (
              <article
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer focus-within:ring-2 focus-within:ring-coral-orange focus-within:ring-opacity-50"
                onClick={() => setSelectedEquipment(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedEquipment(item)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${item.name}`}
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={`${item.name} - Premium kiteboarding equipment`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    Available
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="font-montserrat text-lg sm:text-xl font-bold text-deep-navy mb-2">{item.name}</h3>
                  <p className="font-open-sans text-sm sm:text-base text-gray-600 mb-3">Sizes: {item.sizes}</p>
                  <ul className="space-y-1 mb-4" aria-label="Equipment features">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs sm:text-sm text-gray-700">
                        <div className="w-2 h-2 bg-coral-orange rounded-full mr-2 flex-shrink-0" aria-hidden="true"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-green-600">{item.condition}</span>
                    <span className="text-coral-orange font-medium hover:text-orange-600 transition-colors text-sm">
                      View Details →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Partnerships */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-deep-navy mb-4">Brand Partnerships</h2>
            <p className="font-open-sans text-base sm:text-lg text-gray-700 max-w-2xl mx-auto px-4">
              We partner with the world's leading kiteboarding brands to provide you with the best equipment
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {brandPartners.map((brand, index) => (
              <div key={index} className="text-center group">
                <div className="bg-sand-beige rounded-2xl p-4 sm:p-8 mb-4 group-hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={`${brand.name} logo`}
                      width={60}
                      height={60}
                      className="object-contain w-12 h-12 sm:w-15 sm:h-15"
                    />
                  </div>
                  <h3 className="font-montserrat font-bold text-deep-navy mb-1 sm:mb-2 text-sm sm:text-base">{brand.name}</h3>
                  <p className="font-open-sans text-gray-600 text-xs sm:text-sm">{brand.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-turquoise-blue/10 to-coral-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-deep-navy mb-4">Technology & Safety</h2>
            <p className="font-open-sans text-base sm:text-lg text-gray-700 max-w-2xl mx-auto px-4">
              Advanced technology and safety systems ensure your kiteboarding experience is both thrilling and secure
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {technologyFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg border border-white/40 hover:shadow-xl transition-shadow h-full">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-coral-orange rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="font-montserrat font-bold text-deep-navy mb-2 sm:mb-3 text-sm sm:text-base">{feature.title}</h3>
                    <p className="font-open-sans text-gray-600 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Equipment Care */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-deep-navy mb-4 sm:mb-6">Equipment Care & Maintenance</h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-coral-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-deep-navy mb-1 sm:mb-2 text-base sm:text-lg">Daily Inspections</h3>
                    <p className="font-open-sans text-gray-600 text-sm sm:text-base">
                      All equipment is thoroughly inspected before each use by certified technicians
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-turquoise rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Wrench className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-deep-navy mb-1 sm:mb-2 text-base sm:text-lg">Professional Maintenance</h3>
                    <p className="font-open-sans text-gray-600 text-sm sm:text-base">
                      Regular servicing and replacement following manufacturer guidelines
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-deep-navy mb-1 sm:mb-2 text-base sm:text-lg">Quality Guarantee</h3>
                    <p className="font-open-sans text-gray-600 text-sm sm:text-base">
                      Equipment replacement if performance doesn't meet our high standards
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <Image
                src="/equipment-maintenance-professional-care.png"
                alt="Professional equipment maintenance and care process"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-deep-navy to-turquoise-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">Experience Premium Gear</h2>
          <p className="font-open-sans text-lg sm:text-xl text-turquoise-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Book your kiteboarding safari and experience the difference that professional equipment makes
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-coral-orange text-white font-montserrat font-bold rounded-2xl hover:bg-orange-500 transition-all duration-300 hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 min-h-[44px]"
            >
              Book Your Safari
              <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-sm text-white font-montserrat font-bold rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 min-h-[44px]"
            >
              Ask About Equipment
            </Link>
          </div>
        </div>
      </section>

      {/* Social Sharing Section */}
      <section className="py-6 sm:py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <SocialSharing
              title="Premium Equipment | Latest Kite Gear | KiteSafaris.com"
              description="Latest kite gear where performance meets safety. Professional equipment from top brands for the ultimate kiteboarding safari experience."
              url="https://kitesafaris.com/premium-equipment"
            />
          </div>
        </div>
      </section>

      {/* Cross Links to Other Feature Pages */}
      <FeaturePageCrossLinks currentPage="/premium-equipment" />
    </main>
  )
}
