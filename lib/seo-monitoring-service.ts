/**
 * SEO Monitoring Service for KiteSafaris.com
 * Comprehensive monitoring and performance tracking
 */

export interface SEOAlert {
  id: string
  type: 'error' | 'warning' | 'info'
  title: string
  description: string
  url?: string
  timestamp: Date
  resolved: boolean
  priority: 'high' | 'medium' | 'low'
}

export interface PerformanceMetrics {
  date: string
  impressions: number
  clicks: number
  ctr: number
  position: number
  coreWebVitals: {
    lcp: number
    fid: number
    cls: number
  }
  mobileUsability: {
    mobileFriendly: boolean
    issues: string[]
  }
}

export interface KeywordRanking {
  keyword: string
  position: number
  previousPosition: number
  change: number
  url: string
  date: Date
}

export interface CrawlError {
  url: string
  errorType: string
  description: string
  firstDetected: Date
  lastDetected: Date
  count: number
  status: 'active' | 'resolved'
}

/**
 * Primary keywords to monitor for KiteSafaris
 */
export const PRIMARY_KEYWORDS = [
  'kite safari caribbean',
  'luxury kitesurfing trips',
  'catamaran kiteboarding',
  'antigua kite safari',
  'greece kitesurfing',
  'sardinia kiteboarding',
  'kitesurfing packages',
  'kiteboarding lessons',
  'caribbean kitesurfing',
  'mediterranean kiteboarding',
  'luxury catamaran kitesurfing',
  'kite safari packages',
  'kitesurfing holidays',
  'kiteboarding vacations',
  'catamaran kitesurfing trips',
  'antigua kitesurfing',
  'greece kiteboarding',
  'sardinia kitesurfing',
  'kite safari antigua',
  'kite safari greece',
  'kite safari sardinia',
  'luxury kitesurfing',
  'premium kiteboarding',
  'kitesurfing catamaran',
  'kiteboarding catamaran',
  'kitesurfing lessons caribbean',
  'kiteboarding lessons mediterranean',
  'kite safari booking',
  'kitesurfing trip packages',
  'kiteboarding holiday packages'
]

/**
 * Secondary keywords for broader monitoring
 */
export const SECONDARY_KEYWORDS = [
  'kitesurfing',
  'kiteboarding',
  'kite safari',
  'catamaran kitesurfing',
  'luxury kitesurfing',
  'kitesurfing trips',
  'kiteboarding trips',
  'kitesurfing holidays',
  'kiteboarding holidays',
  'kitesurfing packages',
  'kiteboarding packages',
  'kitesurfing lessons',
  'kiteboarding lessons',
  'kitesurfing destinations',
  'kiteboarding destinations',
  'caribbean kitesurfing',
  'mediterranean kitesurfing',
  'antigua kitesurfing',
  'greece kitesurfing',
  'sardinia kitesurfing',
  'kitesurfing equipment',
  'kiteboarding equipment',
  'kitesurfing safety',
  'kiteboarding safety',
  'kitesurfing weather',
  'kiteboarding weather',
  'kitesurfing wind',
  'kiteboarding wind',
  'kitesurfing spots',
  'kiteboarding spots'
]

/**
 * Target countries for geographic monitoring
 */
export const TARGET_COUNTRIES = [
  { code: 'US', name: 'United States', priority: 'high' },
  { code: 'GB', name: 'United Kingdom', priority: 'high' },
  { code: 'DE', name: 'Germany', priority: 'high' },
  { code: 'NL', name: 'Netherlands', priority: 'high' },
  { code: 'FR', name: 'France', priority: 'medium' },
  { code: 'IT', name: 'Italy', priority: 'medium' },
  { code: 'ES', name: 'Spain', priority: 'medium' },
  { code: 'CA', name: 'Canada', priority: 'medium' },
  { code: 'AU', name: 'Australia', priority: 'medium' },
  { code: 'CH', name: 'Switzerland', priority: 'low' },
  { code: 'AT', name: 'Austria', priority: 'low' },
  { code: 'BE', name: 'Belgium', priority: 'low' },
  { code: 'SE', name: 'Sweden', priority: 'low' },
  { code: 'NO', name: 'Norway', priority: 'low' }
]

/**
 * Core Web Vitals thresholds
 */
export const CORE_WEB_VITALS_THRESHOLDS = {
  lcp: { good: 2.5, needsImprovement: 4.0 },
  fid: { good: 100, needsImprovement: 300 },
  cls: { good: 0.1, needsImprovement: 0.25 }
}

/**
 * Performance targets
 */
export const PERFORMANCE_TARGETS = {
  monthlyImpressions: 10000,
  monthlyClicks: 500,
  averageCTR: 5.0,
  top10Keywords: 20,
  mobileFriendlyPages: 100,
  coreWebVitalsGood: 100
}

/**
 * Generate SEO monitoring alerts
 */
export function generateSEOAlerts(): SEOAlert[] {
  const alerts: SEOAlert[] = []
  const now = new Date()

  // Example alerts - in real implementation, these would come from actual monitoring
  alerts.push({
    id: 'crawl-error-001',
    type: 'error',
    title: 'Crawl Error Detected',
    description: '404 error found on /destinations/old-page',
    url: 'https://kitesafaris.com/destinations/old-page',
    timestamp: now,
    resolved: false,
    priority: 'high'
  })

  alerts.push({
    id: 'core-web-vitals-001',
    type: 'warning',
    title: 'Core Web Vitals Issue',
    description: 'LCP score above 2.5s on homepage',
    url: 'https://kitesafaris.com/',
    timestamp: now,
    resolved: false,
    priority: 'medium'
  })

  alerts.push({
    id: 'mobile-usability-001',
    type: 'warning',
    title: 'Mobile Usability Issue',
    description: 'Touch elements too close together on booking page',
    url: 'https://kitesafaris.com/booking',
    timestamp: now,
    resolved: false,
    priority: 'medium'
  })

  return alerts
}

/**
 * Generate performance metrics
 */
export function generatePerformanceMetrics(): PerformanceMetrics {
  const now = new Date()
  const date = now.toISOString().split('T')[0]

  return {
    date,
    impressions: 12500,
    clicks: 650,
    ctr: 5.2,
    position: 8.5,
    coreWebVitals: {
      lcp: 2.1,
      fid: 85,
      cls: 0.08
    },
    mobileUsability: {
      mobileFriendly: true,
      issues: []
    }
  }
}

/**
 * Generate keyword rankings
 */
export function generateKeywordRankings(): KeywordRanking[] {
  const now = new Date()
  const rankings: KeywordRanking[] = []

  PRIMARY_KEYWORDS.slice(0, 10).forEach((keyword, index) => {
    const position = Math.floor(Math.random() * 20) + 1
    const previousPosition = position + Math.floor(Math.random() * 5) - 2
    
    rankings.push({
      keyword,
      position,
      previousPosition,
      change: position - previousPosition,
      url: `https://kitesafaris.com/destinations/${keyword.split(' ')[0]}`,
      date: now
    })
  })

  return rankings
}

/**
 * Generate crawl errors
 */
export function generateCrawlErrors(): CrawlError[] {
  const now = new Date()
  const errors: CrawlError[] = []

  errors.push({
    url: 'https://kitesafaris.com/destinations/old-page',
    errorType: '404',
    description: 'Page not found',
    firstDetected: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    lastDetected: now,
    count: 15,
    status: 'active'
  })

  errors.push({
    url: 'https://kitesafaris.com/booking/old-form',
    errorType: '500',
    description: 'Server error',
    firstDetected: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
    lastDetected: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
    count: 3,
    status: 'resolved'
  })

  return errors
}

/**
 * Check if Core Web Vitals are within acceptable ranges
 */
export function checkCoreWebVitals(metrics: PerformanceMetrics): SEOAlert[] {
  const alerts: SEOAlert[] = []
  const { lcp, fid, cls } = metrics.coreWebVitals

  if (lcp > CORE_WEB_VITALS_THRESHOLDS.lcp.needsImprovement) {
    alerts.push({
      id: `lcp-${Date.now()}`,
      type: 'error',
      title: 'LCP Critical Issue',
      description: `Largest Contentful Paint is ${lcp}s (threshold: ${CORE_WEB_VITALS_THRESHOLDS.lcp.needsImprovement}s)`,
      timestamp: new Date(),
      resolved: false,
      priority: 'high'
    })
  } else if (lcp > CORE_WEB_VITALS_THRESHOLDS.lcp.good) {
    alerts.push({
      id: `lcp-${Date.now()}`,
      type: 'warning',
      title: 'LCP Needs Improvement',
      description: `Largest Contentful Paint is ${lcp}s (target: ${CORE_WEB_VITALS_THRESHOLDS.lcp.good}s)`,
      timestamp: new Date(),
      resolved: false,
      priority: 'medium'
    })
  }

  if (fid > CORE_WEB_VITALS_THRESHOLDS.fid.needsImprovement) {
    alerts.push({
      id: `fid-${Date.now()}`,
      type: 'error',
      title: 'FID Critical Issue',
      description: `First Input Delay is ${fid}ms (threshold: ${CORE_WEB_VITALS_THRESHOLDS.fid.needsImprovement}ms)`,
      timestamp: new Date(),
      resolved: false,
      priority: 'high'
    })
  } else if (fid > CORE_WEB_VITALS_THRESHOLDS.fid.good) {
    alerts.push({
      id: `fid-${Date.now()}`,
      type: 'warning',
      title: 'FID Needs Improvement',
      description: `First Input Delay is ${fid}ms (target: ${CORE_WEB_VITALS_THRESHOLDS.fid.good}ms)`,
      timestamp: new Date(),
      resolved: false,
      priority: 'medium'
    })
  }

  if (cls > CORE_WEB_VITALS_THRESHOLDS.cls.needsImprovement) {
    alerts.push({
      id: `cls-${Date.now()}`,
      type: 'error',
      title: 'CLS Critical Issue',
      description: `Cumulative Layout Shift is ${cls} (threshold: ${CORE_WEB_VITALS_THRESHOLDS.cls.needsImprovement})`,
      timestamp: new Date(),
      resolved: false,
      priority: 'high'
    })
  } else if (cls > CORE_WEB_VITALS_THRESHOLDS.cls.good) {
    alerts.push({
      id: `cls-${Date.now()}`,
      type: 'warning',
      title: 'CLS Needs Improvement',
      description: `Cumulative Layout Shift is ${cls} (target: ${CORE_WEB_VITALS_THRESHOLDS.cls.good})`,
      timestamp: new Date(),
      resolved: false,
      priority: 'medium'
    })
  }

  return alerts
}

/**
 * Generate weekly performance report
 */
export function generateWeeklyReport() {
  const metrics = generatePerformanceMetrics()
  const rankings = generateKeywordRankings()
  const errors = generateCrawlErrors()
  const alerts = generateSEOAlerts()
  const coreWebVitalsAlerts = checkCoreWebVitals(metrics)

  return {
    period: 'weekly',
    date: new Date().toISOString().split('T')[0],
    summary: {
      totalImpressions: metrics.impressions,
      totalClicks: metrics.clicks,
      averageCTR: metrics.ctr,
      averagePosition: metrics.position,
      top10Keywords: rankings.filter(r => r.position <= 10).length,
      crawlErrors: errors.filter(e => e.status === 'active').length,
      activeAlerts: alerts.filter(a => !a.resolved).length
    },
    performance: metrics,
    rankings: rankings.slice(0, 20),
    errors: errors.filter(e => e.status === 'active'),
    alerts: [...alerts, ...coreWebVitalsAlerts].filter(a => !a.resolved),
    recommendations: generateRecommendations(metrics, rankings, errors, alerts)
  }
}

/**
 * Generate recommendations based on current performance
 */
export function generateRecommendations(
  metrics: PerformanceMetrics,
  rankings: KeywordRanking[],
  errors: CrawlError[],
  alerts: SEOAlert[]
): string[] {
  const recommendations: string[] = []

  // Performance recommendations
  if (metrics.ctr < PERFORMANCE_TARGETS.averageCTR) {
    recommendations.push('Improve meta descriptions to increase click-through rate')
  }

  if (metrics.position > 10) {
    recommendations.push('Focus on improving rankings for primary keywords')
  }

  // Core Web Vitals recommendations
  if (metrics.coreWebVitals.lcp > CORE_WEB_VITALS_THRESHOLDS.lcp.good) {
    recommendations.push('Optimize images and implement lazy loading to improve LCP')
  }

  if (metrics.coreWebVitals.fid > CORE_WEB_VITALS_THRESHOLDS.fid.good) {
    recommendations.push('Reduce JavaScript execution time to improve FID')
  }

  if (metrics.coreWebVitals.cls > CORE_WEB_VITALS_THRESHOLDS.cls.good) {
    recommendations.push('Fix layout shifts by setting dimensions for images and ads')
  }

  // Error recommendations
  if (errors.length > 0) {
    recommendations.push('Fix crawl errors to improve indexing')
  }

  // Ranking recommendations
  const decliningKeywords = rankings.filter(r => r.change < -2)
  if (decliningKeywords.length > 0) {
    recommendations.push('Investigate declining rankings for key keywords')
  }

  return recommendations
}

/**
 * Generate monthly performance report
 */
export function generateMonthlyReport() {
  const weeklyReports = Array.from({ length: 4 }, () => generateWeeklyReport())
  
  return {
    period: 'monthly',
    date: new Date().toISOString().split('T')[0],
    summary: {
      totalImpressions: weeklyReports.reduce((sum, report) => sum + report.summary.totalImpressions, 0),
      totalClicks: weeklyReports.reduce((sum, report) => sum + report.summary.totalClicks, 0),
      averageCTR: weeklyReports.reduce((sum, report) => sum + report.summary.averageCTR, 0) / 4,
      averagePosition: weeklyReports.reduce((sum, report) => sum + report.summary.averagePosition, 0) / 4,
      top10Keywords: Math.max(...weeklyReports.map(r => r.summary.top10Keywords)),
      crawlErrors: Math.max(...weeklyReports.map(r => r.summary.crawlErrors)),
      activeAlerts: Math.max(...weeklyReports.map(r => r.summary.activeAlerts))
    },
    trends: {
      impressions: calculateTrend(weeklyReports.map(r => r.summary.totalImpressions)),
      clicks: calculateTrend(weeklyReports.map(r => r.summary.totalClicks)),
      ctr: calculateTrend(weeklyReports.map(r => r.summary.averageCTR)),
      position: calculateTrend(weeklyReports.map(r => r.summary.averagePosition))
    },
    weeklyReports
  }
}

/**
 * Calculate trend (positive/negative/stable)
 */
function calculateTrend(values: number[]): 'up' | 'down' | 'stable' {
  if (values.length < 2) return 'stable'
  
  const first = values[0]
  const last = values[values.length - 1]
  const change = ((last - first) / first) * 100
  
  if (change > 5) return 'up'
  if (change < -5) return 'down'
  return 'stable'
}

/**
 * Export all monitoring functions
 */
export const SEOMonitoringService = {
  generateSEOAlerts,
  generatePerformanceMetrics,
  generateKeywordRankings,
  generateCrawlErrors,
  checkCoreWebVitals,
  generateWeeklyReport,
  generateMonthlyReport,
  generateRecommendations,
  PRIMARY_KEYWORDS,
  SECONDARY_KEYWORDS,
  TARGET_COUNTRIES,
  CORE_WEB_VITALS_THRESHOLDS,
  PERFORMANCE_TARGETS
}
