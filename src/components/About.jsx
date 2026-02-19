import rahulPhoto from '../assets/rahul.jpeg'

const bullets = [
  {
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Audit-first approach',
    desc: 'No tool buying before readiness. We assess before we invest.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Practical, not theoretical',
    desc: 'Real frameworks that work in the real world — not academic fluff.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Small business specialist',
    desc: 'I focus exclusively on helping small businesses adopt AI the right way.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">About</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Helping businesses adopt AI the right way
            </h2>
            <p className="text-muted text-base leading-relaxed mb-10">
              I'm Rahul Kendale — an AI Audit & Transformation Partner focused on helping small businesses
              navigate AI adoption with confidence. My approach is simple: assess first, invest second.
              Before recommending any tool or strategy, I help you understand exactly where your business
              stands and what AI can realistically do for you.
            </p>

            <div className="flex flex-col gap-6">
              {bullets.map((b) => (
                <div key={b.title} className="flex items-start gap-4">
                  <div className="mt-0.5 flex-shrink-0 w-9 h-9 bg-surface rounded-lg flex items-center justify-center border border-[#2A2A2A]">
                    {b.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">{b.title}</p>
                    <p className="text-muted text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-[#2A2A2A]">
                <img
                  src={rahulPhoto}
                  alt="Rahul Kendale"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-1 rounded-2xl bg-accent/5 -z-10 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
