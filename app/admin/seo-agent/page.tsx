import type { Metadata } from "next"
import { SEOAgentDashboard } from "@/components/seo-agent-dashboard"

export const metadata: Metadata = {
  title: "SEO Agent - Admin Dashboard",
  description: "AI-powered SEO optimization and analysis for KiteSafaris.com",
  robots: "noindex, nofollow",
}

export default function SEOAgentPage() {
  return <SEOAgentDashboard />
}
