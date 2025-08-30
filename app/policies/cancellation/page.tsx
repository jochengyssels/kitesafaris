import { Navigation } from "@/components/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cancellation Policy | KiteSafaris.com",
  description: "Cancellation terms and conditions for KiteSafaris.com bookings.",
}

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-deep-navy mb-4 font-montserrat">
                Cancellation Policy
              </h1>
              <p className="text-lg text-deep-navy/80 font-open-sans">
                Flexible cancellation options for your peace of mind
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-sand-beige rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Guest Cancellations</h2>
                <div className="space-y-6 font-open-sans text-deep-navy/90">
                  <div>
                    <h3 className="text-lg font-semibold text-deep-navy mb-2">Early Cancellation (60+ days)</h3>
                    <p>Full refund minus 5% processing fee. No questions asked.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-deep-navy mb-2">Standard Cancellation (30-59 days)</h3>
                    <p>75% refund OR free rescheduling to any available dates within 2 years.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-deep-navy mb-2">Late Cancellation (14-29 days)</h3>
                    <p>50% refund OR future credit valid for 2 years with no restrictions.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-deep-navy mb-2">Last Minute (Less than 14 days)</h3>
                    <p>No refund, but you may transfer your booking to another person at no charge.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Our Cancellation Record</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <p className="text-xl font-semibold text-turquoise">Zero cancellations in 10+ years</p>
                  <p>
                    We have never canceled a single charter since 2013, including during the COVID-19 pandemic when it
                    cost us significantly. This demonstrates our commitment to reliability and your vacation plans.
                  </p>
                  <p>
                    <strong>Weather Cancellations:</strong> In the extremely unlikely event we must cancel due to unsafe
                    conditions, you receive a full refund or priority rebooking.
                  </p>
                </div>
              </div>

              <div className="bg-coral-orange/10 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">
                  Travel Insurance Recommendation
                </h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <p>
                    We strongly recommend purchasing travel insurance to protect against unforeseen circumstances such
                    as:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Medical emergencies or illness</li>
                    <li>Flight cancellations or delays</li>
                    <li>Personal emergencies</li>
                    <li>Natural disasters</li>
                  </ul>
                  <p>
                    Travel insurance typically costs 4-8% of your trip cost and provides comprehensive protection beyond
                    our cancellation policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
