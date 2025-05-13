import { NextApiRequest, NextApiResponse } from 'next'
import db from '@/lib/mongodb'
import Project from '@/models/Project'
import { uploadImage } from '@/lib/cloudinary'
import mongoose from 'mongoose'
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
    await db // Asegúrate de conectar a MongoDB

    const { id } = req.query

    // Validar que el ID es válido
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'ID del proyecto no válido' })
    }

    try {
      const objectId = new mongoose.Types.ObjectId(id) // Convertir el ID a ObjectId para MongoDB

      switch (req.method) {
        case 'GET': // Obtener un proyecto por ID
          return getProjectById(res, objectId)
        case 'PUT': // Actualizar un proyecto por ID
          return updateProject(req, res, objectId)
        case 'DELETE': // Eliminar un proyecto por ID
          return deleteProject(res, objectId)
        default:
          return res
            .status(405)
            .json({ message: `Método ${req.method} no permitido` })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error en la solicitud', error })
    }
  })(req, res)
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

async function updateProject(
  req: NextApiRequest,
  res: NextApiResponse,
  id: mongoose.Types.ObjectId
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Metodo no permitido' })
  }

  const form = formidable({ multiples: true })

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error al procesar el formulario:', err)
      return res
        .status(400)
        .json({ message: 'Error al procesar el formulario' })
    }

    console.log('Archivos:', files) // <-- Asegúrate de ver las imágenes aquí
    console.log('Campos:', fields)

    try {
      const { title, description, year, location, existingImages } = fields

      // Validar y convertir valores
      const formattedTitle = Array.isArray(title) ? title[0] : title
      const formattedDescription = Array.isArray(description)
        ? description[0]
        : description
      const formattedYear = Array.isArray(year) ? Number(year[0]) : Number(year)
      const formattedLocation = Array.isArray(location) ? location[0] : location

      // Asegurarse de que las imagenes existentes sean un array
      const existingImagesArray = Array.isArray(existingImages)
        ? existingImages
        : existingImages
          ? [existingImages]
          : []

      // Procesar nuevas imagenes
      let newImageUrls: string[] = []

      if (files.images) {
        const imageFiles = Array.isArray(files.images)
          ? files.images
          : [files.images]

        // console.log('Procesando imágenes:', imageFiles)

        const uploadedImages = await Promise.all(
          imageFiles.map((file) => uploadImage(file.filepath))
        )

        newImageUrls = uploadedImages.map((img) => img.secure_url)
        console.log('Nuevas URLs de imágenes:', newImageUrls)
      }

      // Combinar imagenes existentes y nuevas
      const allImages = [...existingImagesArray, ...newImageUrls]

      // Crear objeto con los campos actualizados
      const updatedFields: any = {
        ...(formattedTitle && { title: formattedTitle }),
        ...(formattedDescription && { description: formattedDescription }),
        ...(formattedYear && { year: formattedYear }),
        ...(formattedLocation && { location: formattedLocation }),
        ...(allImages.length > 0 && { images: allImages }),
      }

      // Actualizar proyecto en la base de datos
      const updatedProject = await Project.findByIdAndUpdate(
        id,
        updatedFields,
        { new: true }
      )

      if (!updatedProject) {
        return res.status(404).json({ message: 'Proyecto no encontrado' })
      }

      return res
        .status(200)
        .json({ message: 'Proyecto actualizado exitosamente', updatedProject })
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error)
      return res
        .status(500)
        .json({ message: 'Error al actualizar el proyecto', error })
    }
  })
}

async function deleteProject(
  res: NextApiResponse,
  id: mongoose.Types.ObjectId
) {
  const deletedProject = await Project.findByIdAndDelete(id)

  if (!deletedProject) {
    return res.status(404).json({ message: 'Proyecto no encontrado' })
  }

  res
    .status(200)
    .json({ message: 'Proyecto eliminado exitosamente', deletedProject })
}
