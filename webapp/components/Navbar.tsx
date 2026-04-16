import React from 'react'
import ActionButton from './ActionButton'

export default function Navbar(){

  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold glow-heading">Dashboard</h1>
        <p className="text-sm text-gray-400">Overview & insights</p>
      </div>

      <div className="flex items-center gap-4">
        <div>
          <ActionButton onClick={async () => { await new Promise(r => setTimeout(r, 700)); }} successMessage="Action completed" className="btn-primary">New Action</ActionButton>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center">JD</div>
        </div>
      </div>
    </header>
  )
}

// simple Navbar without local loading state; ActionButton handles loading/toast
