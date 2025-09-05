"use client"

import { useEffect, useState } from "react"

type WindData = {
  updatedAt: string
  windAvgKts: number | null
  windGustKts: number | null
  windDirDeg: number | null
  windDirCardinal: string | null
  tempC?: number | null
  humidity?: number | null
}

export default function WindConditionsCard({ endpoint = "/api/wind/punta-trettu" }: { endpoint?: string }) {
  const [data, setData] = useState<WindData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    async function load() {
      try {
        setLoading(true)
        const res = await fetch(endpoint, { cache: "no-store" })
        if (!res.ok) throw new Error(`API ${res.status}`)
        const json = await res.json()
        if (active) { 
          setData(json); 
          setError(null) 
        }
      } catch (e: any) {
        if (active) setError(e?.message ?? "Failed to load wind")
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    const t = setInterval(load, 60_000) // refresh every 60s
    return () => { active = false; clearInterval(t) }
  }, [endpoint])

  if (loading) {
    return (
      <div className="w-full rounded-xl bg-deep-navy/70 text-white p-4 md:p-5 shadow-lg">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          <span className="ml-3 text-sm">Loading wind conditions...</span>
        </div>
      </div>
    )
  }
  
  if (error || !data) {
    return (
      <div className="w-full rounded-xl bg-deep-navy/70 text-white p-4 md:p-5 shadow-lg">
        <div className="text-center py-4">
          <div className="text-sm opacity-80">Wind conditions temporarily unavailable</div>
          <div className="text-xs opacity-60 mt-1">Weather station API is currently inaccessible</div>
          <div className="text-xs opacity-50 mt-2">Contact us for alternative wind data sources</div>
        </div>
      </div>
    )
  }

  const updated = new Date(data.updatedAt)
  const avg = data.windAvgKts != null ? `${data.windAvgKts} kn` : "—"
  const gust = data.windGustKts != null ? `${data.windGustKts} kn` : "—"
  const dir = data.windDirDeg != null ? `${Math.round(data.windDirDeg)}° ${data.windDirCardinal ?? ""}`.trim() : "—"

  return (
    <section className="w-full rounded-xl bg-deep-navy/70 text-white p-4 md:p-5 shadow-lg" aria-label="Live wind conditions at Punta Trettu">
      <header className="flex items-center justify-between mb-3">
        <h3 className="text-base md:text-lg font-semibold">Live Wind — Punta Trettu</h3>
        <time className="text-xs opacity-80" title={updated.toLocaleString()}>
          Updated {timeAgo(updated)}
        </time>
      </header>

      <div className="grid grid-cols-3 gap-3 text-center">
        <Metric label="Average" value={avg} ariaLabel={`Wind average: ${avg}`} />
        <Metric label="Gust" value={gust} ariaLabel={`Wind gust: ${gust}`} />
        <Metric label="Direction" value={dir} ariaLabel={`Wind direction: ${dir}`} />
      </div>

      {(data.tempC != null || data.humidity != null) && (
        <div className="mt-3 grid grid-cols-2 gap-3 text-center text-sm opacity-90">
          {data.tempC != null && <MetricSmall label="Temp" value={`${data.tempC} °C`} ariaLabel={`Temperature: ${data.tempC} degrees Celsius`} />}
          {data.humidity != null && <MetricSmall label="Humidity" value={`${data.humidity}%`} ariaLabel={`Humidity: ${data.humidity} percent`} />}
        </div>
      )}
    </section>
  )
}

function Metric({ label, value, ariaLabel }: { label: string; value: string; ariaLabel: string }) {
  return (
    <div className="rounded-lg bg-white/5 px-3 py-4" aria-label={ariaLabel}>
      <div className="text-xs opacity-80">{label}</div>
      <div className="text-xl md:text-2xl font-bold">{value}</div>
    </div>
  )
}

function MetricSmall({ label, value, ariaLabel }: { label: string; value: string; ariaLabel: string }) {
  return (
    <div className="rounded-lg bg-white/5 px-3 py-2" aria-label={ariaLabel}>
      <div className="text-xs opacity-80">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  )
}

function timeAgo(date: Date) {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  const m = Math.floor(diff / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  return `${h}h ago`
}
