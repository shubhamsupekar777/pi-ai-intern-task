import React from 'react'

export default function SensorCard({ label, id, value, isAlert, unit = 'PSI' }) {
  const alertSensor = isAlert && id === 'PT-1'

  return (
    <div
      className={`
        relative rounded-xl border p-4 transition-all duration-500
        ${alertSensor
          ? 'border-red-500 bg-red-950/40 glow-red'
          : 'border-slate-700 bg-slate-800/60'}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-display font-semibold tracking-widest text-slate-400 uppercase">
          {label}
        </span>
        <span
          className={`text-xs font-mono px-2 py-0.5 rounded-full border
            ${alertSensor
              ? 'border-red-500 text-red-400 bg-red-900/30'
              : 'border-amber-500/40 text-amber-400 bg-amber-900/20'}`}
        >
          {id}
        </span>
      </div>

      <div className={`text-4xl font-mono font-bold tracking-tight
        ${alertSensor ? 'text-red-400 alert-pulse' : 'text-amber-400'}`}>
        {value !== null ? value.toFixed(1) : '--.-'}
        <span className="text-sm font-normal text-slate-500 ml-1">{unit}</span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full
            ${alertSensor ? 'bg-red-500 animate-pulse' : 'bg-green-400 animate-pulse'}`}
        />
        <span className={`text-xs font-mono ${alertSensor ? 'text-red-400' : 'text-green-400'}`}>
          {alertSensor ? 'ANOMALY' : 'LIVE'}
        </span>
      </div>
    </div>
  )
}