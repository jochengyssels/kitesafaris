import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SardiniaPartnerSchools } from "@/components/sardinia-partner-schools"
import WindForecastCard from "@/components/weather/WindForecastCard"
import Link from "next/link"
import { ArrowLeft, MapPin, Wind, Clock, Users, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Kitesurf Punta Trettu | Flat-Water Sardinia Spot Guide",
  description: "Complete guide to Kitesurf Punta Trettu, Sardinia: schools, lessons, wind & season, spot map, and webcam. Book lessons and plan your trip.",
  keywords: [
    "Kitesurf Punta Trettu",
    "Kitesurf school Sardinia", 
    "Kitesurf Sardinia",
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
    canonical: "https://www.kitesafaris.com/destinations/sardinia/punta-trettu",
  },
}

const faqData = [
  {
    question: "When is the best wind season in Punta Trettu?",
    answer: "The best wind season at Punta Trettu runs from April to October, with peak conditions from May through September. During these months, you'll experience consistent thermal winds averaging 12-22 knots, warm Mediterranean water temperatures, and stable weather conditions. July and August offer the most reliable wind patterns, while April-May and September-October provide comfortable temperatures with fewer crowds."
  },
  {
    question: "Is Punta Trettu good for beginners?",
    answer: "Absolutely! Punta Trettu is considered one of Europe's most beginner-friendly kitesurfing destinations. The flat shallow lagoon eliminates the fear of deep water, while the consistent winds provide predictable learning conditions. Our partner schools offer structured beginner courses with certified instructors, modern equipment, and safety protocols designed specifically for first-time kitesurfers."
  },
  {
    question: "What kite sizes should I bring in summer?",
    answer: "For summer conditions at Punta Trettu (June-August), most riders use kites between 9-12 meters. Beginners typically start with larger kites (12-14m) for lighter winds, while experienced riders may use smaller kites (7-9m) for stronger afternoon conditions. The local schools provide all necessary equipment, so you don't need to bring your own gear."
  },
  {
    question: "Can I rent gear and book lessons on site?",
    answer: "Yes! Both PROKITE SARDEGNA and KITEHOUSE SARDINIA offer complete equipment rental and lesson packages. You can book everything on-site, including kites, boards, harnesses, wetsuits, and safety gear. All schools provide modern, well-maintained equipment suitable for all skill levels."
  },
  {
    question: "Do I need a wetsuit in spring/autumn?",
    answer: "Wetsuits are recommended for early spring (April-May) and late autumn (October) sessions when water temperatures can be cooler. During peak summer months (June-September), most riders use board shorts or shorty wetsuits. The schools provide wetsuits as part of their equipment rental packages."
  },
  {
    question: "What makes Punta Trettu different from other kitesurf spots?",
    answer: "Punta Trettu offers a unique combination of flat shallow water, consistent winds, and beginner-friendly conditions. The lagoon is protected from waves, making it perfect for learning kitesurfing techniques safely. The water depth rarely exceeds waist height, providing confidence for beginners while still offering enough space for advanced riders to practice."
  }
]

export default function PuntaTrettuPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Kitesurf Punta Trettu | Flat-Water Sardinia Spot Guide",
    "description": "Complete guide to Kitesurf Punta Trettu, Sardinia: schools, lessons, wind & season, spot map, and webcam. Book lessons and plan your trip.",
    "url": "https://www.kitesafaris.com/destinations/sardinia/punta-trettu",
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

  const schoolsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Kitesurf Schools in Sardinia (Punta Trettu)",
    "description": "Professional kitesurfing schools at Punta Trettu offering lessons and equipment rental",
    "itemListElement": [
      {
        "@type": "Organization",
        "name": "PROKITE SARDEGNA",
        "url": "https://prokitesardegna.com/",
        "description": "Professional kitesurfing school offering beginner to advanced courses with certified IKO instructors"
      },
      {
        "@type": "Organization", 
        "name": "KITEHOUSE SARDINIA",
        "url": "https://kitehousesardinia.com/",
        "description": "Modern kitesurfing center with premium equipment and experienced instructors"
      }
    ]
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolsJsonLd) }}
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
                Kitesurf Punta Trettu – Sardinia Spot Guide
              </h1>
              <p className="text-xl sm:text-2xl font-open-sans mb-8 leading-relaxed">
                Planning Kitesurf Punta Trettu? This flat-water lagoon in Sardinia is one of Europe's most beginner-friendly spots, with steady winds, sandy bottom, and huge standing areas.
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
                <WindForecastCard hours={6} showCurrent={true} />
              </section>

              {/* Introduction */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Why Punta Trettu is Sardinia's Best Kitesurfing Spot
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Planning Kitesurf Punta Trettu? This flat-water lagoon in Sardinia is one of Europe's most beginner-friendly spots, with steady winds, sandy bottom, and huge standing areas. Below you'll find the best season and wind, how the spot works, trusted kitesurf schools in Sardinia, live webcam, and practical travel tips — everything we use to coach first-timers and help experienced riders progress fast.
                  </p>
                  
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

              {/* Wind & Season Section */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Wind & Season in Sardinia
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The kitesurfing season at Punta Trettu runs from April to October, with peak conditions typically occurring from May through September. During these months, you'll experience the most consistent thermal winds that make Kitesurf Sardinia such a reliable destination.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Wind Directions:</strong> The predominant winds at Punta Trettu come from the northwest and southwest, creating excellent cross-shore and side-shore conditions. These directions provide clean, steady airflow across the lagoon without the gusty, unpredictable winds that can make learning difficult at other locations.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Thermal Effects:</strong> The thermal wind system at Punta Trettu is particularly reliable due to the surrounding geography. As the land heats up during the day, it creates a consistent thermal breeze that typically starts around 10 AM and builds throughout the afternoon, often reaching its peak between 2-5 PM.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Seasonal Variations:</strong> April and May offer lighter winds (12-18 knots) perfect for beginners, while June through September provide stronger conditions (18-25 knots) ideal for progression and advanced riding. October brings back lighter winds, making it excellent for beginners or those looking for more relaxed sessions.
                  </p>
                </div>
              </section>

              {/* Spot Layout & Access */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Spot Layout & Access
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Punta Trettu's layout is perfectly designed for kitesurfing, with multiple launch zones and a vast riding area that accommodates all skill levels. The spot features a large, shallow lagoon with depths ranging from ankle-deep near the shore to waist-deep in the center.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Launch Zones:</strong> There are several designated launch areas around the lagoon, each offering different advantages. The main launch zone provides easy access with shallow water and plenty of space for kite setup. The secondary launch areas offer more advanced riders access to different wind angles and riding conditions.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Water Depths:</strong> The lagoon's shallow nature is one of its greatest assets. Most of the riding area maintains depths between knee and waist height, providing the perfect safety net for beginners while still offering enough space for advanced maneuvers.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Hazards & Safety:</strong> The lagoon is remarkably free of hazards, with no rocks, reefs, or strong currents to worry about. The sandy bottom is soft and forgiving, making it ideal for learning. The only consideration is the occasional shallow area during low tide, which is clearly marked and easily avoidable.
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
                  Kitesurf Schools in Sardinia (Punta Trettu)
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Punta Trettu is home to several world-class kitesurfing schools that have made this location their base of operations. These schools understand the unique advantages of Punta Trettu and have developed specialized teaching methods that maximize the lagoon's potential for learning and progression.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    KiteSafaris has established exclusive partnerships with the leading schools at Punta Trettu, including PROKITE SARDEGNA and KITEHOUSE SARDINIA. These partnerships allow us to offer our guests special discounts, priority booking, and access to the most experienced instructors in the area.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4">
                      Partner Schools at Punta Trettu
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-turquoise pl-4">
                        <h4 className="font-semibold text-deep-navy mb-2">
                          <a href="https://prokitesardegna.com/" target="_blank" rel="noopener noreferrer" className="text-turquoise hover:text-deep-navy transition-colors">
                            PROKITE SARDEGNA
                          </a>
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Professional kitesurfing school offering beginner to advanced courses with certified IKO instructors. Specializes in flat-water instruction and safety protocols.
                        </p>
                      </div>
                      <div className="border-l-4 border-turquoise pl-4">
                        <h4 className="font-semibold text-deep-navy mb-2">
                          <a href="https://kitehousesardinia.com/" target="_blank" rel="noopener noreferrer" className="text-turquoise hover:text-deep-navy transition-colors">
                            KITEHOUSE SARDINIA
                          </a>
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Modern kitesurfing center with premium equipment and experienced instructors. Offers personalized lessons and group courses for all skill levels.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Lesson Types:</strong> Both schools offer comprehensive beginner tracks starting with kite control and safety, progressing to water starts and basic riding. Advanced riders can focus on specific skills like transitions, jumps, and freestyle techniques.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Safety & Equipment:</strong> All schools provide modern, well-maintained equipment including kites, boards, harnesses, and safety gear. Instructors maintain excellent safety ratios (typically 1:2 for beginners) and use radio communication systems for real-time guidance.
                  </p>
                </div>
              </section>

              {/* Lessons & Pricing Overview */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Lessons & Pricing Overview
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Kitesurf school Sardinia options at Punta Trettu offer flexible lesson formats to suit every learning style and budget. Whether you're a complete beginner or looking to refine specific skills, the local schools provide comprehensive programs designed for the unique conditions of the lagoon.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Beginner Packages:</strong> Most schools offer 3-5 day beginner courses that take you from zero experience to independent riding. These packages typically include equipment rental, instruction, and safety gear, with prices starting around €200-300 per day.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Private Lessons:</strong> For faster progression or personalized attention, private 1:1 lessons are available. These sessions allow instructors to focus entirely on your specific needs and learning pace.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Group Lessons:</strong> Small group lessons (2-4 students) offer a great balance of personalized instruction and social learning. These are perfect for couples, families, or friends learning together.
                  </p>

                  <div className="bg-turquoise/10 rounded-lg p-6 mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>KiteSafaris Exclusive Discounts:</strong> As a KiteSafaris guest, you'll receive special rates and priority booking at all partner schools. Contact us for current pricing and availability.
                    </p>
                  </div>
                </div>
              </section>

              {/* Webcam & Live Conditions */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Webcam & Live Conditions
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Stay connected to Punta Trettu's conditions with our live webcam and real-time wind data. The webcam provides a live view of the lagoon, showing current wind strength, water conditions, and kitesurfing activity.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Live Webcam:</strong> Our Punta Trettu webcam streams 24/7, giving you real-time visibility into current conditions. You can see wind strength, water clarity, and how busy the spot is before you arrive.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Wind Data:</strong> The live wind conditions card above shows current wind speed, direction, and gusts, updated every few minutes. This data helps you plan your session timing and equipment selection.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>How to Read Conditions:</strong> Look for steady wind patterns (avoid gusty conditions), clear water visibility, and moderate activity levels. The webcam also shows the lagoon's water level, which affects riding conditions.
                    </p>
                  </div>
                </div>
              </section>

              {/* Travel Logistics */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Travel Logistics
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Getting to Punta Trettu is straightforward, with several transportation options available. The spot is easily accessible from major airports and offers excellent accommodation options for kitesurfers.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Airports:</strong> The closest airport is Cagliari (CAG), approximately 45 minutes by car. Alternative options include Alghero (AHO) and Olbia (OLB), both about 2-3 hours drive. All airports offer car rental services and some have direct flights from major European cities.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Car Rental:</strong> A rental car is highly recommended for exploring Sardinia and accessing Punta Trettu. The drive from Cagliari takes you through beautiful Sardinian countryside and coastal roads.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Where to Stay:</strong> Accommodation options range from budget-friendly guesthouses to luxury resorts. Many kitesurfers choose to stay in San Giovanni Suergiu (closest town) or nearby coastal areas. Some schools offer accommodation packages that include lessons and lodging.
                  </p>
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
                    <Link href="/destinations/sardinia/punta-trettu/webcam" className="block text-turquoise hover:text-deep-navy transition-colors">
                      Punta Trettu Webcam
                    </Link>
                    <Link href="/destinations/sardinia/punta-trettu/kitesurf-lessons" className="block text-turquoise hover:text-deep-navy transition-colors">
                      Kitesurf Lessons & Schools
                    </Link>
                    <Link href="/booking" className="block text-turquoise hover:text-deep-navy transition-colors">
                      Book Your Trip
                    </Link>
                    <Link href="/trip-calendar" className="block text-turquoise hover:text-deep-navy transition-colors">
                      Trip Calendar
                    </Link>
                    <Link href="/reviews" className="block text-turquoise hover:text-deep-navy transition-colors">
                      Customer Reviews
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
