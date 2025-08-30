import { Navigation } from "@/components/navigation"
import { NavigationManager } from "@/components/navigation-manager"

export default function NavigationAdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-turquoise-50 to-sand-beige-100">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <NavigationManager />
      </main>
    </div>
  )
}
