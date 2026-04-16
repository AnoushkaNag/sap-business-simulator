"use client"

import React from 'react'
import Layout from '../components/Layout'
import Charts from '../components/Charts'
import { useAppState } from '../context/AppState'

export default function Reports(){
  const { revenue, expenses, history } = useAppState()

  function downloadReport(){
    const payload = {
      generatedAt: new Date().toISOString(),
      revenue,
      expenses,
      history
    }
    const json = JSON.stringify(payload, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sap-report-${new Date().toISOString()}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-neon p-6">
          <h2 className="text-xl font-bold mb-4">Profit & Expenses</h2>
          <div className="h-72"><Charts /></div>
        </div>

        <div className="card-neon p-6">
          <h3 className="text-lg font-semibold mb-3">Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="text-sm text-gray-400">Revenue</span><strong>${revenue}</strong></div>
            <div className="flex justify-between"><span className="text-sm text-gray-400">Expenses</span><strong>${expenses}</strong></div>
            <div className="mt-4"><button onClick={downloadReport} className="btn-primary px-4 py-2 rounded">Download Report</button></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

