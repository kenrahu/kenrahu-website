export default function AssessmentStart({ role, topic, onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="max-w-xl w-full text-center">
        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-2 bg-surface border border-[#2A2A2A] rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-accent inline-block"></span>
          <span className="text-muted text-sm">{role} Assessment</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Ready to begin?</h1>
        <p className="text-muted text-base mb-8">This assessment has 3 parts and takes about 10–15 minutes. Complete it in one sitting.</p>

        <div className="bg-surface border border-[#2A2A2A] rounded-xl p-6 mb-8 text-left">
          <p className="text-sm font-semibold text-muted uppercase tracking-widest mb-4">What to expect</p>
          <ul className="space-y-3">
            {[
              `Part 1 — 10 MCQ questions on ${topic}`,
              'Part 2 — 5 profile questions (name, experience, location, salary)',
              'Part 3 — 3 open-ended technical questions',
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base"
        >
          Start Assessment →
        </button>
        <p className="text-muted/50 text-xs mt-4">Do not close or refresh the browser during the assessment</p>
      </div>
    </div>
  )
}
