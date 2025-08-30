import type { SEOAnalysisResult } from "./seo-analysis-engine"
import { optimizationQueue } from "./optimization-queue"
import { fileModificationService } from "./file-modification-service"

export interface OptimizationChange {
  id: string
  type: "meta" | "content" | "image" | "schema" | "link"
  page: string
  description: string
  before: string
  after: string
  status: "pending" | "approved" | "rejected" | "applied"
  impact: "high" | "medium" | "low"
  element?: string
  xpath?: string
}

export interface OptimizationReport {
  totalPages: number
  pagesOptimized: number
  issuesFixed: number
  opportunitiesImplemented: number
  averageScoreImprovement: number
  changes: OptimizationChange[]
  summary: string
  queueStats: any
  processingTime: number
  errors: string[]
}

export class SEOOptimizationService {
  private changes: OptimizationChange[] = []
  private changeIdCounter = 1

  generateOptimizationChanges(analysisResults: SEOAnalysisResult[]): OptimizationChange[] {
    const changes: OptimizationChange[] = []

    analysisResults.forEach((result) => {
      // Generate meta tag optimizations
      if (result.currentMeta.title !== result.recommendedMeta.title) {
        changes.push(
          this.createChange({
            type: "meta",
            page: result.url,
            description: "Optimize page title for Caribbean kite safari keywords",
            before: result.currentMeta.title || "No title",
            after: result.recommendedMeta.title || "",
            impact: "high",
            element: "title",
          }),
        )
      }

      if (result.currentMeta.description !== result.recommendedMeta.description) {
        changes.push(
          this.createChange({
            type: "meta",
            page: result.url,
            description: "Optimize meta description for Antigua booking conversions",
            before: result.currentMeta.description || "No description",
            after: result.recommendedMeta.description || "",
            impact: "high",
            element: 'meta[name="description"]',
          }),
        )
      }

      // Generate image optimizations
      result.images.forEach((image, index) => {
        if (!image.optimized && image.recommendations.length > 0) {
          const optimizedAlt = this.generateOptimizedAltText(image.src, image.alt)
          changes.push(
            this.createChange({
              type: "image",
              page: result.url,
              description: `Optimize alt text for image: ${image.src}`,
              before: image.alt || "No alt text",
              after: optimizedAlt,
              impact: "medium",
              element: `img[src="${image.src}"]`,
            }),
          )
        }
      })

      // Generate schema markup additions
      result.structuredData.recommendations.forEach((recommendation) => {
        changes.push(
          this.createChange({
            type: "schema",
            page: result.url,
            description: `Add ${recommendation.type} structured data`,
            before: "No structured data",
            after: JSON.stringify(recommendation.schema, null, 2),
            impact: recommendation.priority === "high" ? "high" : "medium",
            element: "head",
          }),
        )
      })

      // Generate content optimizations based on opportunities
      result.opportunities.forEach((opportunity) => {
        if (opportunity.type === "keyword") {
          changes.push(
            this.createChange({
              type: "content",
              page: result.url,
              description: opportunity.title,
              before: "Current content without target keywords",
              after: opportunity.recommendation,
              impact: opportunity.potentialImpact > 80 ? "high" : "medium",
            }),
          )
        }
      })

      // Generate link optimizations
      result.internalLinks.forEach((link) => {
        if (!link.optimized && link.recommendations.length > 0) {
          const optimizedText = this.generateOptimizedLinkText(link.href, link.text)
          changes.push(
            this.createChange({
              type: "link",
              page: result.url,
              description: `Optimize anchor text for link: ${link.href}`,
              before: link.text,
              after: optimizedText,
              impact: "low",
              element: `a[href="${link.href}"]`,
            }),
          )
        }
      })
    })

    this.changes = changes
    return changes
  }

  private createChange(params: Omit<OptimizationChange, "id" | "status">): OptimizationChange {
    return {
      id: `change-${this.changeIdCounter++}`,
      status: "pending",
      ...params,
    }
  }

  private generateOptimizedAltText(src: string, currentAlt: string): string {
    const filename = src.split("/").pop()?.split(".")[0] || ""

    // Map common image types to optimized alt text
    if (src.includes("catamaran") || filename.includes("catamaran")) {
      return "Luxury catamaran for Caribbean kite safari adventures in Antigua"
    }
    if (src.includes("kite") || filename.includes("kite")) {
      return "Professional kiteboarding instruction during Antigua kite safari trip"
    }
    if (src.includes("antigua") || filename.includes("antigua")) {
      return "Crystal clear waters of Antigua perfect for Caribbean kite safari adventures"
    }
    if (src.includes("hero") || filename.includes("hero")) {
      return "Caribbean kite safari Antigua - luxury catamaran kiteboarding adventures"
    }

    // Enhance existing alt text with keywords
    if (currentAlt && !this.containsKeywords(currentAlt)) {
      return `${currentAlt} - Caribbean kite safari Antigua`
    }

    return "Caribbean kite safari adventure in Antigua with luxury catamaran accommodation"
  }

  private generateOptimizedLinkText(href: string, currentText: string): string {
    if (href.includes("/destinations/antigua")) {
      return "Antigua Caribbean Kite Safari Destination"
    }
    if (href.includes("/packages")) {
      return "Antigua Kite Safari Packages & Pricing"
    }
    if (href.includes("/booking")) {
      return "Book Your Caribbean Kite Safari"
    }
    if (href.includes("/contact")) {
      return "Contact KiteSafaris for Antigua Trips"
    }

    // Enhance generic text
    if (["click here", "read more", "learn more"].includes(currentText.toLowerCase())) {
      return "Learn About Caribbean Kite Safaris"
    }

    return currentText.includes("kite") ? currentText : `${currentText} - Kite Safari`
  }

  private containsKeywords(text: string): boolean {
    const keywords = ["caribbean", "kite safari", "antigua", "kiteboarding", "catamaran"]
    const textLower = text.toLowerCase()
    return keywords.some((keyword) => textLower.includes(keyword))
  }

  approveChange(changeId: string): void {
    const change = this.changes.find((c) => c.id === changeId)
    if (change) {
      change.status = "approved"
    }
  }

  rejectChange(changeId: string): void {
    const change = this.changes.find((c) => c.id === changeId)
    if (change) {
      change.status = "rejected"
    }
  }

  async applyApprovedChanges(): Promise<OptimizationReport> {
    const startTime = Date.now()
    const approvedChanges = this.changes.filter((c) => c.status === "approved")
    const errors: string[] = []

    // Add changes to optimization queue
    const queueIds = optimizationQueue.addChanges(approvedChanges)

    // Wait for all changes to be processed
    await this.waitForQueueCompletion(queueIds)

    // Update change statuses based on queue results
    queueIds.forEach((queueId) => {
      const queueItem = optimizationQueue.getItemById(queueId)
      if (queueItem) {
        const change = this.changes.find((c) => c.id === queueItem.change.id)
        if (change) {
          if (queueItem.status === "completed") {
            change.status = "applied"
          } else if (queueItem.status === "failed") {
            errors.push(`Failed to apply ${change.description}: ${queueItem.error}`)
          }
        }
      }
    })

    const processingTime = Date.now() - startTime
    const appliedCount = this.changes.filter((c) => c.status === "applied").length

    const report: OptimizationReport = {
      totalPages: new Set(this.changes.map((c) => c.page)).size,
      pagesOptimized: new Set(this.changes.filter((c) => c.status === "applied").map((c) => c.page)).size,
      issuesFixed: this.changes.filter((c) => c.impact === "high" && c.status === "applied").length,
      opportunitiesImplemented: appliedCount,
      averageScoreImprovement: this.calculateScoreImprovement(),
      changes: this.changes,
      summary: this.generateSummary(appliedCount, approvedChanges.length),
      queueStats: optimizationQueue.getQueueStatus(),
      processingTime,
      errors,
    }

    return report
  }

  private async waitForQueueCompletion(queueIds: string[]): Promise<void> {
    return new Promise((resolve) => {
      const checkCompletion = () => {
        const allCompleted = queueIds.every((id) => {
          const item = optimizationQueue.getItemById(id)
          return item && (item.status === "completed" || item.status === "failed")
        })

        if (allCompleted) {
          resolve()
        } else {
          setTimeout(checkCompletion, 1000)
        }
      }

      checkCompletion()
    })
  }

  private calculateScoreImprovement(): number {
    // Simulate score improvement calculation based on applied changes
    const appliedChanges = this.changes.filter((c) => c.status === "applied")
    const highImpactChanges = appliedChanges.filter((c) => c.impact === "high").length
    const mediumImpactChanges = appliedChanges.filter((c) => c.impact === "medium").length
    const lowImpactChanges = appliedChanges.filter((c) => c.impact === "low").length

    return highImpactChanges * 5 + mediumImpactChanges * 3 + lowImpactChanges * 1
  }

  private generateSummary(appliedCount: number, totalApproved: number): string {
    return (
      `Successfully applied ${appliedCount} of ${totalApproved} approved optimizations. ` +
      `Focused on Caribbean kite safari keywords and Antigua booking conversions. ` +
      `Expected improvement in search rankings for target keywords within 2-4 weeks.`
    )
  }

  async rollbackChanges(changeIds: string[]): Promise<OptimizationReport> {
    const startTime = Date.now()
    const errors: string[] = []
    let rolledBackCount = 0

    for (const changeId of changeIds) {
      try {
        const results = await fileModificationService.rollbackChange(changeId)
        const successfulRollbacks = results.filter((r) => r.success)

        if (successfulRollbacks.length > 0) {
          // Update change status
          const change = this.changes.find((c) => c.id === changeId)
          if (change) {
            change.status = "pending" // Reset to pending after rollback
          }
          rolledBackCount++
        } else {
          errors.push(`Failed to rollback change ${changeId}`)
        }
      } catch (error) {
        errors.push(`Error rolling back change ${changeId}: ${error}`)
      }
    }

    const processingTime = Date.now() - startTime

    return {
      totalPages: new Set(this.changes.map((c) => c.page)).size,
      pagesOptimized: 0, // No pages optimized during rollback
      issuesFixed: 0,
      opportunitiesImplemented: -rolledBackCount, // Negative to indicate rollback
      averageScoreImprovement: -this.calculateScoreImprovement(),
      changes: this.changes,
      summary: `Rolled back ${rolledBackCount} changes successfully.`,
      queueStats: optimizationQueue.getQueueStatus(),
      processingTime,
      errors,
    }
  }

  getChangeHistory(): OptimizationChange[] {
    return this.changes
  }

  getQueueStatus() {
    return optimizationQueue.getQueueStatus()
  }

  getQueueItems() {
    return optimizationQueue.getQueueItems()
  }
}

export const seoOptimizationService = new SEOOptimizationService()
