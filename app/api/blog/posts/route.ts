import { NextRequest, NextResponse } from 'next/server'
import { BlogService, CreateBlogPostRequest } from '@/lib/blog-service'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Authentication middleware
function authenticateAPI(request: NextRequest): { success: boolean; error?: string } {
  const authHeader = request.headers.get('authorization')
  const apiSecret = request.headers.get('x-api-secret')
  const userAgent = request.headers.get('user-agent')

  // Check authorization header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { success: false, error: 'Missing or invalid authorization header' }
  }

  const token = authHeader.substring(7)
  const expectedToken = process.env.KITESAFARIS_API_KEY || 'test_key'
  const expectedSecret = process.env.KITESAFARIS_API_SECRET || 'test_secret'

  if (token !== expectedToken || apiSecret !== expectedSecret) {
    return { success: false, error: 'Invalid API credentials' }
  }

  // Check user agent
  if (!userAgent || !userAgent.includes('KiteSafaris-Blog-Automation')) {
    return { success: false, error: 'Invalid user agent' }
  }

  return { success: true }
}

// Rate limiting middleware
function checkRateLimit(request: NextRequest): { success: boolean; error?: string; retryAfter?: number } {
  const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 60

  const clientData = rateLimitStore.get(clientIP)
  
  if (!clientData || now > clientData.resetTime) {
    // Reset or create new window
    rateLimitStore.set(clientIP, {
      count: 1,
      resetTime: now + windowMs
    })
    return { success: true }
  }

  if (clientData.count >= maxRequests) {
    const retryAfter = Math.ceil((clientData.resetTime - now) / 1000)
    return { 
      success: false, 
      error: 'Too many requests, please try again later',
      retryAfter
    }
  }

  // Increment count
  clientData.count++
  rateLimitStore.set(clientIP, clientData)
  
  return { success: true }
}

// GET /api/blog/posts - List all posts (for admin use)
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authResult = authenticateAPI(request)
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: 401 }
      )
    }

    const blogService = BlogService.getInstance()
    const posts = await blogService.getAllPosts()

    return NextResponse.json({
      success: true,
      posts,
      count: posts.length
    })

  } catch (error) {
    console.error('[Blog API] GET posts error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve posts' },
      { status: 500 }
    )
  }
}

// POST /api/blog/posts - Create new blog post
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authResult = authenticateAPI(request)
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: 401 }
      )
    }

    // Check rate limiting
    const rateLimitResult = checkRateLimit(request)
    if (!rateLimitResult.success) {
      const response = NextResponse.json(
        { error: rateLimitResult.error },
        { status: 429 }
      )
      if (rateLimitResult.retryAfter) {
        response.headers.set('Retry-After', rateLimitResult.retryAfter.toString())
      }
      return response
    }

    // Parse request body
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, content' },
        { status: 400 }
      )
    }

    // Validate slug format
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugRegex.test(body.slug)) {
      return NextResponse.json(
        { error: 'Invalid slug format. Use lowercase letters, numbers, and hyphens only.' },
        { status: 400 }
      )
    }

    // Create blog post
    const blogService = BlogService.getInstance()
    const post = await blogService.createPost(body as CreateBlogPostRequest)

    // Generate public URL
    const publicUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${post.slug}`

    console.log(`[Blog API] Created post: ${post.title} (${post.id})`)

    return NextResponse.json({
      success: true,
      id: post.id,
      url: publicUrl,
      status: post.status,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }, { status: 201 })

  } catch (error) {
    console.error('[Blog API] POST error:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('already exists')) {
        return NextResponse.json(
          { error: error.message },
          { status: 409 }
        )
      }
      if (error.message.includes('Missing required fields')) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
