"use client"

import React, { useState } from 'react'
import Layout from '../components/Layout'
import ActionButton from '../components/ActionButton'
import { useAppState } from '../context/AppState'

export default function Production(){
  const { raw, finished, produce, history } = useAppState()
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
          {history.length === 0 ? (
            <div className="text-sm text-gray-400">No production runs yet.</div>
          ) : (
            <ul className="space-y-3 text-sm">
              {history.filter(h=>h.type==='Production').slice(0,10).map((h, idx) => (
                <li key={h.ts} className="border-t border-gray-800 pt-2">
                  <div className="text-xs text-gray-400">{new Date(h.ts).toLocaleString()}</div>
                  <div>Run #{history.length - idx} • Qty: {h.amount}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  )
}
