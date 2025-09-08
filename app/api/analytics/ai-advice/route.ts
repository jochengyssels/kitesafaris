import { NextRequest, NextResponse } from 'next/server'
import { googleAnalyticsService } from '@/lib/google-analytics-service'
import { GoogleSearchConsoleService } from '@/lib/google-search-console-service'

interface AIAnalysis {
  id: number
  type: 'trend' | 'performance' | 'improvement' | 'opportunity' | 'warning'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  priority: number
  actionable: boolean
  category: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { dateRange = '30d', timestamp } = body

    console.log('🤖 Starting AI advice analysis for date range:', dateRange)

    // Check if OpenAI API key is available
    const openaiApiKey = process.env.OPENAI_API_KEY
    if (!openaiApiKey) {
      console.error('OpenAI API key not found in environment variables')
      return NextResponse.json({
        success: false,
        error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.'
      }, { status: 500 })
    }

    // Gather all analytics data
    console.log('📊 Gathering analytics data...')
    
    const [websiteData, seoData] = await Promise.all([
      // Fetch website analytics
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/analytics/website?range=${dateRange}`)
        .then(res => res.json())
        .catch(err => {
          console.warn('Failed to fetch website analytics:', err)
          return { success: false, data: null }
        }),
      
      // Fetch SEO data
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/analytics/seo?range=${dateRange}`)
        .then(res => res.json())
        .catch(err => {
          console.warn('Failed to fetch SEO data:', err)
          return { success: false, data: null }
        })
    ])

    // Prepare comprehensive analytics data for AI analysis
    const analyticsData = {
      metadata: {
        dateRange,
        timestamp,
        analysisDate: new Date().toISOString(),
        dataSources: {
          website: websiteData.success ? 'Google Analytics 4' : 'Unavailable',
          seo: seoData.success ? 'Google Search Console' : 'Unavailable'
        }
      },
      websiteAnalytics: websiteData.success ? {
        visitors: websiteData.data.totalVisitors,
        pageViews: websiteData.data.totalPageViews,
        sessions: websiteData.data.totalSessions,
        bounceRate: websiteData.data.bounceRate,
        avgSessionDuration: websiteData.data.avgSessionDuration,
        newVisitors: websiteData.data.newVisitors,
        returningVisitors: websiteData.data.returningVisitors,
        deviceBreakdown: websiteData.data.deviceBreakdown,
        trafficSources: websiteData.data.trafficSources,
        topPages: websiteData.data.topPages,
        bottomPages: websiteData.data.bottomPages,
        geographicData: websiteData.data.geographicData,
        hourlyData: websiteData.data.hourlyData,
        dailyData: websiteData.data.dailyData
      } : null,
      seoAnalytics: seoData.success ? {
        seoScore: seoData.data.seoScore,
        totalKeywords: seoData.data.totalKeywords,
        organicTraffic: seoData.data.organicTraffic,
        avgPosition: seoData.data.avgPosition,
        keywordRankings: seoData.data.keywordRankings,
        seoIssues: seoData.data.seoIssues,
        contentOpportunities: seoData.data.contentOpportunities,
        backlinkData: seoData.data.backlinkData,
        rankingHistory: seoData.data.rankingHistory,
        pagePerformance: seoData.data.pagePerformance,
        positionGrowth: seoData.data.positionGrowth,
        keywordGrowth: seoData.data.keywordGrowth,
        trafficGrowth: seoData.data.trafficGrowth,
        seoGrowth: seoData.data.seoGrowth
      } : null
    }

    // Create the prompt for OpenAI
    const prompt = `You are an expert digital marketing and analytics consultant specializing in kiteboarding and adventure travel businesses. 

Analyze the following comprehensive analytics data for KiteSafaris (a kiteboarding safari company) and provide exactly 10 actionable insights and recommendations.

BUSINESS CONTEXT:
- Company: KiteSafaris - Premium kiteboarding safari experiences
- Industry: Adventure travel, kiteboarding, water sports tourism
- Target audience: Kiteboarders, adventure travelers, water sports enthusiasts
- Business model: Premium group trips, equipment rental, instruction

ANALYTICS DATA:
${JSON.stringify(analyticsData, null, 2)}

REQUIREMENTS:
1. Provide exactly 10 analysis outcomes
2. Each outcome should be one of these types: 'trend', 'performance', 'improvement', 'opportunity', 'warning'
3. Focus on actionable insights that can drive business growth
4. Consider the seasonal nature of kiteboarding (wind-dependent)
5. Prioritize insights that can improve conversion rates and customer experience
6. Include both technical SEO insights and business strategy recommendations

RESPONSE FORMAT:
Return a JSON array with exactly 10 objects, each containing:
{
  "id": number (1-10),
  "type": "trend" | "performance" | "improvement" | "opportunity" | "warning",
  "title": "Clear, actionable title (max 60 characters)",
  "description": "Detailed explanation with specific recommendations (150-300 words)",
  "impact": "high" | "medium" | "low",
  "priority": number (1-10, where 10 is highest priority),
  "actionable": boolean,
  "category": "seo" | "traffic" | "conversion" | "content" | "technical" | "business"
}

Focus on insights that can:
- Increase organic traffic and search visibility
- Improve user experience and engagement
- Boost conversion rates for bookings
- Enhance content strategy
- Optimize technical performance
- Identify growth opportunities
- Address potential issues before they become problems

Be specific, actionable, and relevant to a kiteboarding safari business.`

    console.log('🚀 Sending request to OpenAI...')

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert digital marketing and analytics consultant. Always respond with valid JSON format as requested.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json()
      console.error('OpenAI API error:', errorData)
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`)
    }

    const openaiResult = await openaiResponse.json()
    const aiResponse = openaiResult.choices[0]?.message?.content

    if (!aiResponse) {
      throw new Error('No response received from OpenAI')
    }

    console.log('✅ Received response from OpenAI')

    // Parse the AI response
    let analysis: AIAnalysis[]
    try {
      // Clean the response to extract JSON
      const jsonMatch = aiResponse.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error('No JSON array found in AI response')
      }
      
      analysis = JSON.parse(jsonMatch[0])
      
      // Validate the response structure
      if (!Array.isArray(analysis) || analysis.length !== 10) {
        throw new Error(`Expected 10 analysis items, got ${analysis.length}`)
      }

      // Validate each item has required fields
      analysis.forEach((item, index) => {
        const requiredFields = ['id', 'type', 'title', 'description', 'impact', 'priority', 'actionable', 'category']
        const missingFields = requiredFields.filter(field => !(field in item))
        if (missingFields.length > 0) {
          throw new Error(`Analysis item ${index + 1} missing fields: ${missingFields.join(', ')}`)
        }
      })

    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      console.log('Raw AI response:', aiResponse)
      
      // Fallback: create mock analysis if parsing fails
      analysis = [
        {
          id: 1,
          type: 'improvement',
          title: 'AI Analysis Temporarily Unavailable',
          description: 'We encountered an issue parsing the AI analysis results. Please try again in a few moments. The AI service is working but the response format needs adjustment.',
          impact: 'medium',
          priority: 5,
          actionable: false,
          category: 'technical'
        }
      ]
    }

    console.log('🎯 AI analysis completed successfully')

    return NextResponse.json({
      success: true,
      analysis,
      metadata: {
        dateRange,
        timestamp,
        analysisDate: new Date().toISOString(),
        dataSources: analyticsData.metadata.dataSources,
        openaiModel: 'gpt-4',
        totalInsights: analysis.length
      }
    })

  } catch (error) {
    console.error('Failed to generate AI advice:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred while generating AI advice',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
