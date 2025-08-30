import { Navigation } from "@/components/navigation"
import { CheckoutPage } from "@/components/checkout-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout - KiteSafaris Gear",
  description: "Complete your KiteSafaris merchandise order with secure checkout and worldwide shipping.",
  robots: "noindex, nofollow",
}

export default function Checkout() {
  return (
    <>
      <Navigation />
      <main>
        <CheckoutPage />
      </main>
    </>
  )
}
