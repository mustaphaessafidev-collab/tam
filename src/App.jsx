import { useState, useEffect } from 'react'

const START_DATE = new Date(2026, 5, 11, 14, 0, 0)

function getElapsedTime(start) {
  const total = Math.max(0, Date.now() - start.getTime())

  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  }
}

function TimeCard({ value, label, pad = true }) {
  const display = pad ? String(value).padStart(2, '0') : String(value)

  return (
    <div className="flex min-w-[5.5rem] flex-1 flex-col items-center rounded-2xl border border-white/30 bg-white/20 px-4 py-6 shadow-xl shadow-indigo-900/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/30 sm:min-w-[7rem] sm:px-6 sm:py-8">
      <span className="text-4xl font-bold tabular-nums tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
        {display}
      </span>
      <span className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-sm">
        {label}
      </span>
    </div>
  )
}

export default function App() {
  const [elapsed, setElapsed] = useState(() => getElapsedTime(START_DATE))

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getElapsedTime(START_DATE))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 px-4 py-12">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-pink-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-cyan-400/25 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

      <div className="relative w-full max-w-4xl rounded-3xl border border-white/20 bg-white/10 p-8 text-center shadow-2xl shadow-indigo-900/30 backdrop-blur-xl sm:p-12">
        <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
          Count-Up Timer
        </h1>
        <p className="mt-4 text-base text-white/80 sm:text-lg">
          Time elapsed since June 11, 2026 at 02:00 PM
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          <TimeCard value={elapsed.days} label="Days" pad={false} />
          <TimeCard value={elapsed.hours} label="Hours" />
          <TimeCard value={elapsed.minutes} label="Minutes" />
          <TimeCard value={elapsed.seconds} label="Seconds" />
        </div>
      </div>
    </div>
  )
}
