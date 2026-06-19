export default function LoadingPage({ amount }) {
  return (
    <div className="screen">
      <div className="loading-wrap">
        <div className="loading-spinner" />
        <p className="loading-title">Memuat soal...</p>
        <p className="loading-sub">Mengambil {amount} soal dari Open Trivia DB</p>
      </div>
    </div>
  )
}
