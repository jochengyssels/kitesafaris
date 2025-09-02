import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

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

    // Check if email service is configured
    const smtpHost = process.env.SMTP_HOST
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("SMTP configuration missing. Please configure SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.")
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

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

    // Send email
    const mailOptions = {
      from: `"KiteSafaris Contact Form" <${smtpUser}>`,
      to: "info@kitesafaris.com",
      replyTo: email, // Set reply-to as the user's email
      subject: `New Contact Form: ${subject}`,
      text: emailContent,
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)

    console.log("Contact form email sent successfully to info@kitesafaris.com")

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully. We'll get back to you within 24 hours."
    })

  } catch (error) {
    console.error("Contact form submission error:", error)
    
    // Log the error details for debugging
    if (error instanceof Error) {
      console.error("Error details:", error.message)
    }
    
    return NextResponse.json(
      { success: false, error: "Failed to send email. Please try again later." },
      { status: 500 }
    )
  }
}
