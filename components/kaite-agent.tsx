"use client"

import React, { useState, useEffect, useRef } from 'react'
import { kaiteAgent, UserProfile, ChatMessage } from '@/lib/kaite-agent-service'
import { KitespotData, AIRPORT_TO_COUNTRY, KitespotRecommendation } from '@/lib/kitespot-schema'
import { BookingRecommendation } from '@/lib/booking-integration-service'
import Image from 'next/image'

interface KAIteAgentProps {
  className?: string
  onNewMessage?: () => void
  initialMessages?: ChatMessage[]
  isEmbedded?: boolean
}

export function KAIteAgent({ 
  className = "",
  onNewMessage,
  initialMessages,
  isEmbedded = false
}: KAIteAgentProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [showProfileSetup, setShowProfileSetup] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

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

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleClose = () => {
    setIsMinimized(true)
  }

  useEffect(() => {
    if (!isMinimized) {
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }
  }, [messages, isMinimized])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0
    }
  }, [])

  useEffect(() => {
    if (isEmbedded && !isMinimized) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = 0
        }
      }, 100)
    }
  }, [isEmbedded, isMinimized])

  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      setMessages(initialMessages)
    } else if (!isEmbedded) {
      const totalSpots = kaiteAgent.getTotalSpotsCount()
      
      // Much shorter, punchier opening messages
      const openingMessages = [
        `Hey rider! 🏄‍♂️ I'm kAIte, your AI kite expert. Ready to find your perfect spot? 🌊`,

        `Hey... ever been on a catamaran? 🛥️ I know where to find the BEST kite safaris! 😏`,

        `Well, well, well... look who's here! 🏄‍♂️ Ready to book something amazing? 🎯`,

        `Hey there, future kite legend! 🏄‍♂️ Let's find your dream destination! 🌊`
      ]

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
    }
  }, [initialMessages, isEmbedded])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = kaiteAgent.addUserMessage(inputValue)
    setMessages(prev => [...prev, userMessage])
    const query = inputValue
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await kaiteAgent.processQuery(query, userProfile || undefined)
      setMessages(prev => [...prev, response])
      
      if (onNewMessage) {
        onNewMessage()
      }
    } catch (error) {
      console.error('Error processing query:', error)
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      
      if (onNewMessage) {
        onNewMessage()
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    setTimeout(() => handleSendMessage(), 100)
  }

  const setupUserProfile = (profile: UserProfile) => {
    setUserProfile(profile)
    setShowProfileSetup(false)
  }

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const renderRecommendation = (recommendation: KitespotRecommendation) => (
    <div key={recommendation.spot.id} className="bg-white rounded-lg p-2 mb-2 border border-gray-200 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-bold text-xs text-deep-navy mb-1">{recommendation.spot.name}</h4>
          <div className="text-xs text-gray-600">
            <p>🏢 {recommendation.spot.airport_code} 🌍 {recommendation.spot.iso3}</p>
          </div>
        </div>
        <div className="ml-2">
          <div className="bg-gradient-to-r from-coral-orange to-turquoise-blue text-white px-2 py-1 rounded-full text-xs font-bold">
            {Math.round(recommendation.match_score * 100)}%
          </div>
        </div>
      </div>
      
      {recommendation.spot.description && (
        <p className="text-xs text-gray-700 mt-1">{recommendation.spot.description}</p>
      )}
    </div>
  )

  const renderBookingRecommendation = (recommendation: BookingRecommendation) => (
    <div 
      key={recommendation.trip.id} 
      className="bg-gradient-to-r from-coral-orange to-turquoise-blue text-white rounded-lg p-2 mb-2 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
      onClick={() => window.open(recommendation.trip.bookingUrl, '_blank')}
    >
      <div className="flex-1">
        <h4 className="font-bold text-xs mb-1">{recommendation.trip.name}</h4>
        <div className="text-xs">
          <p>📍 {recommendation.trip.destination} 📅 {new Date(recommendation.trip.startDate).toLocaleDateString()}</p>
          <p>💰 €{recommendation.trip.price.from} 💨 {recommendation.trip.windConditions.average} knots</p>
        </div>
        {recommendation.urgency && (
          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold mt-1 inline-block">
            ⚠️ {recommendation.urgency}
          </div>
        )}
        <div className="text-xs mt-1 opacity-80">
          Click to book → 
        </div>
      </div>
    </div>
  )

  const renderCTAButtons = (buttons: Array<{text: string, action: string, url?: string, style?: string}>) => (
    <div className="flex flex-wrap gap-1 mt-2">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => handleCTAAction(button)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${
            button.style === 'primary' 
              ? 'bg-gradient-to-r from-coral-orange to-turquoise-blue text-white hover:shadow-lg'
              : button.style === 'success'
              ? 'bg-green-500 text-white hover:bg-green-600'
              : button.style === 'warning'
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {button.text}
        </button>
      ))}
    </div>
  )

  const handleCTAAction = (button: {text: string, action: string, url?: string, style?: string}) => {
    if (button.url) {
      if (button.action === 'whatsapp') {
        window.open(button.url, '_blank')
      } else {
        window.location.href = button.url
      }
    } else if (button.action === 'compare_trips') {
      const userMessage = kaiteAgent.addUserMessage("Compare the trips you showed me")
      setMessages(prev => [...prev, userMessage])
      kaiteAgent.processQuery("Compare the trips you showed me", userProfile || undefined)
        .then(response => setMessages(prev => [...prev, response]))
        .catch(error => console.error('Error processing comparison:', error))
    }
  }

  const handleChipClick = async (chipText: string) => {
    if (isLoading) return
    
    const userMessage = kaiteAgent.addUserMessage(chipText)
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await kaiteAgent.processQuery(chipText, userProfile || undefined)
      setMessages(prev => [...prev, response])
      
      if (onNewMessage) {
        onNewMessage()
      }
    } catch (error) {
      console.error('Error processing query:', error)
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      
      if (onNewMessage) {
        onNewMessage()
      }
    } finally {
      setIsLoading(false)
    }
  }

  const renderQuickChips = (chips: string[]) => (
    <div className="flex flex-wrap gap-1 mt-2">
      {chips.map((chip, index) => (
        <button
          key={index}
          onClick={() => handleChipClick(chip)}
          disabled={isLoading}
          className="px-2 py-1 bg-white border border-coral-orange text-coral-orange rounded-full text-xs font-medium hover:bg-coral-orange hover:text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {chip}
        </button>
      ))}
    </div>
  )

  return (
    <div className={`flex flex-col h-full ${isEmbedded ? 'bg-white' : 'bg-gradient-to-br from-turquoise-blue to-deep-navy'} ${className}`}>
      {!isEmbedded && (
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-coral-orange to-turquoise-blue rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">k</span>
              </div>
              <div>
                <h2 className="font-bold text-lg text-deep-navy">kAIte</h2>
                <p className="text-sm text-gray-600">Your Kitesurfing Expert</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isMinimized && (
                <button
                  onClick={scrollToBottom}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Scroll to bottom"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              )}
              <button
                onClick={handleMinimize}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMinimized ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  )}
                </svg>
              </button>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                onClick={() => setShowProfileSetup(true)}
                className="px-3 py-1 text-xs bg-coral-orange text-white rounded-full hover:bg-orange-500 transition-colors"
              >
                Setup Profile
              </button>
              <button
                onClick={() => {
                  setMessages([])
                  kaiteAgent.clearChatHistory()
                }}
                className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {!isMinimized && (
        <div className={`flex-1 overflow-y-auto space-y-3 ${isEmbedded ? 'p-2' : 'p-4'}`} ref={chatContainerRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              id={`message-${message.id}`}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-2 ${
                  message.type === 'user'
                    ? 'bg-coral-orange text-white'
                    : 'bg-white text-gray-800 shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                
                {message.metadata?.recommendations && message.metadata.recommendations.length > 0 && (
                  <div className="mt-2">
                    <h4 className="font-semibold text-xs text-deep-navy mb-2">Recommended Spots:</h4>
                    {message.metadata.recommendations.map(renderRecommendation)}
                  </div>
                )}

                {message.metadata?.bookingRecommendations && message.metadata.bookingRecommendations.length > 0 && (
                  <div className="mt-2">
                    <h4 className="font-semibold text-xs text-deep-navy mb-2">Available Trips:</h4>
                    {message.metadata.bookingRecommendations.map(renderBookingRecommendation)}
                  </div>
                )}

                {message.metadata?.ctaButtons && (
                  <div className="mt-2">
                    {renderCTAButtons(message.metadata.ctaButtons)}
                  </div>
                )}

                {message.metadata?.quickChips && (
                  <div className="mt-2">
                    {renderQuickChips(message.metadata.quickChips)}
                  </div>
                )}
                
                <div className="text-xs opacity-70 mt-1">
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-2 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-coral-orange"></div>
                  <span className="text-xs text-gray-600">kAIte is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />

          <div className={`${isEmbedded ? 'px-2 py-1' : 'px-4 py-2'} ${isEmbedded ? 'bg-gray-50' : 'bg-white'} border-t border-gray-200`}>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => handleQuickQuestion("Show me beginner spots")}
                className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors"
              >
                Beginner 🌱
              </button>
              <button
                onClick={() => handleQuickQuestion("Best wind conditions")}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
              >
                Wind 💨
              </button>
              <button
                onClick={() => handleQuickQuestion("Wave riding spots")}
                className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors"
              >
                Waves 🌊
              </button>
              <button
                onClick={() => handleQuickQuestion("Book a safari")}
                className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full hover:bg-orange-200 transition-colors"
              >
                Book 🏄‍♂️
              </button>
            </div>
          </div>
        </div>
      )}

      {!isMinimized && (
        <div className={`${isEmbedded ? 'p-2' : 'p-4'} ${isEmbedded ? 'bg-gray-50' : 'bg-white'} border-t border-gray-200`}>
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask kAIte about kitesurfing spots..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-orange focus:border-transparent text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="px-4 py-2 bg-coral-orange text-white rounded-lg hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {showProfileSetup && (
        <ProfileSetupModal
          onSave={setupUserProfile}
          onClose={() => setShowProfileSetup(false)}
        />
      )}
    </div>
  )
}

interface ProfileSetupModalProps {
  onSave: (profile: UserProfile) => void
  onClose: () => void
}

function ProfileSetupModal({ onSave, onClose }: ProfileSetupModalProps) {
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    skill_level: 'beginner',
    preferences: {
      water_type: ['flat'],
      wind_strength: { min: 15, max: 25 },
      travel_budget: 'medium',
      accommodation_type: 'mid-range',
      group_size: 1,
      experience_years: 0
    },
    visited_spots: [],
    wishlist: []
  })

  const handleSave = () => {
    if (profile.skill_level && profile.preferences) {
      onSave(profile as UserProfile)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-bold text-deep-navy mb-4">Setup Your Profile</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Level
            </label>
            <select
              value={profile.skill_level}
              onChange={(e) => setProfile(prev => ({ ...prev, skill_level: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-orange"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Water Type Preference
            </label>
            <div className="space-y-2">
              {['flat', 'chop', 'waves', 'mixed'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={profile.preferences?.water_type?.includes(type as any)}
                    onChange={(e) => {
                      const currentTypes = profile.preferences?.water_type || []
                      const newTypes = e.target.checked
                        ? [...currentTypes, type as "flat" | "chop" | "waves" | "mixed"]
                        : currentTypes.filter((t: "flat" | "chop" | "waves" | "mixed") => t !== type)
                      setProfile(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences!, water_type: newTypes }
                      }))
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wind Strength (knots)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={profile.preferences?.wind_strength?.min || 15}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  preferences: {
                    ...prev.preferences!,
                    wind_strength: { ...prev.preferences!.wind_strength!, min: parseInt(e.target.value) }
                  }
                }))}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Min"
              />
              <span className="text-sm text-gray-500">to</span>
              <input
                type="number"
                value={profile.preferences?.wind_strength?.max || 25}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  preferences: {
                    ...prev.preferences!,
                    wind_strength: { ...prev.preferences!.wind_strength!, max: parseInt(e.target.value) }
                  }
                }))}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Max"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Travel Budget
            </label>
            <select
              value={profile.preferences?.travel_budget || 'medium'}
              onChange={(e) => setProfile(prev => ({
                ...prev,
                preferences: { ...prev.preferences!, travel_budget: e.target.value as any }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-orange"
            >
              <option value="low">Low Budget</option>
              <option value="medium">Medium Budget</option>
              <option value="high">High Budget</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Years
            </label>
            <input
              type="number"
              value={profile.preferences?.experience_years || 0}
              onChange={(e) => setProfile(prev => ({
                ...prev,
                preferences: { ...prev.preferences!, experience_years: parseInt(e.target.value) }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-orange"
              min="0"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-coral-orange text-white rounded-lg hover:bg-orange-500 transition-colors"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  )
}