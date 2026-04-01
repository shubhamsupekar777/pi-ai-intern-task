import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-900 border border-slate-600 rounded-lg p-3 text-xs font-mono shadow-xl">
      <p className="text-slate-400 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.value} PSI
        </p>
      ))}
    </div>
  )
}

export default function PressureChart({ data, darkMode }) {
  const gridColor  = darkMode ? '#1e293b' : '#e2e8f0'
  const axisColor  = darkMode ? '#475569' : '#94a3b8'

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="font-display font-semibold text-sm tracking-widest text-slate-300 uppercase">
          Live Pressure Trend
        </span>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-amber-400 inline-block" />
            <span className="text-slate-400">PT-1 Upstream</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-cyan-400 inline-block" />
            <span className="text-slate-400">PT-2 Downstream</span>
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="time"
            tick={{ fill: axisColor, fontSize: 10, fontFamily: 'JetBrains Mono' }}
            tickLine={false}
            axisLine={{ stroke: axisColor }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[40, 120]}
            tick={{ fill: axisColor, fontSize: 10, fontFamily: 'JetBrains Mono' }}
            tickLine={false}
            axisLine={{ stroke: axisColor }}
            unit=" PSI"
          />
          <Tooltip content={<CustomTooltip />} />
          {/* Safe operating range reference lines */}
          <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'MAX', fill: '#ef4444', fontSize: 9 }} />
          <ReferenceLine y={50}  stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'MIN', fill: '#ef4444', fontSize: 9 }} />
          <Line
            type="monotone"
            dataKey="PT1"
            stroke="#fbbf24"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: '#fbbf24' }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="PT2"
            stroke="#22d3ee"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: '#22d3ee' }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}