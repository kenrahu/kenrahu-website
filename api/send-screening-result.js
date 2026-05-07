export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const {
    recruiterEmail, candidateName, candidateEmail,
    role, mcqScore, mcqTotal, passPct,
    expYears, minExp, maxExp,
    candidateLocation, requiredLocation,
    salary, techQuestions, techAnswers,
    verdict, failReasons,
  } = req.body

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) return res.status(500).json({ error: 'RESEND_API_KEY not set' })

  const mcqPct = Math.round((mcqScore / mcqTotal) * 100)
  const verdictColor = verdict === 'SELECTED' ? '#22c55e' : '#ef4444'

  const techSection = techQuestions.map((q, i) => `
    <div style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #2a2a2a">
      <p style="font-weight:600;margin:0 0 8px;color:#fff">${i + 1}. ${q}</p>
      <p style="margin:0;color:#9ca3af;line-height:1.6">${techAnswers[i] || 'No answer provided'}</p>
    </div>
  `).join('')

  const failSection = failReasons.length > 0 ? `
    <div style="background:#1f1f1f;border:1px solid #ef444440;border-radius:8px;padding:16px;margin-top:16px">
      <p style="font-weight:600;color:#ef4444;margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:1px">Failed Criteria</p>
      ${failReasons.map(r => `<p style="margin:6px 0;color:#9ca3af;font-size:14px">• ${r}</p>`).join('')}
    </div>
  ` : ''

  const html = `
    <div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#0f0f0f;color:#fff;padding:40px;border-radius:12px">
      <h1 style="margin:0 0 4px;font-size:22px">Candidate Screening Result</h1>
      <p style="color:#9ca3af;margin:0 0 32px;font-size:14px">${role}</p>

      <div style="background:${verdictColor}15;border:1px solid ${verdictColor}60;border-radius:10px;padding:20px;text-align:center;margin-bottom:28px">
        <p style="font-size:22px;font-weight:700;color:${verdictColor};margin:0;letter-spacing:1px">${verdict}</p>
      </div>

      <div style="background:#1a1a1a;border-radius:10px;padding:20px;margin-bottom:16px">
        <p style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin:0 0 14px">Candidate Details</p>
        <p style="margin:6px 0;font-size:14px"><span style="color:#9ca3af">Name:</span> ${candidateName}</p>
        <p style="margin:6px 0;font-size:14px"><span style="color:#9ca3af">Email:</span> ${candidateEmail}</p>
        <p style="margin:6px 0;font-size:14px"><span style="color:#9ca3af">Location:</span> ${candidateLocation}</p>
        <p style="margin:6px 0;font-size:14px"><span style="color:#9ca3af">Experience:</span> ${expYears} years</p>
        <p style="margin:6px 0;font-size:14px"><span style="color:#9ca3af">Salary Expectation:</span> $${Number(salary).toLocaleString()}/year</p>
      </div>

      <div style="background:#1a1a1a;border-radius:10px;padding:20px;margin-bottom:16px">
        <p style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin:0 0 14px">MCQ Score</p>
        <p style="font-size:32px;font-weight:700;margin:0">${mcqScore}<span style="font-size:18px;color:#6b7280">/${mcqTotal}</span> <span style="font-size:16px;color:#9ca3af">(${mcqPct}%)</span></p>
        <p style="color:#6b7280;margin:6px 0 0;font-size:13px">Pass threshold: ${passPct}%</p>
      </div>

      <div style="background:#1a1a1a;border-radius:10px;padding:20px;margin-bottom:16px">
        <p style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin:0 0 16px">Technical Answers</p>
        ${techSection}
      </div>

      ${failSection}

      <p style="color:#4b5563;font-size:12px;text-align:center;margin-top:28px">Sent by <a href="https://kenrahu.com" style="color:#6366f1;text-decoration:none">kenrahu.com</a> AI Screener</p>
    </div>
  `

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AI Screener <screener@kenrahu.com>',
        to: [recruiterEmail],
        subject: `[${verdict}] ${candidateName} — ${role}`,
        html,
      }),
    })

    const data = await response.json()
    if (!response.ok) return res.status(500).json({ error: data.message || 'Failed to send email' })

    return res.status(200).json({ success: true })
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to send email' })
  }
}
