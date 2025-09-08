import { NextRequest, NextResponse } from 'next/server'
import { AutomatedAlertsService } from '@/lib/automated-alerts-service'

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '30d'
    
    console.log('🚀 Generating REAL automated alerts from data analysis...')
    
    // Generate real alerts from data analysis
    const alertsService = new AutomatedAlertsService()
    const alerts = await alertsService.generateAlerts(range)

    return NextResponse.json({
      success: true,
      data: alerts,
      range,
      timestamp: new Date().toISOString(),
      source: 'Automated Data Analysis',
      note: 'Real alerts generated from website, business, and SEO data'
    })

  } catch (error) {
    console.error('Failed to generate automated alerts:', error)
    
    // Fallback to mock data if analysis fails
    const alertsService = new AutomatedAlertsService()
    const mockAlerts: Alert[] = alertsService.getMockData()

    return NextResponse.json({
      success: true,
      data: mockAlerts,
      range,
      timestamp: new Date().toISOString(),
      source: 'Mock Data (Fallback)',
      note: 'Using fallback data due to alert generation error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}