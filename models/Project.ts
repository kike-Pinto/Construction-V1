// cripintort
// IZN0Njb7APRyOjyt
// mongodb+srv://cripintort:IZN0Njb7APRyOjyt@cluster0.wqdt9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

import mongoose, { Schema, Document } from 'mongoose'

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    year: { type: Number, required: true },
    location: { type: String, required: true },
    // images: { type: [String], required: true },
    images: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
)

// Define la interfaz de Project, que se usara para los tipo en TypeScript
export interface IProject extends Document {
  title: string
  description: string
  year: number
  location: string
  images: string[]
}

const Project =
  mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema)

export default Project
