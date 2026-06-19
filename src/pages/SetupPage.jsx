import { AMOUNT_OPTIONS, DIFFICULTY_LABELS, DURATION_OPTIONS } from '../utils/helpers'

function getTimeGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Selamat pagi'
  if (h < 15) return 'Selamat siang'
  if (h < 18) return 'Selamat sore'
  return 'Selamat malam'
}

export default function SetupPage({ user, settings, setSettings, savedQuiz, onStart, onResume, onDiscardSave, loadErr }) {
  const greeting = getTimeGreeting()

  return (
    <div className="screen">
      <div className="setup-card">

        {/* Greeting header */}
        <div className="setup-greeting-block">
          <p className="setup-greeting-label">{greeting},</p>
          <h2 className="setup-greeting-name">{user}</h2>
          <p className="setup-greeting-sub">Siap untuk kuis hari ini? Atur dulu preferensimu.</p>
        </div>

        {/* Resume banner */}
        {savedQuiz && (
          <div className="resume-banner">
            <div>
              <span className="resume-text">
                <i className="ti ti-history" style={{ fontSize: '0.9rem' }} />
                Kuis sebelumnya belum selesai
              </span>
              <p style={{ fontSize: '0.78rem', color: '#6b6b00', marginTop: '5px', paddingLeft: '0.4rem' }}>
                {savedQuiz.current + 1} dari {savedQuiz.questions.length} soal sudah dikerjakan
              </p>
            </div>
            <div className="resume-actions">
              <button className="btn-resume" onClick={onResume}>Lanjutkan</button>
              <button className="btn-discard" onClick={onDiscardSave}>Hapus</button>
            </div>
          </div>
        )}

        {/* Error */}
        {loadErr && (
          <div className="alert-error">
            <i className="ti ti-alert-circle" style={{ fontSize: '0.9rem' }} />
            {loadErr}
          </div>
        )}

        <div className="setup-divider" />

        <div className="form-group">
          <label className="form-label">Jumlah Soal</label>
          <select
            className="form-select"
            value={settings.amount}
            onChange={e => setSettings(p => ({ ...p, amount: +e.target.value }))}
          >
            {AMOUNT_OPTIONS.map(n => <option key={n} value={n}>{n} soal</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Tingkat Kesulitan</label>
          <select
            className="form-select"
            value={settings.difficulty}
            onChange={e => setSettings(p => ({ ...p, difficulty: e.target.value }))}
          >
            {DIFFICULTY_LABELS.map(d => (
              <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Durasi Kuis</label>
          <select
            className="form-select"
            value={settings.duration}
            onChange={e => setSettings(p => ({ ...p, duration: +e.target.value }))}
          >
            {DURATION_OPTIONS.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: '1.75rem' }}>
          <button className="btn btn-primary" onClick={onStart}>
            Mulai Kuis
            <i className="ti ti-arrow-right" style={{ fontSize: '0.9rem' }} />
          </button>
        </div>

      </div>
    </div>
  )
}
