// Printful Validation and Preflight Checks
import { printfulService } from '../printful-service'
import { PrintfulSyncFile } from './types'

/**
 * Preflight check: Verify that a sync variant has a valid print file
 * This prevents sending orders to Printful that will fail with "Item can't be submitted without any print files"
 */
export async function assertSyncVariantHasFile(syncVariantId: number): Promise<void> {
  console.log(`[PrintfulValidator] Preflight check for sync variant ${syncVariantId}`)
  
  try {
    // Get the sync variant details
    const products = await printfulService.getProducts()
    let syncVariant = null
    let syncProduct = null

    // Find the sync variant and its parent product
    for (const product of products) {
      const variants = await printfulService.getProductVariants(product.id)
      const variant = variants.find(v => v.id === syncVariantId)
      if (variant) {
        syncVariant = variant
        syncProduct = product
        break
      }
    }

    if (!syncVariant || !syncProduct) {
      throw new Error(`Sync variant ${syncVariantId} not found in any product`)
    }

    console.log(`[PrintfulValidator] Found sync variant ${syncVariantId} in product ${syncProduct.id}`)

    // Check if the variant has valid print files
    const hasValidFile = validateSyncVariantFiles(syncVariant, syncVariantId)
    
    if (!hasValidFile) {
      const fileDetails = syncVariant.files?.map((f: any) => 
        `${f.type} (${f.status}, ${f.url ? 'has URL' : f.preview_url ? 'has preview URL' : 'no URL'}, ${f.is_temporary ? 'temp' : 'permanent'})`
      ).join(', ') || 'none'
      
      throw new Error(`Sync variant ${syncVariantId} has no valid print file. Available files: ${fileDetails}. Files need a URL (or preview URL) and status 'ok' or 'pending' to be valid. If you can download the file from Printful dashboard, the API should be able to access it too.`)
    }

    console.log(`[PrintfulValidator] ✅ Preflight passed for sync variant ${syncVariantId}`)
  } catch (error) {
    console.error(`[PrintfulValidator] ❌ Preflight failed for sync variant ${syncVariantId}:`, error)
    throw error
  }
}

/**
 * Validates that a sync variant has at least one valid print file
 */
function validateSyncVariantFiles(syncVariant: any, syncVariantId: number): boolean {
  if (!syncVariant.files || syncVariant.files.length === 0) {
    console.log(`[PrintfulValidator] Sync variant ${syncVariantId} has no files`)
    return false
  }

  // Log all files for debugging
  console.log(`[PrintfulValidator] All files for sync variant ${syncVariantId}:`, 
    syncVariant.files.map((f: any) => ({
      id: f.id,
      type: f.type,
      hasUrl: !!f.url,
      url: f.url ? f.url.substring(0, 50) + '...' : 'no URL',
      status: f.status,
      isTemporary: f.is_temporary,
      filename: f.filename,
      preview_url: f.preview_url ? f.preview_url.substring(0, 50) + '...' : 'no preview',
      // Log all properties to understand the structure
      allProperties: Object.keys(f)
    }))
  )

  const validFiles = syncVariant.files.filter((file: any) => {
    // More flexible validation - if you can download it, it should be usable
    // Accept files that have either:
    // 1. A direct URL (file.url) - most common case
    // 2. A preview URL (file.preview_url) - sometimes the main file is here
    // 3. Status 'ok' or 'pending' (pending might still be processable)
    const hasUrl = file.url || file.preview_url
    const hasValidStatus = file.status === 'ok' || file.status === 'pending'
    const isNotPreview = file.type !== 'preview'
    
    const isValid = hasUrl && hasValidStatus && isNotPreview

    if (!isValid) {
      console.log(`[PrintfulValidator] Invalid print file for sync variant ${syncVariantId}:`, {
        id: file.id,
        type: file.type,
        hasUrl: !!file.url,
        hasPreviewUrl: !!file.preview_url,
        status: file.status,
        isTemporary: file.is_temporary,
        reason: !hasUrl ? 'no URL or preview URL' : !hasValidStatus ? `status '${file.status}' not ok/pending` : file.type === 'preview' ? 'preview file' : 'unknown'
      })
    } else {
      console.log(`[PrintfulValidator] Valid print file for sync variant ${syncVariantId}:`, {
        id: file.id,
        type: file.type,
        hasUrl: !!file.url,
        hasPreviewUrl: !!file.preview_url,
        status: file.status,
        isTemporary: file.is_temporary,
        filename: file.filename
      })
    }

    return isValid
  })

  console.log(`[PrintfulValidator] Sync variant ${syncVariantId} has ${validFiles.length} valid files out of ${syncVariant.files.length} total files`)
  
  if (validFiles.length === 0) {
    console.log(`[PrintfulValidator] Available file types for sync variant ${syncVariantId}:`, 
      syncVariant.files.map((f: any) => ({ type: f.type, isTemporary: f.is_temporary, hasUrl: !!f.url }))
    )
  }
  
  return validFiles.length > 0
}

/**
 * Preflight check for multiple sync variants
 */
export async function assertSyncVariantsHaveFiles(syncVariantIds: number[]): Promise<void> {
  console.log(`[PrintfulValidator] Preflight check for ${syncVariantIds.length} sync variants`)
  
  const errors: string[] = []
  
  for (const syncVariantId of syncVariantIds) {
    try {
      await assertSyncVariantHasFile(syncVariantId)
    } catch (error) {
      const errorMsg = `Sync variant ${syncVariantId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      errors.push(errorMsg)
    }
  }

  if (errors.length > 0) {
    throw new Error(`Preflight failed for ${errors.length} sync variants: ${errors.join('; ')}`)
  }

  console.log(`[PrintfulValidator] ✅ All ${syncVariantIds.length} sync variants passed preflight`)
}

/**
 * Validates print file URL format
 */
export function validatePrintFileUrl(url: string): boolean {
  if (!url) return false
  
  // Basic URL validation
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validates that a catalog variant has a valid print file URL
 */
export function assertCatalogVariantHasValidFile(catalogVariantId: number, printFileUrl: string): void {
  if (!printFileUrl) {
    throw new Error(`Catalog variant ${catalogVariantId} requires printFileUrl`)
  }

  if (!validatePrintFileUrl(printFileUrl)) {
    throw new Error(`Catalog variant ${catalogVariantId} has invalid printFileUrl: ${printFileUrl}`)
  }

  console.log(`[PrintfulValidator] ✅ Catalog variant ${catalogVariantId} has valid print file URL`)
}
