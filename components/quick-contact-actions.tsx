"use client"

import { MessageCircle, MessageSquare, Phone, Mail } from "lucide-react"

export function QuickContactActions() {
  // Quick contact handlers
  const handleWhatsApp = () => {
    const message = "Hi! I'd like to inquire about kiteboarding safaris."
    const whatsappUrl = `https://wa.me/32492576427?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleLiveChat = () => {
    // For now, redirect to WhatsApp as a fallback
    // You can integrate with Intercom, Crisp, or Zendesk here
    handleWhatsApp()
  }

  const handlePhone = () => {
    window.location.href = "tel:+32492576427"
  }

  const handleEmail = () => {
    const subject = "KiteSafaris Inquiry"
    const body = "Hi, I'm interested in learning more about your kiteboarding safaris."
    const mailtoUrl = `mailto:info@kitesafaris.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
  }

  return (
    <div className="bg-gradient-to-br from-deep-navy to-turquoise rounded-2xl p-8 text-white shadow-2xl">
      <h3 className="font-montserrat text-xl font-bold mb-4">Need Immediate Help?</h3>
      <p className="font-open-sans mb-6">
        For urgent inquiries, use our instant channels below.
      </p>

      <div className="space-y-4">
        <button 
          onClick={handleWhatsApp} 
          className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200 rounded-lg p-4 flex items-center group hover:scale-105"
          aria-label="Contact us on WhatsApp"
          role="button"
        >
          <MessageCircle className="h-6 w-6 mr-3 text-white group-hover:scale-110 transition-transform" />
          <div className="text-left">
            <div className="font-montserrat font-bold text-white">WhatsApp</div>
            <div className="font-open-sans text-sm text-white/90">Instant messaging support</div>
          </div>
        </button>

        <button 
          onClick={handleLiveChat} 
          className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200 rounded-lg p-4 flex items-center group hover:scale-105"
          aria-label="Start live chat with our team"
          role="button"
        >
          <MessageSquare className="h-6 w-6 mr-3 text-white group-hover:scale-110 transition-transform" />
          <div className="text-left">
            <div className="font-montserrat font-bold text-white">Live Chat</div>
            <div className="font-open-sans text-sm text-white/90">Chat with our team now</div>
          </div>
        </button>

        <button 
          onClick={handlePhone} 
          className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200 rounded-lg p-4 flex items-center group hover:scale-105"
          aria-label="Call us directly"
          role="button"
        >
          <Phone className="h-6 w-6 mr-3 text-white group-hover:scale-110 transition-transform" />
          <div className="text-left">
            <div className="font-montserrat font-bold text-white">Call Us</div>
            <div className="font-open-sans text-sm text-white/90">Direct phone support</div>
          </div>
        </button>

        <button 
          onClick={handleEmail} 
          className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200 rounded-lg p-4 flex items-center group hover:scale-105"
          aria-label="Send us an email"
          role="button"
        >
          <Mail className="h-6 w-6 mr-3 text-white group-hover:scale-110 transition-transform" />
          <div className="text-left">
            <div className="font-montserrat font-bold text-white">Email Us</div>
            <div className="font-open-sans text-sm text-white/90">Email support</div>
          </div>
        </button>
      </div>
    </div>
  )
}

