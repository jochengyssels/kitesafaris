import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { ArrowLeft, Users, Award, Clock, Wind, MapPin, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Kitesurf School Sardinia (Punta Trettu) | Lessons & Beginners",
  description: "Learn kitesurfing in Sardinia at Punta Trettu: beginner lessons, coaching, and partner schools.",
  keywords: [
    "Kitesurf school Sardinia",
    "kitesurf lessons Sardinia",
    "kitesurfing lessons Punta Trettu",
    "beginner kitesurfing Sardinia",
    "kitesurf instruction Sardinia",
    "Punta Trettu kitesurf school",
    "Sardinia kitesurfing lessons",
    "kitesurfing beginner Italy",
    "kitesurf school Punta Trettu",
    "kitesurfing lessons Italy"
  ],
  openGraph: {
    title: "Kitesurf School Sardinia (Punta Trettu) | Lessons & Beginners",
    description: "Learn kitesurfing in Sardinia at Punta Trettu: beginner lessons, coaching, and partner schools.",
    url: "https://www.kitesafaris.com/destinations/sardinia/punta-trettu/kitesurf-lessons",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png",
        width: 1200,
        height: 630,
        alt: "Kitesurf lessons at Punta Trettu, Sardinia",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitesurf School Sardinia (Punta Trettu) | Lessons & Beginners",
    description: "Learn kitesurfing in Sardinia at Punta Trettu: beginner lessons, coaching, and partner schools.",
    images: ["https://kitesafaris.com/sardinia-punta-trettu-kiteboarding-mediterranean-c.png"],
  },
  alternates: {
    canonical: "https://www.kitesafaris.com/destinations/sardinia/punta-trettu/kitesurf-lessons",
  },
}

const faqData = [
  {
    question: "Who are the kitesurf lessons for?",
    answer: "Our kitesurf lessons at Punta Trettu are designed for complete beginners to intermediate riders. The flat-water lagoon conditions make it perfect for first-time kitesurfers, while experienced riders can refine their skills in a safe, controlled environment."
  },
  {
    question: "What lesson formats are available?",
    answer: "We offer private 1:1 lessons for personalized attention, small group lessons (2:1 or 3:1) for social learning, and intensive courses for faster progression. All lessons include radio communication, rescue support, and modern equipment."
  },
  {
    question: "What equipment is provided?",
    answer: "All necessary kitesurfing equipment is included: kites, boards, harnesses, wetsuits, helmets, and safety gear. We use modern, well-maintained equipment suitable for all skill levels and conditions."
  },
  {
    question: "What should I bring to my lesson?",
    answer: "Bring swimwear, sunscreen, a towel, and a positive attitude! We provide all kitesurfing equipment. For early/late season lessons, we recommend bringing a light jacket for before and after sessions."
  },
  {
    question: "How long does it take to learn kitesurfing?",
    answer: "Most beginners can achieve basic kite control and water starts within 3-5 days of lessons. Independent riding typically takes 5-7 days. The flat-water conditions at Punta Trettu accelerate the learning process significantly."
  },
  {
    question: "Are the instructors certified?",
    answer: "Yes! All our partner schools employ IKO (International Kiteboarding Organization) certified instructors with extensive experience teaching in flat-water conditions. They specialize in beginner progression and safety protocols."
  }
]

export default function KitesurfLessonsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Kitesurf School Sardinia (Punta Trettu) | Lessons & Beginners",
    "description": "Learn kitesurfing in Sardinia at Punta Trettu: beginner lessons, coaching, and partner schools.",
    "author": {
      "@type": "Organization",
      "name": "KiteSafaris"
    },
    "publisher": {
      "@type": "Organization",
      "name": "KiteSafaris",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kitesafaris.com/logo.png"
      }
    },
    "datePublished": "2025-01-09",
    "dateModified": "2025-01-09",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.kitesafaris.com/destinations/sardinia/punta-trettu/kitesurf-lessons"
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
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
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Kitesurf Lessons",
        "item": "https://kitesafaris.com/destinations/sardinia/punta-trettu/kitesurf-lessons"
      }
    ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
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
            <Link href="/destinations/sardinia/punta-trettu" className="text-gray-500 hover:text-deep-navy">Punta Trettu</Link>
            <span className="text-gray-400">/</span>
            <span className="text-deep-navy font-medium">Kitesurf Lessons</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-deep-navy via-turquoise to-sand-beige text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-bold mb-6">
              Kitesurf School Sardinia – Punta Trettu Lessons
            </h1>
            <p className="text-xl sm:text-2xl font-open-sans mb-8 leading-relaxed">
              Learn kitesurfing in Sardinia at Punta Trettu with professional instruction, modern equipment, and exclusive KiteSafaris discounts.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <Users className="w-5 h-5" />
                <span className="font-medium">All Skill Levels</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <Award className="w-5 h-5" />
                <span className="font-medium">IKO Certified Instructors</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Flexible Scheduling</span>
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
            {/* Who It's For */}
            <section className="mb-12">
              <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                Who Are Kitesurf Lessons For?
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our kitesurf lessons at Punta Trettu are designed for complete beginners to intermediate riders. The flat-water lagoon conditions make it perfect for first-time kitesurfers, while experienced riders can refine their skills in a safe, controlled environment.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Users className="w-6 h-6 text-turquoise" />
                      Beginners
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Complete first-time kitesurfers</li>
                      <li>• Safe flat-water learning environment</li>
                      <li>• Step-by-step progression program</li>
                      <li>• Modern equipment and safety gear</li>
                      <li>• Patient, experienced instructors</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Award className="w-6 h-6 text-turquoise" />
                      Intermediate Riders
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Skill refinement and progression</li>
                      <li>• Advanced technique coaching</li>
                      <li>• Jump and trick instruction</li>
                      <li>• Equipment optimization</li>
                      <li>• Performance analysis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Lesson Formats */}
            <section className="mb-12">
              <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                Lesson Formats & Options
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  We offer flexible lesson formats to suit every learning style and budget. Whether you prefer personalized attention or social learning, our partner schools provide comprehensive programs designed for the unique conditions of Punta Trettu.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4">
                      Private 1:1 Lessons
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      For fastest progression and personalized attention, private lessons allow instructors to focus entirely on your specific needs and learning pace. Perfect for those who want to maximize their time and progress quickly.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Complete instructor attention</li>
                      <li>• Customized lesson plans</li>
                      <li>• Flexible scheduling</li>
                      <li>• Faster skill development</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4">
                      Small Group Lessons (2:1 or 3:1)
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Small group lessons offer a great balance of personalized instruction and social learning. Perfect for couples, families, or friends learning together while still receiving individual attention.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Social learning environment</li>
                      <li>• Cost-effective option</li>
                      <li>• Individual attention maintained</li>
                      <li>• Great for couples and families</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4">
                      Intensive Courses
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Multi-day intensive courses provide comprehensive training from beginner to independent rider. These programs combine theory, practice, and safety training for complete kitesurfing education.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 3-5 day comprehensive programs</li>
                      <li>• Theory and practical training</li>
                      <li>• Safety certification included</li>
                      <li>• Equipment rental included</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Partner Schools */}
            <section className="mb-12">
              <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                Partner Schools at Punta Trettu
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  KiteSafaris has established exclusive partnerships with the leading kitesurf schools at Punta Trettu. These schools understand the unique advantages of the lagoon and have developed specialized teaching methods that maximize learning potential.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-turquoise/10 to-deep-navy/10 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4">
                      <a href="https://prokitesardegna.com/" target="_blank" rel="noopener noreferrer" className="text-turquoise hover:text-deep-navy transition-colors">
                        PROKITE SARDEGNA
                      </a>
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Professional kitesurfing school offering beginner to advanced courses with certified IKO instructors. Specializes in flat-water instruction and safety protocols, making them perfect for first-time kitesurfers.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• IKO certified instructors</li>
                      <li>• Modern equipment fleet</li>
                      <li>• Safety-first approach</li>
                      <li>• Beginner-friendly programs</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-turquoise/10 to-deep-navy/10 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4">
                      <a href="https://kitehousesardinia.com/" target="_blank" rel="noopener noreferrer" className="text-turquoise hover:text-deep-navy transition-colors">
                        KITEHOUSE SARDINIA
                      </a>
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Modern kitesurfing center with premium equipment and experienced instructors. Offers personalized lessons and group courses for all skill levels, with a focus on progression and technique refinement.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Premium equipment selection</li>
                      <li>• Experienced international instructors</li>
                      <li>• Personalized coaching approach</li>
                      <li>• Advanced technique training</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* What to Bring */}
            <section className="mb-12">
              <h2 className="text-3xl font-montserrat font-bold text-deep-navy mb-6">
                What to Bring & Wind Sizes
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  All necessary kitesurfing equipment is provided by the schools, but there are a few personal items you should bring to ensure a comfortable and safe learning experience.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4">
                      What to Bring
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Swimwear (board shorts or bikini)</li>
                      <li>• Sunscreen (reef-safe recommended)</li>
                      <li>• Towel and change of clothes</li>
                      <li>• Sunglasses with strap</li>
                      <li>• Water bottle</li>
                      <li>• Positive attitude and patience!</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-montserrat font-semibold text-deep-navy mb-4">
                      Wind Sizes & Conditions
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Light winds (12-15 knots): 12-14m kites</li>
                      <li>• Moderate winds (15-20 knots): 9-12m kites</li>
                      <li>• Strong winds (20-25 knots): 7-9m kites</li>
                      <li>• All equipment provided by schools</li>
                      <li>• Instructors select appropriate sizes</li>
                    </ul>
                  </div>
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
                <h3 className="text-xl font-montserrat font-bold mb-4">Lesson Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Duration:</span>
                    <span className="font-medium">2-4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Group Size:</span>
                    <span className="font-medium">1-3 students</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Equipment:</span>
                    <span className="font-medium">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Instructors:</span>
                    <span className="font-medium">IKO Certified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Safety:</span>
                    <span className="font-medium">Radio + Rescue</span>
                  </div>
                </div>
              </div>

              {/* KiteSafaris Discount */}
              <div className="bg-turquoise/10 rounded-lg p-6">
                <h3 className="text-xl font-montserrat font-bold text-deep-navy mb-4">KiteSafaris Exclusive</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-turquoise" />
                    <span className="text-gray-700">Special rates for KiteSafaris guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-turquoise" />
                    <span className="text-gray-700">Priority booking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-turquoise" />
                    <span className="text-gray-700">Equipment upgrades</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-turquoise" />
                    <span className="text-gray-700">Extended lesson times</span>
                  </div>
                </div>
              </div>

              {/* Related Links */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-montserrat font-bold text-deep-navy mb-4">Related Pages</h3>
                <div className="space-y-3">
                  <Link href="/destinations/sardinia/punta-trettu" className="block text-turquoise hover:text-deep-navy transition-colors">
                    ← Back to Punta Trettu Guide
                  </Link>
                  <Link href="/destinations/sardinia/punta-trettu/webcam" className="block text-turquoise hover:text-deep-navy transition-colors">
                    Live Webcam
                  </Link>
                  <Link href="/booking" className="block text-turquoise hover:text-deep-navy transition-colors">
                    Book Your Trip
                  </Link>
                  <Link href="/trip-calendar" className="block text-turquoise hover:text-deep-navy transition-colors">
                    Trip Calendar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-deep-navy via-deep-navy/95 to-turquoise/20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-6">
              Ready to Learn
              <span className="block text-turquoise">Kitesurfing in Sardinia?</span>
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Join KiteSafaris for professional kitesurfing lessons at Punta Trettu. 
              Experience the perfect flat-water conditions with certified instructors and exclusive discounts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/booking" 
                className="inline-flex items-center px-8 py-4 bg-coral-orange hover:bg-coral-orange/90 text-white font-semibold rounded-lg transition-all duration-300 text-lg group"
              >
                Book Your Lessons
                <ArrowLeft className="w-5 h-5 ml-2 group-hover:-translate-x-1 transition-transform rotate-180" />
              </Link>
              <Link 
                href="/destinations/sardinia/punta-trettu" 
                className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 text-lg border border-white/30"
              >
                View Complete Guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
