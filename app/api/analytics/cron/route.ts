import { NextRequest, NextResponse } from 'next/server'
import { analyticsCronService } from '@/lib/analytics-cron-service'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const force = searchParams.get('force') === 'true'
    
    console.log('🕐 Analytics cron job triggered...')
    
    if (force) {
      await analyticsCronService.forceRun()
    } else {
      if (!analyticsCronService.shouldRun()) {
        return NextResponse.json({
          success: true,
          message: 'Analytics collection not needed yet',
          status: analyticsCronService.getStatus(),
          timestamp: new Date().toISOString()
        })
      }
      
      await analyticsCronService.runDailyAnalyticsCollection()
    }
    
    return NextResponse.json({
      success: true,
      message: 'Analytics collection completed successfully',
      status: analyticsCronService.getStatus(),
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Analytics cron job failed:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Analytics cron job failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        status: analyticsCronService.getStatus(),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const status = analyticsCronService.getStatus()
    
    return NextResponse.json({
      success: true,
      status,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Failed to get cron status:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get cron status',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
