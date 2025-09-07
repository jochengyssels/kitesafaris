import { NextRequest, NextResponse } from 'next/server'
import { BlogService } from '@/lib/blog-service'

// POST /api/blog/test - Test blog API functionality
export async function POST(request: NextRequest) {
  try {
    const blogService = BlogService.getInstance()

    // Test data
    const testPost = {
      title: "Test Blog Post - KiteSafaris API",
      slug: "test-blog-post-kitesafaris-api",
      content: `
        <h1>Welcome to KiteSafaris Blog API</h1>
        <p>This is a test blog post created to verify the API functionality.</p>
        <h2>About KiteSafaris</h2>
        <p>KiteSafaris offers amazing kiteboarding adventures in the Caribbean and Mediterranean.</p>
        <h3>Our Services</h3>
        <ul>
          <li>Kiteboarding lessons for all skill levels</li>
          <li>Equipment rental and sales</li>
          <li>Safety guidance and support</li>
          <li>Amazing destinations like Antigua, Barbados, and Sardinia</li>
        </ul>
        <p>Join us for an unforgettable kiteboarding experience!</p>
      `,
      excerpt: "Test blog post for KiteSafaris API verification",
      status: "draft" as const,
      author: "KiteSafaris Team",
      metaDescription: "Test blog post for KiteSafaris API functionality verification",
      keywords: ["kitesurfing", "test", "api", "kitesafaris"],
      tags: ["test", "api", "kitesurfing", "caribbean"],
      category: "Kitesurfing",
      wordCount: 85,
      seoScore: 85,
      readabilityScore: 90,
      targetAudience: "all",
      kitesafaris: {
        location: "Caribbean",
        skillLevel: "all levels",
        seasonality: "year-round",
        equipmentMentioned: true,
        safetyMentioned: true,
        lessonsMentioned: true,
        rentalMentioned: true,
        caribbeanRelevance: 9,
        kitesurfingFocus: 10
      },
      source: "kitesafaris-automation"
    }

    // Create test post
    const createdPost = await blogService.createPost(testPost)

    // Get all posts
    const allPosts = await blogService.getAllPosts()

    // Get stats
    const stats = await blogService.getStats()

    // Test post retrieval
    const retrievedPost = await blogService.getPost(createdPost.id)
    const postBySlug = await blogService.getPostBySlug(createdPost.slug)

    return NextResponse.json({
      success: true,
      message: "Blog API test completed successfully",
      results: {
        createdPost: {
          id: createdPost.id,
          title: createdPost.title,
          slug: createdPost.slug,
          status: createdPost.status
        },
        totalPosts: allPosts.length,
        stats,
        retrievalTests: {
          byId: retrievedPost ? "PASS" : "FAIL",
          bySlug: postBySlug ? "PASS" : "FAIL"
        }
      }
    })

  } catch (error) {
    console.error('[Blog API] Test error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Test failed',
        message: 'Blog API test failed'
      },
      { status: 500 }
    )
  }
}

// GET /api/blog/test - Get test status
export async function GET(request: NextRequest) {
  try {
    const blogService = BlogService.getInstance()
    const stats = await blogService.getStats()

    return NextResponse.json({
      success: true,
      message: "Blog API is operational",
      status: "healthy",
      stats,
      endpoints: {
        health: "GET /api/blog/health",
        status: "GET /api/blog/status", 
        posts: "GET/POST /api/blog/posts",
        stats: "GET /api/blog/stats",
        test: "GET/POST /api/blog/test"
      }
    })

  } catch (error) {
    console.error('[Blog API] Test status error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Test status failed'
      },
      { status: 500 }
    )
  }
}
