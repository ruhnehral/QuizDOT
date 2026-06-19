import { useState } from 'react'

export default function LoginPage({ onLogin }) {
  const [form, setForm]   = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.username.trim()) { setError('Username wajib diisi'); return }
    if (form.password.length < 3) { setError('Password minimal 3 karakter'); return }
    setError('')
    onLogin(form.username)
  }

  return (
    <div className="login-screen">
      {/* Left panel — branding */}
      <div className="login-left">
        <div className="login-left-inner">
          <span className="login-wordmark">QuizDOT</span>
          <p className="login-tagline">
            Uji pengetahuanmu,<br />satu soal dalam satu waktu.
          </p>
          <div className="login-decoration" aria-hidden="true">
            <div className="deco-ring deco-ring-1" />
            <div className="deco-ring deco-ring-2" />
            <div className="deco-ring deco-ring-3" />
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="login-right">
        <div className="login-form-wrap">
          <h2 className="login-form-title">Masuk</h2>
          <p className="login-form-sub">Gunakan username & password kamu</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                className="form-input"
                type="text"
                placeholder="cth. budi_santoso"
                value={form.username}
                onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="Min. 3 karakter"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              />
              {error && (
                <p className="error-msg">
                  <i className="ti ti-info-circle" style={{ fontSize: '0.85rem' }} />
                  {error}
                </p>
              )}
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <button className="btn btn-primary" type="submit">
                Masuk
                <i className="ti ti-arrow-right" style={{ fontSize: '0.9rem' }} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
