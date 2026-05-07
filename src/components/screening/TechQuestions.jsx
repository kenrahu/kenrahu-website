import { useState } from 'react'

export default function TechQuestions({ questions, onSubmit }) {
  const [answers, setAnswers] = useState(questions.map(() => ''))
  const [errors, setErrors] = useState(questions.map(() => ''))

  const handleChange = (i, value) => {
    setAnswers(prev => { const a = [...prev]; a[i] = value; return a })
    if (errors[i]) setErrors(prev => { const e = [...prev]; e[i] = ''; return e })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = answers.map(a => a.trim().length < 20 ? 'Please provide a more detailed answer' : '')
    if (errs.some(Boolean)) { setErrors(errs); return }
    onSubmit(answers)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Part 3 of 3</p>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Technical Questions</h2>
        <p className="text-muted text-sm">Answer based on your real experience. Be specific and detailed.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {questions.map((q, i) => (
          <div key={i} className="bg-surface border border-[#2A2A2A] rounded-xl p-6">
            <label className="block text-sm font-semibold mb-4 leading-relaxed">
              <span className="text-accent mr-2">{i + 1}.</span>{q}
            </label>
            <textarea
              value={answers[i]}
              onChange={e => handleChange(i, e.target.value)}
              rows={4}
              placeholder="Describe your experience in detail..."
              className="w-full bg-bg border border-[#2A2A2A] focus:border-accent rounded-lg px-4 py-3 text-white placeholder-muted/50 outline-none transition-colors text-sm resize-none"
            />
            {errors[i] && <p className="text-red-400 text-xs mt-1">{errors[i]}</p>}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base"
        >
          Submit Assessment →
        </button>

        <p className="text-muted/50 text-xs text-center">Your responses will be reviewed by the hiring team</p>
      </form>
    </div>
  )
}
