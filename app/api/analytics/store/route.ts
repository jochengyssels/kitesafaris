import { NextRequest, NextResponse } from 'next/server'
import { analyticsAirtableService } from '@/lib/analytics-airtable-service'
import { googleAnalyticsService } from '@/lib/google-analytics-service'
import { GoogleSearchConsoleService } from '@/lib/google-search-console-service'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '30d'
    
    console.log('🚀 Storing analytics data in Airtable...')
    
    // Fetch fresh data from both services
    const [websiteData, seoData] = await Promise.all([
      googleAnalyticsService.getWebsiteMetrics(range).catch(() => googleAnalyticsService.getMockData(range)),
      new GoogleSearchConsoleService().getSEOInsights(range).catch(() => new GoogleSearchConsoleService().getMockData(range))
    ])
    
    // Store in Airtable
    await analyticsAirtableService.storeAnalyticsData(websiteData, seoData, range)
    
    return NextResponse.json({
      success: true,
      message: 'Analytics data stored successfully in Airtable',
      timestamp: new Date().toISOString(),
      range,
      data: {
        website: {
          totalVisitors: websiteData.totalVisitors,
          totalPageViews: websiteData.totalPageViews,
          bounceRate: websiteData.bounceRate
        },
        seo: {
          seoScore: seoData.seoScore,
          totalKeywords: seoData.totalKeywords,
          organicTraffic: seoData.organicTraffic
        }
      }
    })
    
  } catch (error) {
    console.error('Failed to store analytics data:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to store analytics data in Airtable',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '30')
    const days = parseInt(searchParams.get('days') || '7')
    
    let data
    
    if (searchParams.get('summary') === 'true') {
      data = await analyticsAirtableService.getAnalyticsSummary(days)
    } else {
      data = await analyticsAirtableService.getRecentAnalytics(limit)
    }
    
    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Failed to fetch analytics data:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch analytics data from Airtable',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
