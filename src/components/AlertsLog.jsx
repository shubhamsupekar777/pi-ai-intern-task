import React from 'react'

export default function AlertsLog({ alerts }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
        <span className="font-display font-semibold text-sm tracking-widest text-slate-300 uppercase">
          Alerts Log
        </span>
        <span className="text-xs font-mono text-slate-500">
          {alerts.length} event{alerts.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* List */}
      <div className="overflow-y-auto flex-1 divide-y divide-slate-700/50 max-h-72">
        {alerts.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-slate-600 text-xs font-mono">
            No alerts yet
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="px-4 py-3 hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <span className="text-red-400 text-xs font-display font-semibold uppercase tracking-wide">
                  {alert.type}
                </span>
              </div>
              <div className="text-slate-400 text-xs font-mono pl-3.5">
                <span className="text-amber-400">{alert.sensor}</span>
                <span className="mx-1 text-slate-600">·</span>
                {alert.timestamp}
                <span className="mx-1 text-slate-600">·</span>
                <span className="text-slate-300">{alert.pt1} PSI</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}