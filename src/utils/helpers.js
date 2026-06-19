export function decodeHtml(html) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const STORAGE_KEY = 'quiz_state_v2'

export const DIFFICULTY_LABELS = ['easy', 'medium', 'hard']

export const AMOUNT_OPTIONS = [5, 10, 15, 20]

export const DURATION_OPTIONS = [
  { label: '5 menit',  value: 5  * 60 },
  { label: '10 menit', value: 10 * 60 },
  { label: '15 menit', value: 15 * 60 },
  { label: '20 menit', value: 20 * 60 },
  { label: '30 menit', value: 30 * 60 },
]

export const LETTERS = ['A', 'B', 'C', 'D']

export const DEFAULT_SETTINGS = {
  amount: 10,
  difficulty: 'medium',
  duration: 10 * 60,
}

export function gradeLabel(pct) {
  if (pct >= 80) return 'Hasil yang sangat baik'
  if (pct >= 60) return 'Hasil yang baik'
  if (pct >= 40) return 'Cukup, terus berlatih'
  return 'Perlu lebih banyak latihan'
}
