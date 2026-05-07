export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { role, topic, techStack } = req.body
  if (!role || !topic || !techStack) return res.status(400).json({ error: 'Missing required fields' })

  const groqKey = process.env.GROQ_API_KEY || process.env.GROK
  if (!groqKey) return res.status(500).json({ error: 'GROQ_API_KEY not set' })

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are an expert technical interviewer. Return only valid JSON, no markdown, no explanation.',
          },
          {
            role: 'user',
            content: `Generate a screening assessment for a ${role} position.
Topic for MCQs: ${topic}
Tech Stack for open questions: ${techStack}

Return ONLY a valid JSON object with exactly this structure:
{
  "mcqs": [
    {
      "question": "question text",
      "options": {"A": "...", "B": "...", "C": "...", "D": "..."},
      "correct": "A"
    }
  ],
  "techQuestions": [
    "question 1",
    "question 2",
    "question 3"
  ]
}

Rules:
- Exactly 10 MCQ questions about ${topic}, appropriate difficulty for ${role}
- Each MCQ must have exactly 4 options (A, B, C, D) and one correct answer
- Exactly 3 open-ended tech questions about practical experience with ${techStack}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    })

    const data = await response.json()
    if (!response.ok) return res.status(500).json({ error: data.error?.message || 'Failed to generate questions' })

    const raw = data.choices[0].message.content.trim()
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim()
    const questions = JSON.parse(cleaned)

    return res.status(200).json(questions)
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to generate questions' })
  }
}
