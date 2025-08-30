import { promises as fs } from "fs"
import path from "path"
import type { OptimizationChange } from "./seo-optimization-service"

export interface FileBackup {
  filePath: string
  originalContent: string
  timestamp: Date
  changeId: string
}

export interface ModificationResult {
  success: boolean
  filePath: string
  changeId: string
  error?: string
  backup?: FileBackup
}

export class FileModificationService {
  private backups: Map<string, FileBackup[]> = new Map()
  private readonly backupDir = ".seo-backups"

  constructor() {
    this.ensureBackupDirectory()
  }

  private async ensureBackupDirectory(): Promise<void> {
    try {
      await fs.mkdir(this.backupDir, { recursive: true })
    } catch (error) {
      console.error("Failed to create backup directory:", error)
    }
  }

  async applyChange(change: OptimizationChange): Promise<ModificationResult> {
    try {
      // Create backup before modification
      const backup = await this.createBackup(change)

      // Apply the specific change based on type
      switch (change.type) {
        case "meta":
          return await this.applyMetaChange(change, backup)
        case "image":
          return await this.applyImageChange(change, backup)
        case "schema":
          return await this.applySchemaChange(change, backup)
        case "content":
          return await this.applyContentChange(change, backup)
        case "link":
          return await this.applyLinkChange(change, backup)
        default:
          throw new Error(`Unsupported change type: ${change.type}`)
      }
    } catch (error) {
      return {
        success: false,
        filePath: change.page,
        changeId: change.id,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  private async createBackup(change: OptimizationChange): Promise<FileBackup> {
    const filePath = this.resolveFilePath(change.page)

    try {
      const originalContent = await fs.readFile(filePath, "utf-8")
      const backup: FileBackup = {
        filePath,
        originalContent,
        timestamp: new Date(),
        changeId: change.id,
      }

      // Store backup in memory
      if (!this.backups.has(filePath)) {
        this.backups.set(filePath, [])
      }
      this.backups.get(filePath)!.push(backup)

      // Save backup to disk
      const backupFileName = `${path.basename(filePath)}.${change.id}.${Date.now()}.backup`
      const backupPath = path.join(this.backupDir, backupFileName)
      await fs.writeFile(backupPath, originalContent, "utf-8")

      return backup
    } catch (error) {
      throw new Error(`Failed to create backup for ${filePath}: ${error}`)
    }
  }

  private async applyMetaChange(change: OptimizationChange, backup: FileBackup): Promise<ModificationResult> {
    const filePath = backup.filePath
    let content = backup.originalContent

    try {
      if (change.element === "title") {
        // Update page title
        content = this.updatePageTitle(content, change.after)
      } else if (change.element?.includes('meta[name="description"]')) {
        // Update meta description
        content = this.updateMetaDescription(content, change.after)
      } else if (change.element?.includes('meta[property="og:')) {
        // Update Open Graph tags
        content = this.updateOpenGraphTag(content, change.element, change.after)
      }

      await fs.writeFile(filePath, content, "utf-8")

      return {
        success: true,
        filePath,
        changeId: change.id,
        backup,
      }
    } catch (error) {
      throw new Error(`Failed to apply meta change: ${error}`)
    }
  }

  private async applyImageChange(change: OptimizationChange, backup: FileBackup): Promise<ModificationResult> {
    const filePath = backup.filePath
    let content = backup.originalContent

    try {
      // Extract image src from change.element if available
      const imgSrcMatch = change.element?.match(/img\[src="([^"]+)"\]/)
      const imgSrc = imgSrcMatch ? imgSrcMatch[1] : null

      if (imgSrc) {
        // Update specific image alt text
        content = this.updateImageAltText(content, imgSrc, change.after)
      } else {
        // Update all images with missing alt text
        content = this.updateAllImageAltText(content, change.before, change.after)
      }

      await fs.writeFile(filePath, content, "utf-8")

      return {
        success: true,
        filePath,
        changeId: change.id,
        backup,
      }
    } catch (error) {
      throw new Error(`Failed to apply image change: ${error}`)
    }
  }

  private async applySchemaChange(change: OptimizationChange, backup: FileBackup): Promise<ModificationResult> {
    const filePath = backup.filePath
    let content = backup.originalContent

    try {
      // Parse the schema JSON from change.after
      const schemaData = JSON.parse(change.after)

      // Add structured data script to the head section
      content = this.addStructuredData(content, schemaData)

      await fs.writeFile(filePath, content, "utf-8")

      return {
        success: true,
        filePath,
        changeId: change.id,
        backup,
      }
    } catch (error) {
      throw new Error(`Failed to apply schema change: ${error}`)
    }
  }

  private async applyContentChange(change: OptimizationChange, backup: FileBackup): Promise<ModificationResult> {
    const filePath = backup.filePath
    let content = backup.originalContent

    try {
      // Apply content optimizations (keyword integration, heading updates, etc.)
      content = this.optimizeContentKeywords(content, change.before, change.after)

      await fs.writeFile(filePath, content, "utf-8")

      return {
        success: true,
        filePath,
        changeId: change.id,
        backup,
      }
    } catch (error) {
      throw new Error(`Failed to apply content change: ${error}`)
    }
  }

  private async applyLinkChange(change: OptimizationChange, backup: FileBackup): Promise<ModificationResult> {
    const filePath = backup.filePath
    let content = backup.originalContent

    try {
      // Extract href from change.element if available
      const hrefMatch = change.element?.match(/a\[href="([^"]+)"\]/)
      const href = hrefMatch ? hrefMatch[1] : null

      if (href) {
        // Update specific link text
        content = this.updateLinkText(content, href, change.before, change.after)
      }

      await fs.writeFile(filePath, content, "utf-8")

      return {
        success: true,
        filePath,
        changeId: change.id,
        backup,
      }
    } catch (error) {
      throw new Error(`Failed to apply link change: ${error}`)
    }
  }

  private resolveFilePath(pagePath: string): string {
    // Convert page path to actual file path
    if (pagePath === "/") {
      return "app/page.tsx"
    }

    // Handle dynamic routes
    if (pagePath.includes("/destinations/")) {
      const slug = pagePath.split("/destinations/")[1]
      if (slug && slug !== "") {
        return "app/destinations/[slug]/page.tsx"
      }
      return "app/destinations/page.tsx"
    }

    // Handle other routes
    const cleanPath = pagePath.startsWith("/") ? pagePath.slice(1) : pagePath
    return `app/${cleanPath}/page.tsx`
  }

  private updatePageTitle(content: string, newTitle: string): string {
    // Update Next.js metadata title
    const metadataRegex = /export const metadata: Metadata = \{[\s\S]*?title: ["']([^"']*)["'][\s\S]*?\}/
    const titleRegex = /title: ["']([^"']*)["']/

    if (metadataRegex.test(content)) {
      return content.replace(titleRegex, `title: "${newTitle}"`)
    }

    // If no metadata export exists, add it
    const importRegex = /import.*from.*["']next["']/
    if (importRegex.test(content)) {
      const metadataImport = `import type { Metadata } from "next"\n`
      const metadataExport = `\nexport const metadata: Metadata = {\n  title: "${newTitle}",\n}\n`

      content = content.replace(importRegex, `${metadataImport}${importRegex.exec(content)![0]}`)

      // Add metadata export before the default export
      const defaultExportRegex = /export default function/
      return content.replace(defaultExportRegex, `${metadataExport}\n$&`)
    }

    return content
  }

  private updateMetaDescription(content: string, newDescription: string): string {
    // Update Next.js metadata description
    const descriptionRegex = /description: ["']([^"']*)["']/

    if (descriptionRegex.test(content)) {
      return content.replace(descriptionRegex, `description: "${newDescription}"`)
    }

    // Add description to existing metadata
    const metadataRegex = /export const metadata: Metadata = \{([\s\S]*?)\}/
    const match = metadataRegex.exec(content)

    if (match) {
      const metadataContent = match[1]
      const newMetadataContent = metadataContent.includes("title:")
        ? metadataContent.replace(/title: ["']([^"']*)["']/, `title: "$1",\n  description: "${newDescription}"`)
        : `${metadataContent}\n  description: "${newDescription}",`

      return content.replace(metadataRegex, `export const metadata: Metadata = {${newMetadataContent}}`)
    }

    return content
  }

  private updateOpenGraphTag(content: string, element: string, newValue: string): string {
    // Extract OG property from element
    const propertyMatch = element.match(/meta\[property="(og:[^"]+)"\]/)
    if (!propertyMatch) return content

    const property = propertyMatch[1]
    const ogKey = property.replace("og:", "og")

    // Update in metadata object
    const ogRegex = new RegExp(`${ogKey}: ["']([^"']*)["']`)

    if (ogRegex.test(content)) {
      return content.replace(ogRegex, `${ogKey}: "${newValue}"`)
    }

    // Add to metadata if not exists
    const metadataRegex = /export const metadata: Metadata = \{([\s\S]*?)\}/
    const match = metadataRegex.exec(content)

    if (match) {
      const metadataContent = match[1]
      const newMetadataContent = `${metadataContent}\n  ${ogKey}: "${newValue}",`
      return content.replace(metadataRegex, `export const metadata: Metadata = {${newMetadataContent}}`)
    }

    return content
  }

  private updateImageAltText(content: string, imgSrc: string, newAltText: string): string {
    // Update specific image alt text
    const imgRegex = new RegExp(
      `(<Image[^>]*src=["']${imgSrc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*alt=["'])([^"']*)["']`,
      "g",
    )
    return content.replace(imgRegex, `$1${newAltText}"`)
  }

  private updateAllImageAltText(content: string, oldAlt: string, newAlt: string): string {
    // Update all instances of specific alt text
    const altRegex = new RegExp(`alt=["']${oldAlt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "g")
    return content.replace(altRegex, `alt="${newAlt}"`)
  }

  private addStructuredData(content: string, schemaData: object): string {
    const schemaScript = `
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(${JSON.stringify(schemaData, null, 2)}),
        }}
      />`

    // Try to add to existing Head component or create one
    if (content.includes("<Head>")) {
      return content.replace("</Head>", `${schemaScript}\n      </Head>`)
    }

    // Add to metadata if using app router
    const metadataRegex = /export const metadata: Metadata = \{([\s\S]*?)\}/
    const match = metadataRegex.exec(content)

    if (match) {
      // For app router, we'd need to add this to the actual component
      // This is a simplified approach - in practice, you'd want to modify the component's JSX
      const componentRegex = /return $$([\s\S]*?)$$/
      const componentMatch = componentRegex.exec(content)

      if (componentMatch) {
        const jsxContent = componentMatch[1]
        const newJsxContent = jsxContent.replace(/(<[^>]+>)/, `$1\n      ${schemaScript}`)
        return content.replace(componentRegex, `return (${newJsxContent})`)
      }
    }

    return content
  }

  private optimizeContentKeywords(content: string, oldContent: string, optimization: string): string {
    // This would implement keyword optimization logic
    // For now, we'll do a simple replacement approach

    // Extract headings and optimize them
    const h1Regex = /<h1[^>]*>(.*?)<\/h1>/g
    const h2Regex = /<h2[^>]*>(.*?)<\/h2>/g

    // Add keywords to headings if they don't already contain them
    content = content.replace(h1Regex, (match, headingText) => {
      if (!headingText.toLowerCase().includes("caribbean") && !headingText.toLowerCase().includes("kite safari")) {
        return match.replace(headingText, `${headingText} - Caribbean Kite Safari`)
      }
      return match
    })

    return content
  }

  private updateLinkText(content: string, href: string, oldText: string, newText: string): string {
    // Update specific link text
    const linkRegex = new RegExp(
      `(<a[^>]*href=["']${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>)${oldText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(</a>)`,
      "g",
    )
    return content.replace(linkRegex, `$1${newText}$2`)
  }

  async rollbackChange(changeId: string): Promise<ModificationResult[]> {
    const results: ModificationResult[] = []

    for (const [filePath, backups] of this.backups.entries()) {
      const backup = backups.find((b) => b.changeId === changeId)

      if (backup) {
        try {
          await fs.writeFile(filePath, backup.originalContent, "utf-8")

          results.push({
            success: true,
            filePath,
            changeId,
            backup,
          })

          // Remove the backup from memory
          const index = backups.indexOf(backup)
          backups.splice(index, 1)
        } catch (error) {
          results.push({
            success: false,
            filePath,
            changeId,
            error: error instanceof Error ? error.message : "Unknown error",
          })
        }
      }
    }

    return results
  }

  async rollbackAllChanges(changeIds: string[]): Promise<ModificationResult[]> {
    const results: ModificationResult[] = []

    for (const changeId of changeIds) {
      const rollbackResults = await this.rollbackChange(changeId)
      results.push(...rollbackResults)
    }

    return results
  }

  getBackupHistory(filePath?: string): FileBackup[] {
    if (filePath) {
      return this.backups.get(filePath) || []
    }

    // Return all backups
    const allBackups: FileBackup[] = []
    for (const backups of this.backups.values()) {
      allBackups.push(...backups)
    }

    return allBackups.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  async validateFileIntegrity(filePath: string): Promise<boolean> {
    try {
      const content = await fs.readFile(filePath, "utf-8")

      // Basic validation - check if it's valid TypeScript/JSX
      // In a real implementation, you'd use a proper parser
      const hasValidImports = content.includes("import") || content.includes("export")
      const hasValidSyntax = !content.includes("undefined") && !content.includes("null")

      return hasValidImports && hasValidSyntax
    } catch (error) {
      return false
    }
  }
}

export const fileModificationService = new FileModificationService()
