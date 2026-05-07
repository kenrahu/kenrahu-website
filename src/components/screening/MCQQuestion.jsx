import { useState } from 'react'

const OPTION_KEYS = ['A', 'B', 'C', 'D']

export default function MCQQuestion({ question, questionNumber, total, onAnswer }) {
  const [selected, setSelected] = useState(null)

  const handleSelect = (key) => {
    if (selected) return
    setSelected(key)
    setTimeout(() => {
      onAnswer(key)
      setSelected(null)
    }, 500)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="flex justify-between text-sm text-muted mb-2">
          <span>Question {questionNumber} of {total}</span>
          <span>{questionNumber}/{total}</span>
        </div>
        <div className="w-full bg-surface rounded-full h-1.5">
          <div
            className="bg-accent h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(questionNumber / total) * 100}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-4">Part 1 of 3 — MCQ</p>
      <h2 className="text-lg sm:text-xl font-semibold mb-8 leading-relaxed">{question.question}</h2>

      <div className="space-y-3">
        {OPTION_KEYS.map(key => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            disabled={!!selected}
            className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 text-sm ${
              selected === key
                ? 'border-accent bg-accent/10 text-white'
                : 'border-[#2A2A2A] bg-surface hover:border-accent/50 text-white'
            } disabled:cursor-default`}
          >
            <span className="font-bold text-accent mr-3">{key}.</span>
            {question.options[key]}
          </button>
        ))}
      </div>
    </div>
  )
}
