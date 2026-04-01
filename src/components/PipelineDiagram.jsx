import React from 'react'

export default function PipelineDiagram({ isAlert, leakLocation }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5 shadow-lg">
      <span className="font-display font-semibold text-sm tracking-widest text-slate-300 uppercase block mb-4">
        Pipeline Segment View
      </span>

      <svg viewBox="0 0 480 140" className="w-full" aria-label="Pipeline diagram">

        
        <defs>
          <linearGradient id="pipeGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a5f" />
          </linearGradient>

          <linearGradient id="flowGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 Z" fill="#38bdf8" />
          </marker>
        </defs>

       
        <rect x="60" y="55" width="360" height="26" rx="6" fill="url(#pipeGradient)" stroke="#334155" strokeWidth="1.5" />

        {/* Animated flow inside pipe */}
        {!isAlert && (
          <rect x="60" y="60" width="360" height="6" fill="url(#flowGradient)" opacity="0.5">
            <animate attributeName="x" values="60;100;60" dur="2s" repeatCount="indefinite" />
          </rect>
        )}

        {/* PT-1 */}
        <rect x="50" y="25" width="55" height="70" rx="8" fill="#020617" stroke="#fbbf24" strokeWidth="1.5" filter="url(#glow)" />
        <text x="78" y="20" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">PT-1</text>
        <line x1="78" y1="25" x2="78" y2="55" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="78" y="70" textAnchor="middle" fill="#94a3b8" fontSize="9">UPSTREAM</text>

        {/* PT-2 */}
        <rect x="375" y="25" width="55" height="70" rx="8" fill="#020617" stroke="#22d3ee" strokeWidth="1.5" filter="url(#glow)" />
        <text x="402" y="20" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">PT-2</text>
        <line x1="402" y1="25" x2="402" y2="55" stroke="#22d3ee" strokeWidth="1.5" />
        <text x="402" y="70" textAnchor="middle" fill="#94a3b8" fontSize="9">DOWNSTREAM</text>

        {/* Flow arrows */}
        {!isAlert && (
          <>
            <path d="M 150 68 L 180 68" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 220 68 L 250 68" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 290 68 L 320 68" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
          </>
        )}

        {/* Leak Indicator */}
        {isAlert && (
          <>
            {/* Explosion glow */}
            <circle cx="240" cy="85" r="10" fill="#ef4444" opacity="0.4">
              <animate attributeName="r" values="10;20" dur="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0" dur="1s" repeatCount="indefinite" />
            </circle>

            {/* Leak drop */}
            <ellipse cx="240" cy="78" rx="6" ry="4" fill="#ef4444" />

            {/* Drip line */}
            <line x1="240" y1="70" x2="240" y2="78" stroke="#ef4444" strokeWidth="2" />

            {/* Label */}
            <rect x="200" y="100" width="80" height="18" rx="4" fill="#7f1d1d" stroke="#ef4444" />
            <text x="240" y="112" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">
               LEAK DETECTED
            </text>
          </>
        )}

        {/* Normal state */}
        {!isAlert && (
          <text x="240" y="115" textAnchor="middle" fill="#22c55e" fontSize="10">
             FLOW NORMAL
          </text>
        )}
      </svg>
    </div>
  )
}