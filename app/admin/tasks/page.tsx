import type { Metadata } from "next"
import { TasksManager } from "@/components/tasks-manager"

export const metadata: Metadata = {
  title: "Tasks Management - KiteSafaris Admin",
  description: "Manage and track project tasks and assignments",
  robots: "noindex, nofollow",
}

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-sand-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-montserrat font-bold text-3xl text-navy-900 mb-2">Tasks Management</h1>
          <p className="font-open-sans text-gray-600">
            Manage and track project tasks, assignments, and progress from Airtable.
          </p>
        </div>
        
        <TasksManager />
      </div>
    </div>
  )
}
