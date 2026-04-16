import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/', label: 'Dashboard' },
  { href: '/procurement', label: 'Procurement (MM)' },
  { href: '/production', label: 'Production (PP)' },
  { href: '/sales', label: 'Sales (SD)' },
  { href: '/reports', label: 'Financial Reports (FI)' }
]

export default function Sidebar(){
  const pathname = usePathname()
  return (
    <aside className="w-72 p-6 border-r border-gray-800 min-h-screen">
      <div className="mb-8">
        <div className="text-2xl font-bold glow-heading">AI-Powered SAP</div>
        <div className="text-sm text-gray-400 mt-1">Business Process Simulator</div>
      </div>

      <nav className="space-y-1">
        {nav.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href} className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-gray-200 ${active ? 'text-white' : 'text-gray-200'}`}>
              <span className={`absolute left-0 top-0 bottom-0 w-1 rounded-full ${active ? 'bg-gradient-to-b from-[#7c3aed] to-[#0ea5a4]' : 'bg-transparent'}`} />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-white"><path d="M3 12h18"/></svg>
              <span className="text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-10 text-xs text-gray-500">Dark mode • SaaS UI</div>
    </aside>
  )
}
