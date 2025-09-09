// Kitespot data schema for kAIte agent - Updated to match actual data structure
export interface KitespotData {
  id: string
  name: string
  airport_code: string
  iso3: string
  latitude: string
  longitude: string
  description: string
  timezone: string
}

// Enhanced kitespot data with additional information (for future expansion)
export interface EnhancedKitespotData extends KitespotData {
  // Additional fields that can be added to enhance the data
  conditions?: {
    wind: {
      season: string
      direction: string[]
      strength: {
        min: number
        max: number
        unit: 'knots' | 'kmh' | 'mph'
      }
      reliability: 'very_high' | 'high' | 'medium' | 'low'
    }
    water: {
      type: 'flat' | 'chop' | 'waves' | 'mixed'
      depth: 'shallow' | 'medium' | 'deep'
      temperature: {
        min: number
        max: number
        unit: 'celsius' | 'fahrenheit'
      }
      clarity: 'crystal' | 'clear' | 'murky'
    }
    weather: {
      season: string
      temperature: {
        air: {
          min: number
          max: number
          unit: 'celsius' | 'fahrenheit'
        }
      }
      precipitation: 'rare' | 'occasional' | 'frequent'
      sunshine: 'abundant' | 'good' | 'moderate' | 'limited'
    }
  }
  difficulty?: {
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    hazards: string[]
    safety: {
      rescue: 'excellent' | 'good' | 'limited' | 'none'
      medical: 'nearby' | 'distant' | 'none'
      emergency: string
    }
  }
  facilities?: {
    schools: boolean
    equipment_rental: boolean
    storage: boolean
    parking: boolean
    restaurants: boolean
    accommodation: boolean
    transport: string[]
  }
  best_time?: {
    months: string[]
    hours: string[]
    tides?: string
  }
  description_enhanced?: {
    overview: string
    highlights: string[]
    tips: string[]
    warnings: string[]
  }
  images?: string[]
  videos?: string[]
  reviews?: {
    rating: number
    count: number
    comments: string[]
  }
  tags?: string[]
  created_at?: string
  updated_at?: string
}

export interface KitespotSearchFilters {
  name?: string
  airport_code?: string
  iso3?: string
  country?: string
  region?: string
  timezone?: string
  has_description?: boolean
  difficulty?: string[]
  wind_strength?: {
    min: number
    max: number
  }
  water_type?: string[]
  best_months?: string[]
  facilities?: string[]
  tags?: string[]
}

export interface KitespotRecommendation {
  spot: KitespotData
  match_score: number
  reasons: string[]
  alternatives?: KitespotData[]
}

// Country and region mapping for better search
export interface CountryInfo {
  iso3: string
  name: string
  regions: string[]
}

// Airport code to country mapping
export const AIRPORT_TO_COUNTRY: Record<string, string> = {
  'AUA': 'Aruba',
  'LAD': 'Angola', 
  'AXA': 'Anguilla',
  'TIA': 'Albania',
  'SXM': 'Netherlands Antilles',
  'CUR': 'Curaçao',
  'BON': 'Bonaire',
  'ZDY': 'UAE',
  'DXB': 'UAE',
  'RKT': 'UAE',
  'SHJ': 'UAE',
  'DWC': 'UAE',
  'AUH': 'UAE',
  'REL': 'Argentina',
  'PMY': 'Argentina',
  'NQN': 'Argentina',
  'BRC': 'Argentina',
  'EZE': 'Argentina',
  'AEP': 'Argentina',
  'VDM': 'Argentina',
  'MDQ': 'Argentina',
  'BHI': 'Argentina',
  'USH': 'Argentina',
  'RGA': 'Argentina',
  'RGL': 'Argentina',
  'FTE': 'Argentina',
  'CRD': 'Argentina',
  'IRJ': 'Argentina',
  'RES': 'Argentina',
  'PSS': 'Argentina',
  'PPG': 'American Samoa',
  'ANU': 'Antigua and Barbuda',
  'CNS': 'Australia',
  'PER': 'Australia',
  'BNE': 'Australia',
  'ADL': 'Australia',
  'SYD': 'Australia',
  'MEL': 'Australia',
  'HTI': 'Australia',
  'LDH': 'Australia',
  'MJK': 'Australia',
  'CVQ': 'Australia',
  'HIS': 'Australia',
  'GET': 'Australia',
  'CBI': 'Australia',
  'FLS': 'Australia',
  'PHE': 'Australia',
  'DRW': 'Australia',
  'BME': 'Australia',
  'PLO': 'Australia',
  'PUG': 'Australia',
  'CED': 'Australia',
  'KGC': 'Australia',
  'LEA': 'Australia',
  'ONS': 'Australia',
  'KNS': 'Australia',
  'TSV': 'Australia',
  'HBA': 'Australia',
  'BWT': 'Australia',
  'LST': 'Australia',
  'MGB': 'Australia',
  'MIM': 'Australia',
  'ALH': 'Australia',
  'CBR': 'Australia',
  'COR': 'Australia',
  'MDZ': 'Argentina',
  'ROS': 'Argentina',
  'AFA': 'Argentina'
}
