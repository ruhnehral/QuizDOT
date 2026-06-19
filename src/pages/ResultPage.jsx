import ScoreRing from '../components/ScoreRing'
import { gradeLabel } from '../utils/helpers'

export default function ResultPage({ user, result, timedOut, onNewQuiz, onLogout }) {
  const { total, answered, correct, wrong, skipped } = result
  const pct = Math.round((correct / total) * 100)

  return (
    <div className="screen">
      <div className="result-card">

        {timedOut && (
          <div className="alert-timeout">
            <i className="ti ti-clock-off" style={{ fontSize: '0.9rem', flexShrink: 0 }} />
            Waktu habis — kuis otomatis berakhir.
          </div>
        )}

        <ScoreRing pct={pct} />

        <h2 className="result-title">{gradeLabel(pct)}</h2>
        <p className="result-sub">{user}, kuis selesai.</p>

        {/* Main stats */}
        <div className="result-stats">
          <div className="r-stat">
            <div className="r-stat-num num-correct">{correct}</div>
            <div className="r-stat-lbl">Benar</div>
          </div>
          <div className="r-stat">
            <div className="r-stat-num num-wrong">{wrong}</div>
            <div className="r-stat-lbl">Salah</div>
          </div>
          <div className="r-stat">
            <div className="r-stat-num num-skip">{skipped}</div>
            <div className="r-stat-lbl">Terlewat</div>
          </div>
        </div>

        {/* Extra stat */}
        <div className="result-extra">
          <div className="r-stat-sm">
            <span className="r-stat-sm-lbl">Dikerjakan</span>
            <span className="r-stat-sm-val">{answered} / {total}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="result-actions">
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={onNewQuiz}>
            <i className="ti ti-refresh" style={{ fontSize: '0.9rem' }} />
            Kuis Baru
          </button>
          <button className="btn btn-outline" onClick={onLogout}>
            Logout
          </button>
        </div>

      </div>
    </div>
  )
}
