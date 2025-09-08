import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, User, ArrowLeft, Calendar, Shield, AlertTriangle, Sun } from "lucide-react"

export const metadata: Metadata = {
  title: "Kiteboarding Safety Tips for Tropical Destinations | KiteSafaris Blog",
  description: "Stay safe while kiteboarding in tropical waters. Learn about weather conditions, equipment checks, and emergency procedures.",
  keywords: "kiteboarding safety, tropical kiteboarding, safety tips, kiteboarding equipment, emergency procedures",
  alternates: {
    canonical: "https://www.kitesafaris.com/blog/kiteboarding-safety-tips-tropical-destinations",
  },
  openGraph: {
    title: "Essential Safety Tips for Kiteboarding in Tropical Destinations",
    description: "Stay safe while kiteboarding in tropical waters. Learn about weather conditions, equipment checks, and emergency procedures.",
    type: "article",
  },
}

export default function KiteboardingSafetyTipsPage() {
  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-white">
        <main className="pt-20">
          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden">
            <Image
              src="/tropical-kiteboarding-safety.png"
              alt="Tropical kiteboarding safety"
              fill
              className="object-cover"
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
                  <span className="bg-turquoise-100 text-turquoise-800 px-3 py-1 rounded text-sm font-medium">
                    Safety Guide
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat">
                  Essential Safety Tips for Kiteboarding in Tropical Destinations
                </h1>
                <div className="flex items-center text-white/80 space-x-6">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>4 min read</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>KiteSafaris Team</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>October 2024</span>
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
                      Kiteboarding in tropical destinations offers incredible experiences, but it also presents unique safety challenges. Follow these essential safety tips to ensure a safe and enjoyable kiteboarding adventure.
                    </p>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Shield className="w-6 h-6 text-turquoise" />
                      Pre-Session Safety Checklist
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Check weather conditions and wind forecasts</li>
                      <li>Inspect all equipment for damage or wear</li>
                      <li>Ensure safety systems are functioning properly</li>
                      <li>Inform someone of your kiteboarding plans</li>
                      <li>Check for local hazards and restrictions</li>
                      <li>Verify rescue boat availability</li>
                    </ul>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <Sun className="w-6 h-6 text-turquoise" />
                      Sun Protection & Hydration
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Tropical sun can be intense, especially when reflected off the water. Protect yourself with:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Reef-safe sunscreen (SPF 30+ or higher)</li>
                      <li>UV protection clothing and rash guards</li>
                      <li>Polarized sunglasses with UV protection</li>
                      <li>Wide-brimmed hat for beach time</li>
                      <li>Plenty of water to stay hydrated</li>
                      <li>Electrolyte supplements for long sessions</li>
                    </ul>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-6 h-6 text-turquoise" />
                      Weather Awareness
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Tropical weather can change rapidly. Always monitor:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Wind strength and direction changes</li>
                      <li>Approaching storm systems</li>
                      <li>Lightning activity</li>
                      <li>Sudden wind gusts or lulls</li>
                      <li>Water conditions and currents</li>
                      <li>Visibility changes</li>
                    </ul>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                      Equipment Safety
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Proper equipment maintenance is crucial in tropical conditions:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Rinse equipment with fresh water after each session</li>
                      <li>Check lines for UV damage and wear</li>
                      <li>Inspect kite fabric for tears or weak spots</li>
                      <li>Ensure harness buckles and straps are secure</li>
                      <li>Test safety release systems regularly</li>
                      <li>Carry a repair kit for minor fixes</li>
                    </ul>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                      Marine Life Awareness
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Tropical waters are home to various marine life. Be aware of:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Coral reefs and shallow areas</li>
                      <li>Sea urchins and sharp coral</li>
                      <li>Jellyfish and other stinging creatures</li>
                      <li>Sharks (rare but possible in some areas)</li>
                      <li>Strong currents and rip tides</li>
                      <li>Boat traffic and fishing areas</li>
                    </ul>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                      Emergency Procedures
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Know what to do in emergency situations:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Use your safety release system if needed</li>
                      <li>Signal for help using hand signals or whistle</li>
                      <li>Stay with your kite if possible (flotation aid)</li>
                      <li>Conserve energy and avoid panic</li>
                      <li>Know local emergency contact numbers</li>
                      <li>Understand rescue boat procedures</li>
                    </ul>
                    
                    <div className="bg-red-50 border-l-4 border-red-400 p-6 my-8">
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Emergency Contacts</h3>
                      <p className="text-gray-700">
                        Always have emergency contact information readily available, including local coast guard, medical facilities, and your accommodation details.
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                      Buddy System
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Never kiteboard alone in tropical destinations. Always:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                      <li>Kite with a buddy or group</li>
                      <li>Maintain visual contact with others</li>
                      <li>Establish communication signals</li>
                      <li>Check on each other regularly</li>
                      <li>Have a designated safety person on shore</li>
                      <li>Share your session plans with the group</li>
                    </ul>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-sand-beige rounded-lg p-6 sticky top-24">
                    <h3 className="text-lg font-bold text-deep-navy mb-4 font-montserrat">Article Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Category</span>
                        <p className="text-deep-navy font-medium">Safety Guide</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Author</span>
                        <p className="text-deep-navy font-medium">KiteSafaris Team</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Reading Time</span>
                        <p className="text-deep-navy font-medium">4 minutes</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-deep-navy/60">Published</span>
                        <p className="text-deep-navy font-medium">October 2024</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-deep-navy/10">
                      <h4 className="text-sm font-semibold text-deep-navy/60 mb-3">Safety First with KiteSafaris</h4>
                      <Link
                        href="/packages"
                        className="block w-full text-center bg-coral-orange text-white py-3 px-4 rounded-lg hover:bg-coral-orange/90 transition-colors font-semibold"
                      >
                        Book Safe Adventure
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
