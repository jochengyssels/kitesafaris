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

    // Test both table endpoints
    const testResults = {
      ebookLeads: null,
      leads: null,
      config: {
        hasApiKey: !!apiKey,
        hasBaseId: !!baseId,
        baseId: baseId
      }
    }

    // Test ebook_leads table
    try {
      const ebookResponse = await fetch(`https://api.airtable.com/v0/${baseId}/ebook_leads?maxRecords=1`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      testResults.ebookLeads = {
        accessible: ebookResponse.ok,
        status: ebookResponse.status,
        statusText: ebookResponse.statusText,
        hasRecords: false
      }

      if (ebookResponse.ok) {
        const result = await ebookResponse.json()
        testResults.ebookLeads.hasRecords = result.records && result.records.length > 0
        testResults.ebookLeads.sampleFields = result.records?.[0]?.fields ? Object.keys(result.records[0].fields) : []
      }
    } catch (error) {
      testResults.ebookLeads = {
        accessible: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }

    // Test Leads table
    try {
      const leadsResponse = await fetch(`https://api.airtable.com/v0/${baseId}/Leads?maxRecords=1`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      testResults.leads = {
        accessible: leadsResponse.ok,
        status: leadsResponse.status,
        statusText: leadsResponse.statusText,
        hasRecords: false
      }

      if (leadsResponse.ok) {
        const result = await leadsResponse.json()
        testResults.leads.hasRecords = result.records && result.records.length > 0
        testResults.leads.sampleFields = result.records?.[0]?.fields ? Object.keys(result.records[0].fields) : []
      }
    } catch (error) {
      testResults.leads = {
        accessible: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }

    return NextResponse.json({
      success: true,
      testResults,
      recommendations: {
        useEbookLeads: testResults.ebookLeads?.accessible,
        useLeads: testResults.leads?.accessible,
        fallbackAvailable: testResults.leads?.accessible
      }
    })

  } catch (error) {
    console.error('[v0] Error testing ebook leads:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}
