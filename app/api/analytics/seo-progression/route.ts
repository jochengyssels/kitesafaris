import { NextRequest, NextResponse } from 'next/server'
import { analyticsAirtableService } from '@/lib/analytics-airtable-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')
    
    console.log(`📊 Fetching SEO score progression for last ${days} days...`)
    
    // Get recent analytics data from Airtable
    const recentDataResponse = await analyticsAirtableService.getRecentAnalytics(days)
    const recentData = recentDataResponse.records || []
    
    // Transform data for chart
    const chartData = recentData.map((record: any) => ({
      date: record.fields['Date'] || record.fields['date'],
      seoScore: record.fields['SEO Score'] || record.fields['seoScore'] || 0,
      totalKeywords: record.fields['Total Keywords'] || record.fields['totalKeywords'] || 0,
      organicTraffic: record.fields['Organic Traffic'] || record.fields['organicTraffic'] || 0,
      avgPosition: record.fields['Avg Position'] || record.fields['avgPosition'] || 0,
      dataSource: record.fields['Data Source'] || record.fields['dataSource'] || 'Unknown'
    }))
    
    // Sort by date (oldest first)
    chartData.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
    
    // Calculate trends
    const firstScore = chartData[0]?.seoScore || 0
    const lastScore = chartData[chartData.length - 1]?.seoScore || 0
    const scoreChange = lastScore - firstScore
    const scoreChangePercent = firstScore > 0 ? (scoreChange / firstScore) * 100 : 0
    
    const firstKeywords = chartData[0]?.totalKeywords || 0
    const lastKeywords = chartData[chartData.length - 1]?.totalKeywords || 0
    const keywordChange = lastKeywords - firstKeywords
    const keywordChangePercent = firstKeywords > 0 ? (keywordChange / firstKeywords) * 100 : 0
    
    return NextResponse.json({
      success: true,
      data: {
        chartData,
        trends: {
          seoScore: {
            current: lastScore,
            change: scoreChange,
            changePercent: scoreChangePercent,
            trend: scoreChange > 0 ? 'up' : scoreChange < 0 ? 'down' : 'stable'
          },
          keywords: {
            current: lastKeywords,
            change: keywordChange,
            changePercent: keywordChangePercent,
            trend: keywordChange > 0 ? 'up' : keywordChange < 0 ? 'down' : 'stable'
          }
        },
        summary: {
          totalDataPoints: chartData.length,
          dateRange: {
            start: chartData[0]?.date,
            end: chartData[chartData.length - 1]?.date
          }
        }
      },
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('❌ Failed to fetch SEO progression data:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: {
        chartData: [],
        trends: {
          seoScore: { current: 0, change: 0, changePercent: 0, trend: 'stable' },
          keywords: { current: 0, change: 0, changePercent: 0, trend: 'stable' }
        },
        summary: { totalDataPoints: 0, dateRange: { start: null, end: null } }
      },
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
