import { Navigation } from "@/components/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | KiteSafaris.com",
  description:
    "Terms and conditions, cancellation policy, and booking terms for KiteSafaris.com kiteboarding adventures.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-deep-navy mb-4 font-montserrat">Terms & Conditions</h1>
              <p className="text-lg text-deep-navy/80 font-open-sans">
                Booking terms, cancellation policy, and conditions for KiteSafaris.com
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-sand-beige rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Booking & Payment Terms</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <p>
                    <strong>Payment Schedule:</strong> 10% deposit secures your booking, additional 40% due within 30
                    days of booking, final 50% due 60 days before departure.
                  </p>
                  <p>
                    <strong>Pricing:</strong> All prices are per person for cabin bookings or total charter cost for
                    private bookings. Prices include all items listed in package inclusions.
                  </p>
                  <p>
                    <strong>Group Discounts:</strong> Available for groups of 6+ guests. Contact us for custom pricing.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Cancellation Policy</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <p>
                    <strong>Our Commitment:</strong> We have never canceled a charter in 10+ years of operation,
                    including during COVID-19 when it cost us significantly.
                  </p>
                  <p>
                    <strong>Guest Cancellations:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>More than 60 days before departure: Full refund minus 10% deposit</li>
                    <li>30-60 days before departure: 50% refund</li>
                    <li>Less than 30 days before departure: No refund</li>
                    <li>Travel insurance is strongly recommended for all bookings</li>
                  </ul>
                  <p>
                    <strong>Weather Cancellations:</strong> In the unlikely event of unsafe weather conditions, we will
                    reschedule or provide full refund.
                  </p>
                </div>
              </div>

              <div className="bg-sand-beige rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Safety & Liability</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <p>
                    <strong>Safety Standards:</strong> All guests must sign liability waivers. Professional rescue boat
                    support provided during all water activities.
                  </p>
                  <p>
                    <strong>Insurance:</strong> Comprehensive yacht insurance and professional liability coverage
                    maintained. Guests responsible for personal travel and medical insurance.
                  </p>
                  <p>
                    <strong>Medical Requirements:</strong> Guests must be in good physical condition. Medical conditions
                    must be disclosed at booking.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Equipment & Services</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <p>
                    <strong>Equipment Rental:</strong> Kite equipment available for $200/week including kites, boards,
                    harnesses, and safety gear.
                  </p>
                  <p>
                    <strong>Instruction:</strong> Professional kite lessons available for $300/week from certified
                    instructors.
                  </p>
                  <p>
                    <strong>Damage Policy:</strong> Guests responsible for equipment damage beyond normal wear and tear.
                  </p>
                </div>
              </div>

              <div className="bg-turquoise/10 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Contact & Support</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <p>For questions about terms and conditions or to discuss your booking:</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="https://wa.me/12687193930"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-coral-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors duration-200"
                    >
                      WhatsApp Support
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-turquoise text-white px-6 py-3 rounded-lg font-semibold hover:bg-turquoise/90 transition-colors duration-200"
                    >
                      Contact Form
                    </a>
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
