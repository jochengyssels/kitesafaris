import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      status: 'operational',
      endpoints: {
        posts: 'POST /api/blog/posts',
        health: 'GET /api/blog/health'
      },
      rate_limit: {
        requests_per_minute: 60,
        requests_per_hour: 1000
      }
    })
  } catch (error) {
    console.error('[Blog API] Status check error:', error)
    return NextResponse.json(
      { 
        status: 'error',
        error: 'Status check failed'
      },
      { status: 500 }
    )
  }
}
