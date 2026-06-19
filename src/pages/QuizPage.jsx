import TimerRing from '../components/TimerRing'
import { decodeHtml, LETTERS } from '../utils/helpers'

export default function QuizPage({ questions, current, answers, shuffledOpts, timeLeft, totalDuration, revealed, chosen, onAnswer }) {
  if (!questions.length) return null

  const q          = questions[current]
  const correctDec = decodeHtml(q.correct_answer)

  return (
    <div className="quiz-wrap">

      {/* Header: counter + progress bar + timer */}
      <div className="quiz-hdr">
        <span className="q-counter">
          <strong>{current + 1}</strong> / {questions.length}
        </span>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${(current / questions.length) * 100}%` }}
          />
        </div>
        <TimerRing seconds={timeLeft} total={totalDuration} />
      </div>

      {/* Live score row */}
      <div className="stats-row">
        <span className="stat-chip">
          <span className="dot dot-correct" />
          <strong>{answers.filter(a => a?.isCorrect).length}</strong> benar
        </span>
        <span className="stat-chip">
          <span className="dot dot-wrong" />
          <strong>{answers.filter(a => a && !a.isCorrect).length}</strong> salah
        </span>
        <span className="stat-total">
          {answers.filter(Boolean).length} dijawab
        </span>
      </div>

      {/* Question card */}
      <div className="q-card">
        <div className="q-meta">
          <span className="tag tag-num">Soal {current + 1}</span>
          <span className="tag tag-cat">{decodeHtml(q.category)}</span>
          <span className={`tag tag-${q.difficulty}`}>{q.difficulty}</span>
        </div>
        <p className="q-text">{q.question}</p>
      </div>

      {/* Options */}
      <div className="options-list">
        {shuffledOpts.map((opt, i) => {
          let cls  = 'option-btn'
          let icon = null

          if (revealed) {
            if (opt === correctDec) {
              cls  += ' correct'
              icon  = <i className="ti ti-check opt-icon icon-correct" />
            } else if (opt === chosen) {
              cls  += ' wrong'
              icon  = <i className="ti ti-x opt-icon icon-wrong" />
            }
          }

          return (
            <button key={i} className={cls} disabled={revealed} onClick={() => onAnswer(opt)}>
              <span className="opt-letter">{LETTERS[i]}</span>
              <span style={{ flex: 1 }}>{opt}</span>
              {icon}
            </button>
          )
        })}
      </div>

    </div>
  )
}
