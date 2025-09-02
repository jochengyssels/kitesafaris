import { NextRequest, NextResponse } from "next/server"
import { Resend } from 'resend'

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, subject, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("Resend API key not configured. Please set RESEND_API_KEY environment variable.")
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      )
    }

    // Prepare email content
    const emailContent = `
New Contact Form Submission from KiteSafaris.com

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || "Not provided"}
Subject: ${subject}

Message:
${message}

---
This message was sent from the contact form on kitesafaris.com
Timestamp: ${new Date().toISOString()}
    `.trim()

    // Prepare HTML version
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Form Submission</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #0f766e; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0f766e; }
        .message { background: #f8f9fa; padding: 15px; border-left: 4px solid #0f766e; margin: 15px 0; }
        .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>New Contact Form Submission</h1>
        <p>KiteSafaris.com</p>
    </div>
    
    <div class="content">
        <div class="field">
            <span class="label">Name:</span> ${firstName} ${lastName}
        </div>
        
        <div class="field">
            <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
        </div>
        
        <div class="field">
            <span class="label">Phone:</span> ${phone || "Not provided"}
        </div>
        
        <div class="field">
            <span class="label">Subject:</span> ${subject}
        </div>
        
        <div class="field">
            <span class="label">Message:</span>
            <div class="message">${message.replace(/\n/g, '<br>')}</div>
        </div>
    </div>
    
    <div class="footer">
        <p>This message was sent from the contact form on <a href="https://kitesafaris.com">kitesafaris.com</a></p>
        <p>Timestamp: ${new Date().toLocaleString()}</p>
    </div>
</body>
</html>
    `

    console.log("Attempting to send email via Resend...")

    // Send email using Resend
    // Send to both your verified email and info@kitesafaris.com
    // Note: info@kitesafaris.com will only work once you verify the domain in Resend
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Resend's default sender
      to: ['jochengyssels@gmail.com', 'info@kitesafaris.com'], // Both email addresses
      replyTo: email, // Set reply-to as the user's email
      subject: `New Contact Form: ${subject}`,
      text: emailContent,
      html: htmlContent,
    })

    if (error) {
      console.error("Resend API error:", error)
      return NextResponse.json(
        { success: false, error: `Failed to send email: ${error.message || 'Unknown error'}` },
        { status: 500 }
      )
    }

    console.log("Contact form email sent successfully via Resend:", data)

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully. We'll get back to you within 24 hours."
    })

  } catch (error) {
    console.error("Contact form submission error:", error)
    
    // Log the error details for debugging
    if (error instanceof Error) {
      console.error("Error details:", error.message)
      console.error("Error stack:", error.stack)
    }
    
    return NextResponse.json(
      { success: false, error: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
