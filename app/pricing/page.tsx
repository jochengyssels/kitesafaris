import { Navigation } from "@/components/navigation"
import PricingTable from "@/components/pricing-table"
import { CheckCircle, Star, Users, Anchor, MapPin, Calendar, Wind } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing | Book Your Kite Safari from €1,900 | KiteSafaris",
  description: "Transparent pricing for KiteSafaris. From €1,900 for 7 days. See what's included and optional extras.",
  keywords: "kitesurf pricing, kite safari cost, €1,900 kitesurf trip, transparent pricing, all-inclusive kitesurfing",
  alternates: {
    canonical: "https://www.kitesafaris.com/pricing"
  },
  openGraph: {
    title: "Pricing | Book Your Kite Safari from €1,900 | KiteSafaris",
    description: "Transparent pricing for KiteSafaris. From €1,900 for 7 days. See what's included and optional extras.",
    type: "website",
  },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-deep-navy via-deep-navy/95 to-turquoise/20 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-turquoise/20 backdrop-blur-sm border border-turquoise/30 rounded-full text-turquoise text-sm font-semibold mb-6">
              <Star className="w-4 h-4 mr-2" />
              Transparent Pricing
            </div>
            
            <h1 className="font-montserrat font-bold text-5xl md:text-7xl mb-6 text-balance leading-tight">
              Kite Safari
              <span className="block text-turquoise">Pricing</span>
            </h1>
            
            <p className="font-open-sans text-xl md:text-2xl max-w-3xl mx-auto text-pretty opacity-90 mb-8 leading-relaxed">
              Choose your perfect cabin option for our 7-day luxury catamaran kitesafari in Antigua & Barbuda. 
              All-inclusive pricing with no hidden fees.
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-turquoise mb-2">€1,900</div>
                <div className="text-sm opacity-80">Starting Price</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-turquoise mb-2">7 Days</div>
                <div className="text-sm opacity-80">Full Adventure</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-turquoise mb-2">6 Guests</div>
                <div className="text-sm opacity-80">Max Per Trip</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-deep-navy font-montserrat mb-6">
              Choose Your Cabin
            </h2>
            <p className="text-xl text-gray-600 font-open-sans max-w-3xl mx-auto leading-relaxed">
              Each option includes full board, professional instruction, premium equipment, and unforgettable adventures
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <PricingTable />
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-deep-navy font-montserrat mb-6">
              What's Included
            </h2>
            <p className="text-xl text-gray-600 font-open-sans max-w-3xl mx-auto leading-relaxed">
              Your all-inclusive kitesafari experience covers everything you need for the perfect adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Accommodation */}
            <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl p-8 border border-sky-100">
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mb-6">
                <Anchor className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-deep-navy mb-4">Luxury Accommodation</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-sky-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Premium catamaran cabins</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-sky-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Fresh linens & towels</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-sky-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Daily cabin service</span>
                </li>
              </ul>
            </div>

            {/* Meals */}
            <div className="bg-gradient-to-br from-coral-50 to-orange-50 rounded-2xl p-8 border border-coral-100">
              <div className="w-16 h-16 bg-coral-100 rounded-2xl flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-coral-600" />
              </div>
              <h3 className="text-xl font-semibold text-deep-navy mb-4">Gourmet Meals</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-coral-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">3 meals per day</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-coral-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Local Caribbean cuisine</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-coral-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Beverages & snacks</span>
                </li>
              </ul>
            </div>

            {/* Equipment */}
            <div className="bg-gradient-to-br from-gold-50 to-yellow-50 rounded-2xl p-8 border border-gold-100">
              <div className="w-16 h-16 bg-gold-100 rounded-2xl flex items-center justify-center mb-6">
                <Wind className="w-8 h-8 text-gold-600" />
              </div>
              <h3 className="text-xl font-semibold text-deep-navy mb-4">Premium Equipment</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-gold-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Latest kite gear</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-gold-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Safety equipment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-gold-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Wetsuits & accessories</span>
                </li>
              </ul>
            </div>

            {/* Instruction */}
            <div className="bg-gradient-to-br from-turquoise-50 to-cyan-50 rounded-2xl p-8 border border-turquoise-100">
              <div className="w-16 h-16 bg-turquoise-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-turquoise-600" />
              </div>
              <h3 className="text-xl font-semibold text-deep-navy mb-4">Expert Instruction</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-turquoise-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">IKO certified instructors</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-turquoise-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Personalized coaching</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-turquoise-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Safety briefings</span>
                </li>
              </ul>
            </div>

            {/* Activities */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-deep-navy mb-4">Adventure Activities</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Multiple kite spots</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Island exploration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Cultural experiences</span>
                </li>
              </ul>
            </div>

            {/* Logistics */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-100">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-deep-navy mb-4">Trip Logistics</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Airport transfers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Travel insurance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">24/7 support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Information */}
      <section className="py-20 bg-gradient-to-br from-deep-navy via-deep-navy/95 to-turquoise/20 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-6">
              Ready to Book Your
              <span className="block text-turquoise">Kitesafari Adventure?</span>
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Secure your spot with a €500 deposit. Limited cabins available for each departure date.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Booking Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="text-center">
                  <div className="w-12 h-12 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-deep-navy font-bold">1</span>
                  </div>
                  <p className="text-sm">Choose your cabin option</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-deep-navy font-bold">2</span>
                  </div>
                  <p className="text-sm">Select departure date</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-deep-navy font-bold">3</span>
                  </div>
                  <p className="text-sm">Pay €500 deposit</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a 
                href="/booking" 
                className="inline-flex items-center px-8 py-4 bg-coral-orange hover:bg-coral-orange/90 text-white font-semibold rounded-lg transition-all duration-300 text-lg"
              >
                Book Your Safari
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 text-lg border border-white/30"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
