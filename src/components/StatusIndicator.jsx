import React from 'react'

export default function StatusIndicator({ isAlert }) {
  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-2 rounded-full border font-mono text-sm font-semibold
        transition-all duration-500
        ${isAlert
          ? 'border-red-500 bg-red-900/30 text-red-400 glow-red alert-pulse'
          : 'border-green-500 bg-green-900/20 text-green-400 glow-green'}
      `}
    >
      <span className={`w-3 h-3 rounded-full ${isAlert ? 'bg-red-500' : 'bg-green-400'} animate-pulse`} />
      PIPELINE STATUS:&nbsp;
      <span className="tracking-widest">{isAlert ? '⚠ UNDER ALERT' : '✓ NORMAL'}</span>
    </div>
  )
}