import { Navigation } from "@/components/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Insurance Coverage | KiteSafaris.com",
  description: "Comprehensive insurance coverage details for KiteSafaris.com operations.",
}

export default function InsurancePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-deep-navy mb-4 font-montserrat">Insurance Coverage</h1>
              <p className="text-lg text-deep-navy/80 font-open-sans">
                Comprehensive protection for your kiteboarding safari adventure
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-sand-beige rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Our Insurance Coverage</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Yacht Insurance</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Full hull and equipment coverage</li>
                        <li>Third-party liability protection</li>
                        <li>Emergency evacuation coverage</li>
                        <li>Equipment replacement guarantee</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Professional Liability</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Certified instructor coverage</li>
                        <li>Professional indemnity insurance</li>
                        <li>Equipment failure protection</li>
                        <li>Rescue operation coverage</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">What's Included</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <div className="bg-turquoise/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-deep-navy mb-2">✓ Covered by Our Insurance</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Yacht damage or mechanical failure</li>
                      <li>Equipment malfunction or failure</li>
                      <li>Emergency medical evacuation</li>
                      <li>Search and rescue operations</li>
                      <li>Third-party property damage</li>
                      <li>Professional instructor liability</li>
                    </ul>
                  </div>
                  <div className="bg-coral-orange/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-deep-navy mb-2">
                      ✗ Not Covered (Requires Personal Insurance)
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Personal medical expenses</li>
                      <li>Trip cancellation due to personal reasons</li>
                      <li>Lost or stolen personal belongings</li>
                      <li>Flight delays or cancellations</li>
                      <li>Personal accident or injury compensation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-turquoise/10 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">
                  Recommended Personal Coverage
                </h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <p>
                    While our comprehensive insurance covers operational aspects, we strongly recommend personal travel
                    insurance for:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Medical Coverage</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Emergency medical treatment</li>
                        <li>Hospital stays and surgery</li>
                        <li>Medical evacuation to home country</li>
                        <li>Prescription medications</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Travel Protection</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Trip cancellation/interruption</li>
                        <li>Baggage loss or delay</li>
                        <li>Flight delays and missed connections</li>
                        <li>Personal liability coverage</li>
                      </ul>
                    </div>
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
