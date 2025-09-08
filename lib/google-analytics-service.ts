import { google } from 'googleapis'

interface GA4Metrics {
  totalVisitors: number
  totalPageViews: number
  totalSessions: number
  bounceRate: number
  avgSessionDuration: number
  newVisitors: number
  returningVisitors: number
  deviceBreakdown: {
    desktop: number
    mobile: number
    tablet: number
  }
  trafficSources: {
    organic: number
    direct: number
    social: number
    referral: number
    email: number
    paid: number
  }
  topPages: Array<{
    page: string
    visitors: number
    pageViews: number
    bounceRate: number
    avgTimeOnPage: number
  }>
  bottomPages: Array<{
    page: string
    visitors: number
    pageViews: number
    bounceRate: number
    avgTimeOnPage: number
  }>
  geographicData: Array<{
    country: string
    visitors: number
    percentage: number
  }>
  hourlyData: Array<{
    hour: string
    visitors: number
    pageViews: number
  }>
  dailyData: Array<{
    date: string
    visitors: number
    pageViews: number
    sessions: number
    bounceRate: number
    avgDuration: number
  }>
}

class GoogleAnalyticsService {
  private analyticsData: any
  private propertyId: string
  private serviceAccount: any

  constructor() {
    this.propertyId = process.env.GA4_PROPERTY_ID || ''
    
    console.log('🔍 GA4 Debug Info:')
    console.log('- Property ID:', this.propertyId ? 'SET' : 'NOT SET')
    console.log('- Service Account JSON length:', process.env.GA4_SERVICE_ACCOUNT_JSON ? process.env.GA4_SERVICE_ACCOUNT_JSON.length : 'NOT SET')
    
    // Parse service account JSON
    try {
      const serviceAccountJson = process.env.GA4_SERVICE_ACCOUNT_JSON
      if (serviceAccountJson) {
        this.serviceAccount = JSON.parse(serviceAccountJson)
        console.log('- Service Account Email:', this.serviceAccount?.client_email || 'NOT FOUND')
      } else {
        console.log('- Service Account JSON: NOT SET')
      }
    } catch (error) {
      console.error('Failed to parse GA4 service account JSON:', error)
    }
  }

  private async getAuthenticatedClient() {
    if (!this.serviceAccount) {
      throw new Error('Google Analytics service account not configured')
    }

    try {
      const auth = new google.auth.GoogleAuth({
        credentials: this.serviceAccount,
        scopes: [
          'https://www.googleapis.com/auth/analytics.readonly',
          'https://www.googleapis.com/auth/analytics'
        ]
      })

      // Test the authentication by getting access token
      const authClient = await auth.getClient()
      const accessToken = await authClient.getAccessToken()
      
      if (!accessToken.token) {
        throw new Error('Failed to get access token from Google Analytics service account')
      }

      console.log('✅ Google Analytics authentication successful')
      return google.analyticsdata({ version: 'v1beta', auth })

    } catch (error) {
      console.error('❌ Google Analytics authentication failed:', error)
      throw new Error(`Google Analytics authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private getDateRange(range: string) {
    const now = new Date()
    const endDate = now.toISOString().split('T')[0]
    
    let startDate: string
    switch (range) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        break
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        break
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        break
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        break
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }

    return { startDate, endDate }
  }

  async getWebsiteMetrics(range: string = '30d'): Promise<GA4Metrics> {
    try {
      const client = await this.getAuthenticatedClient()
      const { startDate, endDate } = this.getDateRange(range)

      // Get basic metrics
      const [basicMetrics, deviceData, trafficSources, topPages, geographicData, hourlyData, dailyData] = await Promise.all([
        this.getBasicMetrics(client, startDate, endDate),
        this.getDeviceBreakdown(client, startDate, endDate),
        this.getTrafficSources(client, startDate, endDate),
        this.getTopPages(client, startDate, endDate),
        this.getGeographicData(client, startDate, endDate),
        this.getHourlyData(client, startDate, endDate),
        this.getDailyData(client, startDate, endDate)
      ])

      // Calculate bottom pages (reverse of top pages)
      const bottomPages = topPages.slice(-5).reverse()

      return {
        ...basicMetrics,
        deviceBreakdown: deviceData,
        trafficSources: trafficSources,
        topPages: topPages.slice(0, 5),
        bottomPages,
        geographicData,
        hourlyData,
        dailyData
      }

    } catch (error) {
      console.error('Failed to fetch Google Analytics data:', error)
      
      // Provide specific error messages based on the error type
      if (error instanceof Error) {
        if (error.message.includes('invalid_grant')) {
          console.log('🔑 Authentication Error: Service account key is invalid or expired')
          console.log('💡 Solution: Create a new service account key in Google Cloud Console')
          console.log('📧 Service Account: kitesafaris-analytics@kite-safaris.iam.gserviceaccount.com')
          console.log('🆔 Project: kite-safaris')
        } else if (error.message.includes('Permission denied')) {
          console.log('🚫 Permission Error: Service account lacks proper permissions')
          console.log('💡 Solution: Add service account to GA4 property with Viewer role')
        } else if (error.message.includes('Property not found')) {
          console.log('🏠 Property Error: GA4 property ID is incorrect or property not found')
          console.log('💡 Solution: Verify GA4_PROPERTY_ID in environment variables')
        } else {
          console.log('❌ Unknown Error:', error.message)
        }
      }
      
      // NO FALLBACK - throw error to force real data usage
      throw new Error(`Google Analytics authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private getMockData(range: string): GA4Metrics {
    const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365
    
    return {
      totalVisitors: 12400,
      totalPageViews: 34200,
      totalSessions: 11800,
      bounceRate: 42.3,
      avgSessionDuration: 165,
      newVisitors: 8400,
      returningVisitors: 4000,
      deviceBreakdown: {
        desktop: 65,
        mobile: 28,
        tablet: 7
      },
      trafficSources: {
        organic: 5200,
        direct: 3100,
        social: 1800,
        referral: 1200,
        email: 800,
        paid: 300
      },
      topPages: [
        { page: '/', visitors: 2400, pageViews: 3400, bounceRate: 35, avgTimeOnPage: 165 },
        { page: '/destinations/antigua', visitors: 1800, pageViews: 2200, bounceRate: 28, avgTimeOnPage: 200 },
        { page: '/booking', visitors: 1200, pageViews: 1800, bounceRate: 45, avgTimeOnPage: 255 },
        { page: '/destinations/sardinia', visitors: 900, pageViews: 1200, bounceRate: 32, avgTimeOnPage: 175 },
        { page: '/blog', visitors: 750, pageViews: 1100, bounceRate: 55, avgTimeOnPage: 105 }
      ],
      bottomPages: [
        { page: '/privacy', visitors: 45, pageViews: 50, bounceRate: 85, avgTimeOnPage: 30 },
        { page: '/terms', visitors: 32, pageViews: 35, bounceRate: 90, avgTimeOnPage: 25 },
        { page: '/contact/prokite', visitors: 28, pageViews: 35, bounceRate: 75, avgTimeOnPage: 75 },
        { page: '/settings', visitors: 15, pageViews: 18, bounceRate: 95, avgTimeOnPage: 20 },
        { page: '/users', visitors: 8, pageViews: 10, bounceRate: 100, avgTimeOnPage: 10 }
      ],
      geographicData: [
        { country: 'Germany', visitors: 3500, percentage: 28 },
        { country: 'Netherlands', visitors: 2800, percentage: 22 },
        { country: 'United Kingdom', visitors: 2200, percentage: 18 },
        { country: 'France', visitors: 1800, percentage: 14 },
        { country: 'Switzerland', visitors: 1200, percentage: 10 },
        { country: 'Other', visitors: 900, percentage: 8 }
      ],
      hourlyData: Array.from({ length: 24 }, (_, i) => ({
        hour: `${i.toString().padStart(2, '0')}:00`,
        visitors: Math.floor(Math.random() * 200) + 50,
        pageViews: Math.floor(Math.random() * 600) + 150
      })),
      dailyData: Array.from({ length: days }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (days - 1 - i))
        return {
          date: date.toISOString().split('T')[0],
          visitors: Math.floor(Math.random() * 800) + 200,
          pageViews: Math.floor(Math.random() * 2400) + 600,
          sessions: Math.floor(Math.random() * 700) + 180,
          bounceRate: Math.floor(Math.random() * 20) + 35,
          avgDuration: Math.floor(Math.random() * 60) + 120
        }
      })
    }
  }

  private async getBasicMetrics(client: any, startDate: string, endDate: string) {
    const response = await client.properties.runReport({
      property: `properties/${this.propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: 'totalUsers' },
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' },
          { name: 'newUsers' }
        ]
      }
    })

    const rows = response.data.rows || []
    const metrics = rows[0]?.metricValues || []

    return {
      totalVisitors: parseInt(metrics[0]?.value || '0'),
      totalPageViews: parseInt(metrics[1]?.value || '0'),
      totalSessions: parseInt(metrics[2]?.value || '0'),
      bounceRate: parseFloat(metrics[3]?.value || '0'),
      avgSessionDuration: parseFloat(metrics[4]?.value || '0'),
      newVisitors: parseInt(metrics[5]?.value || '0'),
      returningVisitors: parseInt(metrics[0]?.value || '0') - parseInt(metrics[5]?.value || '0')
    }
  }

  private async getDeviceBreakdown(client: any, startDate: string, endDate: string) {
    const response = await client.properties.runReport({
      property: `properties/${this.propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'totalUsers' }]
      }
    })

    const rows = response.data.rows || []
    const total = rows.reduce((sum: number, row: any) => sum + parseInt(row.metricValues[0].value), 0)

    const breakdown = {
      desktop: 0,
      mobile: 0,
      tablet: 0
    }

    rows.forEach((row: any) => {
      const device = row.dimensionValues[0].value.toLowerCase()
      const users = parseInt(row.metricValues[0].value)
      const percentage = total > 0 ? (users / total) * 100 : 0

      if (device === 'desktop') breakdown.desktop = Math.round(percentage)
      else if (device === 'mobile') breakdown.mobile = Math.round(percentage)
      else if (device === 'tablet') breakdown.tablet = Math.round(percentage)
    })

    return breakdown
  }

  private async getTrafficSources(client: any, startDate: string, endDate: string) {
    const response = await client.properties.runReport({
      property: `properties/${this.propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'sessionDefaultChannelGrouping' }],
        metrics: [{ name: 'totalUsers' }]
      }
    })

    const rows = response.data.rows || []
    const total = rows.reduce((sum: number, row: any) => sum + parseInt(row.metricValues[0].value), 0)

    const sources = {
      organic: 0,
      direct: 0,
      social: 0,
      referral: 0,
      email: 0,
      paid: 0
    }

    rows.forEach((row: any) => {
      const channel = row.dimensionValues[0].value.toLowerCase()
      const users = parseInt(row.metricValues[0].value)

      if (channel.includes('organic')) sources.organic = users
      else if (channel.includes('direct')) sources.direct = users
      else if (channel.includes('social')) sources.social = users
      else if (channel.includes('referral')) sources.referral = users
      else if (channel.includes('email')) sources.email = users
      else if (channel.includes('paid')) sources.paid = users
    })

    return sources
  }

  private async getTopPages(client: any, startDate: string, endDate: string) {
    const response = await client.properties.runReport({
      property: `properties/${this.propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [
          { name: 'totalUsers' },
          { name: 'screenPageViews' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' }
        ],
        orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }],
        limit: 10
      }
    })

    const rows = response.data.rows || []

    return rows.map((row: any) => ({
      page: row.dimensionValues[0].value,
      visitors: parseInt(row.metricValues[0].value),
      pageViews: parseInt(row.metricValues[1].value),
      bounceRate: parseFloat(row.metricValues[2].value),
      avgTimeOnPage: parseFloat(row.metricValues[3].value)
    }))
  }

  private async getGeographicData(client: any, startDate: string, endDate: string) {
    const response = await client.properties.runReport({
      property: `properties/${this.propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }],
        limit: 10
      }
    })

    const rows = response.data.rows || []
    const total = rows.reduce((sum: number, row: any) => sum + parseInt(row.metricValues[0].value), 0)

    return rows.map((row: any) => {
      const visitors = parseInt(row.metricValues[0].value)
      return {
        country: row.dimensionValues[0].value,
        visitors,
        percentage: total > 0 ? Math.round((visitors / total) * 100) : 0
      }
    })
  }

  private async getHourlyData(client: any, startDate: string, endDate: string) {
    const response = await client.properties.runReport({
      property: `properties/${this.propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'hour' }],
        metrics: [
          { name: 'totalUsers' },
          { name: 'screenPageViews' }
        ]
      }
    })

    const rows = response.data.rows || []

    return rows.map((row: any) => ({
      hour: `${row.dimensionValues[0].value}:00`,
      visitors: parseInt(row.metricValues[0].value),
      pageViews: parseInt(row.metricValues[1].value)
    }))
  }

  private async getDailyData(client: any, startDate: string, endDate: string) {
    const response = await client.properties.runReport({
      property: `properties/${this.propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'totalUsers' },
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' }
        ]
      }
    })

    const rows = response.data.rows || []

    return rows.map((row: any) => ({
      date: row.dimensionValues[0].value,
      visitors: parseInt(row.metricValues[0].value),
      pageViews: parseInt(row.metricValues[1].value),
      sessions: parseInt(row.metricValues[2].value),
      bounceRate: parseFloat(row.metricValues[3].value),
      avgDuration: parseFloat(row.metricValues[4].value)
    }))
  }
}

export { GoogleAnalyticsService }
export const googleAnalyticsService = new GoogleAnalyticsService()
export type { GA4Metrics }
