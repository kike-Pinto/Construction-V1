import React, { useEffect, useState } from 'react'
import DashboardLayout from './index'
import { useRouter } from 'next/router'
import useAuth from '@/hooks/useAuth'

interface Project {
  _id: string
  title: string
  description: string
  year: string | number
  location: string
  images: string[]
}

const truncateText = (text: string, wordLimit: number): string => {
  const words = text.split(' ')
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(' ') + '...'
    : text
}

const list = () => {
  useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setError('No tienes acceso. Inicia sesion')
        router.push('/login')
        return
      }

      try {
        const response = await fetch('/api/projects', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Error al obtener los proyectos')
        }
        const data = await response.json()
        setProjects(data)
      } catch (error: any) {
        setError(error.message)
      }
    }

    fetchProjects()
  }, [router])

  if (error) {
    return <p className='text-red-500'>{error}</p>
  }

  return (
    <DashboardLayout>
      <div className='max-w-6xl mx-auto p-4'>
        <h1 className='text-3xl font-bold mb-8'>Listado de Proyectos</h1>
        {projects.length === 0 ? (
          <p>No hay proyectos disponibles</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {projects.map((project) => (
              <div
                key={project._id}
                className='bg-white shadow-md rounded p-4 space-y-4 cursor-pointer hover:shadow-lg transition-shadow'
                onClick={() => router.push(`/dashboard/project/${project._id}`)}
              >
                <h2 className='text-[1rem] font-bold'>
                  {truncateText(project.title, 5)}
                </h2>
                <p className='text-sm'>
                  {truncateText(project.description, 10)}
                </p>
                <p className='text-sm text-gray-600'>
                  <strong>Año:</strong> {project.year}
                </p>
                <p className='text-sm text-gray-600'>
                  <strong>Ubicación:</strong> {project.location}
                </p>
                <div className='flex space-x-2 overflow-x-scroll'>
                  {project.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Image ${index + 1}`}
                      className='w-24 h-24 object-cover rounded'
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default list
