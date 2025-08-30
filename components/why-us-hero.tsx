import { Shield, Users, Leaf } from "lucide-react"

export function WhyUsHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-sand-beige to-sand-beige/80 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Mission and Values */}
          <div className="space-y-8 mb-16">
            <div>
              <h1 className="font-montserrat font-bold text-4xl lg:text-5xl text-deep-navy mb-6 text-balance">
                Crew Excellence
              </h1>
              <p className="font-open-sans text-lg text-deep-navy/80 leading-relaxed mb-8">
                We deliver unforgettable catamaran kite adventures across the Caribbean and
                Mediterranean. Our commitment to reliability means we've never canceled a single charter, even when it
                costs us significantly. Your dream vacation is secure with us.
              </p>
            </div>

            {/* Brand Values */}
            <div className="space-y-6">
              <h2 className="font-montserrat font-bold text-2xl text-deep-navy">Why Choose Us Over Others</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-turquoise rounded-full mt-3 flex-shrink-0"></div>
                  <p className="font-open-sans text-deep-navy/80">
                    <span className="font-semibold">Year-Round Operations:</span> This is our main business, not a
                    seasonal hobby. We operate professionally across multiple destinations.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-turquoise rounded-full mt-3 flex-shrink-0"></div>
                  <p className="font-open-sans text-deep-navy/80">
                    <span className="font-semibold">Our Own Catamarans:</span> We own and maintain our fleet, ensuring
                    consistent quality and specialized kite equipment on every vessel.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-turquoise rounded-full mt-3 flex-shrink-0"></div>
                  <p className="font-open-sans text-deep-navy/80">
                    <span className="font-semibold">Professional Rescue Support:</span> Dedicated rescue boats with
                    powerful outboard motors and experienced crew for your safety.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certification Badges */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/50 backdrop-blur-sm border-2 border-deep-navy rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-deep-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">Safety First</h3>
              <p className="font-open-sans text-deep-navy/70 text-sm">
                Professional rescue boats, experienced captains, and comprehensive safety protocols on every charter.
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm border-2 border-deep-navy rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-deep-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">Expert Crew</h3>
              <p className="font-open-sans text-deep-navy/70 text-sm">
                Captains who are also kite instructors, with deep knowledge of each destination's conditions and
                culture.
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm border-2 border-deep-navy rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-deep-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-2">All-Inclusive Value</h3>
              <p className="font-open-sans text-deep-navy/70 text-sm">
                Premium meals, safety equipment, and professional service. We pack our cruises with value, not just
                price.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
