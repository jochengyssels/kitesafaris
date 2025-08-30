"use client"

import { useState } from "react"
import { MessageCircle, Phone, MessageSquare } from "lucide-react"

export function FloatingActionButtons() {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleWhatsApp = () => {
    window.open("https://wa.me/32492576427?text=Hi! I'd like to inquire about kiteboarding safaris.", "_blank")
  }

  const handlePhone = () => {
    window.location.href = "tel:+32492576427"
  }

  const handleLiveChat = () => {
    // Integrate with your live chat service
    console.log("Opening live chat...")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end space-y-3">
        {/* Individual Action Buttons */}
        <div
          className={`flex flex-col space-y-3 transition-all duration-300 ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        >
          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsApp}
            className="bg-white hover:bg-coral-orange text-deep-navy hover:text-white p-3 rounded-full shadow-lg border-2 border-deep-navy hover:border-coral-orange transition-all duration-200 group"
            aria-label="Contact us on WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </button>

          {/* Phone Button */}
          <button
            onClick={handlePhone}
            className="bg-white hover:bg-coral-orange text-deep-navy hover:text-white p-3 rounded-full shadow-lg border-2 border-deep-navy hover:border-coral-orange transition-all duration-200 group"
            aria-label="Call us directly"
          >
            <Phone className="w-6 h-6" />
          </button>

          {/* Live Chat Button */}
          <button
            onClick={handleLiveChat}
            className="bg-white hover:bg-coral-orange text-deep-navy hover:text-white p-3 rounded-full shadow-lg border-2 border-deep-navy hover:border-coral-orange transition-all duration-200 group"
            aria-label="Start live chat"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        </div>

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-coral-orange hover:bg-coral-orange/90 text-white p-4 rounded-full shadow-lg transition-all duration-200 border-2 border-coral-orange"
          aria-label={isExpanded ? "Close contact options" : "Open contact options"}
          aria-expanded={isExpanded}
        >
          <div className={`transition-transform duration-200 ${isExpanded ? "rotate-45" : ""}`}>
            <div className="w-6 h-6 relative">
              <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-white transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
