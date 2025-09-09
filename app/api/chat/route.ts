import { NextRequest, NextResponse } from 'next/server'
import { OpenAIService } from '@/lib/openai-service'
import { KitespotData } from '@/lib/kitespot-schema'
import kitespotsData from '@/data/kitespots.json'

// Initialize OpenAI service on server side
const openaiService = new OpenAIService()

// Parse kitespots data
function parseKitespotsData(data: any): KitespotData[] {
  if (Array.isArray(data)) {
    return data
  }
  
  // Handle PHPMyAdmin export format
  if (data && typeof data === 'object') {
    const keys = Object.keys(data)
    if (keys.length > 0 && data[keys[0]]) {
      return Object.values(data[keys[0]]) as KitespotData[]
    }
  }
  
  return []
}

const kitespots = parseKitespotsData(kitespotsData)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationHistory = [] } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Prepare context for OpenAI
    const context = {
      kitespots,
      userProfile: null,
      currentRecommendations: []
    }

    // Get response from OpenAI
    const openaiResponse = await openaiService.generateResponse(
      message,
      conversationHistory,
      context
    )

    // Generate quick chips
    const quickChips = await openaiService.generateQuickChips(message, conversationHistory)

    // Generate CTAs
    const ctaButtons = await openaiService.generateCTAs(message, conversationHistory)

    return NextResponse.json({
      response: openaiResponse.content,
      quickChips,
      ctaButtons,
      usage: openaiResponse.usage
    })

  } catch (error) {
    console.error('Chat API Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to process message',
        response: 'Sorry, I\'m having trouble connecting to my knowledge base right now. Please try again in a moment, or feel free to contact our team directly for immediate assistance! 🏄‍♂️',
        quickChips: ['Beginner spots', 'Best wind', 'Book safari', 'Caribbean', 'Greece']
      },
      { status: 500 }
    )
  }
}
