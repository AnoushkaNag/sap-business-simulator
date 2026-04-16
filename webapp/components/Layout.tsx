"use client"

import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import AIChatButton from './AIChatButton'
import { motion } from 'framer-motion'

export default function Layout({ children }: { children: React.ReactNode }){
  return (
    <div className="app-shell min-h-screen flex bg-animated">
      <Sidebar />
      <div className="flex-1 p-6">
        <Navbar />
        <motion.main className="mt-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          {children}
        </motion.main>
      </div>
      <AIChatButton />
    </div>
  )
}
