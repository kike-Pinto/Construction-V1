import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

export const createToken = (user: { id: string; email: string }) => {
  const payload = { id: user.id, email: user.email }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}
