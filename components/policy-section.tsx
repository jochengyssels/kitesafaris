import { Shield, RefreshCw, Clock, CheckCircle } from "lucide-react"

export function PolicySection() {
  return (
    <div className="mt-12 bg-sand-beige border border-deep-navy/10 rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-bold text-deep-navy font-montserrat mb-6 text-center">
        Safety & Cancellation Policy
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Safety Policy */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-turquoise/10 rounded-full">
              <Shield className="w-5 h-5 text-turquoise" />
            </div>
            <h4 className="font-semibold text-deep-navy font-montserrat">Safety First</h4>
          </div>
          <ul className="space-y-2 text-sm text-deep-navy/80 font-open-sans">
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-turquoise mt-0.5 flex-shrink-0" />
              <span>All equipment inspected daily by certified technicians</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-turquoise mt-0.5 flex-shrink-0" />
              <span>Professional rescue boat on standby during all sessions</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-turquoise mt-0.5 flex-shrink-0" />
              <span>Weather monitoring and session adjustments as needed</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-turquoise mt-0.5 flex-shrink-0" />
              <span>Comprehensive insurance coverage included</span>
            </li>
          </ul>
        </div>

        {/* Cancellation Policy */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-coral-orange/10 rounded-full">
              <RefreshCw className="w-5 h-5 text-coral-orange" />
            </div>
            <h4 className="font-semibold text-deep-navy font-montserrat">Flexible Cancellation</h4>
          </div>
          <ul className="space-y-2 text-sm text-deep-navy/80 font-open-sans">
            <li className="flex items-start space-x-2">
              <Clock className="w-4 h-4 text-coral-orange mt-0.5 flex-shrink-0" />
              <span>
                <strong>60+ days:</strong> Full refund minus processing fee
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Clock className="w-4 h-4 text-coral-orange mt-0.5 flex-shrink-0" />
              <span>
                <strong>30-59 days:</strong> 75% refund or reschedule option
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Clock className="w-4 h-4 text-coral-orange mt-0.5 flex-shrink-0" />
              <span>
                <strong>14-29 days:</strong> 50% refund or future credit
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Clock className="w-4 h-4 text-coral-orange mt-0.5 flex-shrink-0" />
              <span>
                <strong>Weather cancellation:</strong> Full refund or reschedule
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-deep-navy/10">
        <p className="text-xs text-deep-navy/60 font-open-sans text-center">
          By booking, you agree to our{" "}
          <a href="/terms" className="text-turquoise hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-turquoise hover:underline">
            Privacy Policy
          </a>
          . Questions? Contact us at{" "}
          <a href="mailto:support@kitesafaris.com" className="text-turquoise hover:underline">
            support@kitesafaris.com
          </a>
        </p>
      </div>
    </div>
  )
}
