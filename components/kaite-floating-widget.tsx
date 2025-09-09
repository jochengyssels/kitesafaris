"use client"

import React, { useState, useEffect, useRef } from 'react'
import { KAIteAgent } from './kaite-agent'
import { ChatMessage } from '@/lib/kaite-agent-service'
import { useKAIteSettings } from '@/hooks/use-kaite-settings'
import Image from 'next/image'

interface KAIteFloatingWidgetProps {
  className?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  theme?: 'default' | 'minimal' | 'branded'
}

export function KAIteFloatingWidget({ 
  className = "",
  position = 'bottom-right',
  theme = 'branded'
}: KAIteFloatingWidgetProps) {
  const { isEnabled, isLoading: settingsLoading } = useKAIteSettings()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Position classes - moved to avoid WhatsApp overlap
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4 sm:bottom-6 sm:right-20', // Better mobile positioning
    'bottom-left': 'bottom-4 left-4 sm:bottom-6 sm:left-6',
    'top-right': 'top-4 right-4 sm:top-6 sm:right-6',
    'top-left': 'top-4 left-4 sm:top-6 sm:left-6'
  }

  // Theme classes
  const themeClasses = {
    default: {
      widget: 'bg-white border border-gray-200 shadow-lg',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      header: 'bg-gray-50 border-b border-gray-200'
    },
    minimal: {
      widget: 'bg-white border border-gray-300 shadow-xl',
      button: 'bg-gray-800 hover:bg-gray-900 text-white',
      header: 'bg-white border-b border-gray-200'
    },
    branded: {
      widget: 'bg-white border border-coral-orange shadow-xl',
      button: 'bg-gradient-to-r from-coral-orange to-turquoise-blue hover:from-orange-500 hover:to-blue-500 text-white',
      header: 'bg-gradient-to-r from-coral-orange to-turquoise-blue text-white'
    }
  }

  const currentTheme = themeClasses[theme]

  useEffect(() => {
    if (isOpen && !isInitialized) {
      // Much shorter, punchier opening messages
      const openingMessages = [
        `Hey rider! 🏄‍♂️ I'm kAIte, your AI kite expert. Ready to find your perfect spot? 🌊`,

        `Hey... ever been on a catamaran? 🛥️ I know where to find the BEST kite safaris! 😏`,

        `Well, well, well... look who's here! 🏄‍♂️ Ready to book something amazing? 🎯`,

        `Hey there, future kite legend! 🏄‍♂️ Let's find your dream destination! 🌊`
      ]

      // Pick a random opening message
      const randomMessage = openingMessages[Math.floor(Math.random() * openingMessages.length)]
      
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        type: 'assistant',
        content: randomMessage,
        timestamp: new Date(),
        metadata: {
          quickChips: [
            "Beginner spots",
            "Best wind",
            "Book safari",
            "Caribbean",
            "Greece"
          ]
        }
      }
      setMessages([welcomeMessage])
      setIsInitialized(true)
    }
  }, [isOpen, isInitialized])

  const handleToggle = () => {
    if (isOpen) {
      setIsMinimized(!isMinimized)
    } else {
      setIsOpen(true)
      setIsMinimized(false)
      setUnreadCount(0)
    }
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  const scrollToBottom = () => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      const messageElement = document.getElementById(`message-${lastMessage.id}`)
      if (messageElement) {
        messageElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        })
      }
    }
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen && !isMinimized) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }
  }, [messages, isOpen, isMinimized])

  // Focus input when chat opens and scroll to top
  useEffect(() => {
    if (isOpen && !isMinimized) {
      // Scroll to top first
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = 0
        }
      }, 50)
      
      // Focus the input field after a short delay
      setTimeout(() => {
        const input = document.querySelector('input[placeholder*="Ask kAIte"]') as HTMLInputElement
        if (input) {
          input.focus()
        }
      }, 200)
    }
  }, [isOpen, isMinimized])

  const handleNewMessage = () => {
    if (!isOpen) {
      setUnreadCount(prev => prev + 1)
    }
  }

  // Don't render if kAIte is disabled or settings are still loading
  if (settingsLoading || !isEnabled) {
    return null
  }

  return (
    <>
      {/* Floating Button */}
      <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
        <button
          onClick={handleToggle}
          className="w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative bg-white border-2 border-coral-orange hover:border-turquoise-blue overflow-hidden"
          aria-label="Chat with kAIte"
        >
          {/* KiteSafaris Logo */}
          <div className="w-12 h-12 flex items-center justify-center relative">
            <Image
              src="/kitesafaris-zebra-logo.png"
              alt="KiteSafaris Logo"
              width={48}
              height={48}
              className="object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Unread Badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}

          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></div>
        </button>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gradient-to-r from-coral-orange to-turquoise-blue text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-semibold">
          Ask kAIte — your Virtual Kite Expert
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-coral-orange"></div>
        </div>
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className={`fixed ${positionClasses[position]} z-50 transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-6rem)] max-h-[450px] min-h-[300px]'
        }`}>
          <div className={`${currentTheme.widget} rounded-lg overflow-hidden shadow-2xl h-full flex flex-col`}>
            {/* Header */}
            <div className={`${currentTheme.header} px-4 py-3 flex items-center justify-between`}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src="/kitesafaris-zebra-logo.png"
                    alt="KiteSafaris Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm">kAIte</h3>
                  <p className="text-xs opacity-90">Virtual Kite Expert</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!isMinimized && (
                  <button
                    onClick={scrollToBottom}
                    className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                    aria-label="Scroll to bottom"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={handleMinimize}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMinimized ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    )}
                  </svg>
                </button>
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  aria-label="Close chat"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <KAIteAgent 
                  className="flex-1"
                  onNewMessage={handleNewMessage}
                  initialMessages={messages}
                  isEmbedded={true}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

// Hero CTA Component for homepage
export function KAIteHeroCTA() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-deep-navy mb-4">
          Not sure where to go? Ask kAIte for your perfect kite safari!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Get personalized recommendations from our AI kitesurfing expert
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-coral-orange to-turquoise-blue hover:from-orange-500 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-coral-orange focus:ring-opacity-50"
        >
          💬 Ask kAIte — Your Virtual Kite Expert
        </button>
      </div>

      {/* Modal Chat */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-coral-orange to-turquoise-blue text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src="/kitesafaris-zebra-logo.png"
                    alt="KiteSafaris Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">kAIte</h3>
                  <p className="text-sm opacity-90">Virtual Kite Expert</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1">
              <KAIteAgent 
                className="h-full"
                isEmbedded={true}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
