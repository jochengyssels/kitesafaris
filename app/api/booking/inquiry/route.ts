import { NextRequest, NextResponse } from 'next/server'
import { AirtableService } from '@/lib/airtable'

export interface InquiryRequest {
  name: string
  email: string
  phone?: string
  message?: string
  tripId: string
  destination: string
  startDate: string
  endDate: string
  guests: number
  cabinsRequired: number
  totalEur: number
  pricePerPerson: number
}

export interface InquiryResponse {
  success: boolean
  message: string
  inquiryId?: string
}

export async function POST(request: NextRequest): Promise<NextResponse<InquiryResponse>> {
  try {
    const body: InquiryRequest = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.tripId || !body.destination) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: name, email, tripId, destination'
      }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email format'
      }, { status: 400 })
    }

    // Create inquiry record in Airtable
    const airtableService = new AirtableService()
    
    const inquiryData = {
      'Name': body.name,
      'Email': body.email,
      'Phone': body.phone || '',
      'Message': body.message || '',
      'Trip ID': body.tripId,
      'Destination': body.destination,
      'Start Date': body.startDate,
      'End Date': body.endDate,
      'Guests': body.guests,
      'Cabins Required': body.cabinsRequired,
      'Total EUR': body.totalEur,
      'Price Per Person': body.pricePerPerson,
      'Status': 'inquiry',
      'Type': 'inquiry',
      'Source': 'website_booking'
    }

    const inquiryRecord = await airtableService.createRecord('Bookings', inquiryData)
    
    if (!inquiryRecord) {
      throw new Error('Failed to create inquiry record')
    }

    // Send confirmation email to user
    await sendInquiryConfirmationEmail({
      name: body.name,
      email: body.email,
      tripId: body.tripId,
      destination: body.destination,
      startDate: body.startDate,
      endDate: body.endDate,
      guests: body.guests,
      cabinsRequired: body.cabinsRequired,
      totalEur: body.totalEur
    })

    // Send internal notification
    await sendInternalInquiryNotification({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      tripId: body.tripId,
      destination: body.destination,
      startDate: body.startDate,
      endDate: body.endDate,
      guests: body.guests,
      cabinsRequired: body.cabinsRequired,
      totalEur: body.totalEur,
      inquiryId: inquiryRecord.id
    })

    console.log(`[Inquiry API] Created inquiry for ${body.name} (${body.email}) - Trip: ${body.tripId}`)

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully! We\'ll confirm availability shortly.',
      inquiryId: inquiryRecord.id
    })

  } catch (error) {
    console.error('[Inquiry API] Error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to submit inquiry. Please try again or contact us directly.'
    }, { status: 500 })
  }
}

async function sendInquiryConfirmationEmail(data: {
  name: string
  email: string
  tripId: string
  destination: string
  startDate: string
  endDate: string
  guests: number
  cabinsRequired: number
  totalEur: number
}) {
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const subject = `Inquiry Confirmation - ${data.destination} Trip`
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">Thank you for your inquiry!</h2>
        
        <p>Hi ${data.name},</p>
        
        <p>We've received your inquiry for our <strong>${data.destination}</strong> kitesurfing trip and will confirm availability shortly.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e40af;">Trip Details</h3>
          <p><strong>Trip ID:</strong> ${data.tripId}</p>
          <p><strong>Destination:</strong> ${data.destination}</p>
          <p><strong>Dates:</strong> ${new Date(data.startDate).toLocaleDateString()} - ${new Date(data.endDate).toLocaleDateString()}</p>
          <p><strong>Guests:</strong> ${data.guests}</p>
          <p><strong>Cabins:</strong> ${data.cabinsRequired}</p>
          <p><strong>Total:</strong> €${data.totalEur.toLocaleString()}</p>
        </div>
        
        <p>We'll get back to you within 24 hours to confirm availability and next steps.</p>
        
        <p>If you have any questions, just reply to this email.</p>
        
        <p>Best regards,<br>The KiteSafaris Team</p>
      </div>
    `

    await resend.emails.send({
      from: 'KiteSafaris <noreply@kitesafaris.com>',
      to: [data.email],
      subject,
      html
    })

    console.log(`[Email] Sent inquiry confirmation to ${data.email}`)
  } catch (error) {
    console.error('[Email] Failed to send inquiry confirmation:', error)
  }
}

async function sendInternalInquiryNotification(data: {
  name: string
  email: string
  phone?: string
  message?: string
  tripId: string
  destination: string
  startDate: string
  endDate: string
  guests: number
  cabinsRequired: number
  totalEur: number
  inquiryId: string
}) {
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const subject = `New Inquiry - ${data.destination} Trip (${data.guests} guests)`
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">New Booking Inquiry</h2>
        
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #dc2626;">Contact Details</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
        </div>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e40af;">Trip Details</h3>
          <p><strong>Trip ID:</strong> ${data.tripId}</p>
          <p><strong>Destination:</strong> ${data.destination}</p>
          <p><strong>Dates:</strong> ${new Date(data.startDate).toLocaleDateString()} - ${new Date(data.endDate).toLocaleDateString()}</p>
          <p><strong>Guests:</strong> ${data.guests}</p>
          <p><strong>Cabins Required:</strong> ${data.cabinsRequired}</p>
          <p><strong>Total:</strong> €${data.totalEur.toLocaleString()}</p>
          <p><strong>Inquiry ID:</strong> ${data.inquiryId}</p>
        </div>
        
        <p><strong>Action Required:</strong> Please confirm availability and follow up with the customer within 24 hours.</p>
      </div>
    `

    // Send to internal email (you can configure this)
    const internalEmail = process.env.INTERNAL_NOTIFICATION_EMAIL || 'info@kitesafaris.com'
    
    await resend.emails.send({
      from: 'KiteSafaris <noreply@kitesafaris.com>',
      to: [internalEmail],
      subject,
      html
    })

    console.log(`[Email] Sent internal inquiry notification to ${internalEmail}`)
  } catch (error) {
    console.error('[Email] Failed to send internal notification:', error)
  }
}
