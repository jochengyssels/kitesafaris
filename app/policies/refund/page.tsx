import { Navigation } from "@/components/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund Policy | KiteSafaris.com",
  description: "Comprehensive refund policy for KiteSafaris.com bookings and cancellations.",
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-deep-navy mb-4 font-montserrat">Refund Policy</h1>
              <p className="text-lg text-deep-navy/80 font-open-sans">
                Clear and fair refund terms for all KiteSafaris.com bookings
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-sand-beige rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Refund Schedule</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <div className="border-l-4 border-turquoise pl-4">
                    <p>
                      <strong>60+ days before departure:</strong> Full refund minus 5% processing fee
                    </p>
                  </div>
                  <div className="border-l-4 border-gold pl-4">
                    <p>
                      <strong>30-59 days before departure:</strong> 75% refund or reschedule option
                    </p>
                  </div>
                  <div className="border-l-4 border-coral-orange pl-4">
                    <p>
                      <strong>14-29 days before departure:</strong> 50% refund or future credit valid for 2 years
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <p>
                      <strong>Less than 14 days:</strong> No refund, but may transfer to another guest
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Weather Guarantee</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <p>
                    <strong>Our Promise:</strong> We have never canceled a charter in 10+ years, including during
                    COVID-19.
                  </p>
                  <p>If weather conditions make kiteboarding unsafe for the majority of your trip, you will receive:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Full refund of all payments</li>
                    <li>OR priority rebooking for the next available dates</li>
                    <li>OR future credit with no expiration date</li>
                  </ul>
                </div>
              </div>

              <div className="bg-turquoise/10 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Processing & Contact</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <p>Refunds are processed within 5-10 business days to the original payment method.</p>
                  <p>For refund requests or questions:</p>
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
