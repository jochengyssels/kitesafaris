import { Navigation } from "@/components/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | KiteSafaris.com",
  description: "Privacy policy and data protection information for KiteSafaris.com users.",
  alternates: {
    canonical: "https://www.kitesafaris.com/policies/privacy",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-deep-navy mb-4 font-montserrat">Privacy Policy</h1>
              <p className="text-lg text-deep-navy/80 font-open-sans">
                How we collect, use, and protect your personal information
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-sand-beige rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Information We Collect</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <div>
                    <h3 className="text-lg font-semibold text-deep-navy mb-2">Personal Information</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Name, email address, and phone number</li>
                      <li>Billing and payment information</li>
                      <li>Emergency contact details</li>
                      <li>Medical information relevant to safety</li>
                      <li>Travel preferences and special requests</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-deep-navy mb-2">Usage Information</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Website browsing behavior and preferences</li>
                      <li>Booking history and communication records</li>
                      <li>Photos and videos (with your consent)</li>
                      <li>Feedback and review submissions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">How We Use Your Information</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Service Delivery</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Process bookings and payments</li>
                        <li>Coordinate travel arrangements</li>
                        <li>Provide customer support</li>
                        <li>Ensure safety and emergency response</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Communication</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Send booking confirmations and updates</li>
                        <li>Share important safety information</li>
                        <li>Provide trip preparation materials</li>
                        <li>Request feedback and reviews</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-turquoise/10 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Data Protection</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <p>We implement industry-standard security measures to protect your personal information:</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Technical Safeguards</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>SSL encryption for all data transmission</li>
                        <li>Secure payment processing systems</li>
                        <li>Regular security audits and updates</li>
                        <li>Access controls and authentication</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Operational Safeguards</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Staff training on data protection</li>
                        <li>Limited access on need-to-know basis</li>
                        <li>Regular data backup and recovery</li>
                        <li>Incident response procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-coral-orange/10 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Your Rights</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Access:</strong> Request a copy of your personal data
                    </li>
                    <li>
                      <strong>Correct:</strong> Update or correct inaccurate information
                    </li>
                    <li>
                      <strong>Delete:</strong> Request deletion of your personal data
                    </li>
                    <li>
                      <strong>Restrict:</strong> Limit how we process your information
                    </li>
                    <li>
                      <strong>Portability:</strong> Receive your data in a portable format
                    </li>
                    <li>
                      <strong>Object:</strong> Opt out of certain data processing activities
                    </li>
                  </ul>
                  <p className="mt-4">
                    To exercise these rights, contact us at{" "}
                    <a href="mailto:privacy@kitesafaris.com" className="text-turquoise hover:underline">
                      privacy@kitesafaris.com
                    </a>
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
