import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Props = { title: string, value: number | string, delta?: number, progress?: number }

function useCountUp(end: number, duration = 1200) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = performance.now()
    let from = 0
    const step = (t: number) => {
      const elapsed = t - start
      const pct = Math.min(1, elapsed / duration)
      setVal(Math.round(from + (end - from) * pct))
      if (pct < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration])
  return val
}

export default function KPI({ title, value, delta, progress }: Props){
  const numeric = typeof value === 'number'
  const displayed = numeric ? useCountUp(value as number, 1200) : value

  return (
    <motion.div className="card-glass rounded-2xl p-5 kpi fade-in visible" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">{title}</div>
        <div className={`text-xs ${delta && delta > 0 ? 'text-green-400' : 'text-red-400'}`}>{delta !== undefined && `${delta > 0 ? '+' : ''}${delta}%`}</div>
      </div>
      <div className="mt-4 text-2xl font-bold">{displayed}</div>
      {typeof progress === 'number' && (
        <div className="mt-3">
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-[#7c3aed] to-[#0ea5a4] shadow-md" style={{ width: `${Math.max(0, Math.min(100, progress))}%`, transition: 'width 1.1s ease' }} />
          </div>
          <div className="mt-1 text-xs text-gray-400">Inventory utilization</div>
        </div>
      )}
      {!progress && <div className="mt-3 text-sm text-gray-400">Compared to last period</div>}
    </motion.div>
  )
}
