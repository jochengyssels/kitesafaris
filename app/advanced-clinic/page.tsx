import Navigation from "@/components/navigation"
import { EnhancedFooter } from "@/components/enhanced-footer"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Next Level Kite Clinic: Advanced Kitesurfing Mastery in Sardinia | KiteSafaris",
  description: "Transform your riding with our elite 7-day advanced coaching program in Punta Trettu, Sardinia. June 30 - July 6, 2025. Big air, freestyle, strapless mastery with professional video analysis.",
  keywords: "advanced kitesurfing clinic, kitesurfing coaching, big air kitesurfing, freestyle kitesurfing, strapless kitesurfing, Sardinia kitesurfing, Punta Trettu, advanced kite lessons, kite clinic 2025",
  alternates: {
    canonical: "https://www.kitesafaris.com/advanced-clinic",
  },
  openGraph: {
    title: "Next Level Kite Clinic: Advanced Kitesurfing Mastery in Sardinia",
    description: "Transform your riding with our elite 7-day advanced coaching program in Punta Trettu, Sardinia. June 30 - July 6, 2025. Big air, freestyle, strapless mastery with professional video analysis.",
    url: "https://www.kitesafaris.com/advanced-clinic",
    siteName: "KiteSafaris",
    images: [
      {
        url: "https://ejwqrnlk0p9oytei.public.blob.vercel-storage.com/kite-lessons-advanced",
        width: 1200,
        height: 630,
        alt: "Advanced kitesurfing clinic in Sardinia with professional coaching",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Level Kite Clinic: Advanced Kitesurfing Mastery in Sardinia",
    description: "Transform your riding with our elite 7-day advanced coaching program in Punta Trettu, Sardinia. June 30 - July 6, 2025. Big air, freestyle, strapless mastery with professional video analysis.",
    images: ["https://ejwqrnlk0p9oytei.public.blob.vercel-storage.com/kite-lessons-advanced"],
  },
}

// Schema markup for Event
const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Next Level Kite Clinic: Advanced Kitesurfing Mastery",
  "description": "Transform your riding with our elite 7-day advanced coaching program in Punta Trettu, Sardinia. Big air, freestyle, strapless mastery with professional video analysis.",
  "startDate": "2025-06-30",
  "endDate": "2025-07-06",
  "location": {
    "@type": "Place",
    "name": "Punta Trettu, Sardinia",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Punta Trettu",
      "addressRegion": "Sardinia",
      "addressCountry": "Italy"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "KiteSafaris",
    "url": "https://www.kitesafaris.com"
  },
  "offers": {
    "@type": "Offer",
    "description": "All-inclusive advanced kitesurfing coaching experience",
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-01-01"
  },
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
}

export default function AdvancedClinicPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <main className="min-h-screen bg-white">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/advanced-kite-lessons.MP4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <span className="bg-coral-orange text-white px-4 py-2 rounded-full text-sm font-semibold">
                  June 30 - July 6, 2025
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-6 leading-tight text-white">
                Next Level Kite Clinic
              </h1>
              <p className="text-xl md:text-2xl font-open-sans mb-8 leading-relaxed text-white">
                Advanced Kitesurfing Mastery in <Link href="/destinations/sardinia" className="text-white hover:text-turquoise-300 underline">Sardinia</Link>
              </p>
              <p className="text-lg md:text-xl opacity-90 mb-8 text-white">
                Transform Your Riding: Elite Coaching Program at <Link href="/destinations/sardinia/punta-trettu" className="text-white hover:text-turquoise-300 underline">Punta Trettu</Link>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="#program-details"
                  className="bg-coral-orange hover:bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
                >
                  View Program Details
                </Link>
                <Link 
                  href="/contact/advanced-clinic"
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-colors backdrop-blur-sm"
                >
                  Book Your Transformation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="relative aspect-[9/16]">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster="/sardinia-punta-trettu-kiteboarding-mediterranean-c.png"
                  >
                    <source src="https://ejwqrnlk0p9oytei.public.blob.vercel-storage.com/kite-lessons-advanced" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-deep-navy mb-3">Experience the Transformation</h3>
                  <p className="text-gray-600">
                    Watch our advanced coaching methodology in action. See how our revolutionary approach 
                    combines theory, real-time coaching, and video analysis to create breakthrough moments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-12 text-center">
                Who This Elite Program Is For
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-deep-navy mb-2">Independent Kiters Ready for the Next Level</h3>
                      <p className="text-gray-600">You can ride upwind confidently and are hungry for advancement</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-deep-navy mb-2">Plateau Breakers</h3>
                      <p className="text-gray-600">You're stuck in your progress and need expert guidance to breakthrough</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-deep-navy mb-2">Knowledge Seekers</h3>
                      <p className="text-gray-600">You want comprehensive understanding of safety, equipment, and detailed riding techniques</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-deep-navy mb-2">Multi-Discipline Explorers</h3>
                      <p className="text-gray-600">Ready to try big air, strapless, freestyle, foil kiting, and winging</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-deep-navy mb-2">Community Enthusiasts</h3>
                      <p className="text-gray-600">You love sharing the stoke with like-minded passionate riders</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-turquoise-50 to-sand-beige-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-deep-navy mb-4 text-center">Perfect Participant Profile</h3>
                <p className="text-gray-700 text-center text-lg leading-relaxed">
                  This intensive 7-day program is designed for dedicated kitesurfers who are ready to break through 
                  plateaus and master advanced techniques. If you're committed to taking your riding to the next level 
                  in a supportive, professional environment, this clinic is for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Revolutionary Coaching Methodology */}
        <section id="program-details" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-12 text-center">
                Revolutionary Coaching Methodology
              </h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📚</span>
                    </div>
                    <h3 className="text-xl font-bold text-deep-navy">No Short Cuts - Theory Is The Key</h3>
                  </div>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Deep technical explanation of technique, equipment, and safety protocols</li>
                    <li>• Comprehensive theory sessions covering wind dynamics and biomechanics</li>
                    <li>• Demo video support with slow-motion analysis</li>
                    <li>• Personalized briefings tailored to individual goals</li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🌊</span>
                    </div>
                    <h3 className="text-xl font-bold text-deep-navy">Let's Go Live - Real-Time Coaching</h3>
                  </div>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Side-by-side instruction with your dedicated coach</li>
                    <li>• One-on-one intensive coaching with immediate feedback</li>
                    <li>• Radio assistance technology for safe training</li>
                    <li>• Progressive skill building with structured milestones</li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📹</span>
                    </div>
                    <h3 className="text-xl font-bold text-deep-navy">Mirror Time - Video Analysis</h3>
                  </div>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Professional video analysis as the ultimate improvement tool</li>
                    <li>• Drone footage sessions capturing aerial perspectives</li>
                    <li>• Frame-by-frame breakdown identifying areas for improvement</li>
                    <li>• Personalized video libraries for continued learning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Daily Experience */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-12 text-center">
                The Complete Daily Experience
              </h2>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-turquoise-50 to-sand-beige-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-deep-navy mb-4">🌅 Morning Ritual</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-deep-navy mb-2">Good-morning Yoga/Stretching</h4>
                      <p className="text-gray-600">Kite-specific bodywork preparation for optimal performance</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-navy mb-2">Breakfast Buffet</h4>
                      <p className="text-gray-600">Nutritious fuel for intensive training days</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-navy mb-2">Team Meeting & Daily Planning</h4>
                      <p className="text-gray-600">Conditions assessment and personalized goal setting</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-coral-orange/10 to-sand-beige-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-deep-navy mb-4">⚡ Prime Training Sessions</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-deep-navy mb-2">Advanced Kite Theory</h4>
                      <p className="text-gray-600">Equipment optimization and safety mastery</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-navy mb-2">Intensive Water Sessions</h4>
                      <p className="text-gray-600">"Kite, kite, kite till sunset" with expert guidance</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-navy mb-2">Multi-discipline Exploration</h4>
                      <p className="text-gray-600">Big air, freestyle, strapless, foil, and wing techniques</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-sand-beige-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-deep-navy mb-4">🌅 Evening Wind-Down</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-deep-navy mb-2">Sunset Drink & Aperitivo</h4>
                      <p className="text-gray-600">Community building and day reflection</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-navy mb-2">Authentic Local Dinner</h4>
                      <p className="text-gray-600">Experiencing Sardinian culture and cuisine</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-navy mb-2">Video Analysis Sessions</h4>
                      <p className="text-gray-600">Professional breakdown of daily progression</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All-Inclusive Package */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-12 text-center">
                Complete All-Inclusive Package
              </h2>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-deep-navy mb-6 text-center">Accommodation & Hospitality</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• 6 Nights Premium Accommodation</li>
                    <li>• Daily Breakfast Buffet</li>
                    <li>• Authentic Sardinian Dinner</li>
                    <li>• Steps from Punta Trettu</li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-deep-navy mb-6 text-center">Elite Coaching Program</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• 20 Hours Advanced Kite Coaching</li>
                    <li>• Full Team Support</li>
                    <li>• Kite-Specific Bodywork Training</li>
                    <li>• Certified Professional Instructors</li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-deep-navy mb-6 text-center">Knowledge & Equipment</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Comprehensive Kite & Gear Knowledge</li>
                    <li>• Spot Optimization Expertise</li>
                    <li>• Professional Video Documentation</li>
                    <li>• Equipment Access & Consultation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Punta Trettu Location */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-12 text-center">
                <Link href="/destinations/sardinia/punta-trettu" className="text-deep-navy hover:text-coral-orange">Punta Trettu</Link>: The Perfect Training Ground
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-deep-navy mb-6">Why <Link href="/destinations/sardinia" className="text-deep-navy hover:text-coral-orange">Sardinia's</Link> Crown Jewel</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-turquoise-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-navy">Consistent Thermal Winds</h4>
                        <p className="text-gray-600 text-sm">15-25 knots with predictable patterns</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-turquoise-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-navy">Shallow <Link href="/destinations/sardinia/punta-trettu" className="text-deep-navy hover:text-coral-orange">Flat Water</Link> Lagoon</h4>
                        <p className="text-gray-600 text-sm">Perfect for skill development and safety</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-turquoise-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-navy">Sandy Bottom Launch Areas</h4>
                        <p className="text-gray-600 text-sm">Ideal for technique practice and progression</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-turquoise-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-navy">Protected Environment</h4>
                        <p className="text-gray-600 text-sm">Away from crowds, focused learning atmosphere</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                    <Link href="/destinations/sardinia/punta-trettu">
                      <Image
                        src="/sardinia-punta-trettu-kiteboarding-mediterranean-c.png"
                        alt="Punta Trettu flat water lagoon perfect for advanced kitesurfing training"
                        width={600}
                        height={400}
                        className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                      />
                    </Link>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-turquoise-50 to-sand-beige-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-deep-navy mb-6 text-center">Multi-Discipline Paradise at <Link href="/destinations/sardinia/punta-trettu" className="text-deep-navy hover:text-coral-orange">Punta Trettu</Link></h3>
                <div className="grid md:grid-cols-5 gap-6 text-center">
                  <div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">🚁</span>
                    </div>
                    <h4 className="font-semibold text-deep-navy mb-2">Big Air Conditions</h4>
                    <p className="text-sm text-gray-600">Consistent wind for aerial mastery</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">🎯</span>
                    </div>
                    <h4 className="font-semibold text-deep-navy mb-2">Freestyle Paradise</h4>
                    <p className="text-sm text-gray-600">Flat water ideal for unhooked progression</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">🏄‍♂️</span>
                    </div>
                    <h4 className="font-semibold text-deep-navy mb-2">Strapless Perfection</h4>
                    <p className="text-sm text-gray-600">Wave and surf-style riding opportunities</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">🛩️</span>
                    </div>
                    <h4 className="font-semibold text-deep-navy mb-2">Foil Heaven</h4>
                    <p className="text-sm text-gray-600">Light wind days perfect for hydrofoil mastery</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">🪁</span>
                    </div>
                    <h4 className="font-semibold text-deep-navy mb-2">Winging Innovation</h4>
                    <p className="text-sm text-gray-600">Latest discipline in perfect learning conditions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Technique Mastery */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-12 text-center">
                Advanced Technique Mastery
              </h2>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-deep-navy mb-6 text-center">Big Air Progression</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Kite loop mastery with safety protocols</li>
                    <li>• Megaloop techniques for massive air</li>
                    <li>• Board-off maneuvers and aerial control</li>
                    <li>• Landing optimization and impact management</li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-deep-navy mb-6 text-center">Freestyle Excellence</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Unhooked progression from basic pop</li>
                    <li>• Wakestyle techniques including raileys</li>
                    <li>• Kiteloop integration with freestyle</li>
                    <li>• Competition-level tricks with professional coaching</li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-deep-navy mb-6 text-center">Strapless Mastery</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Wave riding fundamentals adapted for kite</li>
                    <li>• Directional board techniques</li>
                    <li>• Foil integration for light wind riding</li>
                    <li>• Advanced carving and cutback techniques</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expected Results */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-12 text-center">
                Expected Transformation Results
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-turquoise-50 to-sand-beige-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-deep-navy mb-4">Technical Advancement</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Breakthrough plateau limitations</li>
                    <li>• Master 2-3 new advanced techniques</li>
                    <li>• Develop competition-level skills</li>
                    <li>• Achieve instructor-level understanding</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-coral-orange/10 to-sand-beige-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-deep-navy mb-4">Confidence & Safety</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Advanced safety protocol mastery</li>
                    <li>• Equipment troubleshooting expertise</li>
                    <li>• Weather assessment skills</li>
                    <li>• Self-rescue mastery for advanced practice</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-sand-beige-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-deep-navy mb-6 text-center">Community & Ongoing Development</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-deep-navy mb-2">Lifelong Connections</h4>
                    <p className="text-gray-600 text-sm">Connect with passionate, advanced practitioners and build lasting relationships</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-navy mb-2">Alumni Network Access</h4>
                    <p className="text-gray-600 text-sm">Continued learning and progression opportunities through our exclusive network</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-navy mb-2">Instructor Pathway Preparation</h4>
                    <p className="text-gray-600 text-sm">For those considering teaching careers in kitesurfing</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-navy mb-2">Competition Readiness</h4>
                    <p className="text-gray-600 text-sm">Preparation for aspiring contest participants</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking" className="py-20 bg-gradient-to-br from-deep-navy to-turquoise-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-8">
                Transform Your Kitesurfing Journey
              </h2>
              <p className="text-xl mb-12 opacity-90">
                Limited to 8 participants maximum. Secure your spot in this exclusive advanced coaching experience 
                where serious kiters become elite practitioners under the Sardinian sun.
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
                <h3 className="text-2xl font-bold mb-6">Program Investment</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h4 className="font-semibold mb-2">All-Inclusive Experience</h4>
                    <p className="text-sm opacity-90">Accommodation, coaching, meals, and activities</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Premium Small Group</h4>
                    <p className="text-sm opacity-90">Maximum 8 participants for personalized attention</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Early Bird Pricing</h4>
                    <p className="text-sm opacity-90">Secure your transformation journey with special rates</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact/advanced-clinic"
                  className="bg-coral-orange hover:bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
                >
                  Book Your Transformation
                </Link>
                <Link 
                  href="/contact/advanced-clinic"
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-colors backdrop-blur-sm"
                >
                  Ask Questions
                </Link>
              </div>

              <div className="mt-8 text-sm opacity-75">
                <p>Ready to transform your riding? Every great kiter remembers the moment everything changed.</p>
              </div>
            </div>
          </div>
        </section>

        <EnhancedFooter />
      </main>
    </>
  )
}
