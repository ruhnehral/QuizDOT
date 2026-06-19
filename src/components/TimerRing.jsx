export default function TimerRing({ seconds, total }) {
  const R = 22
  const C = 2 * Math.PI * R
  const ratio  = Math.max(0, seconds / total)
  const offset = C - ratio * C
  const color  = ratio > 0.5 ? '#6AA6DA' : ratio > 0.25 ? '#d97706' : '#C0392B'
  const mins   = Math.floor(seconds / 60).toString().padStart(2, '0')
  const secs   = (seconds % 60).toString().padStart(2, '0')

  return (
    <div className="timer-wrap">
      <svg className="timer-svg" viewBox="0 0 56 56">
        <circle className="timer-track-ring" cx="28" cy="28" r={R} />
        <circle
          className="timer-ring"
          cx="28" cy="28" r={R}
          style={{ stroke: color, strokeDasharray: C, strokeDashoffset: offset }}
        />
      </svg>
      <div className="timer-inner">
        <span className="timer-time" style={{ color }}>{mins}:{secs}</span>
      </div>
    </div>
  )
}
