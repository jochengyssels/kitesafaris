import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { ArrowLeft, FileText, Shield, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms & Conditions | KiteSafaris - Caribbean Kiteboarding Adventures",
  description: "Read our terms and conditions for KiteSafaris Caribbean kiteboarding adventures. Booking policies, safety requirements, and participant responsibilities.",
  keywords: "terms conditions, kiteboarding terms, Caribbean kite safari terms, booking conditions, safety requirements",
  openGraph: {
    title: "Terms & Conditions | KiteSafaris",
    description: "Read our terms and conditions for KiteSafaris Caribbean kiteboarding adventures.",
    type: "website",
  },
}

export default function TermsPage() {
  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-4 mb-6">
              <Link 
                href="/policies" 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-turquoise transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Policies
              </Link>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-turquoise" />
              <h1 className="text-3xl font-bold text-deep-navy">Terms & Conditions</h1>
            </div>
            
            <p className="text-lg text-gray-600">
              Please read these terms and conditions carefully before booking your KiteSafaris adventure.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            
            {/* Last Updated */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-blue-800">
                <strong>Last Updated:</strong> September 5, 2025
              </p>
            </div>

            {/* Section 1: Acceptance of Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-turquoise" />
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 mb-4">
                By booking a trip with KiteSafaris, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. These terms apply to all participants in our kiteboarding adventures.
              </p>
            </section>

            {/* Section 2: Booking and Payment */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-turquoise" />
                2. Booking and Payment
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Booking Process:</strong> All bookings must be made through our official website or authorized booking channels. A deposit is required to secure your reservation.
                </p>
                <p>
                  <strong>Payment Terms:</strong> Full payment is due 30 days before departure. We accept major credit cards and bank transfers.
                </p>
                <p>
                  <strong>Pricing:</strong> All prices are quoted in Euros (€) and include accommodation, meals, kite instruction, equipment, and transfers as specified in your trip details.
                </p>
              </div>
            </section>

            {/* Section 3: Safety and Requirements */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-deep-navy mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-turquoise" />
                3. Safety and Participant Requirements
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Kiteboarding Experience:</strong> Participants must have basic kiteboarding skills or be willing to learn. We provide instruction for all skill levels.
                </p>
                <p>
                  <strong>Health Requirements:</strong> Participants must be in good physical health and able to swim. Please inform us of any medical conditions that may affect your participation.
                </p>
                <p>
                  <strong>Safety Equipment:</strong> All participants must wear provided safety equipment including life jackets, helmets, and harnesses during kiteboarding activities.
                </p>
                <p>
                  <strong>Weather Conditions:</strong> All activities are subject to weather conditions. We reserve the right to modify or cancel activities for safety reasons.
                </p>
              </div>
            </section>

            {/* Section 4: Cancellation Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                4. Cancellation and Refund Policy
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Cancellation by Participant:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>More than 30 days before departure: Full refund minus €100 administration fee</li>
                  <li>15-30 days before departure: 50% refund</li>
                  <li>Less than 15 days before departure: No refund</li>
                </ul>
                <p>
                  <strong>Cancellation by KiteSafaris:</strong> In the event we must cancel a trip, participants will receive a full refund or the option to reschedule.
                </p>
              </div>
            </section>

            {/* Section 5: Liability and Insurance */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                5. Liability and Insurance
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Participant Responsibility:</strong> Participants engage in kiteboarding activities at their own risk. KiteSafaris provides professional instruction and safety equipment, but participants are responsible for their own actions.
                </p>
                <p>
                  <strong>Insurance:</strong> We strongly recommend that all participants have comprehensive travel and sports insurance that covers kiteboarding activities.
                </p>
                <p>
                  <strong>Limitation of Liability:</strong> KiteSafaris' liability is limited to the cost of the trip. We are not liable for personal injury, loss of personal belongings, or indirect damages.
                </p>
              </div>
            </section>

            {/* Section 6: Code of Conduct */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                6. Code of Conduct
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>All participants must:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Follow all safety instructions and guidelines</li>
                  <li>Respect other participants and local communities</li>
                  <li>Not consume alcohol before or during kiteboarding activities</li>
                  <li>Maintain appropriate behavior throughout the trip</li>
                  <li>Follow environmental protection guidelines</li>
                </ul>
                <p>
                  <strong>Removal from Trip:</strong> KiteSafaris reserves the right to remove participants who violate these terms without refund.
                </p>
              </div>
            </section>

            {/* Section 7: Force Majeure */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                7. Force Majeure
              </h2>
              <p className="text-gray-700">
                KiteSafaris is not liable for any failure to perform due to circumstances beyond our control, including but not limited to natural disasters, government restrictions, or other force majeure events.
              </p>
            </section>

            {/* Section 8: Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                8. Governing Law
              </h2>
              <p className="text-gray-700">
                These terms and conditions are governed by the laws of the Netherlands. Any disputes will be resolved in the courts of the Netherlands.
              </p>
            </section>

            {/* Contact Information */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-deep-navy mb-4">Questions About These Terms?</h3>
              <p className="text-gray-700 mb-4">
                If you have any questions about these terms and conditions, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> info@kitesafaris.com</p>
                <p><strong>Phone:</strong> +31 6 12345678</p>
                <p><strong>Address:</strong> KiteSafaris, Amsterdam, Netherlands</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
