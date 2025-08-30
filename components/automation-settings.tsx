"use client"

import { useState, useEffect } from "react"
import {
  Clock,
  Play,
  Settings,
  Plus,
  Edit3,
  Trash2,
  Bell,
  Mail,
  Webhook,
  MessageSquare,
  ToggleLeft as Toggle,
} from "lucide-react"
import type { ScheduledTask, AutomationRule, NotificationSettings } from "@/lib/scheduler-service"

interface AutomationSettingsProps {
  onClose: () => void
}

export function AutomationSettings({ onClose }: AutomationSettingsProps) {
  const [activeTab, setActiveTab] = useState<"tasks" | "rules" | "notifications">("tasks")
  const [tasks, setTasks] = useState<ScheduledTask[]>([])
  const [rules, setRules] = useState<AutomationRule[]>([])
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: false,
    webhook: false,
    inApp: true,
    slack: false,
  })
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showRuleForm, setShowRuleForm] = useState(false)
  const [editingTask, setEditingTask] = useState<ScheduledTask | null>(null)
  const [editingRule, setEditingRule] = useState<AutomationRule | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    // In a real implementation, this would fetch from the scheduler service
    setTasks([
      {
        id: "1",
        name: "Weekly SEO Audit",
        description: "Comprehensive SEO analysis of all pages focusing on Caribbean kite safari keywords",
        schedule: "0 2 * * 1",
        enabled: true,
        lastRun: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        nextRun: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: "completed",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "2",
        name: "Daily Keyword Monitoring",
        description: "Monitor keyword rankings for Antigua kite safari terms",
        schedule: "0 6 * * *",
        enabled: false,
        status: "idle",
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      },
    ])

    setRules([
      {
        id: "1",
        name: "Auto-approve Low Impact Changes",
        description: "Automatically approve changes with low impact and high confidence",
        enabled: false,
        conditions: [
          { type: "impact", operator: "equals", value: "low" },
          { type: "confidence", operator: "greaterThan", value: 0.8 },
        ],
        actions: [{ type: "approve" }],
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      },
      {
        id: "2",
        name: "Notify High Impact Changes",
        description: "Send notifications for high impact changes requiring review",
        enabled: true,
        conditions: [{ type: "impact", operator: "equals", value: "high" }],
        actions: [{ type: "notify", parameters: { priority: "high" } }],
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
    ])
  }

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, enabled: !task.enabled } : task)))
  }

  const handleToggleRule = (ruleId: string) => {
    setRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const handleRunTaskNow = (taskId: string) => {
    // Implement immediate task execution
    console.log(`Running task ${taskId} now`)
  }

  const formatSchedule = (schedule: string): string => {
    const scheduleMap: Record<string, string> = {
      "0 2 * * 1": "Weekly (Mondays at 2:00 AM)",
      "0 6 * * *": "Daily (6:00 AM)",
      "0 9 1 * *": "Monthly (1st at 9:00 AM)",
    }
    return scheduleMap[schedule] || schedule
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50"
      case "running":
        return "text-turquoise-600 bg-turquoise-50"
      case "failed":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sand-beige-200">
          <div className="flex items-center space-x-3">
            <div className="bg-turquoise-500 p-2 rounded-lg">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-montserrat font-semibold text-xl text-navy-900">Automation Settings</h2>
              <p className="text-sm text-gray-600">Configure scheduled tasks and automation rules</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-600 hover:text-navy-900 transition-colors">
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-sand-beige-200">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "tasks"
                ? "border-turquoise-500 text-turquoise-600"
                : "border-transparent text-gray-600 hover:text-navy-900"
            }`}
          >
            <Clock className="h-4 w-4 inline mr-2" />
            Scheduled Tasks
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "rules"
                ? "border-turquoise-500 text-turquoise-600"
                : "border-transparent text-gray-600 hover:text-navy-900"
            }`}
          >
            <Toggle className="h-4 w-4 inline mr-2" />
            Automation Rules
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "notifications"
                ? "border-turquoise-500 text-turquoise-600"
                : "border-transparent text-gray-600 hover:text-navy-900"
            }`}
          >
            <Bell className="h-4 w-4 inline mr-2" />
            Notifications
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === "tasks" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-montserrat font-semibold text-lg text-navy-900">Scheduled Tasks</h3>
                <button
                  onClick={() => setShowTaskForm(true)}
                  className="flex items-center space-x-2 bg-coral-orange-500 text-white px-4 py-2 rounded hover:bg-coral-orange-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Task</span>
                </button>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-sand-beige-50 border border-sand-beige-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-navy-900">{task.name}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                          <button
                            onClick={() => handleToggleTask(task.id)}
                            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                              task.enabled
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {task.enabled ? "Enabled" : "Disabled"}
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Schedule: {formatSchedule(task.schedule)}</span>
                          {task.lastRun && <span>Last run: {task.lastRun.toLocaleDateString()}</span>}
                          {task.nextRun && <span>Next run: {task.nextRun.toLocaleDateString()}</span>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleRunTaskNow(task.id)}
                          className="p-2 text-turquoise-600 hover:bg-turquoise-50 rounded transition-colors"
                          title="Run now"
                        >
                          <Play className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setEditingTask(task)}
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                          title="Edit task"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete task"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "rules" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-montserrat font-semibold text-lg text-navy-900">Automation Rules</h3>
                <button
                  onClick={() => setShowRuleForm(true)}
                  className="flex items-center space-x-2 bg-coral-orange-500 text-white px-4 py-2 rounded hover:bg-coral-orange-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Rule</span>
                </button>
              </div>

              <div className="space-y-3">
                {rules.map((rule) => (
                  <div key={rule.id} className="bg-sand-beige-50 border border-sand-beige-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-navy-900">{rule.name}</h4>
                          <button
                            onClick={() => handleToggleRule(rule.id)}
                            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                              rule.enabled
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {rule.enabled ? "Enabled" : "Disabled"}
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{rule.description}</p>
                        <div className="text-xs text-gray-500">
                          <span>Conditions: {rule.conditions.length}</span>
                          <span className="mx-2">•</span>
                          <span>Actions: {rule.actions.length}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingRule(rule)}
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                          title="Edit rule"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete rule"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h3 className="font-montserrat font-semibold text-lg text-navy-900">Notification Settings</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email Notifications */}
                <div className="bg-sand-beige-50 border border-sand-beige-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Mail className="h-5 w-5 text-turquoise-600" />
                    <h4 className="font-medium text-navy-900">Email Notifications</h4>
                    <button
                      onClick={() => setNotifications((prev) => ({ ...prev, email: !prev.email }))}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        notifications.email ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {notifications.email ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                  {notifications.email && (
                    <input
                      type="email"
                      placeholder="admin@kitesafaris.com"
                      value={notifications.emailAddress || ""}
                      onChange={(e) => setNotifications((prev) => ({ ...prev, emailAddress: e.target.value }))}
                      className="w-full p-2 border border-sand-beige-300 rounded text-sm"
                    />
                  )}
                </div>

                {/* Webhook Notifications */}
                <div className="bg-sand-beige-50 border border-sand-beige-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Webhook className="h-5 w-5 text-turquoise-600" />
                    <h4 className="font-medium text-navy-900">Webhook Notifications</h4>
                    <button
                      onClick={() => setNotifications((prev) => ({ ...prev, webhook: !prev.webhook }))}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        notifications.webhook ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {notifications.webhook ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                  {notifications.webhook && (
                    <input
                      type="url"
                      placeholder="https://your-webhook-url.com/seo-notifications"
                      value={notifications.webhookUrl || ""}
                      onChange={(e) => setNotifications((prev) => ({ ...prev, webhookUrl: e.target.value }))}
                      className="w-full p-2 border border-sand-beige-300 rounded text-sm"
                    />
                  )}
                </div>

                {/* Slack Notifications */}
                <div className="bg-sand-beige-50 border border-sand-beige-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <MessageSquare className="h-5 w-5 text-turquoise-600" />
                    <h4 className="font-medium text-navy-900">Slack Notifications</h4>
                    <button
                      onClick={() => setNotifications((prev) => ({ ...prev, slack: !prev.slack }))}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        notifications.slack ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {notifications.slack ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                  {notifications.slack && (
                    <input
                      type="url"
                      placeholder="https://hooks.slack.com/services/..."
                      value={notifications.slackWebhook || ""}
                      onChange={(e) => setNotifications((prev) => ({ ...prev, slackWebhook: e.target.value }))}
                      className="w-full p-2 border border-sand-beige-300 rounded text-sm"
                    />
                  )}
                </div>

                {/* In-App Notifications */}
                <div className="bg-sand-beige-50 border border-sand-beige-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Bell className="h-5 w-5 text-turquoise-600" />
                    <h4 className="font-medium text-navy-900">In-App Notifications</h4>
                    <button
                      onClick={() => setNotifications((prev) => ({ ...prev, inApp: !prev.inApp }))}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        notifications.inApp ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {notifications.inApp ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Show notifications in the admin dashboard when tasks complete or automation rules trigger.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t border-sand-beige-200 bg-sand-beige-50">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-coral-orange-500 text-white rounded hover:bg-coral-orange-600 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
