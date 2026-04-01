import { useState, useEffect, useRef, useCallback } from 'react'

const PRESSURE_THRESHOLD = 10   
const MAX_POINTS        = 25    
const INTERVAL_MS       = 2500  

const fmt = (d) =>
  d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

export function useSensorData() {
  const [chartData, setChartData]   = useState([])
  const [alerts, setAlerts]         = useState([])
  const [isAlert, setIsAlert]       = useState(false)
  const [leakLocation, setLeakLocation] = useState(null)  // null | 'upstream' | 'midstream'
  const [pt1, setPt1]               = useState(85)
  const [pt2, setPt2]               = useState(75)

  const pt1Ref = useRef(85)
  const pt2Ref = useRef(75)
  const forceLeakRef = useRef(false)

  // Add a new alert entry
  const pushAlert = useCallback((sensor, pt1Val, pt2Val) => {
  const entry = {
    id: Date.now(),
    type: 'Potential Leak Detected',
    sensor,
    timestamp: fmt(new Date()),
    pt1: pt1Val.toFixed(1),
    pt2: pt2Val.toFixed(1),
  }

  setAlerts(prev => [entry, ...prev])
  setIsAlert(true)
  setLeakLocation('midstream')


  setTimeout(() => {
    setIsAlert(false)
    setLeakLocation(null)
  }, 10000)

}, [])
  
  const tick = useCallback(() => {
    let newPt1, newPt2
    const prevPt1 = pt1Ref.current
    const prevPt2 = pt2Ref.current

    if (forceLeakRef.current) {
      // Simulate a big sudden drop
      newPt1 = prevPt1 - (15 + Math.random() * 5)
      newPt2 = prevPt2 - (3  + Math.random() * 2)
      forceLeakRef.current = false
    } else {
      // Normal fluctuation ±2
      newPt1 = Math.max(40, Math.min(120, prevPt1 + (Math.random() * 4 - 2)))
      newPt2 = Math.max(40, Math.min(110, prevPt2 + (Math.random() * 4 - 2)))
    }

    const drop = prevPt1 - newPt1

    // Leak detection
    if (drop > PRESSURE_THRESHOLD) {
      pushAlert('PT-1 (Upstream)', newPt1, newPt2)
    }

  

    pt1Ref.current = newPt1
    pt2Ref.current = newPt2
    setPt1(newPt1)
    setPt2(newPt2)

    const point = {
      time: fmt(new Date()),
      PT1:  parseFloat(newPt1.toFixed(1)),
      PT2:  parseFloat(newPt2.toFixed(1)),
    }

    setChartData(prev => {
      const next = [...prev, point]
      return next.length > MAX_POINTS ? next.slice(next.length - MAX_POINTS) : next
    })
  }, [pushAlert])

  useEffect(() => {
    
    const seed = []
    let s1 = 85, s2 = 75
    for (let i = 0; i < 8; i++) {
      s1 = s1 + (Math.random() * 4 - 2)
      s2 = s2 + (Math.random() * 4 - 2)
      const d = new Date(Date.now() - (8 - i) * INTERVAL_MS)
      seed.push({ time: fmt(d), PT1: parseFloat(s1.toFixed(1)), PT2: parseFloat(s2.toFixed(1)) })
    }
    pt1Ref.current = s1
    pt2Ref.current = s2
    setPt1(s1)
    setPt2(s2)
    setChartData(seed)

    const interval = setInterval(tick, INTERVAL_MS)
    return () => clearInterval(interval)
  }, [tick])

  
  const simulateLeak = useCallback(() => {
    forceLeakRef.current = true
  }, [])

  const dismissAlert = useCallback(() => {
    setIsAlert(false)
    setLeakLocation(null)
  }, [])

  return { chartData, alerts, isAlert, leakLocation, pt1, pt2, simulateLeak, dismissAlert }
}