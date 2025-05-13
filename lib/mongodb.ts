import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
// const MONGODB_URI =
//   'mongodb+srv://cripintort:IZN0Njb7APRyOjyt@cluster0.wqdt9.mongodb.net/Construction-app?retryWrites=true&w=majority'

if (!MONGODB_URI) {
  throw new Error(
    'Por favor, define la variable de entorno MONGODB_URI en .env'
  )
}

declare global {
  var _mongoClientPromise: Promise<typeof mongoose> | undefined
}

let cached = global._mongoClientPromise

if (!cached) {
  cached = mongoose
    .connect(MONGODB_URI)
    .then((mongoose) => mongoose)
    .catch((error) => {
      console.error('Error al conectar a MongoDB:', error) // Log detallado
      throw error
    })

  global._mongoClientPromise = cached
}

export default cached
