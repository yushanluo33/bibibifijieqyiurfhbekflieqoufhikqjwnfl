import type { VercelRequest, VercelResponse } from '@vercel/node'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { tac, csn, tsn } = req.body as { tac: string; csn: string; tsn: string }

  if (!tac || !csn || !tsn) {
    return res.status(400).json({ error: 'Missing parameters' })
  }

  // 查詢 TAC 是否已使用
  const checkRes = await fetch(
    `${SUPABASE_URL}/rest/v1/used_tacs?tac=eq.${encodeURIComponent(tac)}&select=tac`,
    {
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
    }
  )

  const existing = await checkRes.json()

  if (existing.length > 0) {
    return res.status(403).json({ error: 'TAC already used' })
  }

  // 寫入已使用記錄
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/used_tacs`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ tac, csn, tsn }),
  })

  if (!insertRes.ok) {
    return res.status(500).json({ error: 'Database error' })
  }

  return res.status(200).json({ valid: true })
}
