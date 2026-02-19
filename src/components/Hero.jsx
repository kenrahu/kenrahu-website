export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 bg-bg">
      <div className="max-w-4xl mx-auto w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-surface border border-[#2A2A2A] rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent inline-block"></span>
          <span className="text-muted text-sm">AI Audit & Transformation Partner</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
          Your{' '}
          <span className="text-accent">AI Audit &</span>
          <br />
          Transformation Partner
        </h1>

        {/* Subheadline */}
        <p className="text-muted text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
          I help businesses understand where they stand with AI — and exactly what to do next.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href="https://calendly.com/kendale-rahul/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-accent-dark text-white font-semibold px-7 py-3.5 rounded-lg transition-colors text-center text-base"
          >
            Book a Discovery Call
          </a>
          <a
            href="/quiz"
            className="border border-[#2A2A2A] hover:border-accent text-white font-semibold px-7 py-3.5 rounded-lg transition-colors text-center text-base flex items-center justify-center gap-2"
          >
            Try Free AI Readiness Quiz
            <span className="text-accent">→</span>
          </a>
        </div>

        {/* Trust stats */}
        <div className="flex flex-wrap gap-6 sm:gap-10">
          {[
            { value: '50+', label: 'Businesses Assessed' },
            { value: '7', label: 'AI Tools Built' },
            { value: 'Free', label: 'Readiness Assessment Available' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-accent text-lg font-bold">{stat.value}</span>
              <span className="text-muted text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="max-w-4xl mx-auto w-full mt-16 flex justify-start">
        <div className="flex flex-col items-center gap-1.5 opacity-40">
          <span className="text-xs text-muted">scroll</span>
          <div className="w-px h-8 bg-muted animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}
