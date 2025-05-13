import { NextApiRequest, NextApiResponse } from 'next'
import Project from '@/models/Project'
import db from '@/lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await db
    const projects = await Project.find() // Obtiene los proyectos desde MongoDB
    // console.log('Proyectos obtenidos:', projects)
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los proyectos', error })
  }
}
