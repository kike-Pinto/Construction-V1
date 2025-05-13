import React, { useState } from 'react'
import DashboardLayout from './index'
import { useRouter } from 'next/router'
import useAuth from '@/hooks/useAuth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const add = () => {
  useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [year, setYear] = useState('')
  const [location, setLocation] = useState('')
  const [images, setImages] = useState<File[]>([])
  const router = useRouter()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)

      // Validar tamano maximo de 4 MB
      const oversizedFiles = fileArray.filter(
        (file) => file.size > 4 * 1024 * 1024
      )
      if (oversizedFiles.length > 0) {
        toast.error(
          'Algunas imagenes superan el tamano maximo permitido de 4 MB.'
        )
        return
      }

      // Validar maximo de 10 imagenes
      if (fileArray.length + images.length > 10) {
        toast.error('El maximo de imagenes es 10.')
        return
      }
      setImages((prev) => [...prev, ...fileArray])
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description || !year || !location) {
      toast.error('Todos los campos son obligatorios.')
      return
    }

    if (images.length === 0) {
      toast.error('Debes subir al menos una imagen.')
      return
    }

    // setError('')

    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('No Token')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('year', year)
    formData.append('location', location)
    Array.from(images).forEach((image) => formData.append('images', image))

    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    const data = await response.json()

    if (response.ok) {
      toast.success('Proyecto agregado exitosamente.')
      router.push('/dashboard/list')
    } else {
      toast.error(data.message || 'Error al agregar el proyecto')
    }
  }

  return (
    <DashboardLayout>
      <div className='max-w-3xl mx-auto p-6 bg-white shadow-md rounded'>
        <h1 className='text-2xl font-bold mb-4'>Agregar Proyecto</h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block mb-1 font-bold'>Titulo</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full border rounded p-2'
            />
          </div>
          <div>
            <label className='block mb-1 font-bold'>Descripcion</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full border rounded p-2'
            />
          </div>
          <div>
            <label className='block mb-1 font-bold'>Año</label>
            <input
              type='text'
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className='w-full border rounded p-2'
            />
          </div>
          <div>
            <label className='block mb-1 font-bold'>Ubicación</label>
            <input
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='w-full border rounded p-2'
            />
          </div>
          <div>
            <label className='block mb-1 font-bold'>Imágenes (máximo 10)</label>
            <input
              type='file'
              multiple
              // accept='image/*'
              onChange={handleImageChange}
              className='block'
            />
            <div className='mt-2'>
              {images.map((image, index) => (
                <div key={index} className='flex items-center space-x-2'>
                  <p>{image.name}</p>
                  <button
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className='text-red-500'
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700'
          >
            Agregar Proyecto
          </button>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default add
