"use client"

import { useState, useEffect } from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Calendar,
  User,
  Tag,
  Clock,
  CheckCircle,
  AlertCircle,
  Circle,
  PlayCircle
} from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: string
  assignee: string
  dueDate: string | null
  createdDate: string | null
  lastModified: string | null
  tags: string[]
  progress: number
  category: string
  estimatedHours: number | null
  actualHours: number | null
  notes: string
  page: string[]
  rawFields: any
}

const STATUS_OPTIONS = ['Not Started', 'In Progress', 'Completed', 'On Hold', 'Cancelled']
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Urgent']
const CATEGORY_OPTIONS = ['Development', 'Design', 'Marketing', 'Content', 'Operations', 'Other']
const PAGE_OPTIONS = ['Booking']

export function TasksManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [saving, setSaving] = useState(false)

  // Form state for new/edit task
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Not Started",
    priority: "Medium",
    page: [] as string[]
  })

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch("/api/tasks")
      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }
      
      const data = await response.json()
      setTasks(data.tasks || [])
    } catch (err) {
      console.error("Error loading tasks:", err)
      setError(err instanceof Error ? err.message : "Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveTask = async () => {
    try {
      setSaving(true)
      
      // Only send fields that exist in Airtable
      const taskData = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        page: formData.page,
      }

      const url = editingTask ? "/api/tasks" : "/api/tasks"
      const method = editingTask ? "PUT" : "POST"
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingTask ? { id: editingTask.id, ...taskData } : taskData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save task")
      }

      await loadTasks()
      resetForm()
    } catch (err) {
      console.error("Error saving task:", err)
      setError(err instanceof Error ? err.message : "Failed to save task")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return
    }

    try {
      const response = await fetch(`/api/tasks?id=${taskId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete task")
      }

      await loadTasks()
    } catch (err) {
      console.error("Error deleting task:", err)
      setError(err instanceof Error ? err.message : "Failed to delete task")
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      page: task.page
    })
    setShowAddForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "Not Started",
      priority: "Medium",
      page: []
    })
    setEditingTask(null)
    setShowAddForm(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "In Progress":
        return <PlayCircle className="w-4 h-4 text-blue-500" />
      case "On Hold":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "Cancelled":
        return <X className="w-4 h-4 text-red-500" />
      default:
        return <Circle className="w-4 h-4 text-gray-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || task.status === statusFilter
    const matchesPriority = !priorityFilter || task.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-600">{error}</span>
          </div>
        </div>
      )}

      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Tasks ({filteredTasks.length})</h2>
          <p className="text-sm text-gray-600">Manage and track your project tasks</p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Statuses</option>
              {STATUS_OPTIONS.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Priorities</option>
              {PRIORITY_OPTIONS.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("")
                setPriorityFilter("")
              }}
              className="w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Task Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingTask ? "Edit Task" : "Add New Task"}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter task title"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter task description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {STATUS_OPTIONS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {PRIORITY_OPTIONS.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>


            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Pages</label>
              <div className="space-y-2">
                {PAGE_OPTIONS.map(pageOption => (
                  <label key={pageOption} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.page.includes(pageOption)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({ ...prev, page: [...prev.page, pageOption] }))
                        } else {
                          setFormData(prev => ({ ...prev, page: prev.page.filter(p => p !== pageOption) }))
                        }
                      }}
                      className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{pageOption}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={resetForm}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveTask}
              disabled={saving || !formData.title.trim()}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {editingTask ? "Update Task" : "Create Task"}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <CheckSquare className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600">
              {tasks.length === 0 
                ? "Get started by creating your first task." 
                : "Try adjusting your search or filter criteria."
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pages</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                        {task.description && (
                          <div className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</div>
                        )}
                        {task.category && (
                          <div className="text-xs text-indigo-600 mt-1">{task.category}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {getStatusIcon(task.status)}
                        <span className="ml-2 text-sm text-gray-900">{task.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {task.page && task.page.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {task.page.map((page, index) => (
                            <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              {page}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
