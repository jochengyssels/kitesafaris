import type { Metadata } from "next"
import { KAIteAgent } from "@/components/kaite-agent"

export const metadata: Metadata = {
  title: "kAIte - Your Kitesurfing Expert | Find Perfect Kitespots | KiteSafaris.com",
  description: "Chat with kAIte, your AI kitesurfing expert trained on data from the world's best kitespots. Get personalized recommendations, learn about conditions, and discover your next kitesurfing destination.",
  keywords: "kitesurfing AI, kitespot recommendations, kitesurfing expert, AI assistant, kitesurfing spots, wind conditions, kitesurfing destinations",
  openGraph: {
    title: "kAIte - Your Kitesurfing Expert | KiteSafaris.com",
    description: "Chat with kAIte, your AI kitesurfing expert trained on data from the world's best kitespots. Get personalized recommendations and discover your next destination.",
    url: "https://kitesafaris.com/kaite",
    images: [
      {
        url: "/antigua-aerial-harbor-view.jpg",
        width: 1200,
        height: 630,
        alt: "kAIte - Your Kitesurfing Expert AI Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "kAIte - Your Kitesurfing Expert",
    description: "Chat with kAIte, your AI kitesurfing expert trained on data from the world's best kitespots.",
    images: ["/antigua-aerial-harbor-view.jpg"],
  },
}

export default function KAItePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-turquoise-blue to-deep-navy">
      {/* Hero Section */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-coral-orange to-turquoise-blue rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-3xl">k</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-deep-navy mb-4">
              Meet <span className="text-coral-orange">kAIte</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your AI kitesurfing expert, powered by advanced language processing and trained on data from thousands of kitespots worldwide. 
              Have natural conversations, get personalized recommendations, and discover 
              your next kitesurfing adventure with intelligent assistance.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                AI-Powered Intelligence
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Natural Conversations
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Context Awareness
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Expert Personality
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden" style={{ height: '600px' }}>
          <KAIteAgent className="h-full" />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-deep-navy mb-4">
              What kAIte Can Do For You
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powered by advanced AI and comprehensive data from thousands of kitespots worldwide, 
              kAIte provides intelligent, conversational guidance tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-coral-orange to-turquoise-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-3">
                AI-Powered Intelligence
              </h3>
              <p className="text-gray-600">
                Advanced language processing understands your queries naturally and provides 
                intelligent responses with context awareness and conversation memory.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-coral-orange to-turquoise-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-3">
                Natural Conversations
              </h3>
              <p className="text-gray-600">
                Chat naturally with kAIte like you would with a kitesurfing expert. 
                Ask follow-up questions, get explanations, and have engaging conversations.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-coral-orange to-turquoise-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-3">
                Personalized Recommendations
              </h3>
              <p className="text-gray-600">
                Get intelligent spot recommendations based on your skill level, preferences, 
                and conversation context. kAIte learns what you like and suggests perfect matches.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-coral-orange to-turquoise-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏄‍♂️</span>
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-3">
                Expert Personality
              </h3>
              <p className="text-gray-600">
                kAIte has the personality of an enthusiastic kitesurfing expert who loves sharing 
                knowledge and helping you discover amazing spots and techniques.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-coral-orange to-turquoise-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🗺️</span>
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-3">
                Global Coverage
              </h3>
              <p className="text-gray-600">
                Explore kitespots from the Caribbean to Australia, with detailed information 
                about thousands of locations worldwide and intelligent search capabilities.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-coral-orange to-turquoise-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-3">
                Context Awareness
              </h3>
              <p className="text-gray-600">
                kAIte remembers your conversation, understands context, and provides 
                relevant follow-up information based on what you've discussed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-coral-orange to-turquoise-blue py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Kitespot?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Start chatting with kAIte now and discover your next kitesurfing adventure.
          </p>
          <a
            href="#chat"
            className="inline-block bg-white text-coral-orange font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Start Chatting with kAIte
          </a>
        </div>
      </div>
    </div>
  )
}
