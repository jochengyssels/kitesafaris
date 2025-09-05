// Stormglass API service for weather and wind forecast data
// Documentation: https://docs.stormglass.io/

export interface StormglassForecast {
  hours: Array<{
    time: string;
    windSpeed: {
      noaa: number;
      sg: number;
    };
    windDirection: {
      noaa: number;
      sg: number;
    };
    gust: {
      noaa: number;
      sg: number;
    };
    airTemperature: {
      noaa: number;
      sg: number;
    };
    humidity: {
      noaa: number;
      sg: number;
    };
  }>;
  meta: {
    cost: number;
    dailyQuota: number;
    end: string;
    lat: number;
    lng: number;
    params: string[];
    requestCount: number;
    source: string[];
    start: string;
  };
}

export interface WindForecastData {
  time: string;
  windSpeed: number; // in knots
  windDirection: number; // in degrees
  windGust: number; // in knots
  temperature: number; // in Celsius
  humidity: number; // percentage
  windDirectionCardinal: string; // N, NE, E, etc.
}

export class StormglassService {
  private apiKey: string;
  private baseUrl = 'https://api.stormglass.io/v2';

  constructor() {
    this.apiKey = process.env.STORMGLASS_API_KEY || '';
    if (!this.apiKey) {
      console.warn('STORMGLASS_API_KEY not found in environment variables');
    }
  }

  /**
   * Get wind forecast for Punta Trettu, Sardinia
   * Coordinates: 39.112133995367714, 8.437520043416788
   */
  async getWindForecast(
    lat: number = 39.112133995367714,
    lng: number = 8.437520043416788,
    hours: number = 24
  ): Promise<WindForecastData[]> {
    if (!this.apiKey) {
      throw new Error('Stormglass API key not configured');
    }

    const start = new Date();
    const end = new Date(start.getTime() + hours * 60 * 60 * 1000);

    // Format dates as Unix timestamps (Stormglass expects this format)
    const startTimestamp = Math.floor(start.getTime() / 1000);
    const endTimestamp = Math.floor(end.getTime() / 1000);

    const params = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
      start: startTimestamp.toString(),
      end: endTimestamp.toString(),
      params: 'windSpeed,windDirection,gust,airTemperature,humidity'
    });

    try {
      const response = await fetch(`${this.baseUrl}/weather/point?${params}`, {
        headers: {
          'Authorization': this.apiKey,
          'Content-Type': 'application/json'
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      });

      if (!response.ok) {
        const errorText = await response.text();
        
        // Check for specific error types
        if (response.status === 401 || errorText.includes('invalid')) {
          throw new Error('Invalid API key - please check your Stormglass API key');
        } else if (response.status === 403) {
          throw new Error('API access forbidden - check your Stormglass account status');
        } else if (response.status === 429) {
          throw new Error('API rate limit exceeded - please try again later');
        }
        
        throw new Error(`Stormglass API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data: StormglassForecast = await response.json();
      
      return data.hours.map(hour => ({
        time: hour.time,
        windSpeed: this.convertToKnots(hour.windSpeed.sg || hour.windSpeed.noaa),
        windDirection: hour.windDirection.sg || hour.windDirection.noaa,
        windGust: this.convertToKnots(hour.gust.sg || hour.gust.noaa),
        temperature: hour.airTemperature.sg || hour.airTemperature.noaa,
        humidity: hour.humidity.sg || hour.humidity.noaa,
        windDirectionCardinal: this.degreesToCardinal(hour.windDirection.sg || hour.windDirection.noaa)
      }));
    } catch (error) {
      console.error('Stormglass API error:', error);
      throw error;
    }
  }

  /**
   * Convert wind speed from m/s to knots
   */
  private convertToKnots(speedMs: number): number {
    return Math.round(speedMs * 1.94384 * 10) / 10; // Convert m/s to knots, round to 1 decimal
  }

  /**
   * Convert degrees to cardinal direction
   */
  private degreesToCardinal(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }

  /**
   * Get current wind conditions (next hour)
   */
  async getCurrentWindConditions(): Promise<WindForecastData | null> {
    try {
      const forecast = await this.getWindForecast(undefined, undefined, 1);
      return forecast.length > 0 ? forecast[0] : null;
    } catch (error) {
      console.error('Error getting current wind conditions:', error);
      return null;
    }
  }

  /**
   * Get next 6 hours forecast for quick overview
   */
  async getNext6HoursForecast(): Promise<WindForecastData[]> {
    try {
      const forecast = await this.getWindForecast(undefined, undefined, 6);
      return forecast;
    } catch (error) {
      console.error('Error getting 6-hour forecast:', error);
      return [];
    }
  }
}

// Export singleton instance
export const stormglassService = new StormglassService();
