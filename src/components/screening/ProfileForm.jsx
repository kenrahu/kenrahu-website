import { useState } from 'react'

function Field({ label, name, type = 'text', placeholder, value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} <span className="text-accent">*</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={type === 'number' ? 0 : undefined}
        className="w-full bg-surface border border-[#2A2A2A] focus:border-accent rounded-lg px-4 py-3 text-white placeholder-muted/50 outline-none transition-colors text-sm"
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default function ProfileForm({ onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', location: '', expYears: '', salary: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.location.trim()) e.location = 'Required'
    if (form.expYears === '' || Number(form.expYears) < 0) e.expYears = 'Required'
    if (form.salary === '' || Number(form.salary) < 0) e.salary = 'Required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onSubmit(form)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Part 2 of 3</p>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Tell us about yourself</h2>
        <p className="text-muted text-sm">Quick profile questions. Takes under a minute.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Full Name" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} error={errors.name} />
        <Field label="Email Address" name="email" type="email" placeholder="john@email.com" value={form.email} onChange={handleChange} error={errors.email} />
        <Field label="Current Location (City, State)" name="location" placeholder="e.g. Austin, Texas" value={form.location} onChange={handleChange} error={errors.location} />
        <Field label="Years of Experience" name="expYears" type="number" placeholder="e.g. 4" value={form.expYears} onChange={handleChange} error={errors.expYears} />
        <Field label="Expected Salary (USD / year)" name="salary" type="number" placeholder="e.g. 90000" value={form.salary} onChange={handleChange} error={errors.salary} />

        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base mt-2"
        >
          Continue to Technical Questions →
        </button>
      </form>
    </div>
  )
}
