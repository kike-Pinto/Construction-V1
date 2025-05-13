import cloudinary from 'cloudinary'

// Configuración de Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Función para subir una imagen
export const uploadImage = async (filePath: string) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder: 'images',
    })
    return result // Devuelve el resultado de la carga de la imagen
  } catch (error: unknown) {
    // Aserción de tipo, indicando que 'error' es de tipo 'Error'
    if (error instanceof Error) {
      throw new Error(`Error al subir la imagen: ${error.message}`)
    } else {
      throw new Error('Error desconocido al subir la imagen')
    }
  }
}
