"use client"

import React, { useState, MouseEvent } from 'react'
import { showToast, showError } from '../lib/toast'

type Props = {
  children?: React.ReactNode
  label?: string
  className?: string
  onClick: () => void | Promise<void>
  successMessage?: string
}

export default function ActionButton({ children, label, className = '', onClick, successMessage }: Props){
  const [loading, setLoading] = useState(false)

  function createRipple(e: MouseEvent<HTMLButtonElement>){
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const span = document.createElement('span')
    span.className = 'ripple-effect'
    span.style.left = `${e.clientX - rect.left}px`
    span.style.top = `${e.clientY - rect.top}px`
    span.style.width = span.style.height = Math.max(rect.width, rect.height) + 'px'
    btn.appendChild(span)
    setTimeout(() => span.remove(), 700)
  }

  async function handleClick(e: MouseEvent<HTMLButtonElement>){
    if (loading) return
    createRipple(e)
    try{
      setLoading(true)
      const res = onClick()
      if (res && typeof (res as Promise<void>).then === 'function') await res
      setLoading(false)
      if (successMessage) showToast(successMessage)
    } catch (err){
      setLoading(false)
      showError('Action failed')
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} className={`ripple btn-advanced px-4 py-2 rounded-lg ${className} ${loading? 'btn-disabled' : ''}`}>
      {loading && <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 align-middle" />}
      <span>{children ?? label}</span>
    </button>
  )
}
