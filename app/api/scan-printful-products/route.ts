import { NextRequest, NextResponse } from 'next/server'
import { printfulService } from '@/lib/printful-service'

export async function GET(request: NextRequest) {
  try {
    console.log('[ScanProducts] Starting product scan...')
    
    const products = await printfulService.getProducts()
    console.log(`[ScanProducts] Found ${products.length} products to scan`)
    
    const results = {
      totalProducts: products.length,
      productsWithIssues: [] as any[],
      productsWithValidFiles: [] as any[],
      summary: {
        totalVariants: 0,
        variantsWithIssues: 0,
        variantsWithValidFiles: 0
      }
    }
    
    for (const product of products) {
      console.log(`[ScanProducts] Scanning product ${product.id}: ${product.name}`)
      
      try {
        const variants = await printfulService.getProductVariants(product.id)
        console.log(`[ScanProducts] Product ${product.id} has ${variants.length} variants`)
        
        const productResult = {
          productId: product.id,
          productName: product.name,
          synced: product.synced,
          totalVariants: variants.length,
          variantsWithIssues: [] as any[],
          variantsWithValidFiles: [] as any[]
        }
        
        for (const variant of variants) {
          results.summary.totalVariants++
          
          const variantResult = {
            variantId: variant.id,
            variantName: variant.name,
            variantId_catalog: variant.variant_id,
            files: variant.files || [],
            fileAnalysis: {
              totalFiles: variant.files?.length || 0,
              validFiles: 0,
              invalidFiles: [] as any[],
              fileDetails: [] as any[]
            }
          }
          
          // Analyze each file
          if (variant.files && variant.files.length > 0) {
            for (const file of variant.files) {
              const fileDetail = {
                id: file.id,
                type: file.type,
                status: file.status,
                hasUrl: !!file.url,
                hasPreviewUrl: !!file.preview_url,
                isTemporary: !!file.is_temporary,
                url: file.url ? file.url.substring(0, 50) + '...' : 'no URL',
                previewUrl: file.preview_url ? file.preview_url.substring(0, 50) + '...' : 'no preview URL'
              }
              
              variantResult.fileAnalysis.fileDetails.push(fileDetail)
              
              // Check if file is valid for production
              const isValid = file.url && 
                             file.status === 'ok' && 
                             file.type !== 'preview' && 
                             !file.is_temporary
              
              if (isValid) {
                variantResult.fileAnalysis.validFiles++
              } else {
                variantResult.fileAnalysis.invalidFiles.push({
                  id: file.id,
                  type: file.type,
                  reason: !file.url ? 'no URL' : 
                         file.status !== 'ok' ? `status: ${file.status}` :
                         file.type === 'preview' ? 'preview file' :
                         file.is_temporary ? 'temporary file' : 'unknown'
                })
              }
            }
          }
          
          // Determine if variant has issues
          if (variantResult.fileAnalysis.validFiles === 0) {
            productResult.variantsWithIssues.push(variantResult)
            results.summary.variantsWithIssues++
          } else {
            productResult.variantsWithValidFiles.push(variantResult)
            results.summary.variantsWithValidFiles++
          }
        }
        
        // Determine if product has issues
        if (productResult.variantsWithIssues.length > 0) {
          results.productsWithIssues.push(productResult)
        } else {
          results.productsWithValidFiles.push(productResult)
        }
        
      } catch (error) {
        console.error(`[ScanProducts] Error scanning product ${product.id}:`, error)
        results.productsWithIssues.push({
          productId: product.id,
          productName: product.name,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }
    
    console.log(`[ScanProducts] Scan complete. Found ${results.productsWithIssues.length} products with issues`)
    
    return NextResponse.json({
      success: true,
      scanResults: results,
      recommendations: {
        productsNeedingAttention: results.productsWithIssues.length,
        totalVariantsNeedingFiles: results.summary.variantsWithIssues,
        actionRequired: results.summary.variantsWithIssues > 0 ? 
          'Upload production-ready print files to the variants listed above' : 
          'All products have valid print files'
      }
    })
    
  } catch (error) {
    console.error('[ScanProducts] Scan failed:', error)
    return NextResponse.json({
      success: false,
      message: 'Product scan failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
