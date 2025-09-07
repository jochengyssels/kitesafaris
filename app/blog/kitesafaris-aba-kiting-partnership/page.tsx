import { Navigation } from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, User, ArrowLeft, Calendar, MapPin, ExternalLink, Award, Users, Star, Phone, Mail, Anchor, Chef, Globe } from "lucide-react"
import { SardinianAwakeningCTA } from "@/components/sardinian-awakening-cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "KiteSafaris Partners with ABA Kiting for Luxury Catamaran Operations | KiteSafaris",
  description:
    "KiteSafaris announces strategic partnership with ABA Kiting, expanding luxury catamaran kitesurfing experiences across Caribbean and Mediterranean destinations.",
  keywords:
    "KiteSafaris ABA Kiting partnership, luxury catamaran kitesurfing, Caribbean Mediterranean sailing, premium kitesurfing experiences, luxury yacht charter",
  alternates: {
    canonical: "https://kitesafaris.com/blog/kitesafaris-aba-kiting-partnership",
  },
  openGraph: {
    title: "KiteSafaris Partners with ABA Kiting for Luxury Catamaran Operations",
    description: "Strategic partnership expands luxury catamaran kitesurfing experiences across Caribbean and Mediterranean destinations.",
    url: "https://kitesafaris.com/blog/kitesafaris-aba-kiting-partnership",
    type: "article",
    images: [
      {
        url: "/partnership-kitesafaris-abakiting.jpg",
        width: 1200,
        height: 630,
        alt: "KiteSafaris ABA Kiting partnership for luxury catamaran operations",
      },
    ],
  },
}

const fleetSpecifications = [
  {
    icon: "🚤",
    title: "17.6-meter Catamaran",
    description: "Premium luxury catamaran with 8.5-meter beam for stability and comfort",
  },
  {
    icon: "🏠",
    title: "Three Private Cabins",
    description: "Accommodating up to six guests with master cabin and private bathroom",
  },
  {
    icon: "🍳",
    title: "Professional Galley",
    description: "State-of-the-art appliances for gourmet dining experiences",
  },
  {
    icon: "📶",
    title: "Onboard WiFi",
    description: "Modern navigation equipment and connectivity for digital nomads",
  },
  {
    icon: "🛡️",
    title: "Safety Equipment",
    description: "Meeting international maritime standards for peace of mind",
  },
  {
    icon: "⚓",
    title: "Direct Boat Launch",
    description: "Capability for kites and wings with motor boat escort learning",
  },
]

const servicePortfolio = [
  {
    category: "Kitesurfing Instruction",
    services: [
      "Private IKO-certified instruction (€120/hour)",
      "Kiteboarding, kite foiling, and wing foiling",
      "Equipment provision and rescue service support",
      "Unlimited upwind motor boat assistance",
      "Motor boat escort learning for enhanced safety",
    ],
  },
  {
    category: "Luxury Accommodation",
    services: [
      "Private chef services with international cuisine",
      "Premium onboard dining with specialized menus",
      "Flexible yacht rental options",
      "Special event hosting (weddings, corporate retreats)",
      "Three private cabins with master suite",
    ],
  },
  {
    category: "Destination Access",
    services: [
      "Caribbean: Antigua, Barbuda, Great Bird Island",
      "Greek Islands: Paros, Antiparos, Naxos, Koufonisia",
      "UNESCO World Heritage sites access",
      "Secret spots and exclusive locations",
      "Year-round optimal wind conditions",
    ],
  },
]

const caribbeanDestinations = [
  {
    name: "Hansons Bay",
    description: "Consistent trade winds and optimal kitesurfing conditions",
  },
  {
    name: "Nonsuch Bay",
    description: "Protected waters perfect for learning and progression",
  },
  {
    name: "Barbuda Pink Beaches",
    description: "Pristine beaches with unique pink sand formations",
  },
  {
    name: "Nelson's Dockyard",
    description: "UNESCO World Heritage site with historical significance",
  },
  {
    name: "Great Bird Island",
    description: "Remote location with exclusive access",
  },
  {
    name: "Codrington Lagoon",
    description: "Protected lagoon with flat water conditions",
  },
]

const mediterraneanDestinations = [
  {
    name: "Mikri Vigla Beach",
    description: "Legendary flat water lagoons with Meltemi winds",
  },
  {
    name: "Paros Northern Coast",
    description: "Secret spots with consistent wind patterns",
  },
  {
    name: "Koufonisia",
    description: "Unspoiled tranquility with crystal-clear waters",
  },
  {
    name: "Antiparos",
    description: "Protected bays with beginner-friendly conditions",
  },
  {
    name: "Naxos",
    description: "Diverse kitesurfing spots for all skill levels",
  },
]

const operationalSynergies = [
  {
    title: "Geographic Coverage",
    description: "Expanding across Caribbean and Mediterranean markets",
    icon: "🌍",
  },
  {
    title: "Best Practices Sharing",
    description: "Luxury catamaran operations and safety protocols",
    icon: "📚",
  },
  {
    title: "Cross-Marketing",
    description: "Opportunities to respective client bases",
    icon: "📈",
  },
  {
    title: "Booking Flexibility",
    description: "Complementary seasonal operations",
    icon: "📅",
  },
  {
    title: "Knowledge Exchange",
    description: "Kitesurfing instruction and hospitality services",
    icon: "🤝",
  },
]

export default function ABAPartnershipBlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: "KiteSafaris Partners with ABA Kiting for Luxury Catamaran Operations",
            description: "Strategic partnership expands luxury catamaran kitesurfing experiences across Caribbean and Mediterranean destinations.",
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
              "@id": "https://kitesafaris.com/blog/kitesafaris-aba-kiting-partnership",
            },
            image: "https://kitesafaris.com/partnership-kitesafaris-abakiting.jpg",
          }),
        }}
      />

      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src="/partners/partnership-kitesafaris-abakiting.jpg"
            alt="KiteSafaris ABA Kiting partnership for luxury catamaran operations"
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
                <span className="bg-turquoise text-white px-3 py-1 rounded text-sm font-medium">Luxury Operations</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat text-balance">
                🚤 KiteSafaris Partners with ABA Kiting for Luxury Catamaran Operations
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
                  <p className="text-xl text-deep-navy/80 font-open-sans leading-relaxed mb-8">
                    KiteSafaris, the luxury catamaran kitesurfing safari specialist, today announced a groundbreaking partnership with <a href="https://www.aba-kiting.com" target="_blank" rel="noopener noreferrer" className="text-coral-orange hover:text-coral-orange/80 font-semibold">ABA Kiting</a>, a premier luxury catamaran operation offering world-class kitesurfing experiences across the Caribbean and Mediterranean. This strategic alliance significantly expands <a href="https://www.kitesafaris.com" target="_blank" rel="noopener noreferrer" className="text-turquoise hover:text-turquoise/80 font-semibold">KiteSafaris</a>' operational capabilities while reinforcing both companies' commitment to delivering exceptional catamaran-based adventure travel.
                  </p>

                  <p className="font-open-sans text-deep-navy/90 leading-relaxed mb-8">
                    The partnership brings together two industry leaders who share a passion for combining luxury sailing with professional kitesurfing instruction, creating an unparalleled network of premium catamaran experiences spanning multiple world-class destinations.
                  </p>

                  {/* Partnership Benefits */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-coral-orange rounded-full">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      🌟 Strategic Alliance Benefits
                    </h2>

                    <div className="bg-gradient-to-r from-turquoise-50 to-sand-beige-50 rounded-2xl p-8 border border-turquoise-200/50 mb-8">
                      <blockquote className="text-lg font-open-sans text-deep-navy/90 italic mb-6">
                        "ABA Kiting represents the gold standard in luxury catamaran operations. Their expertise in seamlessly blending professional kitesurfing instruction with five-star hospitality perfectly aligns with our vision of redefining adventure travel. This partnership allows us to offer our clients an even broader range of extraordinary experiences."
                      </blockquote>
                      <p className="font-open-sans text-deep-navy/80">— KiteSafaris Spokesperson</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-turquoise-300 hover:shadow-lg transition-all duration-300">
                        <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-3">🌍 Global Network</h3>
                        <p className="font-open-sans text-deep-navy/80">
                          Expanded operational capabilities across Caribbean and Mediterranean destinations with year-round coverage.
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-turquoise-300 hover:shadow-lg transition-all duration-300">
                        <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-3">🏆 Luxury Standards</h3>
                        <p className="font-open-sans text-deep-navy/80">
                          Combined expertise in luxury sailing and professional kitesurfing instruction for unparalleled experiences.
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-turquoise-300 hover:shadow-lg transition-all duration-300">
                        <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-3">📅 Seasonal Operations</h3>
                        <p className="font-open-sans text-deep-navy/80">
                          Caribbean operations (December-April) and Greek islands (June-September) for optimal wind conditions.
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-turquoise-300 hover:shadow-lg transition-all duration-300">
                        <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-3">🤝 Industry Leadership</h3>
                        <p className="font-open-sans text-deep-navy/80">
                          Two industry leaders combining forces to redefine luxury adventure travel standards.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* About ABA Kiting */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-turquoise rounded-full">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      🚤 About ABA Kiting
                    </h2>

                    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
                      <div className="flex items-start gap-6 mb-6">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-2 border-turquoise">
                          <Image
                            src="/logos/aba-kiting-logo.png"
                            alt="ABA Kiting Logo"
                            width={60}
                            height={60}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-montserrat font-bold text-2xl text-deep-navy mb-2">Captain Enrico Maccaferri</h3>
                          <p className="font-open-sans text-coral-orange font-semibold mb-2">Founder & Captain</p>
                          <ul className="font-open-sans text-deep-navy/80 space-y-1">
                            <li>• Certified IKO instructor</li>
                            <li>• Graduate of Nautical Institute of Venice</li>
                            <li>• 17+ years maritime experience</li>
                            <li>• 540+ satisfied clients across 30+ destinations</li>
                          </ul>
                        </div>
                      </div>
                      
                      <blockquote className="text-lg font-open-sans text-deep-navy/90 italic border-l-4 border-turquoise pl-6">
                        "Partnering with <a href="https://www.kitesafaris.com" target="_blank" rel="noopener noreferrer" className="text-turquoise hover:text-turquoise/80 font-semibold">KiteSafaris</a> creates exciting opportunities for collaboration and knowledge sharing. Together, we can elevate the entire luxury kitesurfing experience by combining our operational expertise with their innovative approach to adventure travel."
                      </blockquote>
                    </div>
                  </div>

                  {/* Fleet Specifications */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-deep-navy rounded-full">
                        <Anchor className="w-6 h-6 text-white" />
                      </div>
                      ⚓ Luxury Fleet Specifications
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {fleetSpecifications.map((spec, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-turquoise-50 to-sand-beige-50 rounded-xl p-6 border border-turquoise-200/50"
                        >
                          <div className="text-3xl mb-3">{spec.icon}</div>
                          <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">{spec.title}</h3>
                          <p className="font-open-sans text-deep-navy/80 text-sm">{spec.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service Portfolio */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-coral-orange rounded-full">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      🎯 Comprehensive Service Portfolio
                    </h2>

                    <div className="space-y-8">
                      {servicePortfolio.map((category, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                          <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-4">{category.category}</h3>
                          <ul className="space-y-2">
                            {category.services.map((service, serviceIndex) => (
                              <li key={serviceIndex} className="font-open-sans text-deep-navy/80 flex items-start">
                                <span className="w-2 h-2 bg-turquoise rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                {service}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Destination Experiences */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-sand-beige rounded-full">
                        <MapPin className="w-6 h-6 text-deep-navy" />
                      </div>
                      🌍 Premium Destination Experiences
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-gradient-to-br from-coral-orange-50 to-sand-beige-50 rounded-xl p-6 border border-coral-orange-200">
                        <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-4 flex items-center gap-2">
                          <span className="text-2xl">🏝️</span>
                          Caribbean Portfolio (December - April)
                        </h3>
                        <div className="space-y-3">
                          {caribbeanDestinations.map((destination, index) => (
                            <div key={index} className="bg-white/50 rounded-lg p-3">
                              <h4 className="font-montserrat font-semibold text-deep-navy">{destination.name}</h4>
                              <p className="font-open-sans text-sm text-deep-navy/80">{destination.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-turquoise-50 to-sand-beige-50 rounded-xl p-6 border border-turquoise-200">
                        <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-4 flex items-center gap-2">
                          <span className="text-2xl">🏛️</span>
                          Mediterranean Portfolio (June - September)
                        </h3>
                        <div className="space-y-3">
                          {mediterraneanDestinations.map((destination, index) => (
                            <div key={index} className="bg-white/50 rounded-lg p-3">
                              <h4 className="font-montserrat font-semibold text-deep-navy">{destination.name}</h4>
                              <p className="font-open-sans text-sm text-deep-navy/80">{destination.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operational Synergies */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-coral-orange rounded-full">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      🤝 Operational Synergies
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {operationalSynergies.map((synergy, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-xl p-6 border border-gray-200 hover:border-turquoise-300 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="text-3xl mb-3">{synergy.icon}</div>
                          <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">{synergy.title}</h3>
                          <p className="font-open-sans text-deep-navy/80 text-sm">{synergy.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Client Testimonials */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-turquoise rounded-full">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      💬 Client Testimonials
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-turquoise-50 to-sand-beige-50 rounded-xl p-6 border border-turquoise-200">
                        <blockquote className="text-lg font-open-sans text-deep-navy/90 italic mb-4">
                          "The kiting sessions with Enrico were simply the best. He made me feel confident on the water."
                        </blockquote>
                        <p className="font-open-sans text-deep-navy/80 font-semibold">— Albert, UK</p>
                      </div>
                      <div className="bg-gradient-to-br from-coral-orange-50 to-sand-beige-50 rounded-xl p-6 border border-coral-orange-200">
                        <blockquote className="text-lg font-open-sans text-deep-navy/90 italic mb-4">
                          "Iryna's cooking is out of this world! Her Ukrainian dishes, especially the borscht, were the highlight of the trip."
                        </blockquote>
                        <p className="font-open-sans text-deep-navy/80 font-semibold">— Maria, Germany</p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Information */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-6 flex items-center gap-3">
                      <div className="p-2 bg-coral-orange rounded-full">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      📅 Booking & Availability
                    </h2>

                    <div className="bg-gradient-to-r from-deep-navy to-turquoise rounded-2xl p-8 text-white">
                      <h3 className="font-montserrat font-bold text-2xl mb-4">🚤 Ready for Luxury Catamaran Adventures?</h3>
                      <p className="font-open-sans text-xl mb-6 text-turquoise-100">
                        The partnership becomes effective immediately, with integrated booking capabilities and cross-promotional opportunities available through both companies' platforms. ABA Kiting's established pricing structure (€3,500 per cabin for week-long experiences) complements KiteSafaris' premium positioning while offering clients additional choices and seasonal flexibility.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-montserrat font-bold text-lg mb-2">📅 Seasonal Operations</h4>
                          <p className="font-open-sans text-turquoise-100">Caribbean (Dec-Apr) and Greek Islands (Jun-Sep) for optimal conditions.</p>
                        </div>
                        <div>
                          <h4 className="font-montserrat font-bold text-lg mb-2">💰 Premium Pricing</h4>
                          <p className="font-open-sans text-turquoise-100">€3,500 per cabin for week-long luxury experiences.</p>
                        </div>
                      </div>
                      <Link
                        href="/contact"
                        className="inline-flex items-center bg-coral-orange hover:bg-coral-orange/90 text-white px-8 py-4 rounded-full font-montserrat font-bold text-lg transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Contact Us for Luxury Catamaran Experience
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
                      <h4 className="font-montserrat font-bold text-deep-navy mb-2">🚤 ABA Kiting Fleet</h4>
                      <ul className="font-open-sans text-sm text-deep-navy/80 space-y-1">
                        <li>• 17.6-meter luxury catamaran</li>
                        <li>• 3 private cabins (6 guests)</li>
                        <li>• Master cabin with private bathroom</li>
                        <li>• Professional galley & WiFi</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-sand-beige-200">
                      <h4 className="font-montserrat font-bold text-deep-navy mb-2">🌍 Dual-Season Operations</h4>
                      <ul className="font-open-sans text-sm text-deep-navy/80 space-y-1">
                        <li>• Caribbean: Dec-Apr</li>
                        <li>• Greek Islands: Jun-Sep</li>
                        <li>• 540+ satisfied clients</li>
                        <li>• 30+ destinations</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-turquoise-50 rounded-lg border border-turquoise-200">
                      <h4 className="font-montserrat font-bold text-deep-navy mb-2">📞 Contact Information</h4>
                      <div className="font-open-sans text-sm text-deep-navy/80 space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-turquoise-600" />
                          <span>info@abakiting.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-turquoise-600" />
                          <span>+39 344 436 8672</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-turquoise-600" />
                          <span>Falmouth Harbour, Antigua</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-coral-orange-50 rounded-lg border border-coral-orange-200">
                      <h4 className="font-montserrat font-bold text-deep-navy mb-2">🎯 Service Portfolio</h4>
                      <ul className="font-open-sans text-xs text-deep-navy/80 space-y-1">
                        <li>• IKO-certified instruction (€120/h)</li>
                        <li>• Private chef services</li>
                        <li>• Equipment & rescue support</li>
                        <li>• Special event hosting</li>
                        <li>• UNESCO site access</li>
                        <li>• Year-round operations</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-deep-navy/10">
                    <h4 className="text-sm font-semibold text-deep-navy/60 mb-3">Ready for Your Adventure?</h4>
                    <Link
                      href="/contact"
                      className="block w-full text-center bg-coral-orange text-white py-3 px-4 rounded-lg hover:bg-coral-orange/90 transition-colors font-semibold"
                    >
                      Contact Us for Luxury Experience
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
