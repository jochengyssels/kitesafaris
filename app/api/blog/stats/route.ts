import { NextRequest, NextResponse } from 'next/server'
import { BlogService } from '@/lib/blog-service'

// GET /api/blog/stats - Get blog statistics
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization')
    const apiSecret = request.headers.get('x-api-secret')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const expectedToken = process.env.KITESAFARIS_API_KEY || 'test_key'
    const expectedSecret = process.env.KITESAFARIS_API_SECRET || 'test_secret'

    if (token !== expectedToken || apiSecret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Invalid API credentials' },
        { status: 401 }
      )
    }

    const blogService = BlogService.getInstance()
    const stats = await blogService.getStats()

    return NextResponse.json({
      success: true,
      stats
    })

  } catch (error) {
    console.error('[Blog API] Stats error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve stats' },
      { status: 500 }
    )
  }
}
