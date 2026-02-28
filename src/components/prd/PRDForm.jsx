import { useState } from 'react'

const INITIAL_FORM = {
  productName: '',
  oneLiner: '',
  problem: '',
  targetUser: '',
  goals: '',
  features: '',
  timeline: '3 months',
}

const FIELDS = [
  { key: 'productName', label: 'Product Name', type: 'input', placeholder: 'e.g. AI Readiness Quiz', required: true },
  { key: 'oneLiner', label: 'One-liner Description', type: 'input', placeholder: 'e.g. A quiz that helps businesses assess their AI readiness in 2 minutes', required: true },
  { key: 'problem', label: 'Problem Being Solved', type: 'textarea', placeholder: 'What pain point does this product address? Who experiences it and how often?', required: true },
  { key: 'targetUser', label: 'Target User', type: 'textarea', placeholder: 'Who is this for? Describe their role, goals, and frustrations.', required: true },
  { key: 'goals', label: 'Goals & Success Metrics', type: 'textarea', placeholder: 'What does success look like? Include specific metrics if possible.', required: true },
  { key: 'features', label: 'Must-have Features', type: 'textarea', placeholder: 'List your key features, one per line. Focus on must-haves only.', required: true },
]

export default function PRDForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    FIELDS.forEach(field => {
      if (field.required && !form[field.key].trim()) {
        newErrors[field.key] = 'This field is required'
      }
    })
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSubmit(form)
  }

  return (
    <div className="min-h-screen bg-bg px-6 py-16">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Step 1 of 1</p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Tell us about your product</h2>
          <p className="text-muted text-sm">The more detail you provide, the better your PRD will be.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Text fields */}
          {FIELDS.map(field => (
            <div key={field.key}>
              <label className="block text-sm font-medium mb-2">
                {field.label}
                {field.required && <span className="text-accent ml-1">*</span>}
              </label>
              {field.type === 'input' ? (
                <input
                  type="text"
                  name={field.key}
                  value={form[field.key]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full bg-surface border border-[#2A2A2A] focus:border-accent rounded-lg px-4 py-3 text-white placeholder-muted/50 outline-none transition-colors text-sm"
                />
              ) : (
                <textarea
                  name={field.key}
                  value={form[field.key]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full bg-surface border border-[#2A2A2A] focus:border-accent rounded-lg px-4 py-3 text-white placeholder-muted/50 outline-none transition-colors text-sm resize-none"
                />
              )}
              {errors[field.key] && (
                <p className="text-red-400 text-xs mt-1">{errors[field.key]}</p>
              )}
            </div>
          ))}

          {/* Timeline dropdown */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Timeline <span className="text-accent">*</span>
            </label>
            <select
              name="timeline"
              value={form.timeline}
              onChange={handleChange}
              className="w-full bg-surface border border-[#2A2A2A] focus:border-accent rounded-lg px-4 py-3 text-white outline-none transition-colors text-sm"
            >
              <option value="1 month">1 Month</option>
              <option value="3 months">3 Months</option>
              <option value="6 months">6 Months</option>
              <option value="1 year">1 Year</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base mt-2"
          >
            Generate My PRD →
          </button>

          <p className="text-muted/50 text-xs text-center">Your PRD will be ready in about 10 seconds</p>
        </form>
      </div>
    </div>
  )
}
