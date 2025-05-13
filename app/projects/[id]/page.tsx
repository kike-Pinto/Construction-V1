// import { SectionSplit } from '@/components/SectionSplit'
// import { Banner } from '@/modules/Banner'
// import { ProjectSingle } from './modules/ProjectSingle'
// import { SimilarProjects } from './modules/SimilarProjects'

// interface WorkProps {
//   params: {
//     id: string
//   }
// }

// // Obtiene todos los proyectos desde la API
// async function fetchProjects() {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/public-projects`
//   )
//   if (!response.ok) {
//     throw new Error('Error al obtener los proyectos')
//   }
//   return response.json()
// }

// // Fetch project data from the public API
// async function fetchProject(id: string) {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${id}`)
//   if (!response.ok) {
//     throw new Error('Project not found')
//   }
//   return response.json()
// }

// // const project = projects.find((p) => p.id === Number(id))

// export default async function Work({ params }: WorkProps) {
//   // console.log('Valor de params:', params)
//   const { id } = await params

//   if (!id) {
//     console.error('ID no definido en params')
//     return <div>Error: ID no definido</div>
//   }

//   let project = null
//   let allProjects = []

//   try {
//     // Obtén el proyecto actual
//     project = await fetchProject(id)

//     // Obtén todos los proyectos
//     allProjects = await fetchProjects()
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     return <div>Error al cargar los datos del proyecto</div>
//   }

//   // Filtra los proyectos similares
//   const similarProjects = allProjects
//     .filter(
//       (p: any) => p?.location === project?.location && p?.id !== project?.id
//     )
//     .slice(0, 3)

//   return (
//     <>
//       <Banner />

//       <SectionSplit>
//         {project && <ProjectSingle {...project} />}
//         {similarProjects.length > 0 && (
//           <SimilarProjects projects={similarProjects} />
//         )}
//       </SectionSplit>
//     </>
//   )
// }

// export const projects = [
//   {
//     id: 1,
//     title: 'Projecto 1',
//     description: 'Short description for Project 1',
//     year: 2021,
//     location: 'Iquique',
//     images: ['/proyecto1.jpg'],
//   },
//   {
//     id: 2,
//     title: 'Projecto 2',
//     description: 'Short description for Project 2',
//     year: 2021,
//     location: 'Iquique',
//     images: ['/proyecto2.jpg'],
//   },
//   {
//     id: 3,
//     title: 'Projecto 3',
//     description: 'Short description for Project 3',
//     year: 2022,
//     location: 'Iquique',
//     images: ['/proyecto3.avif'],
//   },
//   {
//     id: 4,
//     title: 'Projecto 4',
//     description: 'Short description for Project 4',
//     year: 2023,
//     location: 'Iquique',
//     images: ['/proyecto1.jpg'],
//   },
//   {
//     id: 5,
//     title: 'Projecto 5',
//     description: 'Short description for Project 5',
//     year: 2022,
//     location: 'Iquique',
//     images: ['/proyecto2.jpg'],
//   },
//   {
//     id: 6,
//     title: 'Projecto 6',
//     description: 'Short description for Project 6',
//     year: 2023,
//     location: 'Iquique',
//     images: ['/proyecto3.avif'],
//   },
//   {
//     id: 7,
//     title: 'Projecto 7',
//     description: 'Short description for Project 7',
//     year: 2021,
//     location: 'Alto Hospicio',
//     images: ['/proyecto1.jpg'],
//   },
//   {
//     id: 8,
//     title: 'Projecto 8',
//     description: 'Short description for Project 8',
//     year: 2021,
//     location: 'Alto Hospicio',
//     images: ['/proyecto2.jpg'],
//   },
//   {
//     id: 9,
//     title: 'Projecto 9',
//     description: 'Short description for Project 9',
//     year: 2022,
//     location: 'Alto Hospicio',
//     images: ['/proyecto3.avif'],
//   },
//   {
//     id: 10,
//     title: 'Projecto 10',
//     description: 'Short description for Project 10',
//     year: 2023,
//     location: 'Iquique',
//     images: ['/proyecto1.jpg'],
//   },
//   {
//     id: 11,
//     title: 'Projecto 11',
//     description: 'Short description for Project 11',
//     year: 2022,
//     location: 'Iquique',
//     images: ['/proyecto2.jpg'],
//   },
//   {
//     id: 12,
//     title: 'Projecto 12',
//     description: 'Short description for Project 12',
//     year: 2023,
//     location: 'Iquique',
//     images: ['/proyecto3.avif'],
//   },
// ]

import { SectionSplit } from '@/components/SectionSplit'
import { Banner } from '@/modules/Banner'
import { ProjectSingle } from './modules/ProjectSingle'
import { SimilarProjects } from './modules/SimilarProjects'

interface WorkProps {
  params: { id: string }
}

async function fetchProjects() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/public-projects`
  )
  if (!response.ok) throw new Error('Error al obtener los proyectos')
  return response.json()
}

async function fetchProject(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${id}`)
  if (!response.ok) throw new Error('Project not found')
  return response.json()
}

export default async function Work({ params }: WorkProps) {
  const { id } = await params
  console.log('ID enviando', id)

  if (!id) {
    console.error('ID no definido en params')
    return <div>Error: ID no definido</div>
  }

  try {
    const [project, allProjects] = await Promise.all([
      fetchProject(id),
      fetchProjects(),
    ])

    const similarProjects = allProjects
      .filter((p: any) => p?.location === project?.location && p?.id !== id)
      .slice(0, 3)

    return (
      <>
        <Banner />
        <SectionSplit>
          <ProjectSingle {...project} />
          {similarProjects.length > 0 && (
            <SimilarProjects projects={similarProjects} />
          )}
        </SectionSplit>
      </>
    )
  } catch (error) {
    console.error('Error fetching data:', error)
    return <div>Error al cargar los datos del proyecto.</div>
  }
}
