"use client"

import React, { useState } from 'react'
import Layout from '../components/Layout'
import ActionButton from '../components/ActionButton'
import { useAppState } from '../context/AppState'

export default function Production(){
  const { raw, finished, produce } = useAppState()
  const [qty, setQty] = useState(20)

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-neon p-6">
          <h2 className="text-xl font-bold mb-4">Production Pipeline</h2>
          <div className="mb-4">Raw: <strong>{raw}</strong> → Finished: <strong>{finished}</strong></div>
          <div className="w-full bg-gray-800 h-4 rounded-full overflow-hidden mb-4"><div className="h-4 bg-gradient-to-r from-[#7c3aed] to-[#0ea5a4]" style={{width: `${Math.min(100, (finished/(raw+finished||1))*100)}%`, transition: 'width 1s ease'}} /></div>
          <div className="flex gap-3 items-center">
            <input type="number" value={qty} onChange={e=> setQty(Number(e.target.value))} className="w-32 p-2 rounded bg-transparent border border-gray-800" />
            <ActionButton onClick={() => { produce(qty) }} successMessage="Production executed" className="btn-primary">Run Production</ActionButton>
          </div>
        </div>

        <div className="card-neon p-6">
          <h3 className="text-lg font-semibold mb-3">Production History</h3>
          <div className="text-sm text-gray-400">Recent runs and logs will appear here.</div>
        </div>
      </div>
    </Layout>
  )
  }
