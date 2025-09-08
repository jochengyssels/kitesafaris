import { GoogleAnalyticsService } from './google-analytics-service'
import { BusinessMetricsService } from './business-metrics-service'
import { GoogleSearchConsoleService } from './google-search-console-service'

interface Alert {
  id: string
  type: string
  severity: string
  title: string
  description: string
  timestamp: string
  status: string
  category: string
  details: Record<string, any>
  recommendations: string[]
}

export class AutomatedAlertsService {
  private gaService: GoogleAnalyticsService
  private businessService: BusinessMetricsService
  private gscService: GoogleSearchConsoleService

  constructor() {
    this.gaService = new GoogleAnalyticsService()
    this.businessService = new BusinessMetricsService()
    this.gscService = new GoogleSearchConsoleService()
  }

  async generateAlerts(range: string = '30d'): Promise<Alert[]> {
    try {
      console.log('🚀 Generating REAL automated alerts from data analysis...')

      const alerts: Alert[] = []

      // Get real data from all sources
      const [gaData, businessData, seoData] = await Promise.all([
        this.gaService.getWebsiteMetrics(range).catch(() => null),
        this.businessService.getBusinessMetrics(range).catch(() => null),
        this.gscService.getSEOInsights(range).catch(() => null)
      ])

      // Generate alerts based on real data analysis
      if (gaData) {
        alerts.push(...this.analyzeWebsiteAlerts(gaData))
      }

      if (businessData) {
        alerts.push(...this.analyzeBusinessAlerts(businessData))
      }

      if (seoData) {
        alerts.push(...this.analyzeSEOAlerts(seoData))
      }

      // Generate system health alerts
      alerts.push(...this.generateSystemAlerts())

      // Sort by severity and timestamp
      alerts.sort((a, b) => {
        const severityOrder = { high: 3, medium: 2, low: 1 }
        const severityDiff = (severityOrder[b.severity as keyof typeof severityOrder] || 0) - 
                            (severityOrder[a.severity as keyof typeof severityOrder] || 0)
        
        if (severityDiff !== 0) return severityDiff
        
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      })

      console.log('📊 Generated', alerts.length, 'real alerts from data analysis')

      return alerts.slice(0, 20) // Return top 20 alerts

    } catch (error) {
      console.error('Failed to generate automated alerts:', error)
      throw new Error('Failed to generate real automated alerts')
    }
  }

  private analyzeWebsiteAlerts(gaData: any): Alert[] {
    const alerts: Alert[] = []

    // Traffic analysis
    if (gaData.totalVisitors < 10) {
      alerts.push({
        id: `alert-traffic-low-${Date.now()}`,
        type: 'traffic_low',
        severity: 'high',
        title: 'Low Website Traffic',
        description: `Website traffic is very low with only ${gaData.totalVisitors} visitors in the selected period`,
        timestamp: new Date().toISOString(),
        status: 'active',
        category: 'performance',
        details: {
          currentVisitors: gaData.totalVisitors,
          expectedVisitors: 100,
          period: '30d'
        },
        recommendations: [
          'Review marketing campaigns',
          'Check for technical issues',
          'Analyze traffic sources',
          'Consider SEO improvements'
        ]
      })
    }

    // Bounce rate analysis
    if (gaData.bounceRate > 70) {
      alerts.push({
        id: `alert-bounce-high-${Date.now()}`,
        type: 'bounce_rate_high',
        severity: 'medium',
        title: 'High Bounce Rate',
        description: `Bounce rate is ${gaData.bounceRate}%, which may indicate user experience issues`,
        timestamp: new Date().toISOString(),
        status: 'active',
        category: 'user_experience',
        details: {
          currentBounceRate: gaData.bounceRate,
          threshold: 70,
          topBouncingPages: gaData.topPages?.filter((p: any) => p.bounceRate > 70).slice(0, 3) || []
        },
        recommendations: [
          'Improve page loading speed',
          'Review page content relevance',
          'Check mobile responsiveness',
          'Analyze user flow'
        ]
      })
    }

    // Device breakdown analysis
    if (gaData.deviceBreakdown?.mobile < 20) {
      alerts.push({
        id: `alert-mobile-low-${Date.now()}`,
        type: 'mobile_traffic_low',
        severity: 'medium',
        title: 'Low Mobile Traffic',
        description: `Mobile traffic is only ${gaData.deviceBreakdown.mobile}% of total traffic`,
        timestamp: new Date().toISOString(),
        status: 'active',
        category: 'mobile',
        details: {
          mobilePercentage: gaData.deviceBreakdown.mobile,
          expectedMobilePercentage: 50,
          deviceBreakdown: gaData.deviceBreakdown
        },
        recommendations: [
          'Improve mobile SEO',
          'Check mobile user experience',
          'Review mobile marketing campaigns',
          'Optimize mobile page speed'
        ]
      })
    }

    return alerts
  }

  private analyzeBusinessAlerts(businessData: any): Alert[] {
    const alerts: Alert[] = []

    // Revenue analysis
    if (businessData.totalRevenue === 0) {
      alerts.push({
        id: `alert-revenue-zero-${Date.now()}`,
        type: 'revenue_zero',
        severity: 'high',
        title: 'No Revenue Recorded',
        description: 'No revenue has been recorded in the selected period',
        timestamp: new Date().toISOString(),
        status: 'active',
        category: 'business',
        details: {
          totalRevenue: businessData.totalRevenue,
          totalBookings: businessData.totalBookings,
          period: '30d'
        },
        recommendations: [
          'Check payment processing systems',
          'Review booking data in Airtable',
          'Verify revenue tracking setup',
          'Analyze conversion funnel'
        ]
      })
    }

    // Conversion rate analysis
    if (businessData.conversionRate < 1) {
      alerts.push({
        id: `alert-conversion-low-${Date.now()}`,
        type: 'conversion_low',
        severity: 'high',
        title: 'Low Conversion Rate',
        description: `Conversion rate is ${businessData.conversionRate}%, which is below industry standards`,
        timestamp: new Date().toISOString(),
        status: 'active',
        category: 'conversion',
        details: {
          currentConversionRate: businessData.conversionRate,
          expectedConversionRate: 2.5,
          totalLeads: businessData.conversionFunnel?.[0]?.count || 0,
          totalBookings: businessData.totalBookings
        },
        recommendations: [
          'Optimize booking process',
          'Improve call-to-action buttons',
          'Review pricing strategy',
          'Enhance trust signals'
        ]
      })
    }

    return alerts
  }

  private analyzeSEOAlerts(seoData: any): Alert[] {
    const alerts: Alert[] = []

    // Average position analysis
    if (seoData.avgPosition > 20) {
      alerts.push({
        id: `alert-seo-position-low-${Date.now()}`,
        type: 'seo_position_low',
        severity: 'medium',
        title: 'Low Average Search Position',
        description: `Average search position is ${seoData.avgPosition}, indicating poor visibility`,
        timestamp: new Date().toISOString(),
        status: 'active',
        category: 'seo',
        details: {
          avgPosition: seoData.avgPosition,
          targetPosition: 10,
          totalKeywords: seoData.totalKeywords,
          organicTraffic: seoData.organicTraffic
        },
        recommendations: [
          'Improve on-page SEO',
          'Build quality backlinks',
          'Optimize content for target keywords',
          'Fix technical SEO issues'
        ]
      })
    }

    // Organic traffic analysis
    if (seoData.organicTraffic < 100) {
      alerts.push({
        id: `alert-organic-traffic-low-${Date.now()}`,
        type: 'organic_traffic_low',
        severity: 'medium',
        title: 'Low Organic Traffic',
        description: `Organic traffic is only ${seoData.organicTraffic} clicks in the selected period`,
        timestamp: new Date().toISOString(),
        status: 'active',
        category: 'seo',
        details: {
          organicTraffic: seoData.organicTraffic,
          expectedTraffic: 500,
          totalKeywords: seoData.totalKeywords,
          avgPosition: seoData.avgPosition
        },
        recommendations: [
          'Create more quality content',
          'Target long-tail keywords',
          'Improve page loading speed',
          'Build topical authority'
        ]
      })
    }

    return alerts
  }

  private generateSystemAlerts(): Alert[] {
    const alerts: Alert[] = []

    // Check for missing environment variables
    const missingEnvVars = []
    if (!process.env.GA4_PROPERTY_ID) missingEnvVars.push('GA4_PROPERTY_ID')
    if (!process.env.GA4_SERVICE_ACCOUNT_JSON) missingEnvVars.push('GA4_SERVICE_ACCOUNT_JSON')
    if (!process.env.AIRTABLE_API_KEY) missingEnvVars.push('AIRTABLE_API_KEY')
    if (!process.env.AIRTABLE_BASE_ID) missingEnvVars.push('AIRTABLE_BASE_ID')

    if (missingEnvVars.length > 0) {
      alerts.push({
        id: `alert-env-vars-${Date.now()}`,
        type: 'configuration_missing',
        severity: 'high',
        title: 'Missing Configuration',
        description: `Missing environment variables: ${missingEnvVars.join(', ')}`,
        timestamp: new Date().toISOString(),
        status: 'active',
        category: 'system',
        details: {
          missingVariables: missingEnvVars,
          totalMissing: missingEnvVars.length
        },
        recommendations: [
          'Add missing environment variables to .env.local',
          'Verify API credentials are correct',
          'Check service account permissions',
          'Restart the application after adding variables'
        ]
      })
    }

    // Performance alert
    const now = new Date()
    const hour = now.getHours()
    
    // Generate a performance alert during peak hours if needed
    if (hour >= 9 && hour <= 17) { // Business hours
      alerts.push({
        id: `alert-performance-${Date.now()}`,
        type: 'performance_monitoring',
        severity: 'low',
        title: 'Performance Monitoring Active',
        description: 'System is monitoring performance during peak hours',
        timestamp: new Date().toISOString(),
        status: 'info',
        category: 'system',
        details: {
          currentHour: hour,
          peakHours: '9:00 - 17:00',
          monitoring: 'active'
        },
        recommendations: [
          'Monitor response times',
          'Check server resources',
          'Review error logs',
          'Optimize database queries'
        ]
      })
    }

    return alerts
  }

  // Fallback method for mock data
  getMockData(): Alert[] {
    return [
      {
        id: "alert-001",
        type: "traffic_spike",
        severity: "high",
        title: "Traffic Spike Detected",
        description: "Website traffic increased by 150% compared to yesterday",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: "active",
        category: "performance",
        details: {
          currentTraffic: 3200,
          previousTraffic: 1280,
          increase: "150%",
          timeframe: "24h"
        },
        recommendations: [
          "Monitor server performance",
          "Check for viral content",
          "Ensure adequate server capacity",
          "Analyze traffic sources"
        ]
      },
      {
        id: "alert-002",
        type: "conversion_drop",
        severity: "medium",
        title: "Conversion Rate Drop",
        description: "Booking conversion rate dropped by 25% this week",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        status: "active",
        category: "business",
        details: {
          currentRate: 2.1,
          previousRate: 2.8,
          drop: "25%",
          affectedPages: ["/booking", "/packages"]
        },
        recommendations: [
          "Review booking flow for issues",
          "A/B test pricing display",
          "Check payment gateway status",
          "Analyze user feedback"
        ]
      },
      {
        id: "alert-003",
        type: "seo_ranking_drop",
        severity: "medium",
        title: "Keyword Ranking Drop",
        description: "5 important keywords dropped in rankings",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        status: "active",
        category: "seo",
        details: {
          affectedKeywords: ["kite safari", "kiteboarding antigua", "kite cruise", "kiteboarding lessons", "kite holidays"],
          avgPositionChange: -3.2,
          trafficImpact: "12% decrease"
        },
        recommendations: [
          "Review recent content changes",
          "Check for technical SEO issues",
          "Monitor competitor activities",
          "Update content freshness"
        ]
      }
    ]
  }
}
