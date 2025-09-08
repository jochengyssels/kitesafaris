import { Navigation } from "@/components/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Safety Guidelines | KiteSafaris.com",
  description: "Comprehensive safety protocols and guidelines for KiteSafaris.com adventures.",
  alternates: {
    canonical: "https://www.kitesafaris.com/policies/safety",
  },
}

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-deep-navy mb-4 font-montserrat">Safety Guidelines</h1>
              <p className="text-lg text-deep-navy/80 font-open-sans">
                Your safety is our top priority on every kiteboarding safari
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-sand-beige rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Safety Equipment & Protocols</h2>
                <div className="grid md:grid-cols-2 gap-6 font-open-sans text-deep-navy/90">
                  <div>
                    <h3 className="text-lg font-semibold text-deep-navy mb-2">Rescue Operations</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Dedicated rescue boat with 40HP+ motor</li>
                      <li>Professional rescue crew on standby</li>
                      <li>VHF radio communication systems</li>
                      <li>GPS tracking for all participants</li>
                      <li>Emergency medical kit onboard</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-deep-navy mb-2">Safety Equipment</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Coast Guard approved life jackets</li>
                      <li>Emergency flares and signaling devices</li>
                      <li>First aid stations on all vessels</li>
                      <li>Satellite communication backup</li>
                      <li>Weather monitoring equipment</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Pre-Trip Requirements</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <div className="bg-turquoise/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-deep-navy mb-2">Medical Clearance</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Basic fitness level required for water activities</li>
                      <li>Swimming ability mandatory (100m minimum)</li>
                      <li>Medical conditions must be disclosed</li>
                      <li>Pregnancy restrictions apply (consult doctor)</li>
                    </ul>
                  </div>
                  <div className="bg-gold/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-deep-navy mb-2">Skill Assessment</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Honest skill level declaration required</li>
                      <li>Water confidence evaluation on arrival</li>
                      <li>Equipment sizing and safety briefing</li>
                      <li>Buddy system assignment for beginners</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-coral-orange/10 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Weather & Conditions</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <p>
                    <strong>Weather Monitoring:</strong> We continuously monitor weather conditions and adjust
                    activities accordingly.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Safe Conditions</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Wind speeds: 12-35 knots</li>
                        <li>Wave height: Under 2 meters</li>
                        <li>Visibility: 1km minimum</li>
                        <li>No thunderstorms within 10km</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-deep-navy mb-2">Activity Suspension</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Lightning or thunderstorms</li>
                        <li>Wind gusts over 40 knots</li>
                        <li>Poor visibility conditions</li>
                        <li>Dangerous marine life alerts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-deep-navy/5 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-deep-navy mb-4 font-montserrat">Emergency Procedures</h2>
                <div className="space-y-4 font-open-sans text-deep-navy/90">
                  <p>
                    All crew members are trained in emergency response and hold current certifications in first aid and
                    water rescue.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="bg-turquoise text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold">
                        1
                      </div>
                      <h4 className="font-semibold text-deep-navy">Signal for Help</h4>
                      <p className="text-sm">Raise one arm above head</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-coral-orange text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold">
                        2
                      </div>
                      <h4 className="font-semibold text-deep-navy">Stay Calm</h4>
                      <p className="text-sm">Activate safety systems</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gold text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold">
                        3
                      </div>
                      <h4 className="font-semibold text-deep-navy">Wait for Rescue</h4>
                      <p className="text-sm">Rescue boat responds immediately</p>
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
