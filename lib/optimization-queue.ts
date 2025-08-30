import type { OptimizationChange } from "./seo-optimization-service"
import { fileModificationService, type ModificationResult } from "./file-modification-service"

export interface QueueItem {
  id: string
  change: OptimizationChange
  priority: number
  status: "pending" | "processing" | "completed" | "failed"
  result?: ModificationResult
  error?: string
  createdAt: Date
  processedAt?: Date
}

export interface QueueStats {
  total: number
  pending: number
  processing: number
  completed: number
  failed: number
}

export class OptimizationQueue {
  private queue: QueueItem[] = []
  private processing = false
  private maxConcurrent = 3
  private currentlyProcessing = 0

  addChange(change: OptimizationChange, priority = 1): string {
    const queueItem: QueueItem = {
      id: `queue-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      change,
      priority,
      status: "pending",
      createdAt: new Date(),
    }

    // Insert based on priority (higher priority first)
    const insertIndex = this.queue.findIndex((item) => item.priority < priority)
    if (insertIndex === -1) {
      this.queue.push(queueItem)
    } else {
      this.queue.splice(insertIndex, 0, queueItem)
    }

    // Start processing if not already running
    if (!this.processing) {
      this.processQueue()
    }

    return queueItem.id
  }

  addChanges(changes: OptimizationChange[]): string[] {
    const queueIds: string[] = []

    changes.forEach((change) => {
      // Assign priority based on impact
      const priority = change.impact === "high" ? 3 : change.impact === "medium" ? 2 : 1
      const queueId = this.addChange(change, priority)
      queueIds.push(queueId)
    })

    return queueIds
  }

  private async processQueue(): Promise<void> {
    if (this.processing) return

    this.processing = true

    while (this.queue.some((item) => item.status === "pending") && this.currentlyProcessing < this.maxConcurrent) {
      const nextItem = this.queue.find((item) => item.status === "pending")
      if (!nextItem) break

      this.processItem(nextItem)
    }

    // Check if all items are processed
    if (!this.queue.some((item) => item.status === "pending" || item.status === "processing")) {
      this.processing = false
    }
  }

  private async processItem(item: QueueItem): Promise<void> {
    item.status = "processing"
    item.processedAt = new Date()
    this.currentlyProcessing++

    try {
      // Validate change before applying
      const validationResult = await this.validateChange(item.change)
      if (!validationResult.valid) {
        throw new Error(validationResult.error)
      }

      // Apply the change
      const result = await fileModificationService.applyChange(item.change)

      if (result.success) {
        item.status = "completed"
        item.result = result
      } else {
        item.status = "failed"
        item.error = result.error
      }
    } catch (error) {
      item.status = "failed"
      item.error = error instanceof Error ? error.message : "Unknown error"
    } finally {
      this.currentlyProcessing--

      // Continue processing queue
      setTimeout(() => this.processQueue(), 100)
    }
  }

  private async validateChange(change: OptimizationChange): Promise<{ valid: boolean; error?: string }> {
    try {
      // Validate change data
      if (!change.id || !change.type || !change.page) {
        return { valid: false, error: "Invalid change data" }
      }

      // Validate file exists
      const filePath = this.resolveFilePath(change.page)
      const fileExists = await this.fileExists(filePath)

      if (!fileExists) {
        return { valid: false, error: `File not found: ${filePath}` }
      }

      // Type-specific validation
      switch (change.type) {
        case "meta":
          return this.validateMetaChange(change)
        case "image":
          return this.validateImageChange(change)
        case "schema":
          return this.validateSchemaChange(change)
        case "content":
          return this.validateContentChange(change)
        case "link":
          return this.validateLinkChange(change)
        default:
          return { valid: false, error: `Unsupported change type: ${change.type}` }
      }
    } catch (error) {
      return { valid: false, error: error instanceof Error ? error.message : "Validation error" }
    }
  }

  private validateMetaChange(change: OptimizationChange): { valid: boolean; error?: string } {
    if (!change.after || change.after.trim().length === 0) {
      return { valid: false, error: "Meta content cannot be empty" }
    }

    if (change.element === "title" && change.after.length > 60) {
      return { valid: false, error: "Title too long (max 60 characters)" }
    }

    if (change.element?.includes("description") && change.after.length > 160) {
      return { valid: false, error: "Description too long (max 160 characters)" }
    }

    return { valid: true }
  }

  private validateImageChange(change: OptimizationChange): { valid: boolean; error?: string } {
    if (!change.after || change.after.trim().length === 0) {
      return { valid: false, error: "Alt text cannot be empty" }
    }

    if (change.after.length > 125) {
      return { valid: false, error: "Alt text too long (max 125 characters)" }
    }

    return { valid: true }
  }

  private validateSchemaChange(change: OptimizationChange): { valid: boolean; error?: string } {
    try {
      const schema = JSON.parse(change.after)

      if (!schema["@context"] || !schema["@type"]) {
        return { valid: false, error: "Invalid schema structure" }
      }

      return { valid: true }
    } catch (error) {
      return { valid: false, error: "Invalid JSON schema" }
    }
  }

  private validateContentChange(change: OptimizationChange): { valid: boolean; error?: string } {
    if (!change.after || change.after.trim().length === 0) {
      return { valid: false, error: "Content cannot be empty" }
    }

    return { valid: true }
  }

  private validateLinkChange(change: OptimizationChange): { valid: boolean; error?: string } {
    if (!change.after || change.after.trim().length === 0) {
      return { valid: false, error: "Link text cannot be empty" }
    }

    if (change.after.length > 100) {
      return { valid: false, error: "Link text too long (max 100 characters)" }
    }

    return { valid: true }
  }

  private resolveFilePath(pagePath: string): string {
    if (pagePath === "/") return "app/page.tsx"

    if (pagePath.includes("/destinations/")) {
      const slug = pagePath.split("/destinations/")[1]
      return slug && slug !== "" ? "app/destinations/[slug]/page.tsx" : "app/destinations/page.tsx"
    }

    const cleanPath = pagePath.startsWith("/") ? pagePath.slice(1) : pagePath
    return `app/${cleanPath}/page.tsx`
  }

  private async fileExists(filePath: string): Promise<boolean> {
    try {
      const fs = await import("fs/promises")
      await fs.access(filePath)
      return true
    } catch {
      return false
    }
  }

  getQueueStatus(): QueueStats {
    const stats: QueueStats = {
      total: this.queue.length,
      pending: 0,
      processing: 0,
      completed: 0,
      failed: 0,
    }

    this.queue.forEach((item) => {
      stats[item.status]++
    })

    return stats
  }

  getQueueItems(): QueueItem[] {
    return [...this.queue].sort((a, b) => b.priority - a.priority)
  }

  getItemById(id: string): QueueItem | undefined {
    return this.queue.find((item) => item.id === id)
  }

  removeItem(id: string): boolean {
    const index = this.queue.findIndex((item) => item.id === id)
    if (index !== -1) {
      this.queue.splice(index, 1)
      return true
    }
    return false
  }

  clearCompleted(): number {
    const completedCount = this.queue.filter((item) => item.status === "completed").length
    this.queue = this.queue.filter((item) => item.status !== "completed")
    return completedCount
  }

  clearFailed(): number {
    const failedCount = this.queue.filter((item) => item.status === "failed").length
    this.queue = this.queue.filter((item) => item.status !== "failed")
    return failedCount
  }

  pauseProcessing(): void {
    this.processing = false
  }

  resumeProcessing(): void {
    if (!this.processing) {
      this.processQueue()
    }
  }

  async retryFailed(): Promise<void> {
    const failedItems = this.queue.filter((item) => item.status === "failed")

    failedItems.forEach((item) => {
      item.status = "pending"
      item.error = undefined
      item.processedAt = undefined
    })

    if (failedItems.length > 0 && !this.processing) {
      this.processQueue()
    }
  }
}

export const optimizationQueue = new OptimizationQueue()
