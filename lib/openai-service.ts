import OpenAI from 'openai'

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface OpenAIResponse {
  content: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export class OpenAIService {
  private client: OpenAI
  private systemPrompt: string

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    this.systemPrompt = `You are kAIte, the Virtual Kite Expert for KiteSafaris.com. You are stoked but trustworthy, providing concise, practical steps for kitesurfing journeys.

PERSONALITY:
- Enthusiastic and knowledgeable about kitesurfing
- Concise and practical in your responses
- Always ground answers in real data when possible
- Use emojis appropriately (🏄‍♂️🌊💨🏝️)
- Be helpful and sales-focused but not pushy

KNOWLEDGE BASE:
You have access to information about:
- 1775+ kitespots worldwide
- Kitesurfing destinations, conditions, and best times
- Equipment sizing and recommendations
- Safety guidelines and best practices
- Trip planning and logistics
- KiteSafaris.com services and packages

RESPONSE STYLE:
- Keep responses concise and practical
- Use bullet points for key information
- Include relevant emojis
- Provide actionable next steps
- When appropriate, suggest booking or getting more info

CATAMARAN & EQUIPMENT INFO:
- Catamarans typically accommodate 8-12 people for kitesurfing trips
- Include professional crew (captain, instructor, chef)
- Have dedicated kitesurfing areas and equipment storage
- Provide comfortable accommodation and meals

BOOKING INTENT:
When users show interest in trips, safaris, or booking:
- Provide specific trip options with prices
- Include clear call-to-action buttons
- Suggest WhatsApp contact for immediate booking
- Offer to compare different options

Always be helpful, accurate, and maintain the enthusiastic kitesurfing expert personality.`
  }

  async generateResponse(
    userMessage: string,
    conversationHistory: OpenAIMessage[] = [],
    context?: {
      kitespots?: any[]
      userProfile?: any
      currentRecommendations?: any[]
    }
  ): Promise<OpenAIResponse> {
    try {
      // Build context-aware system prompt
      let contextualPrompt = this.systemPrompt

      if (context?.kitespots && context.kitespots.length > 0) {
        contextualPrompt += `\n\nCURRENT KITESPOT DATA: You have access to ${context.kitespots.length} kitespots. Use this data to provide accurate, specific information.`
      }

      if (context?.userProfile) {
        contextualPrompt += `\n\nUSER PROFILE: ${JSON.stringify(context.userProfile)}`
      }

      if (context?.currentRecommendations && context.currentRecommendations.length > 0) {
        contextualPrompt += `\n\nCURRENT RECOMMENDATIONS: ${JSON.stringify(context.currentRecommendations)}`
      }

      // Build messages array
      const messages: OpenAIMessage[] = [
        { role: 'system', content: contextualPrompt },
        ...conversationHistory,
        { role: 'user', content: userMessage }
      ]

      const completion = await this.client.chat.completions.create({
        model: 'gpt-4o-mini', // Using the more cost-effective model
        messages: messages as any,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      })

      const response = completion.choices[0]?.message?.content || 'Sorry, I encountered an error processing your request.'

      return {
        content: response,
        usage: completion.usage ? {
          prompt_tokens: completion.usage.prompt_tokens,
          completion_tokens: completion.usage.completion_tokens,
          total_tokens: completion.usage.total_tokens
        } : undefined
      }

    } catch (error) {
      console.error('OpenAI API Error:', error)
      
      // Fallback response for API errors
      return {
        content: `Sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or feel free to contact our team directly for immediate assistance! 🏄‍♂️`
      }
    }
  }

  async generateQuickChips(
    userMessage: string,
    conversationHistory: OpenAIMessage[] = []
  ): Promise<string[]> {
    try {
      const chipPrompt = `Based on the user's message and conversation context, suggest 5 relevant quick response chips that would be helpful for a kitesurfing expert to offer. Keep them concise (2-3 words max) and relevant to kitesurfing, travel, or booking.

User message: "${userMessage}"

Return only 5 chips, one per line, no numbering or formatting.`

      const messages: OpenAIMessage[] = [
        { role: 'system', content: this.systemPrompt },
        ...conversationHistory,
        { role: 'user', content: chipPrompt }
      ]

      const completion = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages as any,
        max_tokens: 100,
        temperature: 0.5,
      })

      const response = completion.choices[0]?.message?.content || ''
      
      // Parse the response into an array of chips
      const chips = response
        .split('\n')
        .map(chip => chip.trim())
        .filter(chip => chip.length > 0 && chip.length < 20)
        .slice(0, 5)

      // Fallback chips if parsing fails
      if (chips.length === 0) {
        return ['Beginner spots', 'Best wind', 'Book safari', 'Caribbean', 'Greece']
      }

      return chips

    } catch (error) {
      console.error('Error generating quick chips:', error)
      return ['Beginner spots', 'Best wind', 'Book safari', 'Caribbean', 'Greece']
    }
  }

  async generateCTAs(
    userMessage: string,
    conversationHistory: OpenAIMessage[] = []
  ): Promise<Array<{text: string, action: string, url?: string, style?: 'primary' | 'secondary' | 'success' | 'warning'}>> {
    try {
      const ctaPrompt = `Based on the user's message and conversation context, suggest 2-3 relevant call-to-action buttons for a kitesurfing booking website. Consider if the user is interested in:
- Booking a trip/safari
- Getting more information
- Comparing options
- Contacting support

User message: "${userMessage}"

Return as JSON array with objects containing: text, action, url (optional), style (primary/secondary/success/warning).`

      const messages: OpenAIMessage[] = [
        { role: 'system', content: this.systemPrompt },
        ...conversationHistory,
        { role: 'user', content: ctaPrompt }
      ]

      const completion = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages as any,
        max_tokens: 200,
        temperature: 0.3,
      })

      const response = completion.choices[0]?.message?.content || ''
      
      try {
        const ctas = JSON.parse(response)
        if (Array.isArray(ctas) && ctas.length > 0) {
          return ctas.slice(0, 3) // Limit to 3 CTAs
        }
      } catch (parseError) {
        console.error('Error parsing CTA response:', parseError)
      }

      // Fallback CTAs
      return [
        { text: '💰 Book Safari', action: 'book_safari', url: '/packages', style: 'primary' as const },
        { text: '💬 WhatsApp', action: 'whatsapp', url: 'https://wa.me/1234567890', style: 'success' as const }
      ]

    } catch (error) {
      console.error('Error generating CTAs:', error)
      return [
        { text: '💰 Book Safari', action: 'book_safari', url: '/packages', style: 'primary' as const },
        { text: '💬 WhatsApp', action: 'whatsapp', url: 'https://wa.me/1234567890', style: 'success' as const }
      ]
    }
  }
}
