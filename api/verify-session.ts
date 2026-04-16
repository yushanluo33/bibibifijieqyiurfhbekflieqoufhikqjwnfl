import type { VercelRequest, VercelResponse } from '@vercel/node'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = req.query.token as string
  if (!token) {
    return res.status(400).json({ error: 'Missing token' })
  }

  const sessionRes = await fetch(
    `${SUPABASE_URL}/rest/v1/sessions?token=eq.${encodeURIComponent(token)}&select=token,expires_at`,
    {
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
    }
  )

  const sessions = await sessionRes.json()

  if (!sessions.length) {
    return res.status(403).json({ error: 'Invalid session' })
  }

  const session = sessions[0]
  if (new Date(session.expires_at) < new Date()) {
    return res.status(403).json({ error: 'Session expired' })
  }

  return res.status(200).json({ valid: true })
}
