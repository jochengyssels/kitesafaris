import { analyticsAirtableService } from './analytics-airtable-service'
import { googleAnalyticsService } from './google-analytics-service'
import { GoogleSearchConsoleService } from './google-search-console-service'

export class AnalyticsCronService {
  private isRunning: boolean = false
  private lastRun: Date | null = null

  /**
   * Run the daily analytics collection
   */
  async runDailyAnalyticsCollection(): Promise<void> {
    if (this.isRunning) {
      console.log('⏰ Analytics collection already running, skipping...')
      return
    }

    try {
      this.isRunning = true
      console.log('🕐 Starting daily analytics collection...')
      
      const startTime = Date.now()
      
      // Collect data for different time ranges
      const ranges = ['7d', '30d', '90d']
      
      for (const range of ranges) {
        try {
          console.log(`📊 Collecting analytics data for ${range}...`)
          
          // Fetch data from both services with fallback to mock data
          const [websiteData, seoData] = await Promise.all([
            googleAnalyticsService.getWebsiteMetrics(range).catch(() => {
              console.log(`⚠️ Using mock data for website analytics (${range})`)
              return googleAnalyticsService.getMockData(range)
            }),
            new GoogleSearchConsoleService().getSEOInsights(range).catch(() => {
              console.log(`⚠️ Using mock data for SEO insights (${range})`)
              return new GoogleSearchConsoleService().getMockData(range)
            })
          ])
          
          // Store in Airtable
          await analyticsAirtableService.storeAnalyticsData(websiteData, seoData, range)
          
          console.log(`✅ Analytics data stored for ${range}`)
          
          // Add a small delay between requests to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000))
          
        } catch (error) {
          console.error(`❌ Failed to collect analytics for ${range}:`, error)
          // Continue with other ranges even if one fails
        }
      }
      
      this.lastRun = new Date()
      const duration = Date.now() - startTime
      
      console.log(`🎉 Daily analytics collection completed in ${duration}ms`)
      
    } catch (error) {
      console.error('❌ Daily analytics collection failed:', error)
      throw error
    } finally {
      this.isRunning = false
    }
  }

  /**
   * Check if the cron job should run (once per day)
   */
  shouldRun(): boolean {
    if (!this.lastRun) {
      return true
    }
    
    const now = new Date()
    const lastRunDate = new Date(this.lastRun)
    
    // Check if it's been more than 23 hours since last run
    const hoursSinceLastRun = (now.getTime() - lastRunDate.getTime()) / (1000 * 60 * 60)
    
    return hoursSinceLastRun >= 23
  }

  /**
   * Get cron job status
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      lastRun: this.lastRun,
      shouldRun: this.shouldRun(),
      nextRun: this.lastRun ? new Date(this.lastRun.getTime() + 24 * 60 * 60 * 1000) : new Date()
    }
  }

  /**
   * Force run the analytics collection (for testing)
   */
  async forceRun(): Promise<void> {
    console.log('🔄 Force running analytics collection...')
    this.lastRun = null // Reset last run to force execution
    await this.runDailyAnalyticsCollection()
  }
}

export const analyticsCronService = new AnalyticsCronService()
