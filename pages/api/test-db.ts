import type { NextApiRequest, NextApiResponse } from 'next'
import db from '@/lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await db
    res.status(200).json({ message: 'Conexión a MongoDB exitosa' })
  } catch (error) {
    res.status(500).json({ message: 'Error al conectar a MongoDB', error })
  }
}
