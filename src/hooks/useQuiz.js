import { useState, useEffect, useCallback, useRef } from 'react'
import { decodeHtml, shuffle, STORAGE_KEY, DEFAULT_SETTINGS } from '../utils/helpers'

export function useQuiz(user) {
  const [page, setPage]               = useState('login')
  const [settings, setSettings]       = useState(DEFAULT_SETTINGS)
  const [savedQuiz, setSavedQuiz]     = useState(null)
  const [questions, setQuestions]     = useState([])
  const [current, setCurrent]         = useState(0)
  const [answers, setAnswers]         = useState([])
  const [shuffledOpts, setShuffledOpts] = useState([])
  const [timeLeft, setTimeLeft]       = useState(DEFAULT_SETTINGS.duration)
  const [totalDuration, setTotalDuration] = useState(DEFAULT_SETTINGS.duration)
  const [loadErr, setLoadErr]         = useState('')
  const [chosen, setChosen]           = useState(null)
  const [revealed, setRevealed]       = useState(false)
  const [timedOut, setTimedOut]       = useState(false)

  const timerRef = useRef(null)
  const nextRef  = useRef(null)

  // Load saved quiz on login
  useEffect(() => {
    if (!user) return
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const d = JSON.parse(saved)
        if (d.user === user && d.questions?.length) setSavedQuiz(d)
      }
    } catch {}
    setPage('setup')
  }, [user])

  const saveState = useCallback((qs, cur, ans, tl, dur) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        user, questions: qs, current: cur,
        answers: ans, timeLeft: tl, totalDuration: dur,
      }))
    } catch {}
  }, [user])

  const clearSaved = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
    setSavedQuiz(null)
  }, [])

  // Timer
  useEffect(() => {
    if (page !== 'quiz') return
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          setTimedOut(true)
          setPage('result')
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [page])

  // Persist state every tick
  useEffect(() => {
    if (page !== 'quiz' || !questions.length) return
    saveState(questions, current, answers, timeLeft, totalDuration)
  }, [current, answers, timeLeft, page])

  const startQuiz = async (resumeData = null) => {
    clearInterval(timerRef.current)
    clearTimeout(nextRef.current)

    if (resumeData) {
      setQuestions(resumeData.questions)
      setCurrent(resumeData.current)
      setAnswers(resumeData.answers)
      setTimeLeft(resumeData.timeLeft)
      setTotalDuration(resumeData.totalDuration)
      setShuffledOpts(resumeData.questions[resumeData.current]?._opts_decoded || [])
      setChosen(null)
      setRevealed(false)
      setTimedOut(false)
      setPage('quiz')
      clearSaved()
      return
    }

    setLoadErr('')
    setPage('loading')

    try {
      const url = `https://opentdb.com/api.php?amount=${settings.amount}&difficulty=${settings.difficulty}&type=multiple`
      const res  = await fetch(url)
      const data = await res.json()
      if (data.response_code !== 0) throw new Error('Gagal memuat soal. Coba lagi.')

      const qs = data.results.map((q) => {
        const opts = shuffle([...q.incorrect_answers, q.correct_answer])
        return {
          ...q,
          question: decodeHtml(q.question),
          correct_answer: decodeHtml(q.correct_answer),
          _opts_decoded: opts.map(decodeHtml),
        }
      })

      setQuestions(qs)
      setCurrent(0)
      setAnswers(Array(qs.length).fill(null))
      setTimeLeft(settings.duration)
      setTotalDuration(settings.duration)
      setShuffledOpts(qs[0]?._opts_decoded || [])
      setChosen(null)
      setRevealed(false)
      setTimedOut(false)
      setPage('quiz')
    } catch (err) {
      setLoadErr(err.message || 'Terjadi kesalahan jaringan')
      setPage('setup')
    }
  }

  const handleAnswer = (opt) => {
    if (revealed) return
    const q = questions[current]
    const correct   = decodeHtml(q.correct_answer)
    const isCorrect = opt === correct
    setChosen(opt)
    setRevealed(true)
    const newAnswers = [...answers]
    newAnswers[current] = { chosen: opt, correct, isCorrect }
    setAnswers(newAnswers)

    nextRef.current = setTimeout(() => {
      if (current + 1 >= questions.length) {
        clearInterval(timerRef.current)
        clearSaved()
        setPage('result')
      } else {
        const next = current + 1
        setCurrent(next)
        setShuffledOpts(questions[next]._opts_decoded || [])
        setChosen(null)
        setRevealed(false)
      }
    }, 1000)
  }

  const computeResult = () => {
    const answered = answers.filter(Boolean)
    return {
      total:    questions.length,
      answered: answered.length,
      correct:  answered.filter(a => a.isCorrect).length,
      wrong:    answered.filter(a => !a.isCorrect).length,
      skipped:  questions.length - answered.length,
    }
  }

  const resetToSetup = () => {
    clearSaved()
    setPage('setup')
  }

  return {
    page, setPage,
    settings, setSettings,
    savedQuiz, clearSaved,
    questions, current,
    answers, shuffledOpts,
    timeLeft, totalDuration,
    loadErr,
    chosen, revealed,
    timedOut,
    startQuiz,
    handleAnswer,
    computeResult,
    resetToSetup,
  }
}
