import { NextRequest, NextResponse } from 'next/server'

interface EbookLeadRequest {
  email: string
  first_name?: string
  consent_marketing: boolean
  source?: string
  campaign?: string
}

interface EbookLeadResponse {
  success: boolean
  leadId?: string
  message: string
  error?: string
}

export async function POST(request: NextRequest): Promise<NextResponse<EbookLeadResponse>> {
  try {
    const body: EbookLeadRequest = await request.json()
    
    console.log('[v0] Ebook lead submission received:', {
      email: body.email,
      first_name: body.first_name,
      consent_marketing: body.consent_marketing,
      source: body.source || 'Sardinian Awakening',
      campaign: body.campaign || 'ebook-download'
    })

    // Validate required fields
    if (!body.email || !body.email.includes('@')) {
      return NextResponse.json({
        success: false,
        message: 'Valid email address is required'
      }, { status: 400 })
    }

    if (body.consent_marketing === undefined || body.consent_marketing === null) {
      return NextResponse.json({
        success: false,
        message: 'Marketing consent is required'
      }, { status: 400 })
    }

    // Check if we have the required environment variables
    const apiKey = process.env.AIRTABLE_API_KEY
    const baseId = process.env.AIRTABLE_BASE_ID

    if (!apiKey || !baseId) {
      console.error('[v0] Missing Airtable configuration')
      return NextResponse.json({
        success: false,
        message: 'Server configuration error'
      }, { status: 500 })
    }

    // Prepare the data for Airtable (only include fields that exist in your table)
    const airtableData = {
      records: [
        {
          fields: {
            email: body.email,
            first_name: body.first_name || '',
            consent_marketing: body.consent_marketing,
            source: body.source || 'Sardinian Awakening'
            // Removed: campaign (doesn't exist), download_date (auto-computed), status (may not exist)
          }
        }
      ]
    }

    console.log('[v0] Submitting to Airtable ebook_leads table:', airtableData)

    // Try to submit to Airtable ebook_leads table first
    let response = await fetch(`https://api.airtable.com/v0/${baseId}/ebook_leads`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(airtableData)
    })

    // If ebook_leads table doesn't exist or has permission issues, fallback to Leads table
    if (response.status === 404 || response.status === 403) {
      console.log('[v0] ebook_leads table not accessible, falling back to Leads table')
      
      // Prepare data for Leads table (simpler structure)
      const leadsData = {
        records: [
          {
            fields: {
              Email: body.email,
              Source: body.source || 'Sardinian Awakening Ebook',
              Notes: `First Name: ${body.first_name || 'Not provided'}, Consent: ${body.consent_marketing ? 'Yes' : 'No'}`
              // Removed: Campaign (may not exist in Leads table)
            }
          }
        ]
      }

      response = await fetch(`https://api.airtable.com/v0/${baseId}/Leads`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(leadsData)
      })
    }

    if (!response.ok) {
      const errorData = await response.text()
      console.error('[v0] Airtable API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        url: response.url,
        baseId: baseId
      })
      
      return NextResponse.json({
        success: false,
        message: 'Failed to save lead information',
        error: errorData
      }, { status: 500 })
    }

    const result = await response.json()
    const leadId = result.records?.[0]?.id
    const tableUsed = response.url.includes('ebook_leads') ? 'ebook_leads' : 'Leads'

    console.log('[v0] Ebook lead saved successfully:', {
      leadId,
      email: body.email,
      source: body.source,
      tableUsed
    })

    return NextResponse.json({
      success: true,
      leadId,
      message: 'Lead captured successfully'
    })

  } catch (error) {
    console.error('[v0] Ebook lead submission error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}
