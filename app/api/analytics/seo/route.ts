import { NextRequest, NextResponse } from 'next/server'
import { GoogleSearchConsoleService } from '@/lib/google-search-console-service'

interface SEOInsights {
  avgPosition: number
  totalKeywords: number
  organicTraffic: number
  seoScore: number
  keywordRankings: Array<{
    keyword: string
    position: number
    change: number
    traffic: number
    difficulty: number
  }>
  seoIssues: Array<{
    type: string
    count: number
    severity: string
    pages: string[]
    impact: string
  }>
  contentOpportunities: Array<{
    keyword: string
    searchVolume: number
    difficulty: number
    opportunity: string
    suggestion: string
  }>
  backlinkData: Array<{
    domain: string
    links: number
    domainRating: number
    type: string
  }>
  rankingHistory: Array<{
    date: string
    avgPosition: number
    keywords: number
    traffic: number
  }>
  pagePerformance: Array<{
    page: string
    position: number
    traffic: number
    impressions: number
    ctr: number
  }>
  positionGrowth: number
  keywordGrowth: number
  trafficGrowth: number
  seoGrowth: number
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '30d'
    
    console.log('🚀 Fetching REAL SEO insights from Google Search Console...')
    
    // Fetch real data from Google Search Console
    const gscService = new GoogleSearchConsoleService()
    const data = await gscService.getSEOInsights(range)

    return NextResponse.json({
      success: true,
      data,
      range,
      timestamp: new Date().toISOString(),
      source: 'Google Search Console',
      note: 'Real SEO data from Google Search Console'
    })

  } catch (error) {
    console.error('Failed to fetch SEO insights:', error)
    
    // Fallback to mock data if GSC fails
    const gscService = new GoogleSearchConsoleService()
    const mockData: SEOInsights = gscService.getMockData(range)

    return NextResponse.json({
      success: true,
      data: mockData,
      range,
      timestamp: new Date().toISOString(),
      source: 'Mock Data (Fallback)',
      note: 'Using fallback data due to Google Search Console error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}