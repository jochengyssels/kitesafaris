import { Navigation } from "@/components/navigation"
import { PackageTabs } from "@/components/package-tabs"

import { RouteMap } from "@/components/route-map"
import { AntiguaTripCalendar } from "@/components/antigua-trip-calendar"
import PricingTable from "@/components/pricing-table"
import { Calendar, MapPin, Wind, Users, Star, ArrowRight, Clock, Tag } from "lucide-react"

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-deep-navy via-deep-navy/95 to-turquoise/20 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-turquoise/20 backdrop-blur-sm border border-turquoise/30 rounded-full text-turquoise text-sm font-semibold mb-6">
              <Star className="w-4 h-4 mr-2" />
              Premium Kitesafari Experience
            </div>
            
            <h1 className="font-montserrat font-bold text-5xl md:text-7xl mb-6 text-balance leading-tight">
              Kite Safari
              <span className="block text-turquoise">Packages</span>
            </h1>
            
            <p className="font-open-sans text-xl md:text-2xl max-w-3xl mx-auto text-pretty opacity-90 mb-8 leading-relaxed">
              7-day luxury catamaran kitesafaris in Antigua & Barbuda. Each safari features 3 double cabins for up to 6
              guests, with departures every Saturday from December 6, 2025 through April 2026.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-turquoise">7</div>
                <div className="text-sm opacity-80">Days</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-turquoise">6</div>
                <div className="text-sm opacity-80">Guests Max</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-turquoise">15-25</div>
                <div className="text-sm opacity-80">Knots Wind</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-turquoise">€1,900</div>
                <div className="text-sm opacity-80">Starting Price</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Available Departures Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-turquoise/10 text-turquoise rounded-full text-sm font-semibold mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              Live Availability
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-deep-navy font-montserrat mb-6">
              Available Departures
            </h2>
            <p className="text-xl text-gray-600 font-open-sans max-w-3xl mx-auto leading-relaxed">
              Saturday-to-Saturday departures with 3 double cabins available per trip. Book your preferred week for the
              ultimate Caribbean kitesafari experience.
            </p>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-turquoise/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-turquoise" />
                </div>
                <h3 className="font-semibold text-deep-navy mb-2">Flexible Scheduling</h3>
                <p className="text-gray-600 text-sm">Multiple departure dates throughout the season</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-coral-orange/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-coral-orange" />
                </div>
                <h3 className="font-semibold text-deep-navy mb-2">Small Groups</h3>
                <p className="text-gray-600 text-sm">Maximum 6 guests for personalized experience</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-semibold text-deep-navy mb-2">Best Value</h3>
                <p className="text-gray-600 text-sm">All-inclusive pricing with no hidden fees</p>
              </div>
            </div>
          </div>
          
          {/* Enhanced Trip Calendar */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-turquoise to-deep-navy text-white p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold font-montserrat mb-2">Antigua Safari Schedule</h3>
                    <p className="opacity-90">Real-time availability from our Airtable database</p>
                  </div>
                  <div className="hidden md:flex items-center space-x-4">
                    <div className="bg-white/20 rounded-lg px-4 py-2">
                      <div className="text-sm opacity-80">Season</div>
                      <div className="font-semibold">Dec 2025 - Apr 2026</div>
                    </div>
                    <div className="bg-white/20 rounded-lg px-4 py-2">
                      <div className="text-sm opacity-80">Departures</div>
                      <div className="font-semibold">Every Saturday</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <AntiguaTripCalendar />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Tour Route Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-deep-navy/10 text-deep-navy rounded-full text-sm font-semibold mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              Adventure Route
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-deep-navy font-montserrat mb-6">
              Tour Route Map
            </h2>
            <p className="text-xl text-gray-600 font-open-sans max-w-3xl mx-auto leading-relaxed">
              Explore the sailing routes and key kitesurfing waypoints for our Antigua & Barbuda safari
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <RouteMap
                title="Antigua & Barbuda Kitesafari Route"
                description="7-day sailing route with premium kitesurfing spots and cultural stops"
                waypoints={[
                  {
                    name: "Jolly Harbor",
                    coordinates: { lat: 17.0475, lng: -61.8658 },
                    description: "Starting point with marina facilities and restaurants",
                  },
                  {
                    name: "Hansons Bay",
                    coordinates: { lat: 17.1167, lng: -61.8833 },
                    description: "Flat-water playground perfect for beginners and freestyle",
                  },
                  {
                    name: "Nonsuch Bay",
                    coordinates: { lat: 17.0833, lng: -61.7167 },
                    description: "Protected by reef with butter-flat water conditions",
                  },
                  {
                    name: "Great Bird Island",
                    coordinates: { lat: 17.1167, lng: -61.6833 },
                    description: "Remote wildlife sanctuary with pristine conditions",
                  },
                  {
                    name: "Barbuda - Coco Point",
                    coordinates: { lat: 17.5833, lng: -61.8167 },
                    description: "Shallow waters and pink sand beaches",
                  },
                  {
                    name: "Codrington Lagoon",
                    coordinates: { lat: 17.6333, lng: -61.8167 },
                    description: "Large shallow lagoon with safe progression conditions",
                  },
                  {
                    name: "Falmouth Harbor",
                    coordinates: { lat: 17.0167, lng: -61.7667 },
                    description: "Historic harbor near Nelson's Dockyard",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-coral-orange/10 text-coral-orange rounded-full text-sm font-semibold mb-4">
              <Tag className="w-4 h-4 mr-2" />
              Pricing & Booking
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-deep-navy font-montserrat mb-6">
              View Our Pricing
            </h2>
            <p className="text-xl text-gray-600 font-open-sans max-w-3xl mx-auto leading-relaxed">
              Explore our transparent pricing structure with detailed cabin options and all-inclusive packages
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-coral-orange to-coral-orange/80 text-white p-8">
                <h3 className="text-2xl font-bold font-montserrat mb-2">Complete Pricing Information</h3>
                <p className="opacity-90">See all cabin options, what's included, and booking details</p>
              </div>
              <div className="p-8 text-center">
                <p className="text-lg text-gray-600 mb-6">
                  From shared cabins to private options and full catamaran charters, 
                  we offer flexible pricing for every type of traveler.
                </p>
                <a 
                  href="/pricing" 
                  className="inline-flex items-center px-8 py-4 bg-coral-orange hover:bg-coral-orange/90 text-white font-semibold rounded-lg transition-all duration-300 text-lg group"
                >
                  View Full Pricing
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Package Tabs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4 mr-2" />
              Package Details
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-deep-navy font-montserrat mb-6">
              Safari Packages
            </h2>
            <p className="text-xl text-gray-600 font-open-sans max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive kitesafari packages with detailed itineraries, inclusions, and upgrade options
            </p>
          </div>
          <div className="max-w-7xl mx-auto">
            <PackageTabs />
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-deep-navy via-deep-navy/95 to-turquoise/20 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-6">
              Ready for Your
              <span className="block text-turquoise">Kitesafari Adventure?</span>
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Join us for an unforgettable 7-day luxury catamaran kitesafari in the Caribbean. 
              Limited spots available - secure your adventure today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/booking" 
                className="inline-flex items-center px-8 py-4 bg-coral-orange hover:bg-coral-orange/90 text-white font-semibold rounded-lg transition-all duration-300 text-lg group"
              >
                Book Your Safari
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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
