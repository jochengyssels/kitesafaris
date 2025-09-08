import { NextRequest, NextResponse } from 'next/server'
import { BusinessMetricsService } from '@/lib/business-metrics-service'

interface BusinessMetrics {
  totalRevenue: number
  totalBookings: number
  conversionRate: number
  avgBookingValue: number
  monthlyRevenue: Array<{
    month: string
    revenue: number
    bookings: number
    avgBooking: number
  }>
  leadSources: Array<{
    source: string
    leads: number
    conversions: number
    rate: number
  }>
  destinations: Array<{
    destination: string
    bookings: number
    revenue: number
    avgPrice: number
    satisfaction: number
  }>
  customerDemographics: Array<{
    country: string
    customers: number
    percentage: number
    revenue: number
  }>
  conversionFunnel: Array<{
    stage: string
    count: number
    percentage: number
  }>
  recentBookings: Array<{
    id: string
    customer: string
    destination: string
    amount: number
    date: string
    status: string
  }>
  ebookSubscribers: Array<{
    month: string
    subscribers: number
    downloads: number
  }>
  revenueGrowth: number
  bookingGrowth: number
  conversionGrowth: number
  avgBookingGrowth: number
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '30d'
    
    console.log('🚀 Fetching REAL business metrics from Airtable...')
    
    // Fetch real data from Airtable
    const businessMetricsService = new BusinessMetricsService()
    const data = await businessMetricsService.getBusinessMetrics(range)

    return NextResponse.json({
      success: true,
      data,
      range,
      timestamp: new Date().toISOString(),
      source: 'Airtable',
      note: 'Real business data from Airtable'
    })

  } catch (error) {
    console.error('Failed to fetch business metrics:', error)
    
    // Fallback to mock data if Airtable fails
    const mockData: BusinessMetrics = {
      totalRevenue: 281000,
      totalBookings: 68,
      conversionRate: 36.6,
      avgBookingValue: 4132,
      monthlyRevenue: [
        { month: 'Jan', revenue: 42000, bookings: 18, avgBooking: 2333 },
        { month: 'Feb', revenue: 38000, bookings: 16, avgBooking: 2375 },
        { month: 'Mar', revenue: 45000, bookings: 20, avgBooking: 2250 },
        { month: 'Apr', revenue: 52000, bookings: 22, avgBooking: 2364 },
        { month: 'May', revenue: 48000, bookings: 19, avgBooking: 2526 },
        { month: 'Jun', revenue: 56000, bookings: 24, avgBooking: 2333 }
      ],
      leadSources: [
        { source: 'Website Form', leads: 45, conversions: 12, rate: 26.7 },
        { source: 'Organic Search', leads: 38, conversions: 15, rate: 39.5 },
        { source: 'Social Media', leads: 22, conversions: 6, rate: 27.3 },
        { source: 'Referral', leads: 18, conversions: 8, rate: 44.4 },
        { source: 'Email Campaign', leads: 15, conversions: 4, rate: 26.7 },
        { source: 'Direct Contact', leads: 12, conversions: 7, rate: 58.3 }
      ],
      destinations: [
        { destination: 'Antigua', bookings: 24, revenue: 48000, avgPrice: 2000, satisfaction: 4.9 },
        { destination: 'Sardinia', bookings: 18, revenue: 36000, avgPrice: 2000, satisfaction: 4.8 },
        { destination: 'Greece', bookings: 12, revenue: 24000, avgPrice: 2000, satisfaction: 4.7 },
        { destination: 'Croatia', bookings: 8, revenue: 16000, avgPrice: 2000, satisfaction: 4.6 },
        { destination: 'Barbados', bookings: 6, revenue: 12000, avgPrice: 2000, satisfaction: 4.8 }
      ],
      customerDemographics: [
        { country: 'Germany', customers: 35, percentage: 28, revenue: 70000 },
        { country: 'Netherlands', customers: 28, percentage: 22, revenue: 56000 },
        { country: 'United Kingdom', customers: 22, percentage: 18, revenue: 44000 },
        { country: 'France', customers: 18, percentage: 14, revenue: 36000 },
        { country: 'Switzerland', customers: 12, percentage: 10, revenue: 24000 },
        { country: 'Other', customers: 8, percentage: 8, revenue: 16000 }
      ],
      conversionFunnel: [
        { stage: 'Website Visitors', count: 12400, percentage: 100 },
        { stage: 'Lead Generation', count: 248, percentage: 2.0 },
        { stage: 'Inquiries', count: 186, percentage: 1.5 },
        { stage: 'Proposals Sent', count: 124, percentage: 1.0 },
        { stage: 'Bookings', count: 68, percentage: 0.55 }
      ],
      recentBookings: [
        { id: 'BK001', customer: 'John Smith', destination: 'Antigua', amount: 2400, date: '2024-01-15', status: 'confirmed' },
        { id: 'BK002', customer: 'Maria Garcia', destination: 'Sardinia', amount: 2200, date: '2024-01-14', status: 'confirmed' },
        { id: 'BK003', customer: 'David Johnson', destination: 'Greece', amount: 2000, date: '2024-01-13', status: 'pending' },
        { id: 'BK004', customer: 'Anna Müller', destination: 'Antigua', amount: 2400, date: '2024-01-12', status: 'confirmed' },
        { id: 'BK005', customer: 'Pierre Dubois', destination: 'Croatia', amount: 1800, date: '2024-01-11', status: 'confirmed' }
      ],
      ebookSubscribers: [
        { month: 'Jan', subscribers: 45, downloads: 120 },
        { month: 'Feb', subscribers: 52, downloads: 135 },
        { month: 'Mar', subscribers: 48, downloads: 128 },
        { month: 'Apr', subscribers: 61, downloads: 155 },
        { month: 'May', subscribers: 58, downloads: 142 },
        { month: 'Jun', subscribers: 67, downloads: 168 }
      ],
      revenueGrowth: 15.2,
      bookingGrowth: 12.5,
      conversionGrowth: 3.2,
      avgBookingGrowth: 2.1
    }

    return NextResponse.json({
      success: true,
      data: mockData,
      range,
      timestamp: new Date().toISOString(),
      source: 'Mock Data (Fallback)',
      note: 'Using fallback data due to Airtable error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
