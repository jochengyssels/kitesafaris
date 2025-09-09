import { KitespotData, KitespotSearchFilters, KitespotRecommendation, AIRPORT_TO_COUNTRY } from './kitespot-schema'
import { LLMService, ConversationContext } from './llm-service'
import kitespotsData from '../data/kitespots.json'

export interface UserProfile {
  skill_level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  preferences: {
    water_type: ('flat' | 'chop' | 'waves' | 'mixed')[]
    wind_strength: {
      min: number
      max: number
    }
    travel_budget: 'low' | 'medium' | 'high'
    accommodation_type: 'budget' | 'mid-range' | 'luxury'
    group_size: number
    experience_years: number
  }
  visited_spots: string[]
  wishlist: string[]
}

export interface ChatMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  metadata?: {
    recommendations?: KitespotRecommendation[]
    bookingRecommendations?: any[]
    search_filters?: KitespotSearchFilters
    ctaButtons?: Array<{
      text: string
      action: string
      url?: string
      style?: 'primary' | 'secondary' | 'success' | 'warning'
    }>
    quickChips?: string[]
  }
}

export class KAIteAgent {
  private kitespots: KitespotData[]
  private chatHistory: ChatMessage[] = []
  private llmService: LLMService
  private conversationContext: ConversationContext

  constructor() {
    // Extract kitespots from the PHPMyAdmin export format
    this.kitespots = this.parseKitespotsData(kitespotsData)
    
    // Initialize LLM service
    this.llmService = new LLMService(this.kitespots)
    
    // Initialize conversation context
    this.conversationContext = {
      chatHistory: []
    }
  }

  private parseKitespotsData(data: any): KitespotData[] {
    // Handle the PHPMyAdmin export format
    if (Array.isArray(data)) {
      // Find the data array in the PHPMyAdmin export format
      const dataEntry = data.find(entry => entry.type === 'table' && entry.name === 'spots')
      return dataEntry?.data || []
    }
    
    // If it's already the spots array, return it directly
    if (data && Array.isArray(data)) {
      return data
    }
    
    // If it's an object with a kitespots property, return that
    if (data && data.kitespots && Array.isArray(data.kitespots)) {
      return data.kitespots
    }
    
    return []
  }

  // Search kitespots based on filters
  searchKitespots(filters: KitespotSearchFilters): KitespotData[] {
    return this.kitespots.filter(spot => {
      // Name filter
      if (filters.name && !spot.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false
      }

      // Airport code filter
      if (filters.airport_code && spot.airport_code !== filters.airport_code) {
        return false
      }

      // ISO3 country code filter
      if (filters.iso3 && spot.iso3 !== filters.iso3) {
        return false
      }

      // Country filter (using airport code mapping)
      if (filters.country) {
        const countryFromAirport = AIRPORT_TO_COUNTRY[spot.airport_code]
        if (!countryFromAirport || !countryFromAirport.toLowerCase().includes(filters.country.toLowerCase())) {
          return false
        }
      }

      // Timezone filter
      if (filters.timezone && !spot.timezone.toLowerCase().includes(filters.timezone.toLowerCase())) {
        return false
      }

      // Description filter
      if (filters.has_description !== undefined) {
        const hasDescription = spot.description && spot.description.trim().length > 0
        if (filters.has_description !== hasDescription) {
          return false
        }
      }

      // For enhanced features, we'll need to add them to the data structure
      // These filters will work when the data is enhanced with additional information
      if (filters.difficulty && filters.difficulty.length > 0) {
        // This would require adding difficulty information to the data
        // For now, we'll skip this filter
      }

      if (filters.wind_strength) {
        // This would require adding wind information to the data
        // For now, we'll skip this filter
      }

      if (filters.water_type && filters.water_type.length > 0) {
        // This would require adding water type information to the data
        // For now, we'll skip this filter
      }

      if (filters.best_months && filters.best_months.length > 0) {
        // This would require adding seasonal information to the data
        // For now, we'll skip this filter
      }

      if (filters.facilities && filters.facilities.length > 0) {
        // This would require adding facilities information to the data
        // For now, we'll skip this filter
      }

      if (filters.tags && filters.tags.length > 0) {
        // This would require adding tags to the data
        // For now, we'll skip this filter
      }

      return true
    })
  }

  // Get personalized recommendations based on user profile
  getRecommendations(userProfile: UserProfile, limit: number = 5): KitespotRecommendation[] {
    const recommendations: KitespotRecommendation[] = []

    for (const spot of this.kitespots) {
      let matchScore = 0
      const reasons: string[] = []

      // Basic scoring based on available data
      const country = AIRPORT_TO_COUNTRY[spot.airport_code] || 'Unknown'
      
      // Boost spots with descriptions
      if (spot.description && spot.description.trim().length > 0) {
        matchScore += 20
        reasons.push('Has detailed information available')
      }

      // Boost popular destinations based on airport codes
      const popularDestinations = ['ANU', 'SXM', 'CUR', 'AUA', 'DXB', 'SYD', 'MEL', 'BNE']
      if (popularDestinations.includes(spot.airport_code)) {
        matchScore += 15
        reasons.push('Popular kitesurfing destination')
      }

      // Boost spots in preferred regions (based on user preferences)
      if (userProfile.preferences.water_type.includes('flat') && 
          (country.toLowerCase().includes('caribbean') || country.toLowerCase().includes('aruba'))) {
        matchScore += 10
        reasons.push('Great flat water conditions in the Caribbean')
      }

      if (userProfile.preferences.water_type.includes('waves') && 
          (country.toLowerCase().includes('australia') || country.toLowerCase().includes('portugal'))) {
        matchScore += 10
        reasons.push('Excellent wave riding opportunities')
      }

      // Experience level consideration (basic)
      if (userProfile.preferences.experience_years < 2 && 
          (country.toLowerCase().includes('caribbean') || country.toLowerCase().includes('aruba'))) {
        matchScore += 10
        reasons.push('Beginner-friendly destination')
      }

      if (userProfile.preferences.experience_years >= 3 && 
          (country.toLowerCase().includes('australia') || country.toLowerCase().includes('portugal'))) {
        matchScore += 10
        reasons.push('Challenging conditions for experienced riders')
      }

      // Avoid already visited spots
      if (userProfile.visited_spots.includes(spot.id)) {
        matchScore -= 20
      }

      // Boost spots in wishlist
      if (userProfile.wishlist.includes(spot.id)) {
        matchScore += 25
        reasons.push('This spot is in your wishlist!')
      }

      // Add country information to reasons
      if (matchScore > 0) {
        reasons.push(`Located in ${country}`)
      }

      if (matchScore > 0) {
        recommendations.push({
          spot,
          match_score: matchScore,
          reasons
        })
      }
    }

    // Sort by match score and return top recommendations
    return recommendations
      .sort((a, b) => b.match_score - a.match_score)
      .slice(0, limit)
  }

  // Check if skill levels are compatible
  private isSkillLevelCompatible(spotLevel: string, userLevel: string): boolean {
    const levels = ['beginner', 'intermediate', 'advanced', 'expert']
    const spotIndex = levels.indexOf(spotLevel)
    const userIndex = levels.indexOf(userLevel)

    // User can handle spots at their level or one level below
    return userIndex >= spotIndex - 1
  }

  // Process natural language queries with LLM enhancement
  async processQuery(query: string, userProfile?: UserProfile): Promise<ChatMessage> {
    // Update conversation context with user profile
    if (userProfile) {
      this.conversationContext.userProfile = userProfile
    }

    // Update conversation context with chat history
    this.conversationContext.chatHistory = this.chatHistory.map(msg => ({
      role: msg.type as 'user' | 'assistant',
      content: msg.content,
      timestamp: msg.timestamp
    }))

    // Process query with LLM service
    const llmResponse = await this.llmService.processQuery(query, this.conversationContext)

    // Create chat message from LLM response
    const assistantMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'assistant',
      content: llmResponse.response,
      timestamp: new Date(),
      metadata: {
        recommendations: llmResponse.recommendations,
        bookingRecommendations: llmResponse.bookingRecommendations,
        search_filters: llmResponse.searchFilters,
        ctaButtons: llmResponse.ctaButtons,
        quickChips: llmResponse.quickChips
      }
    }

    // Update conversation context
    this.conversationContext.chatHistory.push({
      role: 'assistant',
      content: llmResponse.response,
      timestamp: new Date()
    })

    this.chatHistory.push(assistantMessage)
    return assistantMessage
  }

  // Get spot details by ID
  getSpotById(id: string): KitespotData | undefined {
    return this.kitespots.find(spot => spot.id === id)
  }

  // Get all countries
  getAllCountries(): string[] {
    const countries = new Set(
      this.kitespots.map(spot => AIRPORT_TO_COUNTRY[spot.airport_code]).filter(Boolean)
    )
    return Array.from(countries).sort()
  }

  // Get all regions for a country
  getRegionsByCountry(country: string): string[] {
    const regions = new Set(
      this.kitespots
        .filter(spot => {
          const spotCountry = AIRPORT_TO_COUNTRY[spot.airport_code]
          return spotCountry && spotCountry.toLowerCase().includes(country.toLowerCase())
        })
        .map(spot => spot.timezone.split('/')[1] || spot.timezone) // Extract region from timezone
    )
    return Array.from(regions).sort()
  }

  // Get all airport codes
  getAllAirportCodes(): string[] {
    const codes = new Set(this.kitespots.map(spot => spot.airport_code))
    return Array.from(codes).sort()
  }

  // Get spots by airport code
  getSpotsByAirportCode(airportCode: string): KitespotData[] {
    return this.kitespots.filter(spot => spot.airport_code === airportCode)
  }

  // Get total number of spots
  getTotalSpotsCount(): number {
    return this.kitespots.length
  }

  // Get spots with descriptions
  getSpotsWithDescriptions(): KitespotData[] {
    return this.kitespots.filter(spot => spot.description && spot.description.trim().length > 0)
  }

  // Get chat history
  getChatHistory(): ChatMessage[] {
    return this.chatHistory
  }

  // Add user message to chat history
  addUserMessage(content: string): ChatMessage {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }
    this.chatHistory.push(userMessage)
    return userMessage
  }

  // Clear chat history
  clearChatHistory(): void {
    this.chatHistory = []
  }
}

// Export singleton instance
export const kaiteAgent = new KAIteAgent()
