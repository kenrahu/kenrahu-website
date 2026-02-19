export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-[#111111]">
      <div className="max-w-3xl mx-auto text-center">
        {/* Decorative top accent */}
        <div className="inline-flex items-center gap-2 bg-surface border border-[#2A2A2A] rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent inline-block"></span>
          <span className="text-muted text-sm">Free 30-minute call</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-5 leading-tight">
          Ready to understand your
          <br />
          <span className="text-accent">AI readiness?</span>
        </h2>

        <p className="text-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Book a free 30-minute discovery call. No pitch. Just clarity on where your business stands
          with AI and what to do next.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://calendly.com/kendale-rahul/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors text-base"
          >
            Book a Discovery Call
          </a>
          <a
            href="mailto:rahul@kenrahu.com"
            className="border border-[#2A2A2A] hover:border-accent text-muted hover:text-white font-semibold px-8 py-4 rounded-lg transition-colors text-base"
          >
            rahul@kenrahu.com
          </a>
        </div>

        <p className="text-muted/50 text-sm mt-8">
          Typically responds within 24 hours · No commitment required
        </p>
      </div>
    </section>
  )
}
