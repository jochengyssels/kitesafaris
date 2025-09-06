import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.PRINTFUL_API_KEY
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'PRINTFUL_API_KEY not configured',
        status: 'missing_config'
      }, { status: 500 })
    }

    // Test basic API connectivity
    const response = await fetch('https://api.printful.com/store', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    const responseText = await response.text()
    let responseData
    
    try {
      responseData = JSON.parse(responseText)
    } catch {
      responseData = { raw: responseText }
    }

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      apiKeyLength: apiKey.length,
      apiKeyPrefix: apiKey.substring(0, 10) + '...',
      response: responseData,
      headers: Object.fromEntries(response.headers.entries()),
    })

  } catch (error) {
    console.error('Printful token test error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 'error'
    }, { status: 500 })
  }
}
