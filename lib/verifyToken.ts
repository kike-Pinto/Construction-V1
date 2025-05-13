import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { verifyToken } from './auth'
// import { JwtPayload } from 'jsonwebtoken'

export function verifyTokenMiddleware(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // const token = req.cookies.token
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized, no token provided' })
    }

    const decoded = verifyToken(token)

    if (!decoded || typeof decoded === 'string') {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    // console.log(decoded)

    // Verificar que el token pertenece al usuario admin
    if (decoded.email !== process.env.ADMIN_USERNAME) {
      return res
        .status(403)
        .json({ error: 'Forbidden, you do not have access' })
    }

    // Si el token es válido, continúa con la ruta
    return handler(req, res)
  }
}
