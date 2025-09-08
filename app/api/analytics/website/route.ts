import { NextRequest, NextResponse } from 'next/server'
import { googleAnalyticsService } from '@/lib/google-analytics-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '30d'
    
    // Fetch data from Google Analytics (with fallback to mock data)
    const data = await googleAnalyticsService.getWebsiteMetrics(range)

    return NextResponse.json({
      success: true,
      data,
      range,
      timestamp: new Date().toISOString(),
      source: 'Google Analytics 4 (with fallback)',
      note: 'Using fallback data while Google Analytics APIs are being enabled'
    })

  } catch (error) {
    console.error('Failed to fetch website analytics:', error)
    
    // Return error response with details for debugging
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch website analytics data',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
