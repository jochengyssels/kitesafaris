import { Navigation } from "@/components/navigation"
import { SitemapManager } from "@/components/sitemap-manager"

export default function SitemapAdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-turquoise-50 to-sand-beige-100">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <SitemapManager />
      </main>
    </div>
  )
}
