import type { Metadata } from "next"
import { BlogCreatorDashboard } from "@/components/blog-creator-dashboard"

export const metadata: Metadata = {
  title: "Blog Creator - KiteSafaris Admin",
  description: "Create and manage blog posts for KiteSafaris.com",
  robots: "noindex, nofollow",
}

export default function BlogCreatorPage() {
  return (
    <div className="min-h-screen bg-sand-beige-50">
      <BlogCreatorDashboard />
    </div>
  )
}
