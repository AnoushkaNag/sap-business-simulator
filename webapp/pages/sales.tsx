"use client"

import React, { useState } from 'react'
import Layout from '../components/Layout'
import ActionButton from '../components/ActionButton'
import Charts from '../components/Charts'
import { useAppState } from '../context/AppState'

export default function Sales(){
  const { revenue, sell } = useAppState()
  const [qty, setQty] = useState(1)
  const [customer, setCustomer] = useState('ACME Corp')

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-neon p-6">
          <h2 className="text-xl font-bold mb-4">Create Sales Order</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-400">Customer</label>
              <input value={customer} onChange={e=> setCustomer(e.target.value)} className="w-full mt-2 p-3 rounded-lg bg-transparent border border-gray-800" />
            </div>
            <div>
              <label className="text-sm text-gray-400">Quantity</label>
              <input type="number" value={qty} onChange={e=> setQty(Number(e.target.value))} className="w-full mt-2 p-3 rounded-lg bg-transparent border border-gray-800" />
            </div>
            <div>
              <ActionButton onClick={() => { sell(qty) }} successMessage="Order created" className="btn-primary">Submit Order</ActionButton>
            </div>
          </div>
        </div>

        <div className="card-neon p-6">
          <h3 className="text-lg font-semibold mb-3">Revenue</h3>
          <div className="text-3xl font-bold mb-2">${revenue}</div>
          <div className="h-36"><Charts /></div>
        </div>
      </div>
    </Layout>
  )
}

