import { KitespotData, KitespotRecommendation } from './kitespot-schema'
import { bookingService, BookingRecommendation } from './booking-integration-service'

export interface LLMResponse {
  response: string
  recommendations?: KitespotRecommendation[]
  bookingRecommendations?: BookingRecommendation[]
  searchFilters?: any
  confidence: number
  reasoning?: string
  ctaButtons?: Array<{
    text: string
    action: string
    url?: string
    style?: 'primary' | 'secondary' | 'success' | 'warning'
  }>
  quickChips?: string[]
}

export interface ConversationContext {
  userProfile?: any
  chatHistory: Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>
  currentTopic?: string
  userPreferences?: any
}

export class LLMService {
  private kitespots: KitespotData[]
  private conversationContext: ConversationContext

  constructor(kitespots: KitespotData[]) {
    this.kitespots = kitespots
    this.conversationContext = {
      chatHistory: []
    }
  }

  // Enhanced query processing with OpenAI LLM via API route
  async processQuery(query: string, context?: ConversationContext): Promise<LLMResponse> {
    if (context) {
      this.conversationContext = context
    }

    // Update conversation context
    this.conversationContext.chatHistory.push({
      role: 'user',
      content: query,
      timestamp: new Date()
    })

    try {
      // Convert conversation history to API format
      const conversationHistory = this.conversationContext.chatHistory
        .slice(-10) // Keep last 10 messages for context
        .map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        }))

      // Call the API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query,
          conversationHistory
        })
      })

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`)
      }

      const apiResponse = await response.json()

      // Add assistant message to conversation history
      this.conversationContext.chatHistory.push({
        role: 'assistant',
        content: apiResponse.response,
        timestamp: new Date()
      })

      // Check if we should provide specific recommendations based on the query
      let recommendations: KitespotRecommendation[] = []
      let bookingRecommendations: BookingRecommendation[] = []

      // If the query mentions specific locations or booking intent, provide recommendations
      if (this.shouldProvideRecommendations(query)) {
        recommendations = this.getContextualRecommendations(query)
      }

      if (this.shouldProvideBookingRecommendations(query)) {
        bookingRecommendations = this.getBookingRecommendations(query)
      }

      return {
        response: apiResponse.response,
        recommendations,
        bookingRecommendations,
        ctaButtons: apiResponse.ctaButtons || [],
        quickChips: apiResponse.quickChips || ['Beginner spots', 'Best wind', 'Book safari', 'Caribbean', 'Greece'],
        confidence: 0.9,
        reasoning: `Generated response using OpenAI API with ${apiResponse.usage?.total_tokens || 0} tokens`
      }

    } catch (error) {
      console.error('Error processing query with OpenAI API:', error)
      
      // Fallback to basic response
      return {
        response: `Hey rider! 🏄‍♂️ I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or feel free to contact our team directly for immediate assistance!`,
        quickChips: ['Beginner spots', 'Best wind', 'Book safari', 'Caribbean', 'Greece'],
        confidence: 0.5,
        reasoning: 'Fallback response due to API error'
      }
    }
  }

  private shouldProvideRecommendations(query: string): boolean {
    const queryLower = query.toLowerCase()
    const locationKeywords = ['spot', 'destination', 'place', 'where', 'caribbean', 'greece', 'australia', 'beginner', 'advanced']
    return locationKeywords.some(keyword => queryLower.includes(keyword))
  }

  private shouldProvideBookingRecommendations(query: string): boolean {
    const queryLower = query.toLowerCase()
    const bookingKeywords = ['book', 'trip', 'safari', 'package', 'price', 'cost', 'budget', '€', 'euro']
    return bookingKeywords.some(keyword => queryLower.includes(keyword))
  }

  private getContextualRecommendations(query: string): KitespotRecommendation[] {
    const queryLower = query.toLowerCase()
    
    // Simple logic to provide relevant recommendations
    if (queryLower.includes('beginner')) {
      const spots = this.getSpotsForSkillLevel('beginner')
      return spots.slice(0, 3).map(spot => ({
        spot,
        match_score: 0.9,
        reasons: ['Perfect for beginners']
      }))
    }
    
    if (queryLower.includes('caribbean')) {
      const spots = this.searchByCountry('caribbean')
      return spots.slice(0, 3).map(spot => ({
        spot,
        match_score: 0.9,
        reasons: ['Caribbean destination']
      }))
    }
    
    if (queryLower.includes('greece')) {
      const spots = this.searchByCountry('greece')
      return spots.slice(0, 3).map(spot => ({
        spot,
        match_score: 0.9,
        reasons: ['Greek destination']
      }))
    }
    
    // Default to popular spots
    const spots = this.getPopularSpots()
    return spots.slice(0, 3).map(spot => ({
      spot,
      match_score: 0.8,
      reasons: ['Popular destination']
    }))
  }

  private getBookingRecommendations(query: string): BookingRecommendation[] {
    // Return some sample booking recommendations
    const trips = bookingService.findTrips({})
    return trips.slice(0, 2)
  }

  private analyzeIntent(query: string): any {
    const queryLower = query.toLowerCase()
    
    // Quick chip patterns
    if (this.matchesPattern(queryLower, ['beginner spots', 'beginner destinations'])) {
      return { type: 'search', confidence: 0.9, chipType: 'beginner_spots' }
    }
    
    if (this.matchesPattern(queryLower, ['best wind', 'wind conditions', 'wind forecast'])) {
      return { type: 'information', confidence: 0.9, chipType: 'wind_info' }
    }
    
    if (this.matchesPattern(queryLower, ['book safari', 'book a safari', 'book trip'])) {
      return { type: 'booking', confidence: 0.9, chipType: 'book_safari' }
    }
    
    if (this.matchesPattern(queryLower, ['caribbean'])) {
      return { type: 'information', confidence: 0.9, chipType: 'caribbean_info' }
    }
    
    if (this.matchesPattern(queryLower, ['greece'])) {
      return { type: 'information', confidence: 0.9, chipType: 'greece_info' }
    }
    
    if (this.matchesPattern(queryLower, ['wave riding', 'wave spots'])) {
      return { type: 'search', confidence: 0.9, chipType: 'wave_riding' }
    }
    
    // Search patterns
    if (this.matchesPattern(queryLower, ['find', 'search', 'show me', 'where can i', 'spots in'])) {
      return { type: 'search', confidence: 0.9 }
    }
    
    // Recommendation patterns
    if (this.matchesPattern(queryLower, ['recommend', 'suggest', 'best for', 'good for', 'perfect for'])) {
      return { type: 'recommendation', confidence: 0.9 }
    }
    
    // Information patterns
    if (this.matchesPattern(queryLower, ['what is', 'tell me about', 'how is', 'when is', 'why'])) {
      return { type: 'information', confidence: 0.8 }
    }
    
    // Comparison patterns
    if (this.matchesPattern(queryLower, ['compare', 'vs', 'versus', 'better than', 'difference between'])) {
      return { type: 'comparison', confidence: 0.8 }
    }
    
    // Planning patterns
    if (this.matchesPattern(queryLower, ['plan', 'trip', 'visit', 'go to', 'travel to'])) {
      return { type: 'planning', confidence: 0.8 }
    }
    
    // Booking patterns
    if (this.matchesPattern(queryLower, ['book', 'booking', 'reserve', 'safari', 'trip', '€', 'euro', 'budget', 'price', 'cost'])) {
      return { type: 'booking', confidence: 0.9 }
    }
    
    return { type: 'general', confidence: 0.6 }
  }

  private extractEntities(query: string): any {
    const entities = {
      locations: [] as string[],
      skillLevels: [] as string[],
      waterTypes: [] as string[],
      countries: [] as string[],
      activities: [] as string[]
    }

    const queryLower = query.toLowerCase()

    // Extract locations and countries
    const countries = ['australia', 'caribbean', 'greece', 'aruba', 'uae', 'brazil', 'egypt', 'spain', 'portugal', 'italy', 'france']
    const locations = ['antigua', 'paros', 'sardinia', 'cumbuco', 'dahab', 'tarifa', 'fuerteventura']
    
    countries.forEach(country => {
      if (queryLower.includes(country)) {
        entities.countries.push(country)
      }
    })
    
    locations.forEach(location => {
      if (queryLower.includes(location)) {
        entities.locations.push(location)
      }
    })

    // Extract skill levels
    const skillLevels = ['beginner', 'intermediate', 'advanced', 'expert', 'learning', 'experienced']
    skillLevels.forEach(level => {
      if (queryLower.includes(level)) {
        entities.skillLevels.push(level)
      }
    })

    // Extract water types
    const waterTypes = ['flat water', 'flatwater', 'waves', 'wave riding', 'chop', 'freestyle']
    waterTypes.forEach(type => {
      if (queryLower.includes(type)) {
        entities.waterTypes.push(type)
      }
    })

    // Extract activities
    const activities = ['kitesurfing', 'kiteboarding', 'freestyle', 'wave riding', 'foiling', 'racing']
    activities.forEach(activity => {
      if (queryLower.includes(activity)) {
        entities.activities.push(activity)
      }
    })

    return entities
  }

  private analyzeSentiment(query: string): string {
    const positiveWords = ['great', 'amazing', 'perfect', 'best', 'love', 'excellent', 'fantastic']
    const negativeWords = ['bad', 'terrible', 'awful', 'worst', 'hate', 'horrible', 'disappointing']
    
    const queryLower = query.toLowerCase()
    
    const positiveCount = positiveWords.filter(word => queryLower.includes(word)).length
    const negativeCount = negativeWords.filter(word => queryLower.includes(word)).length
    
    if (positiveCount > negativeCount) return 'positive'
    if (negativeCount > positiveCount) return 'negative'
    return 'neutral'
  }

  private handleSearchIntent(intent: any, entities: any, query: string): LLMResponse {
    let response = ''
    let recommendations: KitespotRecommendation[] = []
    let searchFilters: any = {}

    // Handle specific chip types first
    if (intent.chipType === 'beginner_spots') {
      const spots = this.getSpotsForSkillLevel('beginner')
      recommendations = spots.slice(0, 5).map(spot => ({
        spot,
        match_score: 95,
        reasons: ['Perfect for beginners', 'Safe learning conditions']
      }))
      
      response = `🏄‍♂️ Perfect beginner spots for you:

**Top beginner destinations:**
- Flat water lagoons
- Consistent, gentle winds  
- Professional instruction available
- Safe learning environment

Ready to start your kitesurfing journey? 🌊`
    } else if (intent.chipType === 'wave_riding') {
      const spots = this.getSpotsForWaterType('waves')
      recommendations = spots.slice(0, 5).map(spot => ({
        spot,
        match_score: 95,
        reasons: ['Great for wave riding', 'Consistent swell']
      }))
      
      response = `🌊 Epic wave riding destinations:

**Best wave spots:**
- Consistent swell
- Good wind conditions
- Advanced riding required
- Incredible wave action

Ready to ride some waves? 🏄‍♂️`
    } else if (entities.countries.length > 0) {
      const country = entities.countries[0]
      searchFilters.country = country
      
      const spots = this.searchByCountry(country)
      recommendations = spots.slice(0, 5).map(spot => ({
        spot,
        match_score: 95,
        reasons: [`Located in ${country}`, 'Matches your search criteria']
      }))
      
      response = `I found ${spots.length} kitespots in ${country}! Here are the top results:`
    } else if (entities.locations.length > 0) {
      const location = entities.locations[0]
      searchFilters.name = location
      
      const spots = this.searchByName(location)
      recommendations = spots.slice(0, 5).map(spot => ({
        spot,
        match_score: 95,
        reasons: [`Matches "${location}"`, 'Found in our database']
      }))
      
      response = `I found ${spots.length} spots matching "${location}":`
    } else if (entities.skillLevels.length > 0) {
      const skillLevel = entities.skillLevels[0]
      const spots = this.getSpotsForSkillLevel(skillLevel)
      recommendations = spots.slice(0, 5).map(spot => ({
        spot,
        match_score: 90,
        reasons: [`Great for ${skillLevel}s`, 'Suitable conditions']
      }))
      
      response = `Here are the best spots for ${skillLevel} kitesurfers:`
    } else {
      // General search
      const spots = this.getPopularSpots()
      recommendations = spots.slice(0, 5).map(spot => ({
        spot,
        match_score: 85,
        reasons: ['Popular destination', 'Great kitesurfing conditions']
      }))
      
      response = `Here are some popular kitesurfing destinations:`
    }

    return {
      response,
      recommendations,
      searchFilters,
      confidence: 0.9,
      reasoning: `Processed search intent with entities: ${JSON.stringify(entities)}`
    }
  }

  private handleRecommendationIntent(intent: any, entities: any, query: string): LLMResponse {
    let response = ''
    let recommendations: KitespotRecommendation[] = []

    // Analyze user profile and preferences from context
    const userProfile = this.conversationContext.userProfile
    
    if (userProfile) {
      recommendations = this.getPersonalizedRecommendations(userProfile, entities)
      response = `Based on your profile and preferences, here are my personalized recommendations:`
    } else {
      // Generate recommendations based on query context
      if (entities.skillLevels.length > 0) {
        const skillLevel = entities.skillLevels[0]
        const spots = this.getSpotsForSkillLevel(skillLevel)
        recommendations = spots.slice(0, 5).map(spot => ({
          spot,
          match_score: 0.9,
          reasons: [`Perfect for ${skillLevel} level`]
        }))
        response = `Here are my top recommendations for ${skillLevel} kitesurfers:`
      } else if (entities.waterTypes.length > 0) {
        const waterType = entities.waterTypes[0]
        const spots = this.getSpotsForWaterType(waterType)
        recommendations = spots.slice(0, 5).map(spot => ({
          spot,
          match_score: 0.9,
          reasons: [`Great for ${waterType}`]
        }))
        response = `Here are the best spots for ${waterType}:`
      } else {
        const spots = this.getPopularSpots()
        recommendations = spots.slice(0, 5).map(spot => ({
          spot,
          match_score: 0.85,
          reasons: ['Popular destination']
        }))
        response = `Here are my top kitesurfing recommendations:`
      }
    }

    return {
      response,
      recommendations,
      confidence: 0.85,
      reasoning: `Generated recommendations based on user profile and query context`
    }
  }

  private handleInformationIntent(intent: any, entities: any, query: string): LLMResponse {
    let response = ''
    let recommendations: KitespotRecommendation[] = []

    // Handle specific chip types first
    if (intent.chipType === 'wind_info') {
      response = `💨 Wind conditions for kitesurfing:

**Best wind ranges:**
- Beginners: 12-18 knots
- Intermediate: 15-25 knots  
- Advanced: 18-35 knots

**Wind directions:**
- Onshore: Safe, brings you back to shore
- Offshore: Dangerous, avoid!
- Side-shore: Perfect for most riding

**Wind reliability:**
- Trade winds: Very consistent
- Thermal winds: Afternoon sessions
- Storm winds: Advanced only

Need specific wind forecast for a destination? 🌊`
    } else if (intent.chipType === 'caribbean_info') {
      const spots = this.searchByCountry('caribbean')
      response = this.generateCountryInfo('caribbean', spots)
      recommendations = spots.slice(0, 3).map(spot => ({
        spot,
        match_score: 80,
        reasons: ['Caribbean destination', 'Great for beginners']
      }))
    } else if (intent.chipType === 'greece_info') {
      const spots = this.searchByCountry('greece')
      response = this.generateCountryInfo('greece', spots)
      recommendations = spots.slice(0, 3).map(spot => ({
        spot,
        match_score: 80,
        reasons: ['Greek destination', 'Meltemi winds']
      }))
    } else if (entities.countries.length > 0) {
      const country = entities.countries[0]
      const spots = this.searchByCountry(country)
      
      response = this.generateCountryInfo(country, spots)
      recommendations = spots.slice(0, 3).map(spot => ({
        spot,
        match_score: 80,
        reasons: [`Example spot in ${country}`, 'Shows local conditions']
      }))
    } else if (entities.activities.length > 0) {
      const activity = entities.activities[0]
      response = this.generateActivityInfo(activity)
    } else {
      response = this.generateGeneralKitesurfingInfo()
    }

    return {
      response,
      recommendations,
      confidence: 0.8,
      reasoning: `Provided informational response about kitesurfing`
    }
  }

  private handleComparisonIntent(intent: any, entities: any, query: string): LLMResponse {
    let response = ''
    let recommendations: KitespotRecommendation[] = []

    if (entities.countries.length >= 2) {
      const country1 = entities.countries[0]
      const country2 = entities.countries[1]
      
      const spots1 = this.searchByCountry(country1)
      const spots2 = this.searchByCountry(country2)
      
      response = this.generateComparison(country1, country2, spots1, spots2)
      recommendations = [...spots1.slice(0, 2), ...spots2.slice(0, 2)].map(spot => ({
        spot,
        match_score: 85,
        reasons: [`Example from ${country1} or ${country2}`, 'For comparison']
      }))
    } else {
      response = "I'd be happy to help you compare kitesurfing destinations! Which countries or spots would you like to compare?"
    }

    return {
      response,
      recommendations,
      confidence: 0.7,
      reasoning: `Generated comparison between destinations`
    }
  }

  private handlePlanningIntent(intent: any, entities: any, query: string): LLMResponse {
    let response = ''
    let recommendations: KitespotRecommendation[] = []

    if (entities.countries.length > 0) {
      const country = entities.countries[0]
      const spots = this.searchByCountry(country)
      
      response = this.generateTripPlanningInfo(country, spots)
      recommendations = spots.slice(0, 5).map(spot => ({
        spot,
        match_score: 90,
        reasons: [`Great for your ${country} trip`, 'Popular destination']
      }))
    } else {
      response = "I'd love to help you plan your kitesurfing trip! Which destination are you considering?"
    }

    return {
      response,
      recommendations,
      confidence: 0.8,
      reasoning: `Provided trip planning assistance`
    }
  }

  private handleBookingIntent(intent: any, entities: any, query: string): LLMResponse {
    let response = ''
    let bookingRecommendations: BookingRecommendation[] = []
    let ctaButtons: Array<{text: string, action: string, url?: string, style?: 'primary' | 'secondary' | 'success' | 'warning'}> = []
    let criteria: any = {}

    // Handle specific chip types first
    if (intent.chipType === 'book_safari') {
      response = `🏄‍♂️ Ready to book your dream kitesurfing safari?

**Popular safari options:**
- Caribbean: €2400-3000 (7-10 days)
- Greece: €2800-3500 (7-10 days)  
- Antigua: €2500-3200 (7-10 days)

**What's included:**
- Professional instruction
- Equipment rental
- Accommodation
- Transfers
- Full-board meals

**Tell me:**
- When do you want to travel? 📅
- What's your skill level? 🏄‍♂️
- What's your budget? 💰

I'll find your perfect safari! 🌊`
      
      ctaButtons = [
        {
          text: '💰 View All Safaris',
          action: 'view_safaris',
          url: '/packages',
          style: 'primary'
        },
        {
          text: '💬 WhatsApp Booking',
          action: 'whatsapp',
          url: 'https://wa.me/1234567890',
          style: 'success'
        },
        {
          text: '📅 Check Availability',
          action: 'check_availability',
          style: 'secondary'
        }
      ]
    } else {
      // Extract booking criteria from query
      criteria = this.extractBookingCriteria(query, entities)
      
      // Find matching trips
      const trips = bookingService.findTrips(criteria)
      
      if (trips.length > 0) {
        const topTrip = trips[0]
        const weatherData = bookingService.getWeatherData(topTrip.trip.destination, criteria.month || '')
        
        response = `Perfect! 🌴 ${topTrip.trip.destination} has ${weatherData.averageWind} knots wind - ideal for ${topTrip.trip.skillLevel}s! 

${topTrip.trip.duration}-day Safari for €${topTrip.trip.price.from} 🏄‍♂️
${topTrip.urgency ? `⚠️ ${topTrip.urgency}` : ''}

Ready to book? 😉`

        bookingRecommendations = trips.slice(0, 3)
        
        ctaButtons = [
          {
            text: `💰 Book ${topTrip.trip.destination}`,
            action: 'view_availability',
            url: topTrip.trip.bookingUrl,
            style: 'primary'
          },
          {
            text: '🤔 Compare',
            action: 'compare_trips',
            style: 'secondary'
          },
          {
            text: '💬 WhatsApp',
            action: 'whatsapp',
            url: topTrip.trip.whatsappUrl,
            style: 'success'
          }
        ]
      } else {
        response = `I need some info to find your perfect trip! 🎯

When do you want to travel? 🌍
What's your skill level? 🏄‍♂️
What's your budget? 💰

Let's find your dream safari! 😉`
      }
    }

    return {
      response,
      bookingRecommendations,
      ctaButtons,
      quickChips: [
        "More trips",
        "What's included?",
        "How to book?",
        "Compare destinations",
        "Group discounts?"
      ],
      confidence: 0.9,
      reasoning: `Processed booking intent with criteria: ${JSON.stringify(criteria)}`
    }
  }

  private handleGeneralQuery(query: string, intent: any, entities: any): LLMResponse {
    const response = `Hey rider! 🏄‍♂️ I'm kAIte, your Virtual Kite Expert for KiteSafaris.com.

I'm stoked but trustworthy - here to give you concise, practical steps for your kitesurfing journey! 

I know about ${this.kitespots.length} spots worldwide and always ground my answers in real data. When you're ready to travel, I'll find you 1-3 perfect options with clear next steps.

What's your kitesurfing goal today? 🌊`

    return {
      response,
      quickChips: [
        "Beginner spots",
        "Caribbean",
        "Greece",
        "Book safari",
        "Wave riding"
      ],
      confidence: 0.6,
      reasoning: `Handled general query with humorous fallback response`
    }
  }

  // Helper methods for data access
  private searchByCountry(country: string): KitespotData[] {
    const countryMapping: Record<string, string[]> = {
      'australia': ['CNS', 'PER', 'BNE', 'ADL', 'SYD', 'MEL', 'HTI', 'LDH', 'MJK', 'CVQ', 'HIS', 'GET', 'CBI', 'FLS', 'PHE', 'DRW', 'BME', 'PLO', 'PUG', 'CED', 'KGC', 'LEA', 'ONS', 'KNS', 'TSV', 'HBA', 'BWT', 'LST', 'MGB', 'MIM', 'ALH', 'CBR', 'COR'],
      'caribbean': ['ANU', 'SXM', 'CUR', 'BON', 'AXA'],
      'greece': ['ATH', 'HER', 'RHO', 'MYK', 'JTR', 'SKG'],
      'aruba': ['AUA'],
      'uae': ['DXB', 'AUH', 'SHJ', 'RKT', 'DWC'],
      'brazil': ['FOR', 'REC', 'SSA', 'RIO', 'SPO'],
      'egypt': ['CAI', 'HRG', 'SSH', 'LXR'],
      'spain': ['MAD', 'BCN', 'AGP', 'VLC', 'SVQ'],
      'portugal': ['LIS', 'OPO', 'FAO', 'PDL'],
      'italy': ['ROM', 'MIL', 'NAP', 'VCE', 'FLR'],
      'france': ['PAR', 'NCE', 'MRS', 'TLS', 'BOD']
    }

    const airportCodes = countryMapping[country.toLowerCase()] || []
    return this.kitespots.filter(spot => airportCodes.includes(spot.airport_code))
  }

  private searchByName(name: string): KitespotData[] {
    return this.kitespots.filter(spot => 
      spot.name.toLowerCase().includes(name.toLowerCase())
    )
  }

  private getSpotsForSkillLevel(skillLevel: string): KitespotData[] {
    // Map skill levels to appropriate destinations
    const skillMapping: Record<string, string[]> = {
      'beginner': ['AUA', 'SXM', 'CUR', 'BON', 'AXA'], // Caribbean spots
      'intermediate': ['ANU', 'DXB', 'AUH', 'SHJ'], // Mixed destinations
      'advanced': ['CNS', 'PER', 'BNE', 'ADL', 'SYD', 'MEL'], // Australia
      'expert': ['CNS', 'PER', 'BNE', 'ADL', 'SYD', 'MEL'] // Australia
    }

    const airportCodes = skillMapping[skillLevel.toLowerCase()] || []
    return this.kitespots.filter(spot => airportCodes.includes(spot.airport_code))
  }

  private getSpotsForWaterType(waterType: string): KitespotData[] {
    const waterTypeMapping: Record<string, string[]> = {
      'flat water': ['AUA', 'SXM', 'CUR', 'BON'],
      'flatwater': ['AUA', 'SXM', 'CUR', 'BON'],
      'waves': ['CNS', 'PER', 'BNE', 'ADL', 'SYD', 'MEL'],
      'wave riding': ['CNS', 'PER', 'BNE', 'ADL', 'SYD', 'MEL'],
      'freestyle': ['AUA', 'SXM', 'CUR', 'BON', 'DXB', 'AUH']
    }

    const airportCodes = waterTypeMapping[waterType.toLowerCase()] || []
    return this.kitespots.filter(spot => airportCodes.includes(spot.airport_code))
  }

  private getPopularSpots(): KitespotData[] {
    const popularAirports = ['ANU', 'SXM', 'CUR', 'AUA', 'DXB', 'SYD', 'MEL', 'BNE']
    return this.kitespots.filter(spot => popularAirports.includes(spot.airport_code))
  }

  private getPersonalizedRecommendations(userProfile: any, entities: any): KitespotRecommendation[] {
    // Enhanced personalized recommendations based on user profile
    let spots = this.kitespots

    // Filter by skill level
    if (userProfile.skill_level) {
      spots = this.getSpotsForSkillLevel(userProfile.skill_level)
    }

    // Filter by water type preferences
    if (userProfile.preferences?.water_type?.length > 0) {
      const preferredWaterTypes = userProfile.preferences.water_type
      spots = spots.filter(spot => {
        const spotWaterType = this.getWaterTypeForSpot(spot)
        return preferredWaterTypes.some((type: string) => 
          spotWaterType.toLowerCase().includes(type.toLowerCase())
        )
      })
    }

    return spots.slice(0, 5).map(spot => ({
      spot,
      match_score: 90,
      reasons: [
        'Matches your skill level',
        'Fits your preferences',
        'Highly recommended'
      ]
    }))
  }

  private getWaterTypeForSpot(spot: KitespotData): string {
    // Determine water type based on location
    const flatWaterAirports = ['AUA', 'SXM', 'CUR', 'BON']
    const waveAirports = ['CNS', 'PER', 'BNE', 'ADL', 'SYD', 'MEL']
    
    if (flatWaterAirports.includes(spot.airport_code)) return 'flat water'
    if (waveAirports.includes(spot.airport_code)) return 'waves'
    return 'mixed'
  }

  // Information generation methods
  private generateCountryInfo(country: string, spots: KitespotData[]): string {
    const spotCount = spots.length
    const topSpots = spots.slice(0, 3).map(spot => spot.name).join(', ')
    
    // Add personality and expertise
    const personalityResponses = {
      'australia': `🏄‍♂️ Australia: ${spotCount} spots including ${topSpots}

**Best conditions:** Consistent winds, crystal clear water
**Top regions:** Gold Coast (waves), Perth (flat water), Sydney (mixed)
**Best time:** Oct-Apr (southern summer)

Want specific spot details or ready to book? 🌊`,
      
      'caribbean': `🏝️ Caribbean: ${spotCount} spots including ${topSpots}

**Best conditions:** Trade winds, warm water, year-round
**Top spots:** Flat lagoons for learning, steady winds
**Best time:** Dec-May (dry season)

Which island interests you most? I can find you the perfect safari! 💨`,
      
      'greece': `🇬🇷 Greece: ${spotCount} spots including ${topSpots}

**Best conditions:** Meltemi winds May-Sep, variety of water types
**Top features:** Flat bays (freestyle), wave spots, cultural sites
**Best time:** May-Sep (Meltemi season)

Ready to explore Greek islands or need specific spot info? 🏛️`
    }
    
    return personalityResponses[country.toLowerCase() as keyof typeof personalityResponses] || 
      `🏄‍♂️ ${country}: ${spotCount} spots including ${topSpots}

**Conditions:** Consistent winds, excellent water quality
**Variety:** Flat water, waves, mixed conditions available

Need specific spot details or ready to book a safari? 🌊`
  }

  private generateActivityInfo(activity: string): string {
    const activityInfo: Record<string, string> = {
      'kitesurfing': `🏄‍♂️ Kitesurfing: Harness wind power to glide across water

**Progression:** Basic riding → tricks → wave riding
**Skills needed:** Balance, wind reading, board control
**Best for:** Adventure seekers, water sports lovers

What's your current level? I can find perfect spots for you! 🌊`,
      
      'freestyle': `🎯 Freestyle: Tricks and jumps on flat water

**Best conditions:** Glassy water, steady wind
**Key moves:** Backrolls, kiteloops, board-offs
**Top spots:** Caribbean lagoons, inland lakes

Ready to find perfect freestyle spots? 🌊`,
      
      'wave riding': `🌊 Wave riding: Kitesurfing meets surfing

**Best conditions:** Consistent swell, good wind
**Key skills:** Wave reading, bottom turns, cutbacks
**Top spots:** Gold Coast, Sagres, North Shore

Want wave riding destinations or tips? 🏄‍♂️`
    }

    return activityInfo[activity.toLowerCase()] || `🏄‍♂️ Kitesurfing: Endless possibilities for fun and progression

**Styles:** Freestyle, wave riding, cruising
**Progression:** Always something new to learn
**Best for:** Adventure seekers

What aspect interests you most? 🌊`
  }

  private generateGeneralKitesurfingInfo(): string {
    return `🏄‍♂️ Kitesurfing: Harness wind power to glide across water

**What makes it special:**
🌊 Versatility: Freestyle to wave riding
💨 Wind power: Speed and control
🏄‍♂️ Progression: Endless learning
🌍 Travel: Explore amazing destinations

I track ${this.kitespots.length} spots worldwide - from Caribbean lagoons to Australian waves.

What draws you to kitesurfing? Getting started, planning a trip, or exploring destinations? 🌊`
  }

  private generateComparison(country1: string, country2: string, spots1: KitespotData[], spots2: KitespotData[]): string {
    return `Great question! Let me compare kitesurfing in ${country1} vs ${country2}:

**${country1}** (${spots1.length} spots):
• Known for: [specific characteristics]
• Best for: [skill levels/conditions]
• Season: [best time to visit]

**${country2}** (${spots2.length} spots):
• Known for: [specific characteristics]  
• Best for: [skill levels/conditions]
• Season: [best time to visit]

Both destinations offer incredible kitesurfing, but they each have their unique advantages. What's most important to you - conditions, accessibility, or something else?`
  }

  private generateTripPlanningInfo(country: string, spots: KitespotData[]): string {
    return `Planning a kitesurfing trip to ${country}? Excellent choice! Here's what you need to know:

📍 **Spots**: I have ${spots.length} spots in my database for ${country}
✈️ **Travel**: Major airports include [airport codes]
🏄‍♂️ **Conditions**: [seasonal information]
🏨 **Accommodation**: [recommendations]
📅 **Best Time**: [seasonal advice]

Would you like me to show you specific spots or help you plan your itinerary?`
  }

  private matchesPattern(text: string, patterns: string[]): boolean {
    return patterns.some(pattern => text.includes(pattern))
  }

  private extractBookingCriteria(query: string, entities: any): any {
    const queryLower = query.toLowerCase()
    const criteria: any = {}

    // Extract month
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 
                   'july', 'august', 'september', 'october', 'november', 'december']
    const foundMonth = months.find(month => queryLower.includes(month))
    if (foundMonth) {
      criteria.month = foundMonth
    }

    // Extract skill level
    if (entities.skillLevels.length > 0) {
      criteria.skillLevel = entities.skillLevels[0]
    }

    // Extract budget
    const budgetMatch = queryLower.match(/€?(\d+)/)
    if (budgetMatch) {
      criteria.budget = parseInt(budgetMatch[1])
    }

    // Extract destination
    if (entities.countries.length > 0) {
      criteria.destination = entities.countries[0]
    }

    // Extract duration
    const durationMatch = queryLower.match(/(\d+)\s*day/)
    if (durationMatch) {
      criteria.duration = parseInt(durationMatch[1])
    }

    return criteria
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Update conversation context
  updateContext(context: ConversationContext): void {
    this.conversationContext = context
  }

  getContext(): ConversationContext {
    return this.conversationContext
  }
}
