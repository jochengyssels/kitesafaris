import type { Metadata } from "next"
import Link from "next/link"
import {
  BarChart3,
  Settings,
  Users,
  FileText,
  Search,
  Calendar,
  Shield,
  Network,
  ShoppingBag,
  Menu,
  GitBranch,
  LogOut,
  Camera,
  CheckSquare,
  Image,
  Upload,
  Scan,
  BookOpen,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard - KiteSafaris.com",
  description: "Administrative dashboard for KiteSafaris.com management",
  robots: "noindex, nofollow",
}

export default function AdminDashboard() {
  const adminSections = [
    {
      title: "SEO Agent",
      description: "AI-powered SEO optimization and analysis",
      icon: Search,
      href: "/admin/seo-agent",
      color: "bg-turquoise-500",
    },
    {
      title: "Manage Trips",
      description: "Organize available trips and manage bookings",
      icon: Calendar,
      href: "/admin/trips",
      color: "bg-coral-orange-500",
    },
    {
      title: "Shop Management",
      description: "Manage merchandise store, products, and orders",
      icon: ShoppingBag,
      href: "/admin/shop",
      color: "bg-coral-orange-600",
    },
    {
      title: "Navigation Manager",
      description: "Control menu visibility, ordering, and structure",
      icon: Menu,
      href: "/admin/navigation",
      color: "bg-deep-navy-500",
    },
    {
      title: "API Management",
      description: "Monitor, test, and configure API integrations",
      icon: Network,
      href: "/admin/api-management",
      color: "bg-deep-navy-600",
    },
    {
      title: "Sitemap",
      description: "Manage and monitor complete site structure",
      icon: GitBranch,
      href: "/admin/sitemap",
      color: "bg-emerald-500",
    },
    {
      title: "Analytics",
      description: "Website performance and visitor insights",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "bg-gold-500",
    },
    {
      title: "Content",
      description: "Manage pages, blogs, and media content",
      icon: FileText,
      href: "/admin/content",
      color: "bg-navy-500",
    },
    {
      title: "Users",
      description: "Customer accounts and user management",
      icon: Users,
      href: "/admin/users",
      color: "bg-sand-beige-600",
    },
    {
      title: "Kite Counter",
      description: "AI-powered kite counting from live webcam feed",
      icon: Camera,
      href: "/admin/kite-counter",
      color: "bg-purple-500",
    },
    {
      title: "Tasks",
      description: "Manage and track project tasks and assignments",
      icon: CheckSquare,
      href: "/admin/tasks",
      color: "bg-indigo-500",
    },
    {
      title: "Gallery Config",
      description: "Configure and manage photo galleries and media",
      icon: Image,
      href: "/admin/gallery-config",
      color: "bg-purple-600",
    },
    {
      title: "Printful Scanner",
      description: "Scan Printful products for print file validation",
      icon: Scan,
      href: "/admin/printful-scanner",
      color: "bg-red-500",
    },
    {
      title: "Upload Photos",
      description: "Upload and manage photos for the website",
      icon: Upload,
      href: "/admin/upload-photos",
      color: "bg-green-500",
    },
    {
      title: "Blog Creator",
      description: "Create and manage blog posts with AI automation",
      icon: BookOpen,
      href: "/admin/blog-creator",
      color: "bg-indigo-600",
    },
    {
      title: "Settings",
      description: "System configuration and preferences",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-navy-600",
    },
  ]

  return (
    <div className="min-h-screen bg-sand-beige-50">
      <header className="bg-navy-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-turquoise-400" />
              <div>
                <h1 className="font-montserrat font-bold text-xl">KiteSafaris Admin</h1>
                <p className="text-sm text-gray-300">Administrative Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-turquoise-400 hover:text-turquoise-300 transition-colors">
                Back to Site
              </Link>
              <form action="/api/admin/logout" method="POST">
                <button
                  type="submit"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="font-montserrat font-bold text-3xl text-navy-900 mb-2">Welcome to Admin Dashboard</h2>
          <p className="font-open-sans text-gray-600 mb-6">
            Manage your KiteSafaris.com website and bookings from this central hub.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-sand-beige-200">
              <div className="text-2xl font-bold text-navy-900">12</div>
              <div className="text-sm text-gray-600">Active Bookings</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-sand-beige-200">
              <div className="text-2xl font-bold text-turquoise-600">85%</div>
              <div className="text-sm text-gray-600">SEO Score</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-sand-beige-200">
              <div className="text-2xl font-bold text-coral-orange-600">2.4k</div>
              <div className="text-sm text-gray-600">Monthly Visitors</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-sand-beige-200">
              <div className="text-2xl font-bold text-gold-600">€45k</div>
              <div className="text-sm text-gray-600">Monthly Revenue</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => {
            const IconComponent = section.icon
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group bg-white rounded-lg p-6 shadow-sm border border-sand-beige-200 hover:shadow-md transition-all duration-200 hover:border-turquoise-300"
              >
                <div className="flex items-start space-x-4">
                  <div className={`${section.color} p-3 rounded-lg group-hover:scale-105 transition-transform`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-montserrat font-semibold text-lg text-navy-900 mb-2">{section.title}</h3>
                    <p className="font-open-sans text-gray-600 text-sm">{section.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12">
          <h3 className="font-montserrat font-semibold text-xl text-navy-900 mb-4">Recent Activity</h3>
          <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200">
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-turquoise-500 rounded-full"></div>
                  <span className="text-gray-600">SEO Agent completed optimization - 15 pages updated</span>
                  <span className="text-gray-400">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-coral-orange-500 rounded-full"></div>
                  <span className="text-gray-600">New booking received for Antigua Feb 15-22, 2026</span>
                  <span className="text-gray-400">4 hours ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                  <span className="text-gray-600">Monthly analytics report generated</span>
                  <span className="text-gray-400">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
