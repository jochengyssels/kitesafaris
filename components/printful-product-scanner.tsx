'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertTriangle, CheckCircle, FileText, RefreshCw } from 'lucide-react'

interface ScanResults {
  success: boolean
  scanResults: {
    totalProducts: number
    productsWithIssues: Array<{
      productId: number
      productName: string
      synced: boolean
      totalVariants: number
      variantsWithIssues: Array<{
        variantId: number
        variantName: string
        variantId_catalog: number
        files: any[]
        fileAnalysis: {
          totalFiles: number
          validFiles: number
          invalidFiles: Array<{
            id: number
            type: string
            reason: string
          }>
          fileDetails: Array<{
            id: number
            type: string
            status: string
            hasUrl: boolean
            hasPreviewUrl: boolean
            isTemporary: boolean
            url: string
            previewUrl: string
          }>
        }
      }>
      variantsWithValidFiles: any[]
    }>
    productsWithValidFiles: any[]
    summary: {
      totalVariants: number
      variantsWithIssues: number
      variantsWithValidFiles: number
    }
  }
  recommendations: {
    productsNeedingAttention: number
    totalVariantsNeedingFiles: number
    actionRequired: string
  }
}

export default function PrintfulProductScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [results, setResults] = useState<ScanResults | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runScan = async () => {
    setIsScanning(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch('/api/scan-printful-products')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Scan failed')
      }

      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Printful Product Scanner
          </CardTitle>
          <CardDescription>
            Scan all your Printful products to identify which ones need valid print files for order fulfillment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={runScan} 
            disabled={isScanning}
            className="w-full sm:w-auto"
          >
            {isScanning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scanning Products...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Scan All Products
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results && (
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Scan Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {results.scanResults.totalProducts}
                  </div>
                  <div className="text-sm text-gray-600">Total Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {results.scanResults.summary.variantsWithIssues}
                  </div>
                  <div className="text-sm text-gray-600">Variants with Issues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {results.scanResults.summary.variantsWithValidFiles}
                  </div>
                  <div className="text-sm text-gray-600">Valid Variants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {results.recommendations.productsNeedingAttention}
                  </div>
                  <div className="text-sm text-gray-600">Products Need Attention</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Action Required:</strong> {results.recommendations.actionRequired}
            </AlertDescription>
          </Alert>

          {/* Products with Issues */}
          {results.scanResults.productsWithIssues.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Products Needing Attention ({results.scanResults.productsWithIssues.length})
                </CardTitle>
                <CardDescription>
                  These products have variants without valid print files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.scanResults.productsWithIssues.map((product) => (
                    <div key={product.productId} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{product.productName}</h3>
                          <p className="text-sm text-gray-600">
                            Product ID: {product.productId} | 
                            Synced: {product.synced ? 'Yes' : 'No'} | 
                            Total Variants: {product.totalVariants}
                          </p>
                        </div>
                        <Badge variant="destructive">
                          {product.variantsWithIssues.length} variants need files
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        {product.variantsWithIssues.map((variant) => (
                          <div key={variant.variantId} className="bg-red-50 border border-red-200 rounded p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <span className="font-medium">{variant.variantName}</span>
                                <span className="text-sm text-gray-600 ml-2">
                                  (ID: {variant.variantId}, Catalog ID: {variant.variantId_catalog})
                                </span>
                              </div>
                              <Badge variant="outline" className="text-red-600">
                                {variant.fileAnalysis.validFiles}/{variant.fileAnalysis.totalFiles} valid files
                              </Badge>
                            </div>
                            
                            {variant.fileAnalysis.invalidFiles.length > 0 && (
                              <div className="text-sm text-red-600">
                                <strong>Issues:</strong>
                                <ul className="list-disc list-inside mt-1">
                                  {variant.fileAnalysis.invalidFiles.map((file, idx) => (
                                    <li key={idx}>
                                      File {file.id} ({file.type}): {file.reason}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products with Valid Files */}
          {results.scanResults.productsWithValidFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  Products with Valid Files ({results.scanResults.productsWithValidFiles.length})
                </CardTitle>
                <CardDescription>
                  These products are ready for order fulfillment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.scanResults.productsWithValidFiles.map((product) => (
                    <div key={product.productId} className="border border-green-200 rounded-lg p-3 bg-green-50">
                      <h3 className="font-semibold text-green-800">{product.productName}</h3>
                      <p className="text-sm text-green-600">
                        ID: {product.productId} | {product.totalVariants} variants
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
