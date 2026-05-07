import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AssessmentStart from '../components/screening/AssessmentStart'
import MCQQuestion from '../components/screening/MCQQuestion'
import ProfileForm from '../components/screening/ProfileForm'
import TechQuestions from '../components/screening/TechQuestions'
import ThankYou from '../components/screening/ThankYou'

const STAGES = { start: 'start', loading: 'loading', mcq: 'mcq', profile: 'profile', tech: 'tech', submitting: 'submitting', thankyou: 'thankyou' }

function Spinner({ message, sub }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg">
      <div className="w-12 h-12 rounded-full border-4 border-surface border-t-accent animate-spin mb-6"></div>
      <p className="text-white font-medium">{message}</p>
      {sub && <p className="text-muted text-sm mt-2">{sub}</p>}
    </div>
  )
}

export default function CVScreeningAssessment() {
  const { config } = useParams()
  const [jobConfig, setJobConfig] = useState(null)
  const [stage, setStage] = useState(STAGES.start)
  const [questions, setQuestions] = useState(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [profileData, setProfileData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      const decoded = JSON.parse(decodeURIComponent(escape(atob(config))))
      setJobConfig(decoded)
    } catch {
      setError('This assessment link is invalid or has expired.')
    }
  }, [config])

  const handleStart = async () => {
    setStage(STAGES.loading)
    try {
      const res = await fetch('/api/generate-screening-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: jobConfig.role, topic: jobConfig.topic, techStack: jobConfig.techStack }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setQuestions(data)
      setStage(STAGES.mcq)
    } catch (err) {
      setError(err.message || 'Failed to load questions. Please try again.')
      setStage(STAGES.start)
    }
  }

  const handleMCQAnswer = (answer) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    if (currentQ < 9) {
      setCurrentQ(currentQ + 1)
    } else {
      setStage(STAGES.profile)
    }
  }

  const handleProfileSubmit = (data) => {
    setProfileData(data)
    setStage(STAGES.tech)
  }

  const handleTechSubmit = async (techAnswers) => {
    setStage(STAGES.submitting)

    const mcqScore = answers.reduce((score, ans, i) => {
      return score + (ans === questions.mcqs[i].correct ? 1 : 0)
    }, 0)

    const mcqPct = (mcqScore / 10) * 100
    const mcqPass = mcqPct >= Number(jobConfig.passPct)
    const expPass = Number(profileData.expYears) >= Number(jobConfig.minExp) && Number(profileData.expYears) <= Number(jobConfig.maxExp)
    const locationPass = profileData.location.toLowerCase().includes(jobConfig.requiredLocation.toLowerCase())

    const verdict = (mcqPass && expPass && locationPass) ? 'SELECTED' : 'NOT SELECTED'
    const failReasons = []
    if (!mcqPass) failReasons.push(`MCQ score ${Math.round(mcqPct)}% is below the required ${jobConfig.passPct}%`)
    if (!expPass) failReasons.push(`Experience (${profileData.expYears} yrs) is outside the required range of ${jobConfig.minExp}–${jobConfig.maxExp} years`)
    if (!locationPass) failReasons.push(`Location "${profileData.location}" does not match required "${jobConfig.requiredLocation}"`)

    try {
      await fetch('/api/send-screening-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recruiterEmail: jobConfig.recruiterEmail,
          candidateName: profileData.name,
          candidateEmail: profileData.email,
          role: jobConfig.role,
          mcqScore,
          mcqTotal: 10,
          passPct: jobConfig.passPct,
          expYears: profileData.expYears,
          minExp: jobConfig.minExp,
          maxExp: jobConfig.maxExp,
          candidateLocation: profileData.location,
          requiredLocation: jobConfig.requiredLocation,
          salary: profileData.salary,
          techQuestions: questions.techQuestions,
          techAnswers,
          verdict,
          failReasons,
        }),
      })
    } catch {
      // Silent — candidate still sees thank you screen
    }

    setStage(STAGES.thankyou)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-red-400 text-lg font-medium mb-2">Invalid Link</p>
          <p className="text-muted text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!jobConfig) return null

  return (
    <div className="min-h-screen bg-bg text-white">
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0F0F0F]/80 border-b border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-white text-sm font-medium">{jobConfig.role} Assessment</span>
          <span className="text-muted text-xs">Powered by kenrahu.com</span>
        </div>
      </div>

      <div className="pt-16">
        {stage === STAGES.start && (
          <AssessmentStart role={jobConfig.role} topic={jobConfig.topic} onStart={handleStart} error={error} />
        )}
        {stage === STAGES.loading && (
          <Spinner message="Preparing your assessment..." sub="Generating questions tailored to this role" />
        )}
        {stage === STAGES.mcq && questions && (
          <MCQQuestion
            question={questions.mcqs[currentQ]}
            questionNumber={currentQ + 1}
            total={10}
            onAnswer={handleMCQAnswer}
          />
        )}
        {stage === STAGES.profile && <ProfileForm onSubmit={handleProfileSubmit} />}
        {stage === STAGES.tech && questions && (
          <TechQuestions questions={questions.techQuestions} onSubmit={handleTechSubmit} />
        )}
        {stage === STAGES.submitting && (
          <Spinner message="Submitting your assessment..." sub="" />
        )}
        {stage === STAGES.thankyou && <ThankYou />}
      </div>
    </div>
  )
}
