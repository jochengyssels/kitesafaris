import { Navigation } from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, User, ArrowLeft, Calendar, MapPin, ExternalLink, Award, Users, Star, Phone, Mail } from "lucide-react"
import { SardinianAwakeningCTA } from "@/components/sardinian-awakening-cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "KiteSafaris Partners with ProKite Sardegna for Premium Kitesurfing Education | KiteSafaris",
  description:
    "KiteSafaris announces strategic partnership with ProKite Sardegna, bringing world-class IKO certified instruction to luxury catamaran safari clients in Sardinia.",
  keywords:
    "KiteSafaris ProKite partnership, Sardinia kitesurfing lessons, IKO certified instructors, luxury kiteboarding education, Punta Trettu kitesurfing, Mediterranean kiteboarding",
  alternates: {
    canonical: "https://kitesafaris.com/blog/kitesafaris-prokite-sardegna-partnership",
  },
  openGraph: {
    title: "KiteSafaris Partners with ProKite Sardegna for Premium Kitesurfing Education",
    description: "Strategic partnership brings world-class IKO certified instruction to luxury catamaran safari clients in Sardinia.",
    url: "https://kitesafaris.com/blog/kitesafaris-prokite-sardegna-partnership",
    type: "article",
    images: [
      {
        url: "/prokite-sardegna-partnership.jpg",
        width: 1200,
        height: 630,
        alt: "KiteSafaris ProKite Sardegna partnership for premium kitesurfing education",
      },
    ],
  },
}

const courseOfferings = [
  {
    name: "Zero to Hero Intensive Program",
    duration: "10 hours",
    price: "€550 value",
    description: "Complete private instruction package with complimentary photography service and branded merchandise",
    features: ["Private instruction", "Photography service", "Branded merchandise", "IKO certification"],
  },
  {
    name: "Training Full Focus",
    duration: "2 hours",
    price: "€160",
    description: "Advanced private sessions with video analysis for intermediate and expert riders",
    features: ["Video analysis", "Advanced techniques", "Performance optimization", "Personal coaching"],
  },
  {
    name: "Beginner Programs",
    duration: "1-6 hours",
    price: "From €80",
    description: "From introductory sessions to comprehensive private courses for new kitesurfers",
    features: ["Safety first approach", "Equipment familiarization", "Basic techniques", "Confidence building"],
  },
  {
    name: "Children's Instruction",
    duration: "Flexible",
    price: "Custom pricing",
    description: "Specialized programs designed for young kitesurfers with age-appropriate equipment",
    features: ["Age-appropriate equipment", "Safety protocols", "Fun learning environment", "Parent supervision"],
  },
  {
    name: "Wing Foil Training",
    duration: "2-4 hours",
    price: "From €120",
    description: "Cutting-edge instruction in the sport's newest discipline",
    features: ["Latest equipment", "Progressive learning", "Advanced techniques", "Equipment included"],
  },
  {
    name: "Hydrofoil and Strapless Surfing",
    duration: "2-6 hours",
    price: "From €140",
    description: "Advanced specialization courses for experienced riders",
    features: ["Advanced techniques", "Specialized equipment", "Performance coaching", "Style development"],
  },
]

const facilityFeatures = [
  {
    icon: "🏄‍♂️",
    title: "IKO Certified Instructors",
    description: "World-class instruction from certified professionals with international experience",
  },
  {
    icon: "🌍",
    title: "Multi-language Support",
    description: "Instruction available in Italian, English, French, Spanish, German, and Polish",
  },
  {
    icon: "📻",
    title: "Radio Helmet Communication",
    description: "Enhanced safety with real-time communication between instructor and student",
  },
  {
    icon: "🚤",
    title: "Professional Rescue Boat",
    description: "Dedicated safety boat service included with all courses",
  },
  {
    icon: "🏆",
    title: "Premium Equipment",
    description: "Latest Duotone and ION equipment for optimal learning experience",
  },
  {
    icon: "🏖️",
    title: "Ideal Learning Conditions",
    description: "Shallow, flat-water lagoon at Punta Trettu with sandy bottom",
  },
]

const locationAmenities = [
  "Starlink WiFi for digital nomads",
  "On-site accommodation partnerships",
  "Equipment rental services",
  "Professional lifeguard and rescue services",
  "Bar and BBQ facilities",
  "Free parking and camper/van facilities",
]

export default function ProKitePartnershipBlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: "KiteSafaris Partners with ProKite Sardegna for Premium Kitesurfing Education",
            description: "Strategic partnership brings world-class IKO certified instruction to luxury catamaran safari clients in Sardinia.",
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
            datePublished: "2025-09-07",
            dateModified: "2025-09-07",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://kitesafaris.com/blog/kitesafaris-prokite-sardegna-partnership",
            },
            image: "https://kitesafaris.com/prokite-sardegna-partnership.jpg",
          }),
        }}
      />

      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src="/partners/partnership-kitesafaris-prokite.jpg"
            alt="KiteSafaris ProKite Sardegna partnership for premium kitesurfing education"
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
                <span className="bg-turquoise text-white px-3 py-1 rounded text-sm font-medium">Education</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat text-balance">
                🤝 KiteSafaris Partners with ProKite Sardegna for Premium Kitesurfing Education
              </h1>
              <div className="flex items-center text-white/80 space-x-6">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>6 min read</span>
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
                    We're thrilled to announce a groundbreaking strategic partnership with <a href="https://www.prokitesardegna.com" target="_blank" rel="noopener noreferrer" className="text-coral-orange hover:text-coral-orange/80 font-semibold">ProKite Sardegna</a>, Italy's premier kitesurfing school located at Punta Trettu. This collaboration marks a significant milestone in the kitesurfing industry, combining <a href="https://www.kitesafaris.com" target="_blank" rel="noopener noreferrer" className="text-turquoise hover:text-turquoise/80 font-semibold">KiteSafaris</a>' luxury safari experiences with ProKite's world-renowned instruction programs.
                  </p>

                  <p className="font-open-sans text-deep-navy/90 leading-relaxed mb-8">
                    Under this new partnership agreement, <a href="https://www.kitesafaris.com" target="_blank" rel="noopener noreferrer" className="text-turquoise hover:text-turquoise/80 font-semibold">KiteSafaris</a> has secured exclusive reseller rights for <a href="https://www.prokitesardegna.com" target="_blank" rel="noopener noreferrer" className="text-coral-orange hover:text-coral-orange/80 font-semibold">ProKite Sardegna</a>'s comprehensive range of kitesurfing courses, creating an integrated luxury experience that spans from beginner instruction to advanced freestyle training.
                  </p>

                  {/* Partnership Benefits */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-coral-orange rounded-full">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      🌟 What This Partnership Means for You
                    </h2>

                    <div className="bg-gradient-to-r from-turquoise-50 to-sand-beige-50 rounded-2xl p-8 border border-turquoise-200/50 mb-8">
                      <blockquote className="text-lg font-open-sans text-deep-navy/90 italic mb-6">
                        "This partnership represents the evolution of luxury adventure travel. Our clients seek not just premium experiences, but also the opportunity to master new skills with the world's best instructors. <a href="https://www.prokitesardegna.com" target="_blank" rel="noopener noreferrer" className="text-coral-orange hover:text-coral-orange/80 font-semibold">ProKite Sardegna</a>'s reputation for excellence perfectly aligns with our commitment to delivering unparalleled kitesurfing adventures."
                      </blockquote>
                      <p className="font-open-sans text-deep-navy/80">— <a href="https://www.kitesafaris.com" target="_blank" rel="noopener noreferrer" className="text-turquoise hover:text-turquoise/80 font-semibold">KiteSafaris</a> Co-Founder</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-turquoise-300 hover:shadow-lg transition-all duration-300">
                        <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-3">🎯 Integrated Experience</h3>
                        <p className="font-open-sans text-deep-navy/80">
                          Seamlessly combine luxury catamaran adventures with world-class kitesurfing instruction in one premium package.
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-turquoise-300 hover:shadow-lg transition-all duration-300">
                        <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-3">🏆 World-Class Instruction</h3>
                        <p className="font-open-sans text-deep-navy/80">
                          Learn from IKO certified instructors with international experience and a perfect 5.0-star rating.
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-turquoise-300 hover:shadow-lg transition-all duration-300">
                        <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-3">🌍 International Excellence</h3>
                        <p className="font-open-sans text-deep-navy/80">
                          Access to <a href="https://www.prokitesardegna.com" target="_blank" rel="noopener noreferrer" className="text-coral-orange hover:text-coral-orange/80 font-semibold">ProKite</a>'s expertise through <a href="https://www.kitesafaris.com" target="_blank" rel="noopener noreferrer" className="text-turquoise hover:text-turquoise/80 font-semibold">KiteSafaris</a>' global platform and international client base.
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-turquoise-300 hover:shadow-lg transition-all duration-300">
                        <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-3">💎 Premium Standards</h3>
                        <p className="font-open-sans text-deep-navy/80">
                          Maintain the highest safety and quality standards that both companies are known for.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* About ProKite Sardegna */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-turquoise rounded-full">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      🏆 About ProKite Sardegna
                    </h2>

                    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
                      <div className="flex items-start gap-6 mb-6">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-2 border-turquoise">
                          <Image
                            src="/logos/Pro-Kite-logo.png"
                            alt="ProKite Sardegna Logo"
                            width={60}
                            height={60}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-montserrat font-bold text-2xl text-deep-navy mb-2">Giacomo Barberi</h3>
                          <p className="font-open-sans text-coral-orange font-semibold mb-2">Founder & Lead Instructor</p>
                          <ul className="font-open-sans text-deep-navy/80 space-y-1">
                            <li>• 2011 Italian Freestyle Champion</li>
                            <li>• Duotone Pro Rider since 2007</li>
                            <li>• Perfect 5.0-star rating (543+ Google reviews)</li>
                            <li>• IKO certified instructor</li>
                          </ul>
                        </div>
                      </div>
                      
                      <blockquote className="text-lg font-open-sans text-deep-navy/90 italic border-l-4 border-turquoise pl-6">
                        "Partnering with <a href="https://www.kitesafaris.com" target="_blank" rel="noopener noreferrer" className="text-turquoise hover:text-turquoise/80 font-semibold">KiteSafaris</a> allows us to extend our expertise to an international audience seeking premium kitesurfing education. This collaboration enables us to share our passion for kitesurfing with luxury travelers who value both adventure and professional instruction."
                      </blockquote>
                    </div>
                  </div>

                  {/* Course Offerings */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-deep-navy rounded-full">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      📚 Comprehensive Course Portfolio
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      {courseOfferings.map((course, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-xl p-6 border border-gray-200 hover:border-turquoise-300 hover:shadow-lg transition-all duration-300"
                        >
                          <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">{course.name}</h3>
                          <div className="flex items-center gap-4 mb-3">
                            <span className="bg-turquoise-100 text-turquoise-800 px-2 py-1 rounded text-sm font-medium">
                              {course.duration}
                            </span>
                            <span className="bg-coral-orange-100 text-coral-orange-800 px-2 py-1 rounded text-sm font-medium">
                              {course.price}
                            </span>
                          </div>
                          <p className="font-open-sans text-deep-navy/80 mb-4">{course.description}</p>
                          <ul className="space-y-1">
                            {course.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="font-open-sans text-sm text-deep-navy/70 flex items-center">
                                <span className="w-1.5 h-1.5 bg-turquoise rounded-full mr-2"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* World-Class Facilities */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8 flex items-center gap-3">
                      <div className="p-2 bg-coral-orange rounded-full">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      🏖️ World-Class Facilities & Safety Standards
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {facilityFeatures.map((feature, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-turquoise-50 to-sand-beige-50 rounded-xl p-6 border border-turquoise-200/50"
                        >
                          <div className="text-3xl mb-3">{feature.icon}</div>
                          <h3 className="font-montserrat font-bold text-lg text-deep-navy mb-2">{feature.title}</h3>
                          <p className="font-open-sans text-deep-navy/80 text-sm">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategic Location */}
                  <div className="mb-12">
                    <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-6 flex items-center gap-3">
                      <div className="p-2 bg-sand-beige rounded-full">
                        <MapPin className="w-6 h-6 text-deep-navy" />
                      </div>
                      🗺️ Strategic Location Advantages
                    </h2>

                    <div className="bg-sand-beige-50 rounded-xl p-6 border border-sand-beige-200 mb-6">
                      <p className="font-open-sans text-deep-navy/90 leading-relaxed mb-4">
                        Punta Trettu, located in southwestern Sardinia, offers optimal learning conditions year-round with shallow waters, sandy bottoms, and consistent thermal winds. The location serves as <a href="https://www.kitesafaris.com" target="_blank" rel="noopener noreferrer" className="text-turquoise hover:text-turquoise/80 font-semibold">KiteSafaris</a>' Mediterranean base of operations, making it an ideal hub for combined safari and instruction experiences.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-4">🏖️ Perfect Learning Conditions</h3>
                        <ul className="font-open-sans text-deep-navy/80 space-y-2">
                          <li>• Shallow, flat-water lagoon</li>
                          <li>• Sandy bottom for safety</li>
                          <li>• Consistent thermal winds</li>
                          <li>• Year-round accessibility</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-4">🏨 Comprehensive Amenities</h3>
                        <ul className="font-open-sans text-deep-navy/80 space-y-2">
                          {locationAmenities.map((amenity, index) => (
                            <li key={index}>• {amenity}</li>
                          ))}
                        </ul>
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
                      <h3 className="font-montserrat font-bold text-2xl mb-4">🌊 Ready to Experience Premium Kitesurfing Education?</h3>
                      <p className="font-open-sans text-xl mb-6 text-turquoise-100">
                        <a href="https://www.kitesafaris.com" target="_blank" rel="noopener noreferrer" className="text-turquoise-200 hover:text-white font-semibold">KiteSafaris</a> clients can now book <a href="https://www.prokitesardegna.com" target="_blank" rel="noopener noreferrer" className="text-coral-orange-200 hover:text-white font-semibold">ProKite Sardegna</a> courses directly through our booking platform, with integrated packages combining catamaran adventures and professional instruction. Special partnership pricing and exclusive access to premium time slots are available to KiteSafaris customers.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-montserrat font-bold text-lg mb-2">📅 Season Availability</h4>
                          <p className="font-open-sans text-turquoise-100">April through November to accommodate varying wind conditions and client preferences.</p>
                        </div>
                        <div>
                          <h4 className="font-montserrat font-bold text-lg mb-2">💰 Special Pricing</h4>
                          <p className="font-open-sans text-turquoise-100">Exclusive partnership pricing and premium time slot access for <a href="https://www.kitesafaris.com" target="_blank" rel="noopener noreferrer" className="text-turquoise-200 hover:text-white font-semibold">KiteSafaris</a> customers.</p>
                        </div>
                      </div>
                      <Link
                        href="/contact/prokite"
                        className="inline-flex items-center bg-coral-orange hover:bg-coral-orange/90 text-white px-8 py-4 rounded-full font-montserrat font-bold text-lg transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Book Your ProKite Course & Safari Package
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
                      <h4 className="font-montserrat font-bold text-deep-navy mb-2">🏆 ProKite Credentials</h4>
                      <ul className="font-open-sans text-sm text-deep-navy/80 space-y-1">
                        <li>• 5.0-star rating (543+ reviews)</li>
                        <li>• IKO certified instructors</li>
                        <li>• 2011 Italian Freestyle Champion</li>
                        <li>• Duotone Pro Rider since 2007</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-sand-beige-200">
                      <h4 className="font-montserrat font-bold text-deep-navy mb-2">🌍 Multi-language Support</h4>
                      <ul className="font-open-sans text-sm text-deep-navy/80 space-y-1">
                        <li>• Italian</li>
                        <li>• English</li>
                        <li>• French</li>
                        <li>• Spanish</li>
                        <li>• German</li>
                        <li>• Polish</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-turquoise-50 rounded-lg border border-turquoise-200">
                      <h4 className="font-montserrat font-bold text-deep-navy mb-2">📞 Contact Information</h4>
                      <div className="font-open-sans text-sm text-deep-navy/80 space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-turquoise-600" />
                          <span>info@prokitesardegna.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-turquoise-600" />
                          <span>+39 328 002 6778</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-coral-orange-50 rounded-lg border border-coral-orange-200">
                      <h4 className="font-montserrat font-bold text-deep-navy mb-2">🎯 Course Range</h4>
                      <ul className="font-open-sans text-xs text-deep-navy/80 space-y-1">
                        <li>• Zero to Hero (€550 value)</li>
                        <li>• Training Full Focus (€160)</li>
                        <li>• Beginner Programs (from €80)</li>
                        <li>• Children's Instruction</li>
                        <li>• Wing Foil Training</li>
                        <li>• Hydrofoil & Strapless</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-deep-navy/10">
                    <h4 className="text-sm font-semibold text-deep-navy/60 mb-3">Ready for Your Kite Safari?</h4>
                    <Link
                      href="/contact/prokite"
                      className="block w-full text-center bg-coral-orange text-white py-3 px-4 rounded-lg hover:bg-coral-orange/90 transition-colors font-semibold"
                    >
                      Contact ProKite for Courses
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
