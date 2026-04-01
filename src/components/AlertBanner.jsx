import React from 'react'

export default function AlertBanner({ alerts, isAlert, onDismiss }) {
  if (!isAlert || alerts.length === 0) return null

  const latest = alerts[0]

  return (
    <div className="slide-in w-full rounded-xl border border-red-500 bg-red-950/60 glow-red p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-start gap-3">
        <span className="text-red-400 text-2xl mt-0.5 alert-pulse">⚠</span>
        <div>
          <p className="text-red-300 font-display font-bold text-lg tracking-wide uppercase">
            {latest.type}
          </p>
          <p className="text-red-400 font-mono text-xs mt-0.5">
            Sensor: <span className="font-bold">{latest.sensor}</span>
            &nbsp;|&nbsp;
            Time: <span className="font-bold">{latest.timestamp}</span>
            &nbsp;|&nbsp;
            PT-1 dropped to <span className="font-bold">{latest.pt1} PSI</span>
          </p>
        </div>
      </div>
      <button
        onClick={onDismiss}
        className="shrink-0 text-xs font-mono border border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
      >
        DISMISS
      </button>
    </div>
  )
}