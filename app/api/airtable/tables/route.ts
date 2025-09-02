import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.AIRTABLE_API_KEY
    const baseId = process.env.AIRTABLE_BASE_ID

    if (!apiKey || !baseId) {
      return NextResponse.json({
        success: false,
        message: 'Missing Airtable configuration'
      }, { status: 500 })
    }

    // Test common table names to see what's available
    const commonTables = ['Leads', 'ebook_leads', 'Destinations', 'Trips', 'Bookings', 'Contacts']
    const availableTables = []

    for (const tableName of commonTables) {
      try {
        const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}?maxRecords=1`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const result = await response.json()
          availableTables.push({
            name: tableName,
            accessible: true,
            recordCount: result.records?.length || 0,
            fields: result.records?.[0]?.fields ? Object.keys(result.records[0].fields) : []
          })
        } else if (response.status === 404) {
          availableTables.push({
            name: tableName,
            accessible: false,
            reason: 'Table not found'
          })
        } else {
          availableTables.push({
            name: tableName,
            accessible: false,
            reason: `HTTP ${response.status}: ${response.statusText}`
          })
        }
      } catch (error) {
        availableTables.push({
          name: tableName,
          accessible: false,
          reason: 'Network error'
        })
      }
    }

    return NextResponse.json({
      success: true,
      baseId,
      availableTables,
      note: 'This endpoint tests common table names. Your actual table names may differ.'
    })

  } catch (error) {
    console.error('[v0] Error testing Airtable tables:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}
