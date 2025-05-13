import { NextApiRequest, NextApiResponse } from 'next'
import { verifyToken } from '../../../lib/auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { token } = req.cookies

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const user = verifyToken(token)

    if (user) {
      return res.status(200).json({ user })
    } else {
      return res.status(401).json({ error: 'Invalid token' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
