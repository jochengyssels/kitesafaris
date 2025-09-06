import { NextRequest, NextResponse } from "next/server"
import { stormglassService } from "@/lib/stormglass-service"
import { AirtableService } from "@/lib/airtable"

interface WindForecastRecord {
  location_name: string
  latitude: number
  longitude: number
  forecast_time: string
  wind_speed_knots: number
  wind_direction_degrees: number
  wind_direction_cardinal: string
  wind_gust_knots: number
  temperature_celsius: number
  humidity_percent: number
  data_source: string
  api_cost?: number
}

export async function POST(request: NextRequest) {
  try {
    // Check if scheduler is enabled
    const schedulerEnabled = process.env.WIND_FORECAST_SCHEDULER_ENABLED === 'true'
    if (!schedulerEnabled) {
      return NextResponse.json({
        success: false,
        message: 'Wind forecast scheduler is disabled'
      }, { status: 503 })
    }

    // Verify this is a scheduled call (optional security check)
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.WIND_SCHEDULER_SECRET
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized scheduler access'
      }, { status: 401 })
    }

    const airtable = new AirtableService()
    
    // Get configuration from environment variables
    const locationLat = parseFloat(process.env.WIND_FORECAST_LOCATION_LAT || '39.112133995367714')
    const locationLng = parseFloat(process.env.WIND_FORECAST_LOCATION_LNG || '8.437520043416788')
    const locationName = process.env.WIND_FORECAST_LOCATION_NAME || 'Punta Trettu, Sardinia'
    
    console.log(`[Wind Scheduler] Fetching forecast for ${locationName} (${locationLat}, ${locationLng})`)

    // Fetch forecast data from Stormglass (24 hours of data)
    const forecastData = await stormglassService.getWindForecast(locationLat, locationLng, 24)
    
    if (!forecastData || forecastData.length === 0) {
      throw new Error('No forecast data received from Stormglass')
    }

    console.log(`[Wind Scheduler] Received ${forecastData.length} forecast points`)

    // Prepare records for Airtable
    const records: WindForecastRecord[] = forecastData.map(data => ({
      location_name: locationName,
      latitude: locationLat,
      longitude: locationLng,
      forecast_time: data.time,
      wind_speed_knots: data.windSpeed,
      wind_direction_degrees: data.windDirection,
      wind_direction_cardinal: data.windDirectionCardinal,
      wind_gust_knots: data.windGust,
      temperature_celsius: data.temperature,
      humidity_percent: data.humidity,
      data_source: 'stormglass'
    }))

    // Check for existing records to avoid duplicates
    const existingRecords = await airtable.getRecords('wind_forecasts', {
      maxRecords: 100,
      filterByFormula: `AND(
        {location_name} = "${locationName}",
        {forecast_time} >= "${new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()}"
      )`,
      sort: [{ field: 'forecast_time', direction: 'desc' }]
    })

    // Create a set of existing forecast times for quick lookup
    const existingTimes = new Set(
      existingRecords.records?.map(record => 
        record.fields.forecast_time as string
      ) || []
    )

    // Filter out records that already exist
    const newRecords = records.filter(record => 
      !existingTimes.has(record.forecast_time)
    )

    if (newRecords.length === 0) {
      console.log('[Wind Scheduler] No new records to insert - all data already exists')
      return NextResponse.json({
        success: true,
        message: 'No new records to insert',
        existingRecords: existingRecords.records?.length || 0,
        totalForecastPoints: forecastData.length
      })
    }

    console.log(`[Wind Scheduler] Inserting ${newRecords.length} new records`)

    // Insert new records into Airtable in batches of 10 (Airtable limit)
    const batchSize = 10
    let insertedCount = 0
    
    for (let i = 0; i < newRecords.length; i += batchSize) {
      const batch = newRecords.slice(i, i + batchSize)
      console.log(`[Wind Scheduler] Inserting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(newRecords.length / batchSize)} (${batch.length} records)`)
      
      try {
        await airtable.createRecords('wind_forecasts', batch)
        insertedCount += batch.length
      } catch (error) {
        console.error(`[Wind Scheduler] Failed to insert batch ${Math.floor(i / batchSize) + 1}:`, error)
        // Continue with next batch even if one fails
      }
    }

    // Clean up old records (keep only last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const oldRecords = await airtable.getRecords('wind_forecasts', {
      maxRecords: 1000,
      filterByFormula: `{forecast_time} < "${sevenDaysAgo}"`
    })

    let deletedCount = 0
    if (oldRecords.records && oldRecords.records.length > 0) {
      const recordIdsToDelete = oldRecords.records.map(record => record.id)
      await airtable.deleteRecords('wind_forecasts', recordIdsToDelete)
      deletedCount = recordIdsToDelete.length
      console.log(`[Wind Scheduler] Deleted ${deletedCount} old records`)
    }

    return NextResponse.json({
      success: true,
      message: 'Wind forecast data updated successfully',
      insertedRecords: insertedCount,
      existingRecords: existingRecords.records?.length || 0,
      deletedRecords: deletedCount,
      totalForecastPoints: forecastData.length,
      location: {
        name: locationName,
        lat: locationLat,
        lng: locationLng
      },
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('[Wind Scheduler] Error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Failed to update wind forecast data',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// GET endpoint for manual testing and status checking
export async function GET(request: NextRequest) {
  try {
    const airtable = new AirtableService()
    
    // Get recent records
    const recentRecords = await airtable.getRecords('wind_forecasts', {
      maxRecords: 10,
      sort: [{ field: 'forecast_time', direction: 'desc' }]
    })

    // Get record count
    const allRecords = await airtable.getRecords('wind_forecasts', {
      maxRecords: 1
    })

    return NextResponse.json({
      success: true,
      message: 'Wind forecast scheduler status',
      totalRecords: allRecords.records?.length || 0,
      recentRecords: recentRecords.records?.map(record => ({
        id: record.id,
        location: record.fields.location_name,
        forecastTime: record.fields.forecast_time,
        windSpeed: record.fields.wind_speed_knots,
        windDirection: record.fields.wind_direction_cardinal,
        temperature: record.fields.temperature_celsius,
        created: record.fields.created_at
      })) || [],
      schedulerEnabled: process.env.WIND_FORECAST_SCHEDULER_ENABLED === 'true',
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('[Wind Scheduler] Status check error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Failed to check scheduler status',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
