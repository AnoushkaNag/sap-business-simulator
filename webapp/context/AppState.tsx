"use client"

import React, { createContext, useContext, useState } from 'react'

type Txn = { type: 'Purchase'|'Production'|'Sale', amount: number, ts: number }

type AppState = {
  raw: number
  finished: number
  revenue: number
  expenses: number
  history: Txn[]
  purchase: (qty: number, unitCost?: number) => void
  produce: (qty: number) => void
  sell: (qty: number, unitPrice?: number) => void
}

const AppStateContext = createContext<AppState | undefined>(undefined)

export function AppStateProvider({ children }: { children: React.ReactNode }){
  const [raw, setRaw] = useState(1200)
  const [finished, setFinished] = useState(450)
  const [revenue, setRevenue] = useState(1800)
  const [expenses, setExpenses] = useState(1050)
  const [history, setHistory] = useState<Txn[]>([])

  function pushTxn(t: Txn){
    setHistory(s => [t, ...s])
  }

  function purchase(qty: number, unitCost = 10){
    if (qty <= 0) return
    const cost = qty * unitCost
    setRaw(r => r + qty)
    setExpenses(e => e + cost)
    pushTxn({ type: 'Purchase', amount: cost, ts: Date.now() })
  }

  function produce(qty: number){
    if (qty <= 0) return
    setRaw(r => {
      if (qty > r) return r
      setFinished(f => f + qty)
      pushTxn({ type: 'Production', amount: 0, ts: Date.now() })
      return r - qty
    })
  }

  function sell(qty: number, unitPrice = 20){
    if (qty <= 0) return
    setFinished(f => {
      if (qty > f) return f
      const value = qty * unitPrice
      setRevenue(r => r + value)
      pushTxn({ type: 'Sale', amount: value, ts: Date.now() })
      return f - qty
    })
  }

  return (
    <AppStateContext.Provider value={{ raw, finished, revenue, expenses, history, purchase, produce, sell }}>
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState(){
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}
