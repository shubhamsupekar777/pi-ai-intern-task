import React, { useState } from 'react'
import { useSensorData } from './hooks/useSensorData'
import SensorCard       from './components/SensorCard'
import StatusIndicator  from './components/StatusIndicator'
import AlertBanner      from './components/AlertBanner'
import PressureChart    from './components/PressureChart'
import AlertsLog        from './components/AlertsLog'
import PipelineDiagram  from './components/PipelineDiagram'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)

  const {
    chartData,
    alerts,
    isAlert,
    leakLocation,
    pt1,
    pt2,
    simulateLeak,
    dismissAlert,
  } = useSensorData()

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`
        min-h-screen font-mono transition-colors duration-300
        grid-bg
        ${darkMode
          ? 'bg-slate-950 text-white'
          : 'bg-slate-100 text-slate-900'}
      `}>

        {/* HEADER*/}
        <header className={`
          sticky top-0 z-50 border-b px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3
          ${darkMode
            ? 'bg-slate-950/90 border-slate-800 backdrop-blur'
            : 'bg-white/90 border-slate-200 backdrop-blur'}
        `}>
          <div>
            <h1 className="font-display font-bold text-xl tracking-widest text-amber-400 uppercase">
              PI·AI Pipeline Monitor
            </h1>
            <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              Real-time Pressure Sensor Dashboard · Segment A-7
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StatusIndicator isAlert={isAlert} />

            {/* Simulate Leak */}
            <button
              onClick={simulateLeak}
              className="text-xs font-mono border border-red-500/60 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg transition-all duration-200 hover:glow-red"
            >
               Simulate Leak
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`
                text-xs font-mono px-3 py-1.5 rounded-lg border transition-all
                ${darkMode
                  ? 'border-slate-600 text-slate-400 hover:border-amber-400 hover:text-amber-400'
                  : 'border-slate-300 text-slate-600 hover:border-slate-600'}
              `}
            >
              {darkMode ? '☀ Light' : '🌑 Dark'}
            </button>
          </div>
        </header>

        {/* MAIN CONTENT*/}
        <main className="max-w-7xl mx-auto px-4 py-6 space-y-5">

          {/* Alert Banner */}
          {isAlert && (
            <AlertBanner alerts={alerts} isAlert={isAlert} onDismiss={dismissAlert} />
          )}

          {/* Sensor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SensorCard label="Upstream Sensor"   id="PT-1" value={pt1} isAlert={isAlert} />
            <SensorCard label="Downstream Sensor" id="PT-2" value={pt2} isAlert={isAlert} />
          </div>

          {/* Chart and Alerts Log */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <PressureChart data={chartData} darkMode={darkMode} />
            </div>
            <div>
              <AlertsLog alerts={alerts} />
            </div>
          </div>

          {/* Pipeline Diagram */}
          <PipelineDiagram isAlert={isAlert} leakLocation={leakLocation} />

          {/* Footer */}
          <footer className={`text-center text-xs font-mono pb-4 ${darkMode ? 'text-slate-700' : 'text-slate-400'}`}>
  PI·AI Monitoring System · Updates every 2.5s · Leak Trigger: Drop &gt; 10 PSI
</footer>
        </main>
      </div>
    </div>
  )
}