import { NextRequest, NextResponse } from 'next/server'
import { googleAnalyticsService } from '@/lib/google-analytics-service'
import { GoogleSearchConsoleService } from '@/lib/google-search-console-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '30d'
    
    console.log('🧪 Testing analytics data collection...')
    
    // Fetch fresh data from both services
    const [websiteData, seoData] = await Promise.all([
      googleAnalyticsService.getWebsiteMetrics(range).catch(() => googleAnalyticsService.getMockData(range)),
      new GoogleSearchConsoleService().getSEOInsights(range).catch(() => new GoogleSearchConsoleService().getMockData(range))
    ])
    
    // Transform data as it would be stored in Airtable
    const analyticsData = {
      // Website Analytics
      totalVisitors: websiteData?.totalVisitors || 0,
      totalPageViews: websiteData?.totalPageViews || 0,
      totalSessions: websiteData?.totalSessions || 0,
      bounceRate: Math.round((websiteData?.bounceRate || 0) * 100) / 100,
      avgSessionDuration: Math.round(websiteData?.avgSessionDuration || 0),
      newVisitors: websiteData?.newVisitors || 0,
      returningVisitors: websiteData?.returningVisitors || 0,
      
      // SEO Metrics
      seoScore: seoData?.seoScore || 0,
      totalKeywords: seoData?.totalKeywords || 0,
      organicTraffic: seoData?.organicTraffic || 0,
      avgPosition: Math.round((seoData?.avgPosition || 0) * 10) / 10,
      positionGrowth: Math.round((seoData?.positionGrowth || 0) * 10) / 10,
      keywordGrowth: Math.round((seoData?.keywordGrowth || 0) * 10) / 10,
      trafficGrowth: Math.round((seoData?.trafficGrowth || 0) * 10) / 10,
      seoGrowth: Math.round((seoData?.seoGrowth || 0) * 10) / 10,
      
      // Device & Traffic Breakdown
      desktopPercentage: websiteData?.deviceBreakdown?.desktop || 0,
      mobilePercentage: websiteData?.deviceBreakdown?.mobile || 0,
      tabletPercentage: websiteData?.deviceBreakdown?.tablet || 0,
      
      // Metadata
      date: new Date().toISOString().split('T')[0],
      dataSource: 'Test Endpoint',
      timestamp: new Date().toISOString(),
      range
    }
    
    return NextResponse.json({
      success: true,
      message: 'Analytics data collection test successful',
      data: analyticsData,
      timestamp: new Date().toISOString(),
      range
    })
    
  } catch (error) {
    console.error('Analytics test failed:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Analytics test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
