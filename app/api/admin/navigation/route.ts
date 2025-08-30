import { type NextRequest, NextResponse } from "next/server"
import { navigationService } from "@/lib/navigation-service"

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Navigation API: GET request received")

    const items = await navigationService.getAllNavigationItems()

    return NextResponse.json({
      success: true,
      data: items,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Navigation API: GET error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch navigation items",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Navigation API: POST request received")

    const body = await request.json()
    const { action, ...data } = body

    switch (action) {
      case "create":
        const newItem = await navigationService.createNavigationItem(data)
        if (!newItem) {
          throw new Error("Failed to create navigation item")
        }
        return NextResponse.json({
          success: true,
          data: newItem,
          message: "Navigation item created successfully",
        })

      case "update":
        const { id, ...updates } = data
        const updatedItem = await navigationService.updateNavigationItem(id, updates)
        if (!updatedItem) {
          throw new Error("Failed to update navigation item")
        }
        return NextResponse.json({
          success: true,
          data: updatedItem,
          message: "Navigation item updated successfully",
        })

      case "delete":
        const success = await navigationService.deleteNavigationItem(data.id)
        if (!success) {
          throw new Error("Failed to delete navigation item")
        }
        return NextResponse.json({
          success: true,
          message: "Navigation item deleted successfully",
        })

      case "batch-reorder":
        const batchSuccess = await navigationService.batchUpdateSortOrder(data.updates)
        if (!batchSuccess) {
          throw new Error("Failed to update sort order")
        }
        return NextResponse.json({
          success: true,
          message: "Navigation order updated successfully",
        })

      case "create-backup":
        const backupResult = await navigationService.createBackup()
        return NextResponse.json(backupResult)

      case "restore-backup":
        const restoreSuccess = await navigationService.restoreFromBackup(data.items)
        return NextResponse.json({
          success: restoreSuccess,
          message: restoreSuccess ? "Navigation restored successfully" : "Failed to restore navigation",
        })

      case "validate":
        const validation = await navigationService.validateNavigationStructure()
        return NextResponse.json({
          success: true,
          data: validation,
        })

      default:
        return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("[v0] Navigation API: POST error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process navigation request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
