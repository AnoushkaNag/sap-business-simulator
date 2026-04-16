"use client"

import React, { useEffect, useState } from 'react'
import { useAppState } from '../context/AppState'

export default function Charts(){
  const { history, revenue, expenses } = useAppState()
  const [series, setSeries] = useState<any[]>([])
  const [Recharts, setRecharts] = useState<any | null>(null)

  // compute series from history (or fallback to current totals)
  useEffect(() => {
    const s = history.map((d) => ({
      name: new Date(d.ts).toLocaleTimeString(),
      revenue: d.type === 'Sale' ? d.amount : 0,
      expense: d.type === 'Purchase' ? d.amount : 0,
    })).reverse()

    if (!s || s.length === 0) {
      setSeries([{ name: new Date().toLocaleTimeString(), revenue, expense: expenses }])
    } else {
      setSeries(s)
    }
  }, [history, revenue, expenses])

  // load recharts dynamically on the client to avoid any server bundling/runtime issues
  useEffect(() => {
    let mounted = true
    import('recharts')
      .then((m) => { if (mounted) setRecharts(m) })
      .catch(() => { if (mounted) setRecharts(null) })
    return () => { mounted = false }
  }, [])

  if (!series || series.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">Financial Trends</h3>
        <div className="flex items-center justify-center py-20 text-gray-400">Loading chart…</div>
      </div>
    )
  }

  // If Recharts loaded, use it. Otherwise render a lightweight SVG sparkline as a fallback.
  if (Recharts) {
    const { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } = Recharts
    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">Financial Trends</h3>
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
            <LineChart data={series}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.06} />
              <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
              <YAxis tick={{ fill: '#9CA3AF' }} />
              <Tooltip animationDuration={150} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#34D399" strokeWidth={2} dot={false} animationDuration={900} />
              <Line type="monotone" dataKey="expense" stroke="#F87171" strokeWidth={2} dot={false} animationDuration={900} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Activity (bar)</h4>
          <div style={{ width: '100%', height: 140 }}>
            <ResponsiveContainer>
              <BarChart data={series}>
                <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
                <Tooltip animationDuration={120} />
                <Bar dataKey="revenue" fill="#60A5FA" isAnimationActive={true} animationDuration={900} />
                <Bar dataKey="expense" fill="#FB7185" isAnimationActive={true} animationDuration={900} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }

  // lightweight inline SVG sparkline fallback
  const values = series.map((s: any) => (s.revenue || 0) - (s.expense || 0))
  const max = Math.max(...values, 1)
  const points = values.map((v, i) => `${(i/(values.length-1 || 1))*100},${100 - (v/max)*100}`).join(' ')

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Financial Trends</h3>
      <div className="p-6 bg-gray-900 rounded-lg">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-40">
          <polyline fill="none" stroke="#60A5FA" strokeWidth={1.5} points={points} />
        </svg>
        <div className="mt-3 text-sm text-gray-400">Client-side chart fallback (lightweight)</div>
      </div>
    </div>
  )
}
