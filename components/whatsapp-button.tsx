"use client"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleOpenChat = () => {
    setIsOpen(true)
    // Simulate Jochen typing
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
    }, 2000)
  }

  const handleSendMessage = () => {
    if (!message.trim()) return
    
    // Here you would integrate with actual WhatsApp API
    // For now, we'll simulate sending
    const whatsappUrl = `https://wa.me/32492576427?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    
    setMessage("")
    setIsOpen(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Chat Window */}
          <div className="relative bg-white rounded-t-2xl shadow-2xl w-full max-w-sm h-96 flex flex-col">
            {/* Header */}
            <div className="bg-green-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">👨‍💼</span>
                </div>
                <div>
                  <h3 className="font-semibold">Jochen</h3>
                  <p className="text-sm text-green-100">KiteSafaris.com</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {/* Jochen's greeting */}
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">👨‍💼</span>
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-2 max-w-xs">
                  <p className="text-sm text-gray-800">
                    Hi there! 👋 I'm Jochen from KiteSafaris. 
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">👨‍💼</span>
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-2 max-w-xs">
                  <p className="text-sm text-gray-800">
                    Thanks for your interest in our kiteboarding adventures! How can I help you plan your next trip?
                  </p>
                </div>
              </div>

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">👨‍💼</span>
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick response suggestions */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setMessage("I'm interested in Antigua trips")}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs hover:bg-blue-100 transition-colors"
                >
                  Antigua trips
                </button>
                <button
                  onClick={() => setMessage("What are your prices?")}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs hover:bg-blue-100 transition-colors"
                >
                  Pricing info
                </button>
                <button
                  onClick={() => setMessage("I have questions about equipment")}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs hover:bg-blue-100 transition-colors"
                >
                  Equipment
                </button>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={2}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Your message will open WhatsApp to continue the conversation
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
