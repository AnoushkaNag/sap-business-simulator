"use client"

import Layout from '../components/Layout'
import KPI from '../components/KPI'
import Charts from '../components/Charts'
import TransactionsTable from '../components/TransactionsTable'
import { useAppState } from '../context/AppState'
import ActionButton from '../components/ActionButton'
// using CSS-based transitions; framer-motion not available in this environment

export default function Home() {
  const { raw, finished, revenue, expenses, history, purchase, produce, sell } = useAppState()
  const profit = revenue - expenses

  return (
    <Layout>
      <main className="mt-6">
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="fade-in visible" style={{ transitionDelay: '50ms' }}>
              <KPI title="Revenue" value={revenue} delta={12} />
            </div>
            <div className="fade-in visible" style={{ transitionDelay: '120ms' }}>
              <KPI title="Expenses" value={expenses} delta={-4} />
            </div>
            <div className="fade-in visible" style={{ transitionDelay: '180ms' }}>
              <KPI title="Profit" value={profit} delta={18} />
            </div>
            <div className="fade-in visible" style={{ transitionDelay: '240ms' }}>
              <KPI title="Inventory" value={`${raw} / ${finished}`} progress={Math.round((finished / (raw + finished || 1)) * 100)} />
            </div>
          </section>

          <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card-glass rounded-2xl p-6 fade-in visible" style={{ transitionDelay: '300ms' }}>
              <Charts />
            </div>
            <div className="card-glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
              <TransactionsTable />
            </div>
          </section>

          <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card-glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="flex gap-3">
                <ActionButton onClick={() => { purchase(10) }} successMessage="Purchase created" className="bg-gray-800">Create Purchase Order (+10)</ActionButton>
                <ActionButton onClick={() => { produce(5) }} successMessage="Production run started" className="bg-gray-800">Run Production (-5 raw {'->'} +5 finished)
                <ActionButton onClick={() => { sell(3) }} successMessage="Sales order created" className="bg-gray-800">Create Sales Order (-3 finished)</ActionButton>
              </div>
            </div>
          </section>
      </main>
    </Layout>
  )
}
