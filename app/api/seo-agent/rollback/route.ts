import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { rollbackIds } = await request.json()

    // Simulate rollback process
    const results = rollbackIds.map((id: string) => ({
      rollbackId: id,
      status: "completed",
      rolledBackAt: new Date().toISOString(),
      originalChangeId: id.replace("rollback_", "").split("_")[0],
    }))

    console.log(`[SEO Agent] Rolled back ${rollbackIds.length} changes`)

    return NextResponse.json({
      success: true,
      data: {
        rolledBackChanges: results.length,
        results,
        message: "Changes rolled back successfully",
      },
    })
  } catch (error) {
    console.error("SEO rollback error:", error)
    return NextResponse.json({ success: false, error: "Rollback failed" }, { status: 500 })
  }
}
