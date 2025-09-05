import { NextResponse } from "next/server"

export const revalidate = 60

const SOURCE_URL = "https://panoramicams.com/ecowitt/get_json.php?station=panoramicamsweather_GW1100A-WIFI935C&location=sabarra"

function toKts(val: number | null | undefined, unit: "mph"|"kmh"|"ms"): number | null {
  if (val == null || isNaN(val as number)) return null
  const n = Number(val)
  if (unit === "mph") return +(n * 0.868976).toFixed(1)
  if (unit === "kmh") return +(n * 0.539957).toFixed(1)
  if (unit === "ms")  return +(n * 1.94384).toFixed(1)
  return null
}

function degToCardinal(deg?: number | null): string | null {
  if (deg == null || isNaN(deg)) return null
  const dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
  return dirs[Math.round((deg % 360) / 22.5) % 16]
}

export async function GET() {
  try {
    const res = await fetch(SOURCE_URL, { 
      next: { revalidate: 60 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; KiteSafaris/1.0)',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    })
    if (!res.ok) {
      console.error(`Wind API upstream error: ${res.status} ${res.statusText}`)
      throw new Error(`Upstream ${res.status}`)
    }
    const data = await res.json()

    // Try to detect units & values from common Ecowitt keys
    const windDirDeg = Number(data.winddir ?? data.wind_dir ?? data.winddirection ?? data.wind_dir_deg ?? NaN)
    const tempC = data.tempc ?? (data.tempf != null ? +(((data.tempf - 32) * 5) / 9).toFixed(1) : null)
    const humidity = data.humidity ?? data.rh ?? null

    let windAvgKts: number | null = null
    let windGustKts: number | null = null

    if (data.windspeedmph != null || data.windgustmph != null) {
      windAvgKts  = toKts(data.windspeedmph, "mph")
      windGustKts = toKts(data.windgustmph, "mph")
    } else if (data.windspeedkmh != null || data.windgustkmh != null) {
      windAvgKts  = toKts(data.windspeedkmh, "kmh")
      windGustKts = toKts(data.windgustkmh, "kmh")
    } else if (data.windspeedms != null || data.windgustms != null || data.windspeed_ms != null) {
      windAvgKts  = toKts(data.windspeedms ?? data.windspeed_ms, "ms")
      windGustKts = toKts(data.windgustms, "ms")
    } else if (data.windspeed != null && typeof data.windspeed === "number") {
      // If an unlabeled number appears, assume m/s (common with Ecowitt)
      windAvgKts = toKts(data.windspeed, "ms")
    }

    const updatedAt =
      data.datetime ??
      data.last_updated ??
      data.time_iso ??
      new Date().toISOString()

    return NextResponse.json({
      updatedAt,
      windAvgKts,
      windGustKts,
      windDirDeg: isNaN(windDirDeg) ? null : windDirDeg,
      windDirCardinal: degToCardinal(windDirDeg) ?? null,
      tempC: tempC ?? null,
      humidity: humidity ?? null,
      raw: data,
    }, {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300"
      }
    })
  } catch (e: any) {
    console.error('Wind API error:', e.message)
    
    // Return proper error response instead of mock data
    return NextResponse.json({ 
      error: "upstream_unavailable", 
      message: "Wind data temporarily unavailable. The weather station API is currently inaccessible.",
      details: e.message,
      updatedAt: new Date().toISOString()
    }, { 
      status: 503,
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300"
      }
    })
  }
}
