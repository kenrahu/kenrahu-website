import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// In-memory rate limiter: { ip: { count, resetAt } }
const rateLimitMap = new Map()
const LIMIT = 3          // max 3 PRDs per IP
const WINDOW_MS = 24 * 60 * 60 * 1000  // per 24 hours

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  if (entry.count >= LIMIT) return true

  entry.count++
  return false
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate limit check
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'You have reached the daily limit of 3 PRDs. Please come back tomorrow.' })
  }

  const { productName, oneLiner, problem, targetUser, goals, features, timeline } = req.body

  if (!productName || !problem || !targetUser || !goals || !features) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `You are an expert Product Manager with 15+ years of experience writing PRDs for top tech companies.

Generate a professional, detailed PRD based on these inputs:

Product Name: ${productName}
One-liner: ${oneLiner}
Problem: ${problem}
Target User: ${targetUser}
Goals & Success Metrics: ${goals}
Must-have Features: ${features}
Timeline: ${timeline}

Return ONLY a valid JSON object with exactly these 7 keys. No markdown, no explanation, no code blocks, just raw JSON:
{
  "problemStatement": "3-4 sentences clearly articulating the problem, who faces it, and why it matters",
  "goalsAndMetrics": "Bullet list of 4-5 specific, measurable goals and success metrics",
  "targetUsers": "Description of primary and secondary user personas with their needs and pain points",
  "featuresAndRequirements": "Detailed list of must-have features with brief descriptions, prioritised as P0/P1/P2",
  "outOfScope": "Bullet list of 4-5 things explicitly NOT included in this version",
  "timeline": "Phase-by-phase breakdown of the ${timeline} timeline with milestones",
  "risksAndAssumptions": "Bullet list of 4-5 key risks and assumptions with mitigation notes"
}`

    const result = await model.generateContent(prompt)
    const raw = result.response.text().trim()

    // Strip markdown code blocks if Gemini wraps in ```json ... ```
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim()

    const prd = JSON.parse(cleaned)

    return res.status(200).json({ prd })
  } catch (error) {
    console.error('PRD generation error:', error)
    return res.status(500).json({ error: error.message || 'Failed to generate PRD. Please try again.' })
  }
}
