import Link from "next/link"
import Image from "next/image"

export default function PartnershipLessonsIntegration() {
  return (
    <section className="py-20 bg-gradient-to-br from-turquoise-50 to-sand-beige-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-navy font-montserrat mb-12 text-center">
            Exclusive Partnership Lesson Programs
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* ProKite Sardegna */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/sardinia-punta-trettu-kiteboarding-mediterranean-c.png"
                  alt="ProKite Sardegna kitesurfing lessons at Punta Trettu"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">ProKite Sardegna</h3>
                  <p className="text-sm opacity-90">Punta Trettu, Sardinia</p>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-deep-navy mb-3">"Zero to Hero" Program</h4>
                <p className="text-gray-600 mb-4">
                  Exclusive 10-hour intensive course with photography service included. 
                  Perfect for complete beginners wanting to achieve independent riding.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• 10 hours of professional instruction</li>
                  <li>• Professional photography service</li>
                  <li>• Equipment rental discounts</li>
                  <li>• Flat water perfection at Punta Trettu</li>
                </ul>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-coral-orange">€490</span>
                  <Link 
                    href="/blog/kitesafaris-prokite-sardegna-partnership"
                    className="text-coral-orange hover:text-orange-500 font-semibold text-sm"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>

            {/* ABA Kiting */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/antigua-aerial-harbor-view.jpg"
                  alt="ABA Kiting boat-launched kitesurfing lessons"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">ABA Kiting</h3>
                  <p className="text-sm opacity-90">Caribbean & Greek Islands</p>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-deep-navy mb-3">Boat-Launched Adventures</h4>
                <p className="text-gray-600 mb-4">
                  Unique boat-launched lessons for exclusive experiences. Multi-location 
                  training across Caribbean and Greek Islands with IKO certified captains.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• Boat-launched instruction</li>
                  <li>• Multi-destination training</li>
                  <li>• IKO certified captains</li>
                  <li>• Advanced instruction available</li>
                </ul>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-coral-orange">€650</span>
                  <Link 
                    href="/blog/kitesafaris-aba-kiting-partnership"
                    className="text-coral-orange hover:text-orange-500 font-semibold text-sm"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>

            {/* Kitehouse Sardinia */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/sardinia-punta-trettu-kiteboarding-mediterranean-c.png"
                  alt="Kitehouse Sardinia lesson and accommodation packages"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Kitehouse Sardinia</h3>
                  <p className="text-sm opacity-90">Complete Experience</p>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-deep-navy mb-3">Lesson + Accommodation</h4>
                <p className="text-gray-600 mb-4">
                  Complete packages combining lessons with on-site accommodation. 
                  Family-friendly instruction with equipment storage and maintenance included.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• Lesson + accommodation combos</li>
                  <li>• Family-friendly instruction</li>
                  <li>• Equipment storage included</li>
                  <li>• On-site facilities</li>
                </ul>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-coral-orange">€790</span>
                  <Link 
                    href="/blog/kitesafaris-kitehouse-sardinia-partnership"
                    className="text-coral-orange hover:text-orange-500 font-semibold text-sm"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-deep-navy mb-6 text-center">Partnership Benefits</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-deep-navy mb-3">Exclusive Access</h4>
                <p className="text-gray-600 mb-4">
                  KiteSafaris clients receive exclusive access to premium lesson programs, 
                  equipment discounts, and special packages not available to the general public.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-deep-navy mb-3">Seamless Integration</h4>
                <p className="text-gray-600 mb-4">
                  All partnership programs integrate seamlessly with our kitesafari packages, 
                  providing a complete learning and adventure experience.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-deep-navy mb-3">Quality Assurance</h4>
                <p className="text-gray-600 mb-4">
                  Every partner school is vetted for IKO certification, safety standards, 
                  and teaching excellence to ensure consistent quality across all locations.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-deep-navy mb-3">Multi-Destination Learning</h4>
                <p className="text-gray-600 mb-4">
                  Progress your skills across multiple destinations with consistent 
                  instruction quality and equipment standards at every location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
