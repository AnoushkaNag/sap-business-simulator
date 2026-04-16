"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useAppState } from '../context/AppState'
import ActionButton from './ActionButton'
import { showToast } from '../lib/toast'

type Props = { onClose: () => void }

type Msg = { id: number, author: 'ai' | 'user', text: string, display?: string }

function typeWrite(text: string, onTick: (s: string) => void, speed = 24){
  return new Promise<void>(resolve => {
    let i = 0
    const t = setInterval(() => {
      i++
      onTick(text.slice(0, i))
      if (i >= text.length){ clearInterval(t); resolve() }
    }, speed)
  })
}

export default function AIChatPanel({ onClose }: Props){
  const { raw, finished, revenue, expenses } = useAppState()
  const [messages, setMessages] = useState<Msg[]>([])
  const idRef = useRef(1)
  const running = useRef(false)

  function generateSuggestions(){
    const suggestions: string[] = []
    const profit = revenue - expenses
    if (finished < raw * 0.5) suggestions.push(`Production suggestion: Increase daily production to reduce raw inventory and meet demand.`)
    if (raw > finished * 2) suggestions.push(`Inventory alert: Raw material stock (${raw}) is high relative to finished goods (${finished}). Consider a purchase pause.`)
    if (profit < 0) suggestions.push(`Financial note: Profit is negative (${profit}). Review pricing or reduce expenses.`)
    if (suggestions.length === 0) suggestions.push(`All metrics look stable. Suggest monitoring lead times and running a promotional campaign to boost demand.`)
    return suggestions
  }

  async function runSuggestions(){
    if (running.current) return
    running.current = true
    setMessages([])
    const s = generateSuggestions()
    for (const text of s){
      const id = idRef.current++
      setMessages(prev => [...prev, { id, author: 'ai', text: '', display: '' }])
      await typeWrite(text, (partial) => {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, text, display: partial } : m))
      }, 18)
      await new Promise(r => setTimeout(r, 400))
    }
    running.current = false
    showToast('AI suggestions updated')
  }

  useEffect(() => { runSuggestions() }, [raw, finished, revenue, expenses])

  return (
    <div className="ai-chat-panel" role="dialog" aria-label="AI Assistant Panel">
      <div className="ai-chat-header">
        <div>
          <div className="text-sm font-semibold">AI Business Assistant</div>
          <div className="text-xs text-gray-400">Insights & suggested actions</div>
        </div>
        <div className="flex items-center gap-2">
          <ActionButton onClick={() => runSuggestions()} successMessage="Regenerated" className="px-3 py-1">Regenerate</ActionButton>
          <button onClick={onClose} className="text-gray-300 hover:text-white">✕</button>
        </div>
      </div>

      <div className="ai-chat-body">
        {messages.length === 0 && <div className="text-gray-400">Thinking...</div>}
        {messages.map(m => (
          <div key={m.id} className={`ai-message ${m.author === 'ai' ? 'ai' : 'user'}`}>
            <div className="ai-bubble">
              <div>{m.display ?? m.text}</div>
              {m.display !== undefined && m.display !== m.text && <span className="typing-cursor" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
