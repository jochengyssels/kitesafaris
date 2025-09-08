import type { Metadata } from "next"
import { AdvancedDashboard } from "@/components/advanced-dashboard"

export const metadata: Metadata = {
  title: "Advanced Analytics Dashboard - KiteSafaris Admin",
  description: "Comprehensive analytics and business metrics dashboard for KiteSafaris",
  robots: "noindex, nofollow",
}

export default function AnalyticsPage() {
  return <AdvancedDashboard />
}
