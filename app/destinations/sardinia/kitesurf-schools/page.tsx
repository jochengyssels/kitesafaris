import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SardiniaPartnerSchools } from "@/components/sardinia-partner-schools"
import Link from "next/link"
import { Award, Users, MapPin, Star, CheckCircle, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Kitesurf Schools Sardinia | Best Kitesurfing Schools at Punta Trettu - KiteSafaris",
  description: "Discover the best kitesurf schools in Sardinia at Punta Trettu. Professional instruction, certified instructors, and exclusive KiteSafaris discounts. PROKITE SARDEGNA & KITEHOUSE SARDINIA.",
  keywords: [
    "kitesurf school Sardinia",
    "kitesurfing schools Sardinia",
    "kitesurf lessons Sardinia",
    "Punta Trettu kitesurf school",
    "Sardinia kiteboarding school",
    "kitesurf instructor Sardinia",
    "kitesurfing lessons Italy",
    "beginner kitesurfing Sardinia",
    "kitesurf school Punta Trettu",
    "Sardinia kitesurfing instruction"
  ].join(", "),
  openGraph: {
    title: "Kitesurf Schools Sardinia | Best Kitesurfing Schools at Punta Trettu",
    description: "Professional kitesurf schools in Sardinia with certified instructors. Learn at Punta Trettu with exclusive KiteSafaris discounts and world-class instruction.",
    images: [
      {
        url: "https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png",
        width: 1200,
        height: 630,
        alt: "Kitesurf schools Sardinia Punta Trettu professional instruction",
      },
    ],
  },
  twitter: {
    title: "Kitesurf Schools Sardinia | Best Kitesurfing Schools at Punta Trettu",
    description: "Learn kitesurfing in Sardinia with professional schools at Punta Trettu. Certified instructors, exclusive discounts, beginner-friendly conditions.",
    images: ["https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png"],
  },
  alternates: {
    canonical: "https://kitesafaris.com/destinations/sardinia/kitesurf-schools",
  },
}

const schoolData = [
  {
    name: "PROKITE SARDEGNA",
    location: "Punta Trettu, San Giovanni Suergiu",
    website: "https://prokitesardegna.com",
    description: "Leading kitesurf school in Sardinia with over 15 years of experience teaching at Punta Trettu. Specializes in beginner-friendly instruction with modern equipment and certified instructors.",
    features: [
      "IKO Certified Instructors",
      "Modern Equipment Fleet",
      "Beginner to Advanced Courses",
      "Safety-First Approach",
      "Multilingual Instruction",
      "Equipment Rental & Sales"
    ],
    discount: "15% off all courses",
    rating: 4.9,
    students: "500+ per season"
  },
  {
    name: "KITEHOUSE SARDINIA",
    location: "Punta Trettu, San Giovanni Suergiu", 
    website: "https://kitehousesardinia.com",
    description: "Premium kitesurfing school offering personalized instruction and luxury facilities. Known for small group sizes and intensive progression programs.",
    features: [
      "Small Group Classes (Max 4 students)",
      "Personalized Instruction",
      "Luxury Facilities",
      "Advanced Technique Coaching",
      "Video Analysis Sessions",
      "Premium Equipment"
    ],
    discount: "20% off private lessons",
    rating: 4.8,
    students: "300+ per season"
  }
]

const faqData = [
  {
    question: "What makes Sardinia's kitesurf schools special?",
    answer: "Sardinia's kitesurf schools benefit from the unique conditions at Punta Trettu - a flat shallow lagoon that's perfect for learning. The schools have developed specialized teaching methods for this environment, with instructors who understand how to maximize the lagoon's potential for safe and effective learning."
  },
  {
    question: "Are the instructors certified?",
    answer: "Yes, all partner schools employ IKO (International Kiteboarding Organization) certified instructors. These professionals have undergone rigorous training and testing to ensure they can provide safe, effective instruction. Many instructors also hold additional certifications in first aid, rescue techniques, and advanced teaching methods."
  },
  {
    question: "What courses are available for beginners?",
    answer: "Beginner courses typically include kite control, safety procedures, water starts, and basic riding techniques. Most schools offer structured programs ranging from 3-day intensive courses to week-long comprehensive packages. All courses include equipment rental, safety gear, and insurance coverage."
  },
  {
    question: "Do I need to bring my own equipment?",
    answer: "No, all necessary kitesurfing equipment is provided by the schools, including kites, boards, harnesses, wetsuits, and safety gear. The schools maintain modern, well-maintained equipment suitable for all skill levels. Advanced riders can also bring their own gear if preferred."
  },
  {
    question: "What are the KiteSafaris exclusive discounts?",
    answer: "KiteSafaris guests receive exclusive discounts ranging from 15-20% on courses and equipment rental. These discounts are available through our partnerships with PROKITE SARDEGNA and KITEHOUSE SARDINIA, and can be combined with other promotional offers for maximum savings."
  },
  {
    question: "When is the best time to book kitesurf lessons in Sardinia?",
    answer: "The optimal time for kitesurf lessons is during the main season from April to October. For the best availability and weather conditions, we recommend booking in advance, especially for July and August when demand is highest. Early season (April-May) and late season (September-October) often offer more personalized instruction with smaller class sizes."
  }
]

export default function KitesurfSchoolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Kitesurf Schools Sardinia | Best Kitesurfing Schools at Punta Trettu",
    "description": "Discover the best kitesurf schools in Sardinia at Punta Trettu. Professional instruction, certified instructors, and exclusive KiteSafaris discounts.",
    "url": "https://kitesafaris.com/destinations/sardinia/kitesurf-schools",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Kitesurf Schools in Sardinia",
      "itemListElement": schoolData.map((school, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Organization",
          "name": school.name,
          "url": school.website,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": school.location
          },
          "description": school.description
        }
      }))
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
          "name": "Kitesurf Schools",
          "item": "https://kitesafaris.com/destinations/sardinia/kitesurf-schools"
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
              <span className="text-deep-navy font-medium">Kitesurf Schools</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-deep-navy via-turquoise to-sand-beige text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-bold mb-6">
                Kitesurf Schools Sardinia
              </h1>
              <p className="text-xl sm:text-2xl font-open-sans mb-8 leading-relaxed">
                Professional Kitesurfing Instruction at Punta Trettu
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">IKO Certified Instructors</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">All Skill Levels</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Star className="w-5 h-5" />
                  <span className="font-medium">Exclusive Discounts</span>
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
                  Premier Kitesurf Schools at Punta Trettu
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Sardinia's kitesurf schools have established themselves as some of Europe's finest, thanks to the exceptional conditions at Punta Trettu and the expertise of their instructors. These schools have chosen Punta Trettu as their base because they recognize the unique advantages this location offers for effective kitesurfing instruction.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The flat shallow lagoon at Punta Trettu provides an ideal learning environment that allows instructors to focus on technique and safety without the distractions of waves or deep water concerns. This has enabled the schools to develop specialized teaching methods that accelerate learning and build confidence in students of all levels.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    KiteSafaris has carefully selected partner schools that share our commitment to safety, quality instruction, and exceptional customer service. These partnerships allow us to offer our guests exclusive discounts and priority booking, ensuring you receive the best possible kitesurfing education in Sardinia.
                  </p>
                </div>
              </section>

              {/* School Details */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-8">
                  Featured Kitesurf Schools
                </h2>
                <div className="space-y-8">
                  {schoolData.map((school, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-2/3">
                          <h3 className="text-2xl font-montserrat font-bold text-deep-navy mb-3">
                            {school.name}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-600 mb-4">
                            <MapPin className="w-4 h-4" />
                            <span>{school.location}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed mb-6">
                            {school.description}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-yellow-500" />
                              <span className="font-medium">{school.rating}/5 Rating</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-5 h-5 text-turquoise" />
                              <span className="font-medium">{school.students} Students</span>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="font-montserrat font-semibold text-deep-navy mb-3">Key Features:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {school.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  <span className="text-gray-700 text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-turquoise/10 border border-turquoise/20 rounded-lg p-4 mb-6">
                            <div className="flex items-center gap-2 mb-2">
                              <Award className="w-5 h-5 text-turquoise" />
                              <span className="font-montserrat font-semibold text-deep-navy">KiteSafaris Exclusive</span>
                            </div>
                            <p className="text-deep-navy font-medium">{school.discount}</p>
                          </div>
                        </div>
                        
                        <div className="lg:w-1/3 flex flex-col justify-center">
                          <a
                            href={school.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-turquoise text-white px-6 py-3 rounded-lg font-medium hover:bg-turquoise/90 transition-colors"
                          >
                            Visit School Website
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Why Choose These Schools */}
              <section className="mb-12">
                <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                  Why Choose KiteSafaris Partner Schools?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Award className="w-6 h-6 text-turquoise" />
                      Quality Assurance
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• IKO certified instructors only</li>
                      <li>• Regular safety audits and training</li>
                      <li>• Modern, well-maintained equipment</li>
                      <li>• Comprehensive insurance coverage</li>
                      <li>• Proven teaching methodologies</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Star className="w-6 h-6 text-turquoise" />
                      Exclusive Benefits
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Special KiteSafaris discounts</li>
                      <li>• Priority booking and availability</li>
                      <li>• Personalized service and support</li>
                      <li>• Access to premium equipment</li>
                      <li>• Extended lesson packages</li>
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
                {/* Quick Booking */}
                <div className="bg-deep-navy text-white rounded-lg p-6">
                  <h3 className="text-xl font-montserrat font-bold mb-4">Book Your Lessons</h3>
                  <p className="text-gray-300 mb-4">
                    Ready to start your kitesurfing journey? Contact us to book your lessons with exclusive KiteSafaris discounts.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-turquoise text-white px-4 py-2 rounded-lg font-medium hover:bg-turquoise/90 transition-colors w-full justify-center"
                  >
                    Get Started Today
                  </Link>
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
