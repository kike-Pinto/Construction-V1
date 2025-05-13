import type { NextApiRequest, NextApiResponse } from 'next'
import Project from '@/models/Project'
import { uploadImage } from '@/lib/cloudinary'
import db from '@/lib/mongodb'
import { verifyTokenMiddleware } from '@/lib/verifyToken'
import formidable from 'formidable'

export const config = {
  api: {
    bodyParser: false, // Necesario para que formidable procese el body
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return verifyTokenMiddleware(async (req, res) => {
    await db

    switch (req.method) {
      case 'GET':
        return getProjects(req, res)
      case 'POST':
        return createProject(req, res)

      default:
        return res
          .status(405)
          .json({ message: `Metodo ${req.method} no permitido` })
    }
  })(req, res)
}

async function getProjects(req: NextApiRequest, res: NextApiResponse) {
  try {
    // console.log('Obteniendo proyectos...')
    const projects = await Project.find()
    // console.log('Proyectos obtenidos:', projects)
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los proyectos', error })
  }
}

// async function createProject(req: NextApiRequest, res: NextApiResponse) {
//   const { title, description, year, location, images } = req.body

//   if (!title || !description || !year || !location || !Array.isArray(images)) {
//     return res.status(400).json({ message: 'Faltan campos requeridos' })
//   }

//   try {
//     // Subir imagenes a Cloudinary
//     const uploadedImages = await Promise.all(
//       images.map((filePath: string) => uploadImage(filePath))
//     )

//     const imageUrls = uploadedImages.map((img) => img.secure_url)

//     // Crear proyecto en MongoDB
//     const newProject = await Project.create({
//       title,
//       description,
//       year,
//       location,
//       images: imageUrls,
//     })

//     res
//       .status(201)
//       .json({ message: 'Proyecto creado exitosamente', newProject })
//   } catch (error) {
//     res.status(500).json({ message: 'Error al crear el proyecto', error })
//   }
// }

async function createProject(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' })
  }

  const form = formidable({ multiples: true })

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error al procesar el formulario:', err)
      return res
        .status(400)
        .json({ message: 'Error al procesar el formulario' })
    }

    const { title, description, year, location } = fields

    // Convertir valores a los tipos esperados
    const formattedTitle = Array.isArray(title) ? title[0] : title
    const formattedDescription = Array.isArray(description)
      ? description[0]
      : description
    const formattedYear = Array.isArray(year) ? Number(year[0]) : Number(year)
    const formattedLocation = Array.isArray(location) ? location[0] : location

    // Validar campos requeridos
    if (
      !formattedTitle ||
      !formattedDescription ||
      !formattedYear ||
      !formattedLocation
    ) {
      return res.status(400).json({ message: 'Faltan campos requeridos' })
    }

    if (!files.images) {
      return res
        .status(400)
        .json({ message: 'Debes subir al menos una imagen' })
    }

    try {
      // Procesar imágenes
      const imageFiles = Array.isArray(files.images)
        ? files.images
        : [files.images]

      const uploadedImages = await Promise.all(
        imageFiles.map((file) => uploadImage(file.filepath)) // Subir a Cloudinary
      )

      const imageUrls = uploadedImages.map((img) => img.secure_url)

      // Crear proyecto en MongoDB
      const newProject = await Project.create({
        title: formattedTitle,
        description: formattedDescription,
        year: formattedYear,
        location: formattedLocation,
        images: imageUrls,
      })

      return res
        .status(201)
        .json({ message: 'Proyecto creado exitosamente', newProject })
    } catch (error) {
      console.error('Error al subir imágenes:', error)
      return res
        .status(500)
        .json({ message: 'Error al crear el proyecto', error })
    }
  })
}
