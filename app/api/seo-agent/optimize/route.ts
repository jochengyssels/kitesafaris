import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const { changes } = await request.json()

    console.log(`[SEO Agent] Starting optimization of ${changes.length} changes...`)

    const results = []
    const appliedChanges = []

    for (const change of changes) {
      try {
        // Find the file path for this page
        const filePath = await findPageFilePath(change.page)
        
        if (!filePath) {
          results.push({
            id: change.id,
            status: "failed",
            error: "File not found",
            appliedAt: new Date().toISOString(),
          })
          continue
        }

        // Create backup
        const backupPath = await createBackup(filePath, change.id)
        
        // Apply the change
        const success = await applySEOChange(filePath, change)
        
        if (success) {
          results.push({
            id: change.id,
            status: "completed",
            appliedAt: new Date().toISOString(),
            backupCreated: true,
            backupPath,
            rollbackId: `rollback_${change.id}_${Date.now()}`,
          })
          appliedChanges.push(change)
          console.log(`[SEO Agent] Applied change ${change.id} to ${change.page}`)
        } else {
          results.push({
            id: change.id,
            status: "failed",
            error: "Failed to apply change",
            appliedAt: new Date().toISOString(),
          })
        }
      } catch (error) {
        console.error(`[SEO Agent] Error applying change ${change.id}:`, error)
        results.push({
          id: change.id,
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
          appliedAt: new Date().toISOString(),
        })
      }
    }

    console.log(`[SEO Agent] Optimization complete - ${appliedChanges.length}/${changes.length} changes applied`)

    return NextResponse.json({
      success: true,
      data: {
        appliedChanges: appliedChanges.length,
        totalChanges: changes.length,
        results,
        message: `SEO optimizations applied successfully (${appliedChanges.length}/${changes.length})`,
      },
    })
  } catch (error) {
    console.error("SEO optimization error:", error)
    return NextResponse.json({ success: false, error: "Optimization failed" }, { status: 500 })
  }
}

async function findPageFilePath(pageUrl: string): Promise<string | null> {
  try {
    // Convert page URL to file path
    let filePath = pageUrl.replace(/^\//, 'app/')
    if (filePath === 'app' || filePath === 'app/') {
      filePath = 'app/page.tsx'
    } else {
      filePath = `${filePath}/page.tsx`
    }
    
    const fullPath = path.join(process.cwd(), filePath)
    
    // Check if file exists
    try {
      await fs.access(fullPath)
      return fullPath
    } catch {
      // Try alternative paths
      const alternatives = [
        path.join(process.cwd(), 'app', pageUrl.replace(/^\//, ''), 'page.tsx'),
        path.join(process.cwd(), 'app', pageUrl.replace(/^\//, ''), 'index.tsx'),
      ]
      
      for (const altPath of alternatives) {
        try {
          await fs.access(altPath)
          return altPath
        } catch {
          continue
        }
      }
      
      return null
    }
  } catch (error) {
    console.error(`[SEO Agent] Error finding file for ${pageUrl}:`, error)
    return null
  }
}

async function createBackup(filePath: string, changeId: string): Promise<string> {
  try {
    const backupDir = path.join(process.cwd(), '.seo-backups')
    await fs.mkdir(backupDir, { recursive: true })
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupPath = path.join(backupDir, `${changeId}_${timestamp}.tsx`)
    
    const content = await fs.readFile(filePath, 'utf-8')
    await fs.writeFile(backupPath, content, 'utf-8')
    
    return backupPath
  } catch (error) {
    console.error(`[SEO Agent] Error creating backup:`, error)
    throw error
  }
}

async function applySEOChange(filePath: string, change: any): Promise<boolean> {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    let updatedContent = content
    
    switch (change.type) {
      case 'meta':
        if (change.description.includes('title')) {
          // Update meta title
          updatedContent = updateMetaTitle(content, change.suggestedValue)
        } else if (change.description.includes('description')) {
          // Update meta description
          updatedContent = updateMetaDescription(content, change.suggestedValue)
        }
        break
        
      case 'schema':
        // Add structured data
        updatedContent = addStructuredData(content, change.suggestedValue)
        break
        
      default:
        console.log(`[SEO Agent] Unknown change type: ${change.type}`)
        return false
    }
    
    if (updatedContent !== content) {
      await fs.writeFile(filePath, updatedContent, 'utf-8')
      return true
    }
    
    return false
  } catch (error) {
    console.error(`[SEO Agent] Error applying change:`, error)
    return false
  }
}

function updateMetaTitle(content: string, newTitle: string): string {
  // Update export const metadata title
  const titleRegex = /(export\s+const\s+metadata[\s\S]*?title:\s*["'])([^"']*)(["'][\s\S]*?})/
  if (titleRegex.test(content)) {
    return content.replace(titleRegex, `$1${newTitle}$3`)
  }
  
  // Add metadata if it doesn't exist
  if (!content.includes('export const metadata')) {
    const metadataBlock = `export const metadata: Metadata = {
  title: "${newTitle}",
  description: "Caribbean kite safari adventures",
}

`
    return metadataBlock + content
  }
  
  return content
}

function updateMetaDescription(content: string, newDescription: string): string {
  // Update export const metadata description
  const descRegex = /(export\s+const\s+metadata[\s\S]*?description:\s*["'])([^"']*)(["'][\s\S]*?})/
  if (descRegex.test(content)) {
    return content.replace(descRegex, `$1${newDescription}$3`)
  }
  
  // Add description to existing metadata
  const metadataRegex = /(export\s+const\s+metadata[\s\S]*?)(})/
  if (metadataRegex.test(content)) {
    return content.replace(metadataRegex, `$1  description: "${newDescription}",\n$2`)
  }
  
  return content
}

function addStructuredData(content: string, schemaType: string): string {
  // Add JSON-LD script tag
  const jsonLdScript = `
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "KiteSafaris",
        "description": "Luxury Caribbean kite safari adventures",
        "url": "https://kitesafaris.com",
        "logo": "https://kitesafaris.com/logo.png"
      })
    }}
  />
`
  
  // Find a good place to insert the script (before closing body tag or at end of component)
  if (content.includes('</body>')) {
    return content.replace('</body>', `${jsonLdScript}\n</body>`)
  } else if (content.includes('</div>')) {
    // Insert before the last closing div
    const lastDivIndex = content.lastIndexOf('</div>')
    return content.slice(0, lastDivIndex) + jsonLdScript + content.slice(lastDivIndex)
  }
  
  return content
}
