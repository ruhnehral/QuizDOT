export default function Topbar({ onLogout }) {
  return (
    <div className="topbar">
      <span className="topbar-brand">QuizDOT</span>
      <button className="logout-btn" onClick={onLogout}>
        <i className="ti ti-logout" style={{ fontSize: '0.85rem' }} />
        Logout
      </button>
    </div>
  )
}
