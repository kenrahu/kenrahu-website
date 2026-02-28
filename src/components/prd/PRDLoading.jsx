const STEPS = [
  'Analysing your product inputs...',
  'Defining problem statement...',
  'Mapping user personas...',
  'Prioritising features...',
  'Writing timeline & milestones...',
  'Finalising your PRD...',
]

import { useState, useEffect } from 'react'

export default function PRDLoading() {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex(prev => (prev < STEPS.length - 1 ? prev + 1 : prev))
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg px-6">
      <div className="max-w-sm w-full text-center">

        {/* Spinner */}
        <div className="w-16 h-16 mx-auto mb-8 relative">
          <div className="w-16 h-16 rounded-full border-4 border-surface border-t-accent animate-spin"></div>
        </div>

        <h2 className="text-xl font-bold mb-3">Generating your PRD</h2>
        <p className="text-accent text-sm font-medium mb-8 min-h-[20px] transition-all duration-500">
          {STEPS[stepIndex]}
        </p>

        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i <= stepIndex ? 'bg-accent' : 'bg-surface'
              }`}
            />
          ))}
        </div>

        <p className="text-muted/50 text-xs mt-8">This usually takes 10–15 seconds</p>
      </div>
    </div>
  )
}
