import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Remove token cookie
    res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0')
    return res.status(200).json({ message: 'Logged out successfully' })
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
