interface SEOMetrics {
  organicTraffic: number
  averagePosition: number
  clickThroughRate: number
  impressions: number
  totalKeywords: number
  topKeywords: KeywordMetric[]
}

interface KeywordMetric {
  keyword: string
  position: number
  previousPosition: number
  searchVolume: number
  clicks: number
  impressions: number
  ctr: number
  trend: "up" | "down" | "stable"
}

interface OptimizationImpact {
  changeId: string
  page: string
  changeType: string
  appliedAt: string
  beforeMetrics: {
    traffic: number
    position: number
    ctr: number
  }
  afterMetrics: {
    traffic: number
    position: number
    ctr: number
  }
  impact: {
    trafficChange: number
    positionChange: number
    ctrChange: number
  }
}

class AnalyticsService {
  private baseUrl = "/api/seo-agent"

  async getSEOMetrics(dateRange = "30d"): Promise<SEOMetrics> {
    try {
      const response = await fetch(`${this.baseUrl}/metrics?range=${dateRange}`)
      if (!response.ok) {
        throw new Error("Failed to fetch SEO metrics")
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching SEO metrics:", error)
      // Return mock data for development
      return this.getMockMetrics()
    }
  }

  async getKeywordPerformance(keywords: string[]): Promise<KeywordMetric[]> {
    try {
      const response = await fetch(`${this.baseUrl}/keywords`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keywords }),
      })
      if (!response.ok) {
        throw new Error("Failed to fetch keyword performance")
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching keyword performance:", error)
      return this.getMockKeywords()
    }
  }

  async getOptimizationImpact(changeIds: string[]): Promise<OptimizationImpact[]> {
    try {
      const response = await fetch(`${this.baseUrl}/impact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ changeIds }),
      })
      if (!response.ok) {
        throw new Error("Failed to fetch optimization impact")
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching optimization impact:", error)
      return this.getMockImpact()
    }
  }

  async trackOptimizationEvent(event: {
    type: "optimization_applied" | "optimization_rolled_back" | "manual_change"
    changeId: string
    page: string
    description: string
    metadata?: Record<string, any>
  }): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...event,
          timestamp: new Date().toISOString(),
        }),
      })
    } catch (error) {
      console.error("Error tracking optimization event:", error)
    }
  }

  async generateSEOReport(options: {
    dateRange: string
    includeKeywords: boolean
    includeOptimizations: boolean
    format: "json" | "csv" | "pdf"
  }): Promise<Blob | object> {
    try {
      const response = await fetch(`${this.baseUrl}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      })
      if (!response.ok) {
        throw new Error("Failed to generate SEO report")
      }

      if (options.format === "json") {
        return await response.json()
      } else {
        return await response.blob()
      }
    } catch (error) {
      console.error("Error generating SEO report:", error)
      throw error
    }
  }

  private getMockMetrics(): SEOMetrics {
    return {
      organicTraffic: 12847,
      averagePosition: 8.2,
      clickThroughRate: 4.8,
      impressions: 267432,
      totalKeywords: 156,
      topKeywords: this.getMockKeywords(),
    }
  }

  private getMockKeywords(): KeywordMetric[] {
    return [
      {
        keyword: "caribbean kite safari",
        position: 3,
        previousPosition: 7,
        searchVolume: 2400,
        clicks: 1247,
        impressions: 8934,
        ctr: 13.9,
        trend: "up",
      },
      {
        keyword: "antigua kiteboarding",
        position: 5,
        previousPosition: 8,
        searchVolume: 1800,
        clicks: 892,
        impressions: 6721,
        ctr: 13.3,
        trend: "up",
      },
      {
        keyword: "luxury catamaran kite trip",
        position: 2,
        previousPosition: 2,
        searchVolume: 890,
        clicks: 567,
        impressions: 3245,
        ctr: 17.5,
        trend: "stable",
      },
      {
        keyword: "caribbean kitesurfing vacation",
        position: 6,
        previousPosition: 12,
        searchVolume: 1200,
        clicks: 423,
        impressions: 4892,
        ctr: 8.6,
        trend: "up",
      },
      {
        keyword: "antigua kite safari booking",
        position: 4,
        previousPosition: 9,
        searchVolume: 650,
        clicks: 312,
        impressions: 2876,
        ctr: 10.8,
        trend: "up",
      },
    ]
  }

  private getMockImpact(): OptimizationImpact[] {
    return [
      {
        changeId: "change_001",
        page: "/destinations/antigua",
        changeType: "meta_title",
        appliedAt: "2024-01-15T10:30:00Z",
        beforeMetrics: {
          traffic: 1200,
          position: 7.2,
          ctr: 3.8,
        },
        afterMetrics: {
          traffic: 1380,
          position: 5.1,
          ctr: 4.4,
        },
        impact: {
          trafficChange: 15.0,
          positionChange: -2.1,
          ctrChange: 0.6,
        },
      },
      {
        changeId: "change_002",
        page: "/packages",
        changeType: "structured_data",
        appliedAt: "2024-01-14T14:20:00Z",
        beforeMetrics: {
          traffic: 890,
          position: 6.8,
          ctr: 4.1,
        },
        afterMetrics: {
          traffic: 967,
          position: 6.2,
          ctr: 4.5,
        },
        impact: {
          trafficChange: 8.7,
          positionChange: -0.6,
          ctrChange: 0.4,
        },
      },
    ]
  }

  // Utility methods for data processing
  calculateTrendPercentage(current: number, previous: number): number {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  formatMetricChange(change: number, isPosition = false): string {
    const prefix = change > 0 ? "+" : ""
    const suffix = isPosition ? "" : "%"
    return `${prefix}${change.toFixed(1)}${suffix}`
  }

  getPerformanceTrend(change: number, isPosition = false): "up" | "down" | "stable" {
    const threshold = 0.1
    if (isPosition) {
      // For position, lower is better
      if (change < -threshold) return "up"
      if (change > threshold) return "down"
    } else {
      // For other metrics, higher is better
      if (change > threshold) return "up"
      if (change < -threshold) return "down"
    }
    return "stable"
  }

  async exportMetricsToCSV(metrics: SEOMetrics): Promise<string> {
    const headers = [
      "Keyword",
      "Position",
      "Previous Position",
      "Change",
      "Clicks",
      "Impressions",
      "CTR",
      "Search Volume",
    ]
    const rows = metrics.topKeywords.map((keyword) => [
      keyword.keyword || "",
      (keyword.position ?? 0).toString(),
      (keyword.previousPosition ?? 0).toString(),
      ((keyword.previousPosition ?? 0) - (keyword.position ?? 0)).toString(),
      (keyword.clicks ?? 0).toString(),
      (keyword.impressions ?? 0).toString(),
      (keyword.ctr ?? 0).toString(),
      (keyword.searchVolume ?? 0).toString(),
    ])

    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    return csvContent
  }
}

export const analyticsService = new AnalyticsService()
export type { SEOMetrics, KeywordMetric, OptimizationImpact }
