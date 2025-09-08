import { Navigation } from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, User, ArrowLeft, Calendar, MapPin, ExternalLink, Award, Users, Star, Phone, Mail, Anchor, Chef, Globe, Wind, Waves } from "lucide-react"
import { SardinianAwakeningCTA } from "@/components/sardinian-awakening-cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "KiteSafaris Partners with Kitehouse Sardinia | Strategic Partnership",
  description:
    "KiteSafaris announces strategic partnership with Kitehouse Sardinia, expanding kite-centric accommodations and course offerings in Punta Trettu, Sardinia.",
  keywords:
    "KiteSafaris Kitehouse Sardinia partnership, Punta Trettu kitesurfing, Sardinia kiteboarding, IKO certified instruction, luxury kite accommodations, Mediterranean kitesurfing",
  alternates: {
    canonical: "https://kitesafaris.com/blog/kitesafaris-kitehouse-sardinia-partnership",
  },
  openGraph: {
    title: "KiteSafaris Forms Strategic Partnership with Kitehouse Sardinia",
    description: "Strategic partnership expands kite-centric accommodations and course offerings in Punta Trettu, Sardinia's top kite destination.",
    url: "https://kitesafaris.com/blog/kitesafaris-kitehouse-sardinia-partnership",
    type: "article",
    images: [
      {
        url: "/partners/partnership-kitehouse-kitesafaris.jpg",
        width: 1200,
        height: 630,
        alt: "KiteSafaris Kitehouse Sardinia partnership for luxury kite accommodations",
      },
    ],
  },
}

const kitehouseServices = [
  {
    icon: "🏄‍♂️",
    title: "IKO Certified Courses",
    description: "Beginner, advanced, children's programs, and private coaching with experienced instructors",
  },
  {
    icon: "🏠",
    title: "Kite-Centric Accommodations",
    description: "Holiday apartments and kitecamp stays designed by passionate kitesurfers",
  },
  {
    icon: "🏊‍♂️",
    title: "Premium Amenities",
    description: "Swimming pool, garden, fitness zone, bar, and social kitchens",
  },
  {
    icon: "🌊",
    title: "Multiple Locations",
    description: "Lessons at Punta Trettu, Porto Botte, and Is Solinas spots",
  },
  {
    icon: "🏄‍♀️",
    title: "Advanced Clinics",
    description: "Wingfoil and progression training for experienced riders",
  },
  {
    icon: "🚁",
    title: "Rescue Services",
    description: "Premium gear rental and professional rescue support",
  },
]

const accommodationFeatures = [
  {
    category: "Luxury Living",
    features: [
      "Comfortable holiday apartments with private bathrooms",
      "On-site swimming pool and garden areas",
      "Fitness zone and bar facilities",
      "Social kitchens for group dining",
      "Family-friendly property with club house",
    ],
  },
  {
    category: "Kiter-Specific Amenities",
    features: [
      "Private, gear-friendly rooms",
      "Dedicated kite storage and washing areas",
      "Radio-equipped instructors for safety",
      "Multilingual instruction team",
      "Flexible session locations",
    ],
  },
  {
    category: "Extra Activities",
    features: [
      "Yoga sessions for relaxation",
      "Bike tours of Sardinia",
      "Wakeboarding experiences",
      "Horse riding excursions",
      "Cultural and nature tours",
    ],
  },
]

const puntaTrettuAdvantages = [
  {
    name: "Flat Water Conditions",
    description: "Perfect lagoon conditions for learning and progression",
  },
  {
    name: "Consistent Winds",
    description: "Reliable wind patterns ideal for kitesurfing",
  },
  {
    name: "Beginner Friendly",
    description: "Safe learning environment with shallow waters",
  },
  {
    name: "Advanced Spots",
    description: "Challenging conditions for experienced riders",
  },
  {
    name: "Scenic Beauty",
    description: "Stunning Mediterranean landscape and crystal-clear waters",
  },
  {
    name: "Community Atmosphere",
    description: "Vibrant international kitesurfing community",
  },
]

const partnershipBenefits = [
  {
    title: "Seamless Integration",
    description: "Combined catamaran adventures with land-based kite experiences",
    icon: "🤝",
  },
  {
    title: "Expert Instruction",
    description: "IKO certified instructors with multilingual support",
    icon: "🏆",
  },
  {
    title: "Flexible Packages",
    description: "Standalone kitecamp or combined safari experiences",
    icon: "📦",
  },
  {
    title: "Community Experience",
    description: "Join a vibrant international kitesurfing community",
    icon: "🌍",
  },
  {
    title: "Year-Round Access",
    description: "Optimal conditions with seasonal flexibility",
    icon: "📅",
  },
  {
    title: "Holistic Experience",
    description: "Complete package with meals, transfers, and activities",
    icon: "✨",
  },
]

export default function KitehousePartnershipBlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: "KiteSafaris Forms Strategic Partnership with Kitehouse Sardinia",
            description: "Strategic partnership expands kite-centric accommodations and course offerings in Punta Trettu, Sardinia's top kite destination.",
            author: {
              "@type": "Organization",
              name: "KiteSafaris.com",
            },
            publisher: {
              "@type": "Organization",
              name: "KiteSafaris.com",
              logo: {
                "@type": "ImageObject",
                url: "https://kitesafaris.com/logo.png",
              },
            },
            datePublished: "2025-09-08",
            dateModified: "2025-09-08",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://kitesafaris.com/blog/kitesafaris-kitehouse-sardinia-partnership",
            },
            image: "https://kitesafaris.com/partners/partnership-kitehouse-kitesafaris.jpg",
          }),
        }}
      />

      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src="/partners/partnership-kitehouse-kitesafaris.jpg"
            alt="KiteSafaris Kitehouse Sardinia partnership for luxury kite accommodations"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-coral-orange text-white px-3 py-1 rounded text-sm font-medium">Partnership</span>
                <span className="bg-turquoise text-white px-3 py-1 rounded text-sm font-medium">Sardinia</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat text-balance">
                🏄‍♂️ KiteSafaris Forms Strategic Partnership with Kitehouse Sardinia
              </h1>
              <div className="flex items-center text-white/80 space-x-6">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>8 min read</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>KiteSafaris Team</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>September 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none">
                  <div className="bg-gradient-to-r from-turquoise-50 to-sand-beige-50 rounded-2xl p-8 border border-turquoise-200/50 mb-8">
                    <h2 className="font-montserrat font-bold text-2xl text-deep-navy mb-4">FOR IMMEDIATE RELEASE</h2>
                    <p className="text-xl text-deep-navy/80 font-open-sans leading-relaxed">
                      KiteSafaris, the leader in premium catamaran-based kitesurfing adventures, announces an exciting new partnership with <a href="https://www.kitehousesardinia.com" target="_blank" rel="noopener noreferrer" className="text-coral-orange hover:text-coral-orange/80 font-semibold">Kitehouse Sardinia</a>—one of the most established kitesurf schools and accommodation providers in southern Sardinia. This collaboration empowers KiteSafaris guests to seamlessly pair internationally certified kite lessons in the renowned Punta Trettu spot with unique, kiter-designed lodging experiences.
                    </p>
                  </div>

                  <p className="font-open-sans text-deep-navy/90 leading-relaxed mb-8">
                    <strong>San Giovanni Suergiu, Sardinia</strong> – September 2025 – This strategic partnership sets a new standard for traveler convenience, especially for groups, families, or solo kiters searching for stress-free packages that combine world-class instruction with authentic local experiences.
                  </p>

                  {/* Unlocking the Full Kitesurf Experience */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-turquoise rounded-full">
                        <Wind className="w-6 h-6 text-white" />
                      </div>
                      🌊 Unlocking the Full Kitesurf Experience in Punta Trettu
                    </h2>

                    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg mb-8">
                      <div className="flex items-start gap-6 mb-6">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-2 border-turquoise">
                          <Image
                            src="/logos/kitehouse-logo.png"
                            alt="Kitehouse Sardinia Logo"
                            width={60}
                            height={60}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-montserrat font-bold text-2xl text-deep-navy mb-2">Kitehouse Sardinia</h3>
                          <p className="font-open-sans text-coral-orange font-semibold mb-2">IKO Affiliated Center</p>
                          <p className="font-open-sans text-deep-navy/80">
                            Recognized as an International Kiteboarding Organization (IKO) affiliated center, offering comprehensive kitesurf education and premium accommodation services in Sardinia's premier kite destination.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {kitehouseServices.map((service, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-turquoise-50 to-sand-beige-50 rounded-xl p-6 border border-turquoise-200/50"
                        >
                          <div className="text-3xl mb-3">{service.icon}</div>
                          <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">{service.title}</h3>
                          <p className="font-open-sans text-deep-navy/80 text-sm">{service.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* A Destination Designed for Kiters by Kiters */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-coral-orange rounded-full">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      🏠 A Destination Designed for Kiters by Kiters
                    </h2>

                    <div className="bg-gradient-to-r from-coral-orange-50 to-sand-beige-50 rounded-2xl p-8 border border-coral-orange-200/50 mb-8">
                      <blockquote className="text-lg font-open-sans text-deep-navy/90 italic mb-6">
                        "This partnership means our guests no longer have to choose between expert instruction, unique local lodging, and a true community getaway—you can have it all, organized through one seamless booking platform."
                      </blockquote>
                      <p className="font-open-sans text-deep-navy/80">— KiteSafaris co-founder</p>
                    </div>

                    <p className="font-open-sans text-deep-navy/90 leading-relaxed mb-6">
                      Set in the lush countryside of San Giovanni Suergiu, Kitehouse Sardinia's property was conceived by passionate kitesurfers and welcomes guests with a vibrant, international community atmosphere. The house and gardens are steps from the Sant'Antioco lagoon and less than a 5-minute drive from Punta Trettu—Sardinia's flat-water and steady-wind paradise.
                    </p>

                    <div className="space-y-8">
                      {accommodationFeatures.map((category, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                          <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-4">{category.category}</h3>
                          <ul className="space-y-2">
                            {category.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="font-open-sans text-deep-navy/80 flex items-start">
                                <span className="w-2 h-2 bg-turquoise rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Punta Trettu Advantages */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-sand-beige rounded-full">
                        <Waves className="w-6 h-6 text-deep-navy" />
                      </div>
                      🏄‍♂️ Why Punta Trettu is Sardinia's Premier Kite Destination
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {puntaTrettuAdvantages.map((advantage, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-sand-beige-50 to-turquoise-50 rounded-xl p-6 border border-sand-beige-200"
                        >
                          <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">{advantage.name}</h3>
                          <p className="font-open-sans text-deep-navy/80 text-sm">{advantage.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* New Standards in Kitesurf Hospitality */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-deep-navy rounded-full">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      ✨ New Standards in Kitesurf Hospitality and Flexibility
                    </h2>

                    <div className="bg-gradient-to-r from-deep-navy to-turquoise rounded-2xl p-8 text-white mb-8">
                      <blockquote className="text-lg font-open-sans text-turquoise-100 italic mb-6">
                        "We're thrilled to welcome KiteSafaris guests and share our passion for South Sardinia's unique conditions and lifestyle. Here, you're not just a customer—you're family."
                      </blockquote>
                      <p className="font-open-sans text-turquoise-100">— Kitehouse Sardinia manager</p>
                    </div>

                    <p className="font-open-sans text-deep-navy/90 leading-relaxed mb-6">
                      By integrating accommodations and kite services under one roof, the partnership sets a new standard for traveler convenience, especially for groups, families, or solo kiters searching for stress-free packages. Airport transfers, organic meals, bike rentals, group dinners, and travel tips round out a holistic experience catering to both adventure and relaxation.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {partnershipBenefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-xl p-6 border border-gray-200 hover:border-turquoise-300 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="text-3xl mb-3">{benefit.icon}</div>
                          <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">{benefit.title}</h3>
                          <p className="font-open-sans text-deep-navy/80 text-sm">{benefit.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking and Further Information */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-6 flex items-center gap-3">
                      <div className="p-2 bg-coral-orange rounded-full">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      📅 Booking and Further Information
                    </h2>

                    <div className="bg-gradient-to-r from-turquoise to-coral-orange rounded-2xl p-8 text-white">
                      <h3 className="font-montserrat font-bold text-2xl mb-4">🏄‍♂️ Ready for Your Sardinia Kite Adventure?</h3>
                      <p className="font-open-sans text-xl mb-6 text-white/90">
                        Combine your KiteSafaris catamaran adventure with a few extra nights in South Sardinia or book a standalone kitecamp via the KiteSafaris platform. This partnership cements Sardinia's Punta Trettu as Europe's most comprehensive and welcoming kitesurfing hub.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-montserrat font-bold text-lg mb-2">🌐 Full Details Available</h4>
                          <p className="font-open-sans text-white/90">KiteSafaris: www.kitesafaris.com</p>
                          <p className="font-open-sans text-white/90">Kitehouse Sardinia: www.kitehousesardinia.com</p>
                        </div>
                        <div>
                          <h4 className="font-montserrat font-bold text-lg mb-2">📧 Contact Information</h4>
                          <p className="font-open-sans text-white/90">info@kitesafaris.com</p>
                          <p className="font-open-sans text-white/90">info@kitehousesardinia.com</p>
                        </div>
                      </div>
                      <Link
                        href="/contact/kitehouse"
                        className="inline-flex items-center bg-white hover:bg-white/90 text-deep-navy px-8 py-4 rounded-full font-montserrat font-bold text-lg transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Contact Us for Kite Adventure
                      </Link>
                    </div>
                  </div>

                  <div className="mt-12">
                    <SardinianAwakeningCTA variant="blog" />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-sand-beige rounded-lg p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-deep-navy mb-4 font-montserrat">Partnership Highlights</h3>

                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg border border-sand-beige-200">
                      <h4 className="font-montserrat font-bold text-deep-navy mb-2">🏄‍♂️ Kitehouse Sardinia</h4>
                      <ul className="font-open-sans text-sm text-deep-navy/80 space-y-1">
                        <li>• IKO affiliated center</li>
                        <li>• Punta Trettu location</li>
                        <li>• Multilingual instructors</li>
                        <li>• Radio-equipped safety</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-sand-beige-200">
                      <h4 className="font-montserrat font-bold text-deep-navy mb-2">🏠 Accommodation Features</h4>
                      <ul className="font-open-sans text-sm text-deep-navy/80 space-y-1">
                        <li>• Holiday apartments</li>
                        <li>• Swimming pool & garden</li>
                        <li>• Fitness zone & bar</li>
                        <li>• Kite storage areas</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-turquoise-50 rounded-lg border border-turquoise-200">
                      <h4 className="font-montserrat font-bold text-deep-navy mb-2">🌊 Punta Trettu Advantages</h4>
                      <ul className="font-open-sans text-sm text-deep-navy/80 space-y-1">
                        <li>• Flat water conditions</li>
                        <li>• Consistent winds</li>
                        <li>• Beginner friendly</li>
                        <li>• 5-min drive from property</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-coral-orange-50 rounded-lg border border-coral-orange-200">
                      <h4 className="font-montserrat font-bold text-deep-navy mb-2">🎯 Extra Activities</h4>
                      <ul className="font-open-sans text-xs text-deep-navy/80 space-y-1">
                        <li>• Yoga sessions</li>
                        <li>• Bike tours</li>
                        <li>• Wakeboarding</li>
                        <li>• Horse riding</li>
                        <li>• Cultural excursions</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-deep-navy/10">
                    <h4 className="text-sm font-semibold text-deep-navy/60 mb-3">Ready for Your Adventure?</h4>
                    <Link
                      href="/contact/kitehouse"
                      className="block w-full text-center bg-coral-orange text-white py-3 px-4 rounded-lg hover:bg-coral-orange/90 transition-colors font-semibold"
                    >
                      Contact Us for Kite Experience
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
