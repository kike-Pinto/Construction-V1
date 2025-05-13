import { NextApiRequest, NextApiResponse } from 'next'
import { createToken } from '../../../lib/auth'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password } = req.body

    // Check credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create JWT token
      const token = createToken({ id: '1', email: ADMIN_USERNAME })

      // Set token in cookies
      res.setHeader(
        'Set-Cookie',
        `token=${token}; HttpOnly; Path=/; Max-Age=3600`
      )

      return res.status(200).json({ message: 'Logged in successfully', token })
    } else {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
