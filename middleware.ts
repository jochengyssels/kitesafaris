import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect admin routes (except login page)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_auth_token')?.value

    if (!token) {
      // Redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      // Verify JWT token
      const { payload } = await jwtVerify(token, JWT_SECRET)
      
      // Check if token is expired or invalid
      if (!payload.username || payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }

      // Token is valid, allow access
      return NextResponse.next()
    } catch (error) {
      console.error('[v0] JWT verification failed:', error)
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
