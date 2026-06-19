import { useState } from 'react'
import { useQuiz } from './hooks/useQuiz'
import Topbar      from './components/Topbar'
import LoginPage   from './pages/LoginPage'
import SetupPage   from './pages/SetupPage'
import LoadingPage from './pages/LoadingPage'
import QuizPage    from './pages/QuizPage'
import ResultPage  from './pages/ResultPage'

export default function App() {
  const [user, setUser] = useState(() => {
    try { return sessionStorage.getItem('quiz_user') || null } catch { return null }
  })

  const quiz = useQuiz(user)

  const handleLogin = (username) => {
    try { sessionStorage.setItem('quiz_user', username) } catch {}
    setUser(username)
  }

  const handleLogout = () => {
    try { sessionStorage.removeItem('quiz_user') } catch {}
    quiz.clearSaved()
    setUser(null)
    quiz.setPage('login')
  }

  return (
    <div className="app">

      {/* Top bar — shown on all pages except login */}
      {user && quiz.page !== 'login' && (
        <Topbar onLogout={handleLogout} />
      )}

      {/* ── LOGIN ── */}
      {quiz.page === 'login' && (
        <LoginPage onLogin={handleLogin} />
      )}

      {/* ── SETUP ── */}
      {quiz.page === 'setup' && (
        <SetupPage
          user={user}
          settings={quiz.settings}
          setSettings={quiz.setSettings}
          savedQuiz={quiz.savedQuiz}
          loadErr={quiz.loadErr}
          onStart={() => quiz.startQuiz()}
          onResume={() => quiz.startQuiz(quiz.savedQuiz)}
          onDiscardSave={quiz.clearSaved}
        />
      )}

      {/* ── LOADING ── */}
      {quiz.page === 'loading' && (
        <LoadingPage amount={quiz.settings.amount} />
      )}

      {/* ── QUIZ ── */}
      {quiz.page === 'quiz' && (
        <QuizPage
          questions={quiz.questions}
          current={quiz.current}
          answers={quiz.answers}
          shuffledOpts={quiz.shuffledOpts}
          timeLeft={quiz.timeLeft}
          totalDuration={quiz.totalDuration}
          revealed={quiz.revealed}
          chosen={quiz.chosen}
          onAnswer={quiz.handleAnswer}
        />
      )}

      {/* ── RESULT ── */}
      {quiz.page === 'result' && quiz.questions.length > 0 && (
        <ResultPage
          user={user}
          result={quiz.computeResult()}
          timedOut={quiz.timedOut}
          onNewQuiz={quiz.resetToSetup}
          onLogout={handleLogout}
        />
      )}

    </div>
  )
}
