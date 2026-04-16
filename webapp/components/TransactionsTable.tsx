"use client"

import React, { useEffect, useState } from 'react'
import { useAppState } from '../context/AppState'

export default function TransactionsTable(){
  const { history } = useAppState()
  const [items, setItems] = useState<any[] | null>(null)

  useEffect(() => {
    // Format timestamps on client to avoid SSR/CSR mismatches
    const formatted = history.map((t) => ({
      ...t,
      formattedTs: new Date(t.ts).toLocaleString()
    }))
    setItems(formatted)
  }, [history])

  if (!items) {
    return (
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-400 text-xs">
            <tr>
              <th className="py-2">#</th>
              <th className="py-2">Type</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-800">
              <td className="py-4 text-gray-500" colSpan={4}>Loading transactions…</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-gray-400 text-xs">
          <tr>
            <th className="py-2">#</th>
            <th className="py-2">Type</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {items.map((t, i) => (
            <tr key={i} className="border-t border-gray-800">
              <td className="py-2 text-gray-300">{i+1}</td>
              <td className="py-2 text-gray-200">{t.type}</td>
              <td className="py-2 text-green-300">{t.type === 'Sale' ? `₹${t.amount}` : `-₹${t.amount}`}</td>
              <td className="py-2 text-gray-400">{t.formattedTs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
