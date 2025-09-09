// Booking integration service for kAIte
export interface TripData {
  id: string
  destination: string
  name: string
  description: string
  startDate: string
  endDate: string
  duration: number
  price: {
    from: number
    currency: string
    cabinTypes: {
      shared: number
      deluxe: number
      premium: number
    }
  }
  availability: {
    shared: number
    deluxe: number
    premium: number
  }
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'all'
  windConditions: {
    average: number
    direction: string
    reliability: 'high' | 'medium' | 'low'
  }
  highlights: string[]
  includes: string[]
  bookingUrl: string
  whatsappUrl: string
}

export interface BookingRecommendation {
  trip: TripData
  matchScore: number
  reasons: string[]
  urgency?: string
  alternatives?: TripData[]
}

export class BookingIntegrationService {
  private trips: TripData[]

  constructor() {
    // Initialize with sample trip data - in production this would come from your booking system
    this.trips = this.initializeTripData()
  }

  private initializeTripData(): TripData[] {
    return [
      {
        id: 'antigua-feb-2025',
        destination: 'Antigua',
        name: 'Caribbean Kite Safari - February',
        description: '7-day luxury catamaran kiteboarding adventure in the Caribbean',
        startDate: '2025-02-10',
        endDate: '2025-02-17',
        duration: 7,
        price: {
          from: 2400,
          currency: 'EUR',
          cabinTypes: {
            shared: 2400,
            deluxe: 2500,
            premium: 2800
          }
        },
        availability: {
          shared: 4,
          deluxe: 2,
          premium: 1
        },
        skillLevel: 'intermediate',
        windConditions: {
          average: 20,
          direction: 'side-shore',
          reliability: 'high'
        },
        highlights: [
          'Consistent trade winds',
          'Crystal clear Caribbean water',
          'Professional coaching included',
          'Full-board accommodation',
          'Equipment transfers'
        ],
        includes: [
          '7 nights on luxury catamaran',
          'All meals and drinks',
          'Professional kite coaching',
          'Equipment transfers',
          'Airport transfers',
          'Kite storage and setup'
        ],
        bookingUrl: '/booking?trip=antigua-feb-2025',
        whatsappUrl: 'https://wa.me/1234567890?text=Hi! I\'m interested in the Antigua February trip'
      },
      {
        id: 'cape-verde-mar-2025',
        destination: 'Cape Verde',
        name: 'Atlantic Wave Safari - March',
        description: '7-day wave riding adventure in Cape Verde',
        startDate: '2025-03-15',
        endDate: '2025-03-22',
        duration: 7,
        price: {
          from: 2100,
          currency: 'EUR',
          cabinTypes: {
            shared: 2100,
            deluxe: 2300,
            premium: 2600
          }
        },
        availability: {
          shared: 6,
          deluxe: 3,
          premium: 2
        },
        skillLevel: 'advanced',
        windConditions: {
          average: 23,
          direction: 'side-shore',
          reliability: 'high'
        },
        highlights: [
          'Epic wave riding conditions',
          'Atlantic swell',
          'Advanced coaching',
          'Island hopping',
          'Authentic Cape Verde experience'
        ],
        includes: [
          '7 nights accommodation',
          'All meals',
          'Advanced wave coaching',
          'Equipment transfers',
          'Island tours',
          'Photography package'
        ],
        bookingUrl: '/booking?trip=cape-verde-mar-2025',
        whatsappUrl: 'https://wa.me/1234567890?text=Hi! I\'m interested in the Cape Verde March trip'
      },
      {
        id: 'greece-jun-2025',
        destination: 'Greece',
        name: 'Meltemi Wind Safari - June',
        description: '7-day Greek island kiteboarding adventure',
        startDate: '2025-06-10',
        endDate: '2025-06-17',
        duration: 7,
        price: {
          from: 2200,
          currency: 'EUR',
          cabinTypes: {
            shared: 2200,
            deluxe: 2400,
            premium: 2700
          }
        },
        availability: {
          shared: 8,
          deluxe: 4,
          premium: 2
        },
        skillLevel: 'all',
        windConditions: {
          average: 18,
          direction: 'side-shore',
          reliability: 'high'
        },
        highlights: [
          'Legendary Meltemi winds',
          'Greek island hopping',
          'Cultural experiences',
          'Flat water and waves',
          'Mediterranean cuisine'
        ],
        includes: [
          '7 nights island accommodation',
          'All meals',
          'Multi-level coaching',
          'Island transfers',
          'Cultural tours',
          'Equipment storage'
        ],
        bookingUrl: '/booking?trip=greece-jun-2025',
        whatsappUrl: 'https://wa.me/1234567890?text=Hi! I\'m interested in the Greece June trip'
      }
    ]
  }

  // Find trips based on user criteria
  findTrips(criteria: {
    month?: string
    skillLevel?: string
    budget?: number
    destination?: string
    duration?: number
  }): BookingRecommendation[] {
    let filteredTrips = this.trips

    // Filter by month
    if (criteria.month) {
      filteredTrips = filteredTrips.filter(trip => {
        const tripMonth = new Date(trip.startDate).toLocaleString('default', { month: 'long' })
        return tripMonth.toLowerCase().includes(criteria.month!.toLowerCase())
      })
    }

    // Filter by skill level
    if (criteria.skillLevel) {
      filteredTrips = filteredTrips.filter(trip => 
        trip.skillLevel === criteria.skillLevel || trip.skillLevel === 'all'
      )
    }

    // Filter by budget
    if (criteria.budget) {
      filteredTrips = filteredTrips.filter(trip => 
        trip.price.from <= criteria.budget!
      )
    }

    // Filter by destination
    if (criteria.destination) {
      filteredTrips = filteredTrips.filter(trip => 
        trip.destination.toLowerCase().includes(criteria.destination!.toLowerCase())
      )
    }

    // Filter by duration
    if (criteria.duration) {
      filteredTrips = filteredTrips.filter(trip => 
        trip.duration === criteria.duration
      )
    }

    // Convert to recommendations with match scoring
    return filteredTrips.map(trip => ({
      trip,
      matchScore: this.calculateMatchScore(trip, criteria),
      reasons: this.generateMatchReasons(trip, criteria),
      urgency: this.generateUrgencyMessage(trip)
    })).sort((a, b) => b.matchScore - a.matchScore)
  }

  private calculateMatchScore(trip: TripData, criteria: any): number {
    let score = 50 // Base score

    // Month match
    if (criteria.month) {
      const tripMonth = new Date(trip.startDate).toLocaleString('default', { month: 'long' })
      if (tripMonth.toLowerCase().includes(criteria.month.toLowerCase())) {
        score += 30
      }
    }

    // Skill level match
    if (criteria.skillLevel && trip.skillLevel === criteria.skillLevel) {
      score += 25
    } else if (criteria.skillLevel && trip.skillLevel === 'all') {
      score += 15
    }

    // Budget match
    if (criteria.budget) {
      const budgetRatio = trip.price.from / criteria.budget
      if (budgetRatio <= 0.8) {
        score += 20 // Great value
      } else if (budgetRatio <= 1.0) {
        score += 15 // Good fit
      } else if (budgetRatio <= 1.2) {
        score += 5 // Slightly over
      }
    }

    // Destination match
    if (criteria.destination && trip.destination.toLowerCase().includes(criteria.destination.toLowerCase())) {
      score += 20
    }

    // Availability bonus
    const totalAvailability = trip.availability.shared + trip.availability.deluxe + trip.availability.premium
    if (totalAvailability <= 3) {
      score += 10 // Urgency bonus
    }

    return Math.min(score, 100)
  }

  private generateMatchReasons(trip: TripData, criteria: any): string[] {
    const reasons: string[] = []

    if (criteria.month) {
      const tripMonth = new Date(trip.startDate).toLocaleString('default', { month: 'long' })
      if (tripMonth.toLowerCase().includes(criteria.month.toLowerCase())) {
        reasons.push(`Perfect timing - ${tripMonth} is ideal for ${trip.destination}`)
      }
    }

    if (criteria.skillLevel && trip.skillLevel === criteria.skillLevel) {
      reasons.push(`Perfect for ${criteria.skillLevel} kitesurfers`)
    }

    if (criteria.budget && trip.price.from <= criteria.budget) {
      reasons.push(`Fits your budget of €${criteria.budget}`)
    }

    if (trip.windConditions.reliability === 'high') {
      reasons.push('Excellent wind reliability')
    }

    if (trip.availability.shared + trip.availability.deluxe + trip.availability.premium <= 3) {
      reasons.push('Limited availability - book soon!')
    }

    return reasons
  }

  private generateUrgencyMessage(trip: TripData): string | undefined {
    const totalAvailability = trip.availability.shared + trip.availability.deluxe + trip.availability.premium
    
    if (totalAvailability <= 2) {
      return `Only ${totalAvailability} spots left!`
    } else if (totalAvailability <= 4) {
      return `Only ${totalAvailability} spots remaining`
    }
    
    return undefined
  }

  // Get trip by ID
  getTripById(id: string): TripData | undefined {
    return this.trips.find(trip => trip.id === id)
  }

  // Compare two trips
  compareTrips(trip1Id: string, trip2Id: string): {
    trip1: TripData
    trip2: TripData
    comparison: {
      price: { trip1: number; trip2: number; winner: string }
      wind: { trip1: number; trip2: number; winner: string }
      skill: { trip1: string; trip2: string }
      availability: { trip1: number; trip2: number; winner: string }
    }
  } | null {
    const trip1 = this.getTripById(trip1Id)
    const trip2 = this.getTripById(trip2Id)

    if (!trip1 || !trip2) return null

    const totalAvailability1 = trip1.availability.shared + trip1.availability.deluxe + trip1.availability.premium
    const totalAvailability2 = trip2.availability.shared + trip2.availability.deluxe + trip2.availability.premium

    return {
      trip1,
      trip2,
      comparison: {
        price: {
          trip1: trip1.price.from,
          trip2: trip2.price.from,
          winner: trip1.price.from < trip2.price.from ? trip1.destination : trip2.destination
        },
        wind: {
          trip1: trip1.windConditions.average,
          trip2: trip2.windConditions.average,
          winner: trip1.windConditions.average > trip2.windConditions.average ? trip1.destination : trip2.destination
        },
        skill: {
          trip1: trip1.skillLevel,
          trip2: trip2.skillLevel
        },
        availability: {
          trip1: totalAvailability1,
          trip2: totalAvailability2,
          winner: totalAvailability1 > totalAvailability2 ? trip1.destination : trip2.destination
        }
      }
    }
  }

  // Get all available destinations
  getDestinations(): string[] {
    return [...new Set(this.trips.map(trip => trip.destination))]
  }

  // Get trips by destination
  getTripsByDestination(destination: string): TripData[] {
    return this.trips.filter(trip => 
      trip.destination.toLowerCase().includes(destination.toLowerCase())
    )
  }

  // Get weather data for a destination (mock data - in production would call weather API)
  getWeatherData(destination: string, month: string): {
    averageWind: number
    windDirection: string
    reliability: string
    temperature: number
    description: string
  } {
    const weatherData: Record<string, Record<string, any>> = {
      'antigua': {
        'february': {
          averageWind: 20,
          windDirection: 'NE',
          reliability: 'very high',
          temperature: 26,
          description: 'Perfect Caribbean conditions with consistent trade winds'
        },
        'march': {
          averageWind: 22,
          windDirection: 'NE',
          reliability: 'very high',
          temperature: 27,
          description: 'Excellent wind conditions with warm water'
        }
      },
      'cape verde': {
        'march': {
          averageWind: 23,
          windDirection: 'NE',
          reliability: 'high',
          temperature: 24,
          description: 'Strong Atlantic winds perfect for wave riding'
        }
      },
      'greece': {
        'june': {
          averageWind: 18,
          windDirection: 'N',
          reliability: 'high',
          temperature: 28,
          description: 'Classic Meltemi winds with warm Mediterranean water'
        }
      }
    }

    const destKey = destination.toLowerCase()
    const monthKey = month.toLowerCase()

    return weatherData[destKey]?.[monthKey] || {
      averageWind: 18,
      windDirection: 'Variable',
      reliability: 'medium',
      temperature: 25,
      description: 'Good kitesurfing conditions'
    }
  }
}

// Export singleton instance
export const bookingService = new BookingIntegrationService()
