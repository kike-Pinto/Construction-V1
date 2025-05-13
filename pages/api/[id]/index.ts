import { NextApiRequest, NextApiResponse } from 'next'
import db from '@/lib/mongodb'
import Project from '@/models/Project'
import mongoose from 'mongoose'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Conexión a MongoDB
  await db

  const { id } = req.query
  console.log('ID required', id)
  // Validar que el ID es válido
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'ID del proyecto no válido' })
  }

  try {
    const objectId = new mongoose.Types.ObjectId(id) // Convertir el ID a ObjectId para MongoDB

    switch (req.method) {
      case 'GET': // Obtener un proyecto por ID
        return getProjectById(res, objectId)
      default:
        return res
          .status(405)
          .json({ message: `Método ${req.method} no permitido` })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en la solicitud', error })
  }
}

async function getProjectById(
  res: NextApiResponse,
  id: mongoose.Types.ObjectId
) {
  const project = await Project.findById(id)

  if (!project) {
    return res.status(404).json({ message: 'Proyecto no encontrado' })
  }

  res.status(200).json(project)
}
