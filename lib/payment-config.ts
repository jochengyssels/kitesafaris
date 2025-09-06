// Payment configuration for KiteSafaris
export const paymentConfig = {
  // Stripe configuration
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    secretKey: process.env.STRIPE_SECRET_KEY!,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
    currency: 'eur',
    paymentMethods: ['card', 'apple_pay', 'google_pay'],
  },
  
  // PayPal configuration
  paypal: {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET!,
    mode: process.env.PAYPAL_MODE || 'sandbox', // 'sandbox' or 'live'
    currency: 'EUR',
    intent: 'CAPTURE' as const, // 'CAPTURE' for immediate payment
  },
  
  // Payment options
  paymentMethods: [
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: '💳',
      popular: true,
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: '🔵',
      popular: false,
    },
  ],
  
  // Trust badges
  trustBadges: [
    { name: 'SSL Secured', icon: '🔒' },
    { name: 'PCI Compliant', icon: '🛡️' },
    { name: 'Stripe Powered', icon: '⚡' },
    { name: 'PayPal Verified', icon: '✓' },
  ],
  
  // Error messages
  errorMessages: {
    card_declined: 'Your card was declined. Please try another card.',
    insufficient_funds: 'Insufficient funds. Please try another card.',
    expired_card: 'Your card has expired. Please use a different card.',
    invalid_cvc: 'Your card\'s security code is incorrect.',
    processing_error: 'An error occurred while processing your card.',
    payment_failed: 'Payment failed. Please try again.',
    network_error: 'Network error. Please check your connection and try again.',
  },
}

// Payment intent configuration
export const createPaymentIntentConfig = (amount: number, metadata: any) => ({
  amount: Math.round(amount * 100), // Convert to cents
  currency: paymentConfig.stripe.currency,
  automatic_payment_methods: {
    enabled: true,
  },
  metadata,
  description: 'KiteSafaris Trip Booking',
  receipt_email: metadata.email,
})

// PayPal order configuration
export const createPayPalOrderConfig = (amount: number, metadata: any) => ({
  intent: paymentConfig.paypal.intent,
  purchase_units: [
    {
      amount: {
        currency_code: paymentConfig.paypal.currency,
        value: amount.toString(),
      },
      description: 'KiteSafaris Trip Booking',
      custom_id: metadata.bookingId,
      invoice_id: metadata.bookingId,
    },
  ],
  application_context: {
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/confirmation`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/payment`,
    brand_name: 'KiteSafaris',
    landing_page: 'BILLING' as const,
    user_action: 'PAY_NOW' as const,
    shipping_preference: 'NO_SHIPPING' as const,
  },
})
