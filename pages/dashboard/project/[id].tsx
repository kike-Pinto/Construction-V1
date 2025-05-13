import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DashboardLayout from '../index'
import useAuth from '@/hooks/useAuth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Project {
  _id: string
  title: string
  description: string
  year: string | number
  location: string
  images: string[]
}

const ProjectDetails = () => {
  useAuth()
  const router = useRouter()
  const { id } = router.query
  const [project, setProject] = useState<Project | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [originalProject, setOriginalProject] = useState<Project | null>(null) // Estado original
  const [isEditing, setIsEditing] = useState(false) // Para el modal
  const [updatedProject, setUpdatedProject] = useState<Project | null>(null) // Datos editados

  useEffect(() => {
    if (!id) return

    const fetchProject = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setError('No Token')
        router.push('/login')
        return
      }

      try {
        const response = await fetch(`/api/projects/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Error al obtener el proyecto')
        }
        const data = await response.json()
        setProject(data)
        setUpdatedProject(data)
        setOriginalProject(data)
      } catch (error: any) {
        toast.error(error.message)
      }
    }

    fetchProject()
  }, [id, router])

  // Detectar cambios en los datos editados
  useEffect(() => {
    if (!originalProject || !updatedProject) return

    // Comparar cada campo para detectar cambios
    if (
      originalProject.title !== updatedProject.title ||
      originalProject.description !== updatedProject.description ||
      originalProject.year !== updatedProject.year ||
      originalProject.location !== updatedProject.location ||
      originalProject.images.length !== updatedProject.images.length
    ) {
      toast.info('Se han realizado cambios en el formulario.')
    }
  }, [updatedProject, originalProject])

  //
  const handleSave = async () => {
    const token = localStorage.getItem('token')
    if (!token || !updatedProject) {
      return
    }

    if (!updatedProject) return

    const formData = new FormData()
    for (const image of updatedProject.images) {
      if (image.startsWith('blob:')) {
        const blob = await fetch(image).then((res) => res.blob())
        formData.append('images', blob, `image-${Date.now()}.jpg`)
      } else {
        // Agregar las imágenes existentes
        formData.append('existingImages', image)
      }
    }

    formData.append('title', updatedProject.title)
    formData.append('description', updatedProject.description)
    formData.append('year', String(updatedProject.year))
    formData.append('location', updatedProject.location)

    console.log('Datos enviados:', [...formData.entries()])

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(updatedProject),
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Error al guardar el proyecto')
      }

      const data = await response.json()
      setProject(data.updatedProject) // Actualizar datos en la vista principal
      setOriginalProject(data.updatedProject)
      setIsEditing(false) // Cerrar Modal
      toast.success('Cambios guardados correctamente')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  // if (error) {
  //   return <p className='text-red-500'>{error}</p>
  // }

  if (!project) {
    return <p>Cargando...</p>
  }

  return (
    <DashboardLayout>
      <div className='max-w-4xl mx-auto p-4 space-y-6'>
        <h1 className='text-3xl font-bold'>{project.title}</h1>
        <p className='text-sm'>{project.description}</p>
        <p className='text-sm text-gray-600'>
          <strong>Año:</strong> {project.year}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Ubicación:</strong> {project.location}
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {project.images?.map((image, index) => (
            <div
              key={index}
              className='w-full h-[500px] bg-gray-100 flex items-center justify-center rounded overflow-hidden'
            >
              <img
                src={image}
                alt={`Project Image ${index + 1}`}
                className='w-full h-64 object-cover rounded'
              />
            </div>
          ))}
        </div>

        {/* Boton para abrir el modal */}
        <button
          onClick={() => setIsEditing(true)}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Editar Proyecto
        </button>

        {/* Modal para editar */}
        {isEditing && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-6 rounded shadow-lg w-full max-w-lg space-y-4'>
              <h2 className='text-xl font-bold'>Editar Proyecto</h2>

              {/* Titulo */}
              <div>
                <label className='block text-sm font-medium mb-2'>Titulo</label>
                <input
                  type='text'
                  value={updatedProject?.title}
                  onChange={(e) =>
                    setUpdatedProject({
                      ...updatedProject!,
                      title: e.target.value,
                    })
                  }
                  className='w-full border p-2 rounded text-gray-600'
                />
              </div>

              {/* Descripcion */}
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Descripcion
                </label>
                <textarea
                  value={updatedProject?.description || ''}
                  onChange={(e) =>
                    setUpdatedProject({
                      ...updatedProject!,
                      description: e.target.value,
                    })
                  }
                  className='w-full border p-2 rounded text-gray-600'
                  rows={3}
                />
              </div>

              {/* Año */}
              <div>
                <label className='block text-sm font-medium mb-2'>Año</label>
                <input
                  type='number'
                  value={updatedProject?.year || ''}
                  onChange={(e) =>
                    setUpdatedProject({
                      ...updatedProject!,
                      year: parseInt(e.target.value),
                    })
                  }
                  className='w-full border p-2 rounded text-gray-600'
                />
              </div>

              {/* Ubicacion */}
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Ubicacion
                </label>
                <input
                  type='text'
                  value={updatedProject?.location || ''}
                  onChange={(e) =>
                    setUpdatedProject({
                      ...updatedProject!,
                      location: e.target.value,
                    })
                  }
                  className='w-full border p-2 rounded text-gray-600'
                />
              </div>

              {/* Imagenes */}
              <div>
                <label className='block text-sm font-medium'>Imagenes</label>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {updatedProject?.images.map((image, index) => (
                    <div key={index} className='relative'>
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className='w-20 h-20 object-cover rounded shadow'
                      />
                      <button
                        onClick={() => {
                          const updatedImages = updatedProject.images.filter(
                            (_, i) => i !== index
                          )
                          setUpdatedProject({
                            ...updatedProject!,
                            images: updatedImages,
                          })
                        }}
                        className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm'
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
                <div>
                  <input
                    type='file'
                    accept='image/*'
                    multiple
                    onChange={(e) => {
                      const files = e.target.files
                      if (files && updatedProject) {
                        const newImages = Array.from(files).map((file) =>
                          URL.createObjectURL(file)
                        )
                        setUpdatedProject({
                          ...updatedProject!,
                          images: [...updatedProject.images, ...newImages],
                        })
                      }
                    }}
                    className='block'
                  />
                </div>
              </div>

              {/* Botones */}
              <div className='flex justify-end space-x-2'>
                <button
                  onClick={handleSave}
                  className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default ProjectDetails
