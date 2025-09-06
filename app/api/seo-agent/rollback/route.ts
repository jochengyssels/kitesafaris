import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const { rollbackIds } = await request.json()

    console.log(`[SEO Agent] Starting rollback of ${rollbackIds.length} changes...`)

    const results = []
    const rolledBackChanges = []

    for (const rollbackId of rollbackIds) {
      try {
        const success = await rollbackChange(rollbackId)
        
        if (success) {
          results.push({
            rollbackId,
            status: "completed",
            rolledBackAt: new Date().toISOString(),
            originalChangeId: rollbackId.replace("rollback_", "").split("_")[0],
          })
          rolledBackChanges.push(rollbackId)
          console.log(`[SEO Agent] Rolled back change ${rollbackId}`)
        } else {
          results.push({
            rollbackId,
            status: "failed",
            error: "Backup not found or rollback failed",
            rolledBackAt: new Date().toISOString(),
            originalChangeId: rollbackId.replace("rollback_", "").split("_")[0],
          })
        }
      } catch (error) {
        console.error(`[SEO Agent] Error rolling back ${rollbackId}:`, error)
        results.push({
          rollbackId,
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
          rolledBackAt: new Date().toISOString(),
          originalChangeId: rollbackId.replace("rollback_", "").split("_")[0],
        })
      }
    }

    console.log(`[SEO Agent] Rollback complete - ${rolledBackChanges.length}/${rollbackIds.length} changes rolled back`)

    return NextResponse.json({
      success: true,
      data: {
        rolledBackChanges: rolledBackChanges.length,
        totalChanges: rollbackIds.length,
        results,
        message: `Changes rolled back successfully (${rolledBackChanges.length}/${rollbackIds.length})`,
      },
    })
  } catch (error) {
    console.error("SEO rollback error:", error)
    return NextResponse.json({ success: false, error: "Rollback failed" }, { status: 500 })
  }
}

async function rollbackChange(rollbackId: string): Promise<boolean> {
  try {
    const backupDir = path.join(process.cwd(), '.seo-backups')
    
    // Find the backup file for this rollback ID
    const backupFiles = await fs.readdir(backupDir)
    const backupFile = backupFiles.find(file => file.includes(rollbackId.replace('rollback_', '').split('_')[0]))
    
    if (!backupFile) {
      console.error(`[SEO Agent] Backup file not found for ${rollbackId}`)
      return false
    }
    
    const backupPath = path.join(backupDir, backupFile)
    const backupContent = await fs.readFile(backupPath, 'utf-8')
    
    // Extract the original file path from the backup filename or content
    const originalFilePath = await findOriginalFilePath(rollbackId)
    
    if (!originalFilePath) {
      console.error(`[SEO Agent] Original file path not found for ${rollbackId}`)
      return false
    }
    
    // Restore the original content
    await fs.writeFile(originalFilePath, backupContent, 'utf-8')
    
    // Optionally remove the backup file after successful rollback
    // await fs.unlink(backupPath)
    
    return true
  } catch (error) {
    console.error(`[SEO Agent] Error during rollback:`, error)
    return false
  }
}

async function findOriginalFilePath(rollbackId: string): Promise<string | null> {
  try {
    // Extract change ID from rollback ID
    const changeId = rollbackId.replace('rollback_', '').split('_')[0]
    
    // This is a simplified approach - in a real implementation, you'd store
    // the original file path in the backup metadata or database
    const backupDir = path.join(process.cwd(), '.seo-backups')
    const backupFiles = await fs.readdir(backupDir)
    const backupFile = backupFiles.find(file => file.includes(changeId))
    
    if (!backupFile) {
      return null
    }
    
    // Try to infer the original file path from common patterns
    const commonPaths = [
      'app/page.tsx',
      'app/contact/page.tsx',
      'app/destinations/page.tsx',
      'app/packages/page.tsx',
      'app/booking/page.tsx',
      'app/admin/page.tsx',
    ]
    
    for (const commonPath of commonPaths) {
      const fullPath = path.join(process.cwd(), commonPath)
      try {
        await fs.access(fullPath)
        return fullPath
      } catch {
        continue
      }
    }
    
    return null
  } catch (error) {
    console.error(`[SEO Agent] Error finding original file path:`, error)
    return null
  }
}
