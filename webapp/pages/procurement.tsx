"use client"

import React, { useState } from 'react'
import Layout from '../components/Layout'
import ActionButton from '../components/ActionButton'
import Charts from '../components/Charts'
import { useAppState } from '../context/AppState'

export default function Procurement(){
  const { raw, purchase } = useAppState()
  const [qty, setQty] = useState(50)

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-neon p-6">
          <h2 className="text-xl font-bold mb-4">Create Purchase Order</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Quantity</label>
              <input type="number" value={qty} onChange={(e)=> setQty(Number(e.target.value))} className="w-full mt-2 p-3 rounded-lg bg-transparent border border-gray-800 focus:border-[#7c3aed] outline-none" />
            </div>
            <div>
              <ActionButton onClick={() => { purchase(qty) }} successMessage="Purchase placed" className="btn-primary">Submit Purchase</ActionButton>
            </div>
          </div>
        </div>

        <div className="card-neon p-6">
          <h3 className="text-lg font-semibold mb-3">Live Inventory</h3>
          <div className="text-3xl font-bold mb-2">{raw}</div>
          <div className="h-32"><Charts /></div>
        </div>
      </div>
    </Layout>
  )
}

