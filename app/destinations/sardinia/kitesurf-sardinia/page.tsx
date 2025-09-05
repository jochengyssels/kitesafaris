import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SardiniaPartnerSchools } from "@/components/sardinia-partner-schools"
import Link from "next/link"
import { Wind, MapPin, Clock, Users, Award, Star, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Kitesurf Sardinia | Best Kitesurfing Destination in Italy - KiteSafaris",
  description: "Discover why Sardinia is Italy's premier kitesurfing destination. Punta Trettu offers perfect conditions for all levels with consistent winds, flat water, and professional instruction April-October.",
  keywords: [
    "kitesurf Sardinia",
    "kitesurfing Sardinia",
    "Sardinia kitesurfing",
    "kitesurf Italy",
    "kitesurfing Italy",
    "Sardinia kiteboarding",
    "kitesurf Mediterranean",
    "kitesurfing Mediterranean",
    "Sardinia wind conditions",
    "kitesurf spots Sardinia"
  ].join(", "),
  openGraph: {
    title: "Kitesurf Sardinia | Best Kitesurfing Destination in Italy",
    description: "Experience world-class kitesurfing in Sardinia at Punta Trettu. Perfect conditions for all levels with consistent winds and professional instruction.",
    images: [
      {
        url: "https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png",
        width: 1200,
        height: 630,
        alt: "Kitesurfing Sardinia Punta Trettu Mediterranean conditions",
      },
    ],
  },
  twitter: {
    title: "Kitesurf Sardinia | Best Kitesurfing Destination in Italy",
    description: "Kitesurf in Sardinia at Punta Trettu! Perfect conditions, consistent winds, professional instruction. Italy's premier kitesurfing destination.",
    images: ["https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png"],
  },
  alternates: {
    canonical: "https://kitesafaris.com/destinations/sardinia/kitesurf-sardinia",
  },
}

const spotData = [
  {
    name: "Punta Trettu",
    location: "San Giovanni Suergiu",
    type: "Flat Water Lagoon",
    difficulty: "All Levels",
    wind: "12-22 knots",
    season: "April - October",
    description: "Sardinia's premier kitesurfing destination with flat shallow water perfect for beginners and advanced riders alike."
  },
  {
    name: "Porto Pollo",
    location: "Palau",
    type: "Flat Water Lagoon",
    difficulty: "Beginner to Intermediate",
    wind: "15-25 knots",
    season: "May - September",
    description: "Famous flat water spot in northern Sardinia, popular for freestyle and learning with consistent thermal winds."
  },
  {
    name: "Chia",
    location: "Domus de Maria",
    type: "Beach Break",
    difficulty: "Intermediate to Advanced",
    wind: "10-20 knots",
    season: "April - October",
    description: "Beautiful beach break with waves and flat water sections, offering variety for different riding styles."
  }
]

const faqData = [
  {
    question: "Why is Sardinia considered one of the best kitesurfing destinations in Europe?",
    answer: "Sardinia offers exceptional kitesurfing conditions with consistent thermal winds, warm Mediterranean waters, and diverse spots suitable for all skill levels. The island's geography creates reliable wind patterns, while spots like Punta Trettu provide flat water conditions that are perfect for learning and progression. The 7-month season from April to October ensures excellent conditions throughout most of the year."
  },
  {
    question: "What wind conditions can I expect when kitesurfing in Sardinia?",
    answer: "Sardinia benefits from reliable thermal winds that typically blow from northwest and southwest directions. Wind speeds average 12-25 knots depending on the location and season, with the strongest winds occurring in the afternoon. The island's topography creates consistent wind patterns that are predictable and perfect for kitesurfing, making it an ideal destination for both learning and advanced riding."
  },
  {
    question: "When is the best time to kitesurf in Sardinia?",
    answer: "The optimal kitesurfing season in Sardinia runs from April to October, with peak conditions from May to September. During these months, you'll experience consistent thermal winds, warm water temperatures (20-26°C), and stable weather conditions. July and August offer the most reliable wind patterns, while April-May and September-October provide comfortable temperatures with fewer crowds."
  },
  {
    question: "What makes Punta Trettu special for kitesurfing?",
    answer: "Punta Trettu is Sardinia's crown jewel for kitesurfing, offering a unique combination of flat shallow water, consistent winds, and beginner-friendly conditions. The lagoon is protected from waves, making it perfect for learning kitesurfing techniques safely. The water depth rarely exceeds waist height, providing confidence for beginners while still offering enough space for advanced riders to practice and progress."
  },
  {
    question: "Are there kitesurfing schools and equipment rental in Sardinia?",
    answer: "Yes, Sardinia has several professional kitesurfing schools, particularly at Punta Trettu, including PROKITE SARDEGNA and KITEHOUSE SARDINIA. These schools offer comprehensive courses for all levels, from complete beginners to advanced riders. All necessary equipment is available for rent, including kites, boards, harnesses, and safety gear. KiteSafaris has exclusive partnerships with leading schools, providing special discounts and priority booking."
  },
  {
    question: "What should I pack for a kitesurfing trip to Sardinia?",
    answer: "For kitesurfing in Sardinia, pack lightweight clothing for warm weather, a wetsuit for early/late season sessions, sun protection (hat, sunglasses, sunscreen), and comfortable beachwear. Most kitesurfing equipment is available for rent at the schools, so you don't need to bring your own gear unless you prefer it. Don't forget your camera to capture the beautiful Mediterranean scenery!"
  }
]

export default function KitesurfSardiniaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Kitesurf Sardinia | Best Kitesurfing Destination in Italy",
    "description": "Discover why Sardinia is Italy's premier kitesurfing destination. Punta Trettu offers perfect conditions for all levels with consistent winds and professional instruction.",
    "url": "https://kitesafaris.com/destinations/sardinia/kitesurf-sardinia",
    "mainEntity": {
      "@type": "Place",
      "name": "Sardinia",
      "description": "Italy's premier kitesurfing destination with world-class conditions at Punta Trettu",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Sardinia",
        "addressCountry": "Italy"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://kitesafaris.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Destinations",
          "item": "https://kitesafaris.com/destinations"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Sardinia",
          "item": "https://kitesafaris.com/destinations/sardinia"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Kitesurf Sardinia",
          "item": "https://kitesafaris.com/destinations/sardinia/kitesurf-sardinia"
        }
      ]
    }
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <div className="min-h-screen bg-white">
        <Navigation />
        
        {/* Breadcrumb */}
        <div className="pt-20 pb-4 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-deep-navy">Home</Link>
              <span className="text-gray-400">/</span>
              <Link href="/destinations" className="text-gray-500 hover:text-deep-navy">Destinations</Link>
              <span className="text-gray-400">/</span>
              <Link href="/destinations/sardinia" className="text-gray-500 hover:text-deep-navy">Sardinia</Link>
              <span className="text-gray-400">/</span>
              <span className="text-deep-navy font-medium">Kitesurf Sardinia</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-deep-navy via-turquoise to-sand-beige text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-bold mb-6">
                Kitesurf Sardinia
              </h1>
              <p className="text-xl sm:text-2xl font-open-sans mb-8 leading-relaxed">
                Italy's Premier Kitesurfing Destination
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Wind className="w-5 h-5" />
                  <span className="font-medium">Consistent Thermal Winds</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Multiple World-Class Spots</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">7-Month Season</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Introduction */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Why Sardinia is Europe's Kitesurfing Paradise
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Sardinia has emerged as one of Europe's most sought-after kitesurfing destinations, offering an exceptional combination of natural beauty, consistent wind conditions, and diverse riding opportunities. This Mediterranean gem provides kitesurfers with everything they need for an unforgettable experience, from beginner-friendly flat water lagoons to challenging wave spots for advanced riders.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The island's unique geography creates reliable thermal wind patterns that make Sardinia a predictable and safe destination for kitesurfing. Unlike many coastal areas that suffer from inconsistent or gusty winds, Sardinia's wind conditions are remarkably stable, providing the perfect environment for learning, progression, and advanced riding techniques.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    At the heart of Sardinia's kitesurfing scene lies Punta Trettu, a world-class flat water lagoon that has become synonymous with beginner-friendly kitesurfing. This remarkable spot offers shallow, flat water conditions that eliminate the fear factor for new riders while providing enough space and variety for experienced kitesurfers to practice and perfect their skills.
                  </p>
                </div>
              </section>

              {/* Kitesurf Spots */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-8">
                  Top Kitesurfing Spots in Sardinia
                </h2>
                <div className="space-y-8">
                  {spotData.map((spot, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-2/3">
                          <h3 className="text-2xl font-montserrat font-bold text-deep-navy mb-3">
                            {spot.name}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-600 mb-4">
                            <MapPin className="w-4 h-4" />
                            <span>{spot.location}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed mb-6">
                            {spot.description}
                          </p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-50 rounded-lg p-3 text-center">
                              <div className="text-sm text-gray-600 mb-1">Type</div>
                              <div className="font-medium text-deep-navy">{spot.type}</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 text-center">
                              <div className="text-sm text-gray-600 mb-1">Difficulty</div>
                              <div className="font-medium text-deep-navy">{spot.difficulty}</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 text-center">
                              <div className="text-sm text-gray-600 mb-1">Wind</div>
                              <div className="font-medium text-deep-navy">{spot.wind}</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 text-center">
                              <div className="text-sm text-gray-600 mb-1">Season</div>
                              <div className="font-medium text-deep-navy">{spot.season}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Why Choose Sardinia */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Why Choose Sardinia for Kitesurfing?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Wind className="w-6 h-6 text-turquoise" />
                      Perfect Wind Conditions
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Consistent thermal winds 12-25 knots</li>
                      <li>• Predictable wind patterns</li>
                      <li>• Northwest/Southwest directions</li>
                      <li>• Afternoon wind peaks</li>
                      <li>• 7-month reliable season</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Users className="w-6 h-6 text-turquoise" />
                      All Skill Levels
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Beginner-friendly flat water</li>
                      <li>• Intermediate progression spots</li>
                      <li>• Advanced wave riding</li>
                      <li>• Professional instruction available</li>
                      <li>• Modern equipment rental</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Award className="w-6 h-6 text-turquoise" />
                      Mediterranean Paradise
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Warm crystal-clear waters</li>
                      <li>• Beautiful Mediterranean scenery</li>
                      <li>• Rich Italian culture and cuisine</li>
                      <li>• Excellent infrastructure</li>
                      <li>• Safe and welcoming environment</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Star className="w-6 h-6 text-turquoise" />
                      Professional Support
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• IKO certified instructors</li>
                      <li>• Modern equipment fleet</li>
                      <li>• Safety-first approach</li>
                      <li>• Comprehensive courses</li>
                      <li>• Exclusive KiteSafaris discounts</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {faqData.map((faq, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-montserrat font-semibold text-deep-navy mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Facts */}
                <div className="bg-deep-navy text-white rounded-lg p-6">
                  <h3 className="text-xl font-montserrat font-bold mb-4">Sardinia Kitesurfing Facts</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Best Season:</span>
                      <span className="font-medium">April - October</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Wind Speed:</span>
                      <span className="font-medium">12-25 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Water Temp:</span>
                      <span className="font-medium">20-26°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Skill Level:</span>
                      <span className="font-medium">All Levels</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Top Spot:</span>
                      <span className="font-medium">Punta Trettu</span>
                    </div>
                  </div>
                </div>

                {/* Related Links */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-montserrat font-bold text-deep-navy mb-4">Related Pages</h3>
                  <div className="space-y-3">
                    <Link href="/destinations/sardinia" className="block text-turquoise hover:text-deep-navy transition-colors">
                      ← Back to Sardinia Overview
                    </Link>
                    <Link href="/destinations/sardinia/punta-trettu" className="block text-turquoise hover:text-deep-navy transition-colors">
                      Punta Trettu Kitesurfing Spot
                    </Link>
                    <Link href="/destinations/sardinia/kitesurf-schools" className="block text-turquoise hover:text-deep-navy transition-colors">
                      Kitesurf Schools in Sardinia
                    </Link>
                    <Link href="/destinations/sardinia/beginner-guide" className="block text-turquoise hover:text-deep-navy transition-colors">
                      Beginner's Guide to Kitesurfing
                    </Link>
                    <Link href="/destinations/sardinia/wind-conditions" className="block text-turquoise hover:text-deep-navy transition-colors">
                      Wind Conditions & Forecast
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Schools Component */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <SardiniaPartnerSchools />
          </div>
        </div>
      </div>
    </>
  )
}
