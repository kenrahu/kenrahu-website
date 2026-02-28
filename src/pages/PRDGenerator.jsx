import { useState } from 'react'
import { Link } from 'react-router-dom'
import PRDStart from '../components/prd/PRDStart'
import PRDForm from '../components/prd/PRDForm'
import PRDLoading from '../components/prd/PRDLoading'
import PRDPreview from '../components/prd/PRDPreview'
import PRDOutput from '../components/prd/PRDOutput'

const STAGES = { start: 'start', form: 'form', loading: 'loading', preview: 'preview', output: 'output' }

export default function PRDGenerator() {
  const [stage, setStage] = useState(STAGES.start)
  const [formData, setFormData] = useState(null)
  const [prd, setPrd] = useState(null)
  const [error, setError] = useState('')

  const handleStart = () => setStage(STAGES.form)

  const handleFormSubmit = async (data) => {
    setFormData(data)
    setStage(STAGES.loading)
    setError('')

    try {
      const res = await fetch('/api/generate-prd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        setError(json.error || 'Something went wrong. Please try again.')
        setStage(STAGES.form)
        return
      }

      setPrd(json.prd)
      setStage(STAGES.preview)
    } catch {
      setError('Network error. Please check your connection and try again.')
      setStage(STAGES.form)
    }
  }

  const handleUnlock = () => setStage(STAGES.output)

  const handleRestart = () => {
    setStage(STAGES.start)
    setFormData(null)
    setPrd(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-bg text-white">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0F0F0F]/80 border-b border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-muted hover:text-white text-sm transition-colors">← Back to home</Link>
          <span className="text-muted text-xs">PRD Generator · Free</span>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-16">
        {stage === STAGES.start && <PRDStart onStart={handleStart} />}

        {stage === STAGES.form && (
          <div className="max-w-2xl mx-auto px-6 pt-12 pb-16">
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}
            <PRDForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {stage === STAGES.loading && <PRDLoading />}

        {stage === STAGES.preview && prd && (
          <PRDPreview prd={prd} onUnlock={handleUnlock} />
        )}

        {stage === STAGES.output && prd && formData && (
          <PRDOutput prd={prd} formData={formData} onRestart={handleRestart} />
        )}
      </div>
    </div>
  )
}
