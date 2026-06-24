import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import Groq from 'groq-sdk';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const limiter = rateLimit({
  windowMs: 60_000,
  max: 20,
  message: { message: 'Too many requests, please slow down.' },
});

const systemPrompt = `
You are an expert code reviewer. Review the code and return ONLY a valid JSON object.
No markdown. No explanation. No code fences. Just raw JSON.

Use this exact schema:
{
  "issues": [
    {
      "severity": "critical",
      "title": "Incorrect Language Syntax",
      "line": "1-6",
      "category": "Bugs & Logic Errors",
      "problem": "Code is JavaScript while selected language is Python.",
      "fix": "def hello():\n print('Hello World')"
    }
  ],
  "summary": {
    "total": 1,
    "counts": {
      "critical": 1,
      "major": 0,
      "minor": 0,
      "suggest": 0
    },
    "themes": "Language mismatch",
    "nextStep": "Rewrite code using Python syntax"
  }
}

Severity definitions:
- critical: must fix before merge — bugs, security holes, data loss risk
- major: should fix — incorrect logic, bad practice, performance problem
- minor: good to fix — style, naming, minor inefficiency
- suggest: optional improvement or alternative approach

Rules:
- One object per issue, never group multiple problems into one
- Reference exact variable names, function names, and line numbers in problem descriptions
- The "fix" field must contain only the corrected code, no prose, no markdown fences
- If the code is clean with no issues, return an empty issues array and explain in summary.themes
- Return ONLY the JSON object. Nothing before it, nothing after it.
`;

app.post('/chat', limiter, async (req, res) => {
  const { language, code, userPrompt } = req.body;

  if (!code || typeof code !== 'string' || code.trim() === '') {
    return res.status(400).json({ message: '`code` field is required and must be a non-empty string.' });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: [
            language ? `Language: ${language}` : '',
            `\`\`\`\n${code}\n\`\`\``,
            userPrompt ? `\nAdditional instructions: ${userPrompt}` : '',
          ]
            .filter(Boolean)
            .join('\n\n'),
        },
      ],
    });

    const raw = completion.choices[0].message.content;
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
      console.log('RAW RESPONSE FROM GROQ');
console.log(raw);
    } catch {
      // Fallback: return raw text so the frontend can show something
      return res.status(200).json({ review: null, raw });
    }

    res.json({ review: parsed });
  } catch (error) {
    console.error('Groq error:', error);
    const status = error?.status || 500;
    const message = error?.message || 'Something went wrong';
    res.status(status).json({ message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});