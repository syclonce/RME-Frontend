import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const dir = path.dirname(fileURLToPath(import.meta.url))
const env = Object.fromEntries(
  readFileSync(path.join(dir, '.env'), 'utf8')
    .split('\n')
    .filter((line) => line.includes('='))
    .map((line) => {
      const idx = line.indexOf('=')
      return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()]
    }),
)

const res = await fetch(`${env.LLM_BASE_URL}/chat/completions`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${env.LLM_API_KEY}`,
  },
  body: JSON.stringify({
    model: env.LLM_MODEL,
    messages: [{ role: 'user', content: 'Balas dengan tepat satu kata: PONG' }],
    max_tokens: 10,
  }),
})

console.log('HTTP status:', res.status)
const raw = await res.text()
// Router ini kadang menempelkan "data: [DONE]" SSE di ekor respons non-streaming.
const jsonPart = raw.split(/data:\s*\[DONE\]/)[0].trim()
const data = JSON.parse(jsonPart)
console.log(JSON.stringify(data, null, 2))
