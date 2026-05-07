export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-4">Thank you for attending</h1>
        <p className="text-muted text-base leading-relaxed">
          Your assessment has been submitted successfully. The hiring team will review your responses and get back to you shortly.
        </p>

        <div className="mt-10 bg-surface border border-[#2A2A2A] rounded-xl p-5">
          <p className="text-muted text-sm">
            Screening powered by{' '}
            <a href="https://kenrahu.com" className="text-accent font-semibold hover:underline">
              kenrahu.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
