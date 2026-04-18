import type { VercelRequest, VercelResponse } from '@vercel/node'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { data } = req.body as { data: string }

  if (!data) {
    return res.status(400).json({ error: 'Missing data' })
  }

  // 查詢 data 是否已使用過
  const checkRes = await fetch(
    `${SUPABASE_URL}/rest/v1/used_data?data=eq.${encodeURIComponent(data)}&select=data`,
    {
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
    }
  )

  const existing = await checkRes.json()

  if (existing.length > 0) {
    return res.status(403).json({ error: 'Data already used' })
  }

  // 寫入已使用記錄
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/used_data`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ data }),
  })

  if (!insertRes.ok) {
    return res.status(500).json({ error: 'Database error' })
  }

  // 建立 session token
  const sessionRes = await fetch(`${SUPABASE_URL}/rest/v1/sessions`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ data }),
  })

  if (!sessionRes.ok) {
    return res.status(500).json({ error: 'Session creation failed' })
  }

  const [session] = await sessionRes.json()
  return res.status(200).json({ valid: true, sessionToken: session.token })
}
