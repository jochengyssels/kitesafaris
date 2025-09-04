import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'kitesafaris2024!'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'
)

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await new SignJWT({ 
      username,
      role: 'admin',
      timestamp: Date.now()
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(JWT_SECRET)

    console.log(`[v0] Admin login successful for user: ${username}`)

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful'
    })

    // Set HTTP-only cookie
    response.cookies.set('admin_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    })

    return response

  } catch (error) {
    console.error('[v0] Admin authentication error:', error)
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
