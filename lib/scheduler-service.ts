export interface ScheduledTask {
  id: string
  name: string
  description: string
  schedule: string // Cron expression
  enabled: boolean
  lastRun?: Date
  nextRun?: Date
  status: "idle" | "running" | "completed" | "failed"
  result?: any
  error?: string
  createdAt: Date
  updatedAt: Date
}

export interface AutomationRule {
  id: string
  name: string
  description: string
  enabled: boolean
  conditions: AutomationCondition[]
  actions: AutomationAction[]
  createdAt: Date
  updatedAt: Date
}

export interface AutomationCondition {
  type: "impact" | "changeType" | "pageType" | "confidence"
  operator: "equals" | "contains" | "greaterThan" | "lessThan"
  value: string | number
}

export interface AutomationAction {
  type: "approve" | "reject" | "notify" | "queue"
  parameters?: Record<string, any>
}

export interface NotificationSettings {
  email: boolean
  emailAddress?: string
  webhook: boolean
  webhookUrl?: string
  inApp: boolean
  slack: boolean
  slackWebhook?: string
}

export class SchedulerService {
  private tasks: Map<string, ScheduledTask> = new Map()
  private automationRules: Map<string, AutomationRule> = new Map()
  private intervals: Map<string, NodeJS.Timeout> = new Map()
  private notificationSettings: NotificationSettings = {
    email: false,
    webhook: false,
    inApp: true,
    slack: false,
  }

  constructor() {
    this.initializeDefaultTasks()
    this.initializeDefaultRules()
  }

  private initializeDefaultTasks(): void {
    // Weekly SEO audit
    this.addTask({
      name: "Weekly SEO Audit",
      description: "Comprehensive SEO analysis of all pages focusing on Caribbean kite safari keywords",
      schedule: "0 2 * * 1", // Every Monday at 2 AM
      enabled: true,
    })

    // Daily keyword monitoring
    this.addTask({
      name: "Daily Keyword Monitoring",
      description: "Monitor keyword rankings for Antigua kite safari terms",
      schedule: "0 6 * * *", // Every day at 6 AM
      enabled: false,
    })

    // Monthly performance report
    this.addTask({
      name: "Monthly Performance Report",
      description: "Generate comprehensive SEO performance report",
      schedule: "0 9 1 * *", // First day of month at 9 AM
      enabled: true,
    })
  }

  private initializeDefaultRules(): void {
    // Auto-approve low impact changes
    this.addAutomationRule({
      name: "Auto-approve Low Impact Changes",
      description: "Automatically approve changes with low impact and high confidence",
      enabled: false, // Disabled by default for safety
      conditions: [
        { type: "impact", operator: "equals", value: "low" },
        { type: "confidence", operator: "greaterThan", value: 0.8 },
      ],
      actions: [{ type: "approve" }],
    })

    // Notify on high impact changes
    this.addAutomationRule({
      name: "Notify High Impact Changes",
      description: "Send notifications for high impact changes requiring review",
      enabled: true,
      conditions: [{ type: "impact", operator: "equals", value: "high" }],
      actions: [{ type: "notify", parameters: { priority: "high" } }],
    })

    // Auto-queue meta tag optimizations
    this.addAutomationRule({
      name: "Queue Meta Tag Optimizations",
      description: "Automatically queue meta tag changes for batch processing",
      enabled: true,
      conditions: [{ type: "changeType", operator: "equals", value: "meta" }],
      actions: [{ type: "queue", parameters: { priority: 2 } }],
    })
  }

  addTask(taskData: Omit<ScheduledTask, "id" | "createdAt" | "updatedAt" | "status">): string {
    const task: ScheduledTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: "idle",
      createdAt: new Date(),
      updatedAt: new Date(),
      ...taskData,
    }

    // Calculate next run time
    task.nextRun = this.calculateNextRun(task.schedule)

    this.tasks.set(task.id, task)

    if (task.enabled) {
      this.scheduleTask(task)
    }

    return task.id
  }

  updateTask(taskId: string, updates: Partial<ScheduledTask>): boolean {
    const task = this.tasks.get(taskId)
    if (!task) return false

    // Clear existing schedule
    this.unscheduleTask(taskId)

    // Update task
    Object.assign(task, updates, { updatedAt: new Date() })

    // Recalculate next run if schedule changed
    if (updates.schedule) {
      task.nextRun = this.calculateNextRun(task.schedule)
    }

    // Reschedule if enabled
    if (task.enabled) {
      this.scheduleTask(task)
    }

    return true
  }

  deleteTask(taskId: string): boolean {
    const task = this.tasks.get(taskId)
    if (!task) return false

    this.unscheduleTask(taskId)
    this.tasks.delete(taskId)
    return true
  }

  enableTask(taskId: string): boolean {
    const task = this.tasks.get(taskId)
    if (!task) return false

    task.enabled = true
    task.updatedAt = new Date()
    this.scheduleTask(task)
    return true
  }

  disableTask(taskId: string): boolean {
    const task = this.tasks.get(taskId)
    if (!task) return false

    task.enabled = false
    task.updatedAt = new Date()
    this.unscheduleTask(taskId)
    return true
  }

  private scheduleTask(task: ScheduledTask): void {
    const nextRun = task.nextRun
    if (!nextRun) return

    const delay = nextRun.getTime() - Date.now()
    if (delay <= 0) {
      // Should run immediately
      this.executeTask(task)
      return
    }

    const timeout = setTimeout(() => {
      this.executeTask(task)
    }, delay)

    this.intervals.set(task.id, timeout)
  }

  private unscheduleTask(taskId: string): void {
    const interval = this.intervals.get(taskId)
    if (interval) {
      clearTimeout(interval)
      this.intervals.delete(taskId)
    }
  }

  private async executeTask(task: ScheduledTask): Promise<void> {
    console.log(`Executing scheduled task: ${task.name}`)

    task.status = "running"
    task.lastRun = new Date()
    task.updatedAt = new Date()

    try {
      let result: any

      switch (task.name) {
        case "Weekly SEO Audit":
          result = await this.executeWeeklySEOAudit()
          break
        case "Daily Keyword Monitoring":
          result = await this.executeDailyKeywordMonitoring()
          break
        case "Monthly Performance Report":
          result = await this.executeMonthlyReport()
          break
        default:
          throw new Error(`Unknown task type: ${task.name}`)
      }

      task.status = "completed"
      task.result = result
      task.error = undefined

      // Send success notification
      await this.sendNotification({
        type: "task_completed",
        taskName: task.name,
        result,
      })
    } catch (error) {
      task.status = "failed"
      task.error = error instanceof Error ? error.message : "Unknown error"

      // Send error notification
      await this.sendNotification({
        type: "task_failed",
        taskName: task.name,
        error: task.error,
      })
    }

    // Schedule next run
    task.nextRun = this.calculateNextRun(task.schedule)
    if (task.enabled && task.nextRun) {
      this.scheduleTask(task)
    }
  }

  private async executeWeeklySEOAudit(): Promise<any> {
    // Import and use SEO analysis engine
    const { seoEngine } = await import("./seo-analysis-engine")
    const { seoOptimizationService } = await import("./seo-optimization-service")

    // Analyze all pages
    const urls = [
      "/",
      "/destinations",
      "/destinations/antigua",
      "/packages",
      "/booking",
      "/contact",
      "/why-us",
      "/faq",
      "/reviews",
      "/gallery",
      "/guides",
    ]

    const analysisResults = await seoEngine.analyzeSite(urls)

    // Generate optimization changes
    const changes = seoOptimizationService.generateOptimizationChanges(analysisResults)

    // Apply automation rules
    await this.applyAutomationRules(changes)

    return {
      pagesAnalyzed: analysisResults.length,
      changesGenerated: changes.length,
      averageScore: analysisResults.reduce((sum, r) => sum + r.score, 0) / analysisResults.length,
      timestamp: new Date(),
    }
  }

  private async executeDailyKeywordMonitoring(): Promise<any> {
    // Simulate keyword monitoring
    const keywords = [
      "caribbean kite safari",
      "antigua kiteboarding",
      "catamaran kite safari",
      "luxury kite safari antigua",
    ]

    const rankings = keywords.map((keyword) => ({
      keyword,
      position: Math.floor(Math.random() * 20) + 1,
      change: Math.floor(Math.random() * 6) - 3, // -3 to +3
      searchVolume: Math.floor(Math.random() * 1000) + 100,
    }))

    return {
      keywords: rankings,
      averagePosition: rankings.reduce((sum, r) => sum + r.position, 0) / rankings.length,
      timestamp: new Date(),
    }
  }

  private async executeMonthlyReport(): Promise<any> {
    // Generate comprehensive monthly report
    return {
      period: "monthly",
      optimizationsApplied: Math.floor(Math.random() * 50) + 20,
      averageScoreImprovement: Math.floor(Math.random() * 15) + 5,
      keywordImprovements: Math.floor(Math.random() * 10) + 3,
      trafficIncrease: Math.floor(Math.random() * 25) + 5,
      timestamp: new Date(),
    }
  }

  addAutomationRule(ruleData: Omit<AutomationRule, "id" | "createdAt" | "updatedAt">): string {
    const rule: AutomationRule = {
      id: `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...ruleData,
    }

    this.automationRules.set(rule.id, rule)
    return rule.id
  }

  updateAutomationRule(ruleId: string, updates: Partial<AutomationRule>): boolean {
    const rule = this.automationRules.get(ruleId)
    if (!rule) return false

    Object.assign(rule, updates, { updatedAt: new Date() })
    return true
  }

  deleteAutomationRule(ruleId: string): boolean {
    return this.automationRules.delete(ruleId)
  }

  async applyAutomationRules(changes: any[]): Promise<void> {
    for (const change of changes) {
      for (const rule of this.automationRules.values()) {
        if (!rule.enabled) continue

        if (this.evaluateConditions(rule.conditions, change)) {
          await this.executeActions(rule.actions, change)
        }
      }
    }
  }

  private evaluateConditions(conditions: AutomationCondition[], change: any): boolean {
    return conditions.every((condition) => {
      const changeValue = this.getChangeValue(change, condition.type)

      switch (condition.operator) {
        case "equals":
          return changeValue === condition.value
        case "contains":
          return String(changeValue).includes(String(condition.value))
        case "greaterThan":
          return Number(changeValue) > Number(condition.value)
        case "lessThan":
          return Number(changeValue) < Number(condition.value)
        default:
          return false
      }
    })
  }

  private getChangeValue(change: any, type: string): any {
    switch (type) {
      case "impact":
        return change.impact
      case "changeType":
        return change.type
      case "pageType":
        return this.getPageType(change.page)
      case "confidence":
        return change.confidence || 0.5
      default:
        return null
    }
  }

  private getPageType(page: string): string {
    if (page === "/") return "home"
    if (page.includes("/destinations")) return "destination"
    if (page.includes("/packages")) return "package"
    if (page.includes("/booking")) return "booking"
    return "other"
  }

  private async executeActions(actions: AutomationAction[], change: any): Promise<void> {
    for (const action of actions) {
      switch (action.type) {
        case "approve":
          // Auto-approve the change
          change.status = "approved"
          console.log(`Auto-approved change: ${change.id}`)
          break

        case "reject":
          // Auto-reject the change
          change.status = "rejected"
          console.log(`Auto-rejected change: ${change.id}`)
          break

        case "notify":
          // Send notification
          await this.sendNotification({
            type: "automation_action",
            action: "notify",
            change,
            priority: action.parameters?.priority || "normal",
          })
          break

        case "queue":
          // Add to processing queue with priority
          const { optimizationQueue } = await import("./optimization-queue")
          optimizationQueue.addChange(change, action.parameters?.priority || 1)
          break
      }
    }
  }

  private calculateNextRun(schedule: string): Date | undefined {
    // Simple cron parser - in production, use a proper cron library
    try {
      const parts = schedule.split(" ")
      if (parts.length !== 5) return undefined

      const [minute, hour, dayOfMonth, month, dayOfWeek] = parts

      const now = new Date()
      const next = new Date(now)

      // Simple implementation for common patterns
      if (schedule === "0 2 * * 1") {
        // Weekly on Monday at 2 AM
        const daysUntilMonday = (1 + 7 - now.getDay()) % 7 || 7
        next.setDate(now.getDate() + daysUntilMonday)
        next.setHours(2, 0, 0, 0)
      } else if (schedule === "0 6 * * *") {
        // Daily at 6 AM
        next.setDate(now.getDate() + 1)
        next.setHours(6, 0, 0, 0)
      } else if (schedule === "0 9 1 * *") {
        // Monthly on 1st at 9 AM
        next.setMonth(now.getMonth() + 1, 1)
        next.setHours(9, 0, 0, 0)
      } else {
        // Default to next hour
        next.setHours(now.getHours() + 1, 0, 0, 0)
      }

      return next
    } catch (error) {
      console.error("Error parsing cron schedule:", error)
      return undefined
    }
  }

  private async sendNotification(notification: any): Promise<void> {
    console.log("Sending notification:", notification)

    if (this.notificationSettings.email && this.notificationSettings.emailAddress) {
      await this.sendEmailNotification(notification)
    }

    if (this.notificationSettings.webhook && this.notificationSettings.webhookUrl) {
      await this.sendWebhookNotification(notification)
    }

    if (this.notificationSettings.slack && this.notificationSettings.slackWebhook) {
      await this.sendSlackNotification(notification)
    }

    // In-app notifications are handled by the UI
  }

  private async sendEmailNotification(notification: any): Promise<void> {
    // Email implementation would go here
    console.log("Email notification sent:", notification)
  }

  private async sendWebhookNotification(notification: any): Promise<void> {
    try {
      await fetch(this.notificationSettings.webhookUrl!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notification),
      })
    } catch (error) {
      console.error("Webhook notification failed:", error)
    }
  }

  private async sendSlackNotification(notification: any): Promise<void> {
    try {
      const message = this.formatSlackMessage(notification)
      await fetch(this.notificationSettings.slackWebhook!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message }),
      })
    } catch (error) {
      console.error("Slack notification failed:", error)
    }
  }

  private formatSlackMessage(notification: any): string {
    switch (notification.type) {
      case "task_completed":
        return `✅ SEO Task Completed: ${notification.taskName}`
      case "task_failed":
        return `❌ SEO Task Failed: ${notification.taskName} - ${notification.error}`
      case "automation_action":
        return `🤖 Automation Action: ${notification.action} for change ${notification.change.id}`
      default:
        return `📊 SEO Agent Notification: ${JSON.stringify(notification)}`
    }
  }

  getTasks(): ScheduledTask[] {
    return Array.from(this.tasks.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  getTask(taskId: string): ScheduledTask | undefined {
    return this.tasks.get(taskId)
  }

  getAutomationRules(): AutomationRule[] {
    return Array.from(this.automationRules.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  getAutomationRule(ruleId: string): AutomationRule | undefined {
    return this.automationRules.get(ruleId)
  }

  updateNotificationSettings(settings: Partial<NotificationSettings>): void {
    Object.assign(this.notificationSettings, settings)
  }

  getNotificationSettings(): NotificationSettings {
    return { ...this.notificationSettings }
  }

  async runTaskNow(taskId: string): Promise<void> {
    const task = this.tasks.get(taskId)
    if (!task) throw new Error("Task not found")

    await this.executeTask(task)
  }

  getTaskHistory(taskId: string, limit = 10): any[] {
    // In a real implementation, this would fetch from a database
    // For now, return mock history
    return Array.from({ length: Math.min(limit, 5) }, (_, i) => ({
      id: `history-${i}`,
      taskId,
      executedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      status: Math.random() > 0.1 ? "completed" : "failed",
      duration: Math.floor(Math.random() * 300) + 30,
      result: { processed: Math.floor(Math.random() * 100) + 10 },
    }))
  }
}

export const schedulerService = new SchedulerService()
