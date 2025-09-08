import { AirtableService } from './airtable'

interface AnalyticsData {
  // Website Analytics
  totalVisitors: number
  totalPageViews: number
  totalSessions: number
  bounceRate: number
  avgSessionDuration: number
  newVisitors: number
  returningVisitors: number
  
  // SEO Metrics
  seoScore: number
  totalKeywords: number
  organicTraffic: number
  avgPosition: number
  positionGrowth: number
  keywordGrowth: number
  trafficGrowth: number
  seoGrowth: number
  
  // Device & Traffic Breakdown
  desktopPercentage: number
  mobilePercentage: number
  tabletPercentage: number
  organicTrafficPercentage: number
  directTrafficPercentage: number
  socialTrafficPercentage: number
  referralTrafficPercentage: number
  
  // Metadata
  date: string
  dataSource: string
  timestamp: string
  range: string
}

export class AnalyticsAirtableService {
  private airtableService: AirtableService
  private tableName: string

  constructor() {
    this.airtableService = new AirtableService()
    this.tableName = 'Analytics Data'
  }

  /**
   * Store analytics data in Airtable
   */
  async storeAnalyticsData(websiteData: any, seoData: any, range: string = '30d'): Promise<void> {
    try {
      console.log('📊 Storing analytics data in Airtable...')
      
      const analyticsData: AnalyticsData = this.transformData(websiteData, seoData, range)
      
      await this.airtableService.createRecord(this.tableName, analyticsData)
      
      console.log('✅ Analytics data stored successfully in Airtable')
    } catch (error) {
      console.error('❌ Failed to store analytics data in Airtable:', error)
      throw error
    }
  }

  /**
   * Transform raw analytics data into Airtable format
   */
  private transformData(websiteData: any, seoData: any, range: string): AnalyticsData {
    const now = new Date()
    const date = now.toISOString().split('T')[0]
    
    // Calculate traffic source percentages
    const totalTraffic = websiteData?.trafficSources ? 
      Object.values(websiteData.trafficSources).reduce((sum: number, val: any) => sum + val, 0) : 0
    
    const organicTrafficPercentage = totalTraffic > 0 ? 
      Math.round(((websiteData?.trafficSources?.organic || 0) / totalTraffic) * 100) : 0
    
    const directTrafficPercentage = totalTraffic > 0 ? 
      Math.round(((websiteData?.trafficSources?.direct || 0) / totalTraffic) * 100) : 0
    
    const socialTrafficPercentage = totalTraffic > 0 ? 
      Math.round(((websiteData?.trafficSources?.social || 0) / totalTraffic) * 100) : 0
    
    const referralTrafficPercentage = totalTraffic > 0 ? 
      Math.round(((websiteData?.trafficSources?.referral || 0) / totalTraffic) * 100) : 0

    return {
      // Website Analytics
      'Total Visitors': websiteData?.totalVisitors || 0,
      'Total Page Views': websiteData?.totalPageViews || 0,
      'Total Sessions': websiteData?.totalSessions || 0,
      'Bounce Rate': Math.round((websiteData?.bounceRate || 0) * 100) / 100,
      'Avg Session Duration': Math.round(websiteData?.avgSessionDuration || 0),
      'New Visitors': websiteData?.newVisitors || 0,
      'Returning Visitors': websiteData?.returningVisitors || 0,
      
      // SEO Metrics
      'SEO Score': seoData?.seoScore || 0,
      'Total Keywords': seoData?.totalKeywords || 0,
      'Organic Traffic': seoData?.organicTraffic || 0,
      'Avg Position': Math.round((seoData?.avgPosition || 0) * 10) / 10,
      'Position Growth': Math.round((seoData?.positionGrowth || 0) * 10) / 10,
      'Keyword Growth': Math.round((seoData?.keywordGrowth || 0) * 10) / 10,
      'Traffic Growth': Math.round((seoData?.trafficGrowth || 0) * 10) / 10,
      'SEO Growth': Math.round((seoData?.seoGrowth || 0) * 10) / 10,
      
      // Device & Traffic Breakdown
      'Desktop %': websiteData?.deviceBreakdown?.desktop || 0,
      'Mobile %': websiteData?.deviceBreakdown?.mobile || 0,
      'Tablet %': websiteData?.deviceBreakdown?.tablet || 0,
      'Organic Traffic %': organicTrafficPercentage,
      'Direct Traffic %': directTrafficPercentage,
      'Social Traffic %': socialTrafficPercentage,
      'Referral Traffic %': referralTrafficPercentage,
      
      // Metadata
      'Date': date,
      'Data Source': 'Analytics Dashboard',
      'Range': range
    }
  }

  /**
   * Get recent analytics records
   */
  async getRecentAnalytics(limit: number = 30) {
    try {
      return await this.airtableService.getRecords(this.tableName, {
        maxRecords: limit,
        sort: [{ field: 'Date', direction: 'desc' }]
      })
    } catch (error) {
      console.error('❌ Failed to fetch recent analytics:', error)
      throw error
    }
  }

  /**
   * Get analytics data for a specific date range
   */
  async getAnalyticsByDateRange(startDate: string, endDate: string) {
    try {
      const filterFormula = `AND(IS_SAME({date}, '${startDate}', 'day'), IS_SAME({date}, '${endDate}', 'day'))`
      return await this.airtableService.getRecords(this.tableName, {
        filterByFormula: filterFormula,
        sort: [{ field: 'timestamp', direction: 'desc' }]
      })
    } catch (error) {
      console.error('❌ Failed to fetch analytics by date range:', error)
      throw error
    }
  }

  /**
   * Get analytics summary for the last N days
   */
  async getAnalyticsSummary(days: number = 7) {
    try {
      const endDate = new Date()
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)
      
      const filterFormula = `AND({date} >= '${startDate.toISOString().split('T')[0]}', {date} <= '${endDate.toISOString().split('T')[0]}')`
      
      return await this.airtableService.getRecords(this.tableName, {
        filterByFormula: filterFormula,
        sort: [{ field: 'timestamp', direction: 'desc' }]
      })
    } catch (error) {
      console.error('❌ Failed to fetch analytics summary:', error)
      throw error
    }
  }
}

export const analyticsAirtableService = new AnalyticsAirtableService()
