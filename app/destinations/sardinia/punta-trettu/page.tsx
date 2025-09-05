import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SardiniaPartnerSchools } from "@/components/sardinia-partner-schools"
import WindConditionsCard from "@/components/wind/WindConditionsCard"
import Link from "next/link"
import { ArrowLeft, MapPin, Wind, Clock, Users, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Punta Trettu Kitesurfing | Best Beginner Spot in Sardinia - KiteSafaris",
  description: "Discover Punta Trettu, Sardinia's premier kitesurfing destination. Flat shallow lagoon perfect for beginners with consistent winds April-October. Professional instruction and exclusive KiteSafaris discounts.",
  keywords: [
    "Punta Trettu",
    "Punta Trettu kitesurfing",
    "Punta Trettu Sardinia",
    "kitesurf Punta Trettu",
    "Punta Trettu kiteboarding",
    "Sardinia kitesurfing spot",
    "beginner kitesurfing Punta Trettu",
    "Punta Trettu lagoon",
    "kitesurf school Punta Trettu",
    "Punta Trettu wind conditions"
  ].join(", "),
  openGraph: {
    title: "Punta Trettu Kitesurfing | Best Beginner Spot in Sardinia",
    description: "Master kitesurfing at Punta Trettu, Sardinia! Flat shallow lagoon perfect for beginners April-October. Professional instruction with exclusive KiteSafaris discounts.",
    images: [
      {
        url: "https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png",
        width: 1200,
        height: 630,
        alt: "Punta Trettu kitesurfing lagoon Sardinia beginner-friendly conditions",
      },
    ],
  },
  twitter: {
    title: "Punta Trettu Kitesurfing | Best Beginner Spot in Sardinia",
    description: "Learn kitesurfing at Punta Trettu, Sardinia! Flat lagoon, professional instruction, exclusive discounts April-October.",
    images: ["https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png"],
  },
  alternates: {
    canonical: "https://kitesafaris.com/destinations/sardinia/punta-trettu",
  },
}

const faqData = [
  {
    question: "What makes Punta Trettu the best kitesurfing spot in Sardinia?",
    answer: "Punta Trettu offers a unique combination of flat shallow water, consistent winds, and beginner-friendly conditions. The lagoon is protected from waves, making it perfect for learning kitesurfing techniques safely. The water depth rarely exceeds waist height, providing confidence for beginners while still offering enough space for advanced riders to practice."
  },
  {
    question: "When is the best time to kitesurf at Punta Trettu?",
    answer: "The optimal kitesurfing season at Punta Trettu runs from April to October. During these months, you'll experience consistent thermal winds averaging 12-22 knots, warm Mediterranean water temperatures, and stable weather conditions. July and August offer the most reliable wind patterns, while April-May and September-October provide comfortable temperatures with fewer crowds."
  },
  {
    question: "Is Punta Trettu suitable for complete beginners?",
    answer: "Absolutely! Punta Trettu is considered one of Europe's most beginner-friendly kitesurfing destinations. The flat shallow lagoon eliminates the fear of deep water, while the consistent winds provide predictable learning conditions. Our partner schools offer structured beginner courses with certified instructors, modern equipment, and safety protocols designed specifically for first-time kitesurfers."
  },
  {
    question: "What wind conditions can I expect at Punta Trettu?",
    answer: "Punta Trettu benefits from reliable thermal winds that typically blow from the northwest and southwest directions. Wind speeds average 12-22 knots during the season, with the strongest winds occurring in the afternoon. The lagoon's orientation and surrounding geography create consistent wind patterns that are perfect for both learning and progression."
  },
  {
    question: "Are there kitesurfing schools at Punta Trettu?",
    answer: "Yes! Punta Trettu is home to several professional kitesurfing schools, including PROKITE SARDEGNA and KITEHOUSE SARDINIA. These schools offer comprehensive courses for all levels, from complete beginners to advanced riders. KiteSafaris has exclusive partnerships with these schools, providing our guests with special discounts and priority booking."
  },
  {
    question: "What equipment do I need for kitesurfing at Punta Trettu?",
    answer: "All necessary kitesurfing equipment is available for rent at the local schools, including kites, boards, harnesses, and safety gear. For beginners, we recommend starting with school equipment to learn proper sizing and technique. Advanced riders can bring their own gear or rent high-quality equipment from the schools. Wetsuits are recommended for early and late season sessions."
  }
]

export default function PuntaTrettuPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Punta Trettu Kitesurfing | Best Beginner Spot in Sardinia",
    "description": "Discover Punta Trettu, Sardinia's premier kitesurfing destination. Flat shallow lagoon perfect for beginners with consistent winds April-October.",
    "url": "https://kitesafaris.com/destinations/sardinia/punta-trettu",
    "mainEntity": {
      "@type": "Place",
      "name": "Punta Trettu",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "San Giovanni Suergiu",
        "addressRegion": "Sardinia",
        "addressCountry": "Italy"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 39.112133995367714,
        "longitude": 8.437520043416788
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
          "name": "Punta Trettu",
          "item": "https://kitesafaris.com/destinations/sardinia/punta-trettu"
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
              <span className="text-deep-navy font-medium">Punta Trettu</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-deep-navy via-turquoise to-sand-beige text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-bold mb-6">
                Punta Trettu Kitesurfing
              </h1>
              <p className="text-xl sm:text-2xl font-open-sans mb-8 leading-relaxed">
                Sardinia's Premier Beginner-Friendly Kitesurfing Destination
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">San Giovanni Suergiu, Sardinia</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Wind className="w-5 h-5" />
                  <span className="font-medium">12-22 knots</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">April - October</span>
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
                  Why Punta Trettu is Sardinia's Best Kitesurfing Spot
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Punta Trettu stands as Sardinia's crown jewel for kitesurfing, offering an unparalleled combination of natural advantages that make it the perfect destination for both beginners and experienced riders. Located on the southwestern coast of Sardinia near San Giovanni Suergiu, this remarkable lagoon has earned its reputation as one of Europe's most beginner-friendly kitesurfing destinations.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The magic of Punta Trettu lies in its unique geographical formation. The shallow lagoon, protected by natural barriers, creates a flat-water paradise where wind conditions are consistent and predictable. With water depths rarely exceeding waist height, beginners can learn with confidence, knowing they can always stand up if needed. This safety factor, combined with the lagoon's vast open space, makes Punta Trettu an ideal classroom for mastering kitesurfing fundamentals.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    The wind patterns at Punta Trettu are remarkably reliable, with thermal winds typically blowing from northwest and southwest directions. These consistent 12-22 knot winds provide the perfect power for learning and progression, while the lagoon's orientation ensures smooth, predictable conditions throughout the day. Unlike many coastal spots that suffer from gusty or inconsistent winds, Punta Trettu offers the stability that kitesurfers dream of.
                  </p>
                </div>
              </section>

              {/* Conditions & Features */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Perfect Conditions for Every Level
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Users className="w-6 h-6 text-turquoise" />
                      Beginner-Friendly Features
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Flat shallow water (waist-deep maximum)</li>
                      <li>• No waves or choppy conditions</li>
                      <li>• Large open space for learning</li>
                      <li>• Soft sandy bottom</li>
                      <li>• Easy access and launch areas</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Wind className="w-6 h-6 text-turquoise" />
                      Wind & Weather
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Consistent thermal winds</li>
                      <li>• 12-22 knot average speeds</li>
                      <li>• Northwest/Southwest directions</li>
                      <li>• Warm Mediterranean climate</li>
                      <li>• 7-month kitesurfing season</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Partner Schools Section */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Professional Kitesurfing Schools at Punta Trettu
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Punta Trettu is home to several world-class kitesurfing schools that have made this location their base of operations. These schools understand the unique advantages of Punta Trettu and have developed specialized teaching methods that maximize the lagoon's potential for learning and progression.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  KiteSafaris has established exclusive partnerships with the leading schools at Punta Trettu, including PROKITE SARDEGNA and KITEHOUSE SARDINIA. These partnerships allow us to offer our guests special discounts, priority booking, and access to the most experienced instructors in the area.
                </p>
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
                  <h3 className="text-xl font-montserrat font-bold mb-4">Quick Facts</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Best Season:</span>
                      <span className="font-medium">April - October</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Wind Speed:</span>
                      <span className="font-medium">12-22 knots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Water Depth:</span>
                      <span className="font-medium">Waist-deep</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Difficulty:</span>
                      <span className="font-medium">All Levels</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Water Type:</span>
                      <span className="font-medium">Flat Lagoon</span>
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
