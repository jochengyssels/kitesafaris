import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SardiniaPartnerSchools } from "@/components/sardinia-partner-schools"
import WindConditionsCard from "@/components/wind/WindConditionsCard"
import Link from "next/link"
import { Wind, Calendar, Thermometer, Cloud, Sun, AlertCircle, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Wind Conditions Sardinia | Kitesurfing Wind Forecast Punta Trettu - KiteSafaris",
  description: "Complete guide to wind conditions in Sardinia for kitesurfing. Learn about seasonal patterns, wind speeds, and forecasts for Punta Trettu and other kitesurfing spots.",
  keywords: [
    "wind conditions Sardinia",
    "Sardinia wind forecast",
    "Punta Trettu wind conditions",
    "kitesurfing wind Sardinia",
    "Sardinia wind patterns",
    "kitesurfing weather Sardinia",
    "wind forecast Punta Trettu",
    "Sardinia thermal winds",
    "kitesurfing wind speed Sardinia",
    "best wind conditions Sardinia"
  ].join(", "),
  openGraph: {
    title: "Wind Conditions Sardinia | Kitesurfing Wind Forecast Punta Trettu",
    description: "Complete guide to wind conditions in Sardinia for kitesurfing. Learn about seasonal patterns, wind speeds, and forecasts for Punta Trettu.",
    images: [
      {
        url: "https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png",
        width: 1200,
        height: 630,
        alt: "Wind conditions Sardinia kitesurfing forecast Punta Trettu",
      },
    ],
  },
  twitter: {
    title: "Wind Conditions Sardinia | Kitesurfing Wind Forecast Punta Trettu",
    description: "Complete guide to wind conditions in Sardinia for kitesurfing. Learn about seasonal patterns and wind forecasts for Punta Trettu.",
    images: ["https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png"],
  },
  alternates: {
    canonical: "https://kitesafaris.com/destinations/sardinia/wind-conditions",
  },
}

const monthlyConditions = [
  {
    month: "April",
    windSpeed: "12-18 knots",
    reliability: "70%",
    temperature: "18-22°C",
    description: "Spring winds begin to pick up with increasing reliability. Great for beginners with lighter conditions."
  },
  {
    month: "May",
    windSpeed: "15-22 knots",
    reliability: "80%",
    temperature: "20-24°C",
    description: "Excellent conditions with consistent thermal winds. Perfect balance of power and comfort."
  },
  {
    month: "June",
    windSpeed: "18-25 knots",
    reliability: "85%",
    temperature: "22-26°C",
    description: "Peak season begins with strong, reliable winds. Ideal for all skill levels."
  },
  {
    month: "July",
    windSpeed: "20-28 knots",
    reliability: "90%",
    temperature: "24-28°C",
    description: "Best month for wind reliability. Strong thermal winds perfect for advanced riders."
  },
  {
    month: "August",
    windSpeed: "18-26 knots",
    reliability: "88%",
    temperature: "25-29°C",
    description: "Consistent strong winds with warm water. Peak season conditions."
  },
  {
    month: "September",
    windSpeed: "15-23 knots",
    reliability: "82%",
    temperature: "23-27°C",
    description: "Excellent conditions continue with slightly lighter winds. Great for progression."
  },
  {
    month: "October",
    windSpeed: "12-20 knots",
    reliability: "75%",
    temperature: "20-24°C",
    description: "Season winds down with still good conditions. Perfect for beginners and intermediate riders."
  }
]

const faqData = [
  {
    question: "What type of winds can I expect at Punta Trettu?",
    answer: "Punta Trettu benefits from reliable thermal winds that typically blow from northwest and southwest directions. These are created by temperature differences between the land and sea, making them very predictable. Wind speeds average 12-25 knots depending on the season, with the strongest winds occurring in the afternoon when thermal activity peaks."
  },
  {
    question: "When is the windiest time of day in Sardinia?",
    answer: "The windiest time of day in Sardinia is typically from 12:00 PM to 6:00 PM, when thermal winds are at their strongest. Morning sessions (9:00 AM - 12:00 PM) often have lighter winds, while evening sessions (6:00 PM - 8:00 PM) can still be good but may be gustier. The most consistent conditions are usually in the afternoon."
  },
  {
    question: "How reliable are the wind conditions in Sardinia?",
    answer: "Wind reliability in Sardinia is excellent, especially during the peak season from May to September when you can expect good conditions 80-90% of the time. The thermal wind system is very predictable, making Sardinia one of the most reliable kitesurfing destinations in the Mediterranean. Even during the shoulder seasons (April and October), wind reliability remains good at 70-75%."
  },
  {
    question: "What happens if there's no wind during my visit?",
    answer: "While wind conditions are very reliable in Sardinia, there are occasional days with light winds. During these times, you can enjoy other activities like stand-up paddleboarding, snorkeling, or exploring the beautiful Sardinian coastline. The schools also offer theory lessons, equipment maintenance workshops, or you can practice kite flying on land with smaller kites."
  },
  {
    question: "Are there any dangerous wind conditions to watch out for?",
    answer: "Sardinia's thermal winds are generally very safe and predictable. However, it's important to be aware of strong offshore winds or sudden wind shifts. The professional schools monitor conditions closely and will advise against kitesurfing if conditions become unsafe. Always follow the guidance of local instructors and check weather forecasts before heading out."
  },
  {
    question: "How do I check wind conditions before traveling to Sardinia?",
    answer: "You can check wind conditions using several reliable sources: Windguru (windguru.cz), Windy (windy.com), and Windfinder (windfinder.com) all provide accurate forecasts for Sardinia. The local kitesurf schools also provide daily wind reports and can give you the most up-to-date conditions. KiteSafaris can help you plan your trip during the most reliable wind periods."
  }
]

export default function WindConditionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Wind Conditions Sardinia | Kitesurfing Wind Forecast Punta Trettu",
    "description": "Complete guide to wind conditions in Sardinia for kitesurfing. Learn about seasonal patterns, wind speeds, and forecasts for Punta Trettu.",
    "url": "https://kitesafaris.com/destinations/sardinia/wind-conditions",
    "mainEntity": {
      "@type": "Place",
      "name": "Sardinia",
      "description": "Kitesurfing destination with excellent wind conditions",
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
          "name": "Wind Conditions",
          "item": "https://kitesafaris.com/destinations/sardinia/wind-conditions"
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
              <span className="text-deep-navy font-medium">Wind Conditions</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-deep-navy via-turquoise to-sand-beige text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-bold mb-6">
                Wind Conditions Sardinia
              </h1>
              <p className="text-xl sm:text-2xl font-open-sans mb-8 leading-relaxed">
                Complete Kitesurfing Wind Forecast & Conditions Guide
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Wind className="w-5 h-5" />
                  <span className="font-medium">12-28 Knot Thermal Winds</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">7-Month Season</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">80-90% Reliability</span>
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
              {/* Live Wind Conditions */}
              <section className="mb-8">
                <WindConditionsCard />
              </section>

              {/* Introduction */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Understanding Sardinia's Wind Patterns
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Sardinia's exceptional kitesurfing conditions are largely due to its unique wind patterns, which create some of the most reliable and predictable conditions in the Mediterranean. The island benefits from a combination of thermal winds, geographical features, and seasonal weather patterns that make it a kitesurfer's paradise.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The primary wind system affecting Sardinia is thermal winds, created by temperature differences between the land and surrounding sea. During the day, the land heats up faster than the water, creating rising air that draws in cooler air from the sea. This creates consistent, predictable wind patterns that are perfect for kitesurfing.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    At Punta Trettu specifically, the wind conditions are enhanced by the local geography. The shallow lagoon and surrounding landscape create a natural wind funnel effect, concentrating and smoothing the thermal winds. This results in consistent wind speeds and directions that are ideal for both learning and advanced kitesurfing.
                  </p>
                </div>
              </section>

              {/* Monthly Conditions */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-8">
                  Monthly Wind Conditions
                </h2>
                <div className="space-y-6">
                  {monthlyConditions.map((month, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                        <div className="lg:w-1/4">
                          <h3 className="text-2xl font-montserrat font-bold text-deep-navy mb-2">
                            {month.month}
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Wind className="w-4 h-4 text-turquoise" />
                              <span className="text-sm font-medium">{month.windSpeed}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium">{month.reliability} reliable</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Thermometer className="w-4 h-4 text-orange-500" />
                              <span className="text-sm font-medium">{month.temperature}</span>
                            </div>
                          </div>
                        </div>
                        <div className="lg:w-3/4">
                          <p className="text-gray-700 leading-relaxed">
                            {month.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Wind Characteristics */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Wind Characteristics at Punta Trettu
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Wind className="w-6 h-6 text-turquoise" />
                      Wind Directions
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Northwest (NW) - Most common</li>
                      <li>• Southwest (SW) - Secondary direction</li>
                      <li>• West (W) - Occasional</li>
                      <li>• North (N) - Less frequent</li>
                      <li>• Cross-shore conditions ideal</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Sun className="w-6 h-6 text-turquoise" />
                      Daily Patterns
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Morning: Light winds (8-12 knots)</li>
                      <li>• Midday: Building thermal winds</li>
                      <li>• Afternoon: Peak conditions (15-25 knots)</li>
                      <li>• Evening: Gradual decrease</li>
                      <li>• Best sessions: 12:00-18:00</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Cloud className="w-6 h-6 text-turquoise" />
                      Weather Factors
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• High pressure = stronger winds</li>
                      <li>• Clear skies = better thermals</li>
                      <li>• Temperature gradient important</li>
                      <li>• Sea breeze enhancement</li>
                      <li>• Stable conditions preferred</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-turquoise" />
                      Safety Considerations
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Offshore winds to avoid</li>
                      <li>• Sudden wind shifts</li>
                      <li>• Strong gusty conditions</li>
                      <li>• Storm fronts approaching</li>
                      <li>• Always check forecasts</li>
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
                {/* Wind Forecast Links */}
                <div className="bg-deep-navy text-white rounded-lg p-6">
                  <h3 className="text-xl font-montserrat font-bold mb-4">Wind Forecast Resources</h3>
                  <div className="space-y-3">
                    <a
                      href="https://www.windguru.cz/station/1234"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-colors"
                    >
                      <div className="font-medium">Windguru</div>
                      <div className="text-sm text-gray-300">Detailed forecasts</div>
                    </a>
                    <a
                      href="https://www.windy.com/?39.112,8.437,10"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-colors"
                    >
                      <div className="font-medium">Windy</div>
                      <div className="text-sm text-gray-300">Interactive maps</div>
                    </a>
                    <a
                      href="https://www.windfinder.com/forecast/punta_trettu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-colors"
                    >
                      <div className="font-medium">Windfinder</div>
                      <div className="text-sm text-gray-300">Spot-specific data</div>
                    </a>
                  </div>
                </div>

                {/* Best Times */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-montserrat font-bold text-deep-navy mb-4">Best Wind Times</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Peak Season:</span>
                      <span className="font-medium">July-August</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Best Months:</span>
                      <span className="font-medium">May-September</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily Peak:</span>
                      <span className="font-medium">12:00-18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reliability:</span>
                      <span className="font-medium">80-90%</span>
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
                    <Link href="/destinations/sardinia/kitesurf-sardinia" className="block text-turquoise hover:text-deep-navy transition-colors">
                      Kitesurf Sardinia Overview
                    </Link>
                    <Link href="/destinations/sardinia/beginner-guide" className="block text-turquoise hover:text-deep-navy transition-colors">
                      Beginner's Guide to Kitesurfing
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
