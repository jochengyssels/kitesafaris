import { NextRequest, NextResponse } from 'next/server'

interface KitesurferCountRequest {
  image: string // base64 data URL
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export async function POST(request: NextRequest) {
  try {
    const { image }: KitesurferCountRequest = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 503 }
      )
    }

    // Remove data URL prefix to get just the base64 data
    const base64Data = image.replace(/^data:image\/[a-z]+;base64,/, '')

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this live webcam feed from Punta Trettu, Sardinia. Count ONLY the kites (parachutes/kite sails) visible in the entire image. 

Please provide your response in the following JSON format:
{
  "count": number,
  "confidence": number (0-1),
  "analysis": "brief description of the kites you see"
}

Look for:
- Kite sails/parachutes in the air
- Kite sails on the water surface
- Kite sails on the beach or shore
- Any visible kite fabric/material

Ignore:
- People (kitesurfers, beachgoers, etc.)
- Kitesurfing boards
- Other equipment
- Non-kite objects

Count ONLY the actual kite sails/parachutes - be precise and conservative in your count.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Data}`
                }
              }
            ]
          }
        ],
        max_tokens: 300,
        temperature: 0.1
      })
    })

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.text()
      console.error('OpenAI API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to analyze image with OpenAI' },
        { status: 503 }
      )
    }

    const openAIData: OpenAIResponse = await openAIResponse.json()
    const content = openAIData.choices[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: 'No response from OpenAI' },
        { status: 503 }
      )
    }

    try {
      // Try to parse the JSON response from OpenAI
      const parsedResponse = JSON.parse(content)
      
      return NextResponse.json({
        success: true,
        count: parsedResponse.count || 0,
        confidence: parsedResponse.confidence || 0.5,
        analysis: parsedResponse.analysis || 'Analysis completed'
      })
    } catch (parseError) {
      // If JSON parsing fails, try to extract numbers from the text
      const countMatch = content.match(/(\d+)\s*kite/i)
      const count = countMatch ? parseInt(countMatch[1]) : 0
      
      return NextResponse.json({
        success: true,
        count,
        confidence: 0.7,
        analysis: content.substring(0, 200) + (content.length > 200 ? '...' : '')
      })
    }

  } catch (error: any) {
    console.error('Kitesurfer count API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
