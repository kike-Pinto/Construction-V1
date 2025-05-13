import type { NextApiRequest, NextApiResponse } from 'next'
import { uploadImage } from '@/lib/cloudinary'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' })
  }

  const { filePaths } = req.body // filePaths es un array de rutas

  if (!Array.isArray(filePaths) || filePaths.length === 0) {
    return res
      .status(400)
      .json({ message: 'Debes proporcionar al menos una ruta de imagen.' })
  }

  try {
    const uploadResults = await Promise.all(
      filePaths.map((filePath) => uploadImage(filePath))
    )

    res.status(200).json({
      message: 'Imágenes subidas exitosamente',
      data: uploadResults, // array con las URLs y metadatos de las imágenes subidas
    })
  } catch (error: unknown) {
    res.status(500).json({
      message: 'Error al subir las imágenes',
      error,
    })
  }
}
