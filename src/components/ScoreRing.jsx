export default function ScoreRing({ pct }) {
  const R = 43
  const C = 2 * Math.PI * R
  const offset = C - (pct / 100) * C
  const color  = pct >= 70 ? '#3D7A5A' : pct >= 40 ? '#d97706' : '#C0392B'

  return (
    <div className="score-ring-wrap">
      <svg className="score-svg" viewBox="0 0 100 100">
        <circle className="score-track" cx="50" cy="50" r={R} />
        <circle
          className="score-arc"
          cx="50" cy="50" r={R}
          style={{ stroke: color, strokeDasharray: C, strokeDashoffset: offset }}
        />
      </svg>
      <div className="score-inner">
        <span className="score-pct">{pct}%</span>
        <span className="score-pct-lbl">skor</span>
      </div>
    </div>
  )
}
