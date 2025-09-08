import { NextRequest, NextResponse } from 'next/server'
import { googleAnalyticsService } from '@/lib/google-analytics-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '30d'
    
    console.log('🚀 Attempting to fetch website analytics data...')
    
    // Try to fetch data from Google Analytics
    const data = await googleAnalyticsService.getWebsiteMetrics(range)

    return NextResponse.json({
      success: true,
      data,
      range,
      timestamp: new Date().toISOString(),
      source: 'Google Analytics 4',
      note: 'Live data from Google Analytics'
    })

  } catch (error) {
    console.error('Failed to fetch website analytics:', error)
    console.log('🔄 Falling back to mock data...')
    
    // Fallback to mock data when real service fails
    const mockData = googleAnalyticsService.getMockData(range)
    
    return NextResponse.json({
      success: true,
      data: mockData,
      range,
      timestamp: new Date().toISOString(),
      source: 'Mock Data (Fallback)',
      note: 'Using fallback data due to Google Analytics authentication issues',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
