import { Container } from '@/components/Container'
import { Banner } from '@/modules/Banner'
import { SectionSplit } from '@/components/SectionSplit'
import Link from 'next/link'
import { Project } from './components/Project'
import { PaginationControl } from './components/PaginationControl'
import { Filtering } from './components/Filtering'
import { SearchParametro } from '@/types/route'

async function fetchProjects() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/public-projects`
  )
  if (!response.ok) {
    throw new Error('Error al obtener los proyectos')
  }
  return response.json()
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const resolvedSearchParams = await searchParams

  // Obtener proyectos desde la API
  let projects = []
  try {
    projects = await fetchProjects()
  } catch (error) {
    console.log(error)
    projects = []
  }

  const years = Array.from(new Set(projects.map((p: any) => p.year))).map(
    Number
  )
  const locations = Array.from(
    new Set(projects.map((p: any) => p.location))
  ) as string[]

  // console.log(resolvedSearchParams)

  const page = resolvedSearchParams[SearchParametro.PAGE] ?? '1'
  const perPage = resolvedSearchParams[SearchParametro.PER_PAGE] ?? '6'

  const start = (Number(page) - 1) * Number(perPage)
  const end = start + Number(perPage)

  const totalPages = Math.ceil(projects.length / Number(perPage))

  const filteredProjects = projects.filter((p: any) => {
    const year = resolvedSearchParams[SearchParametro.YEAR] || null
    const location = resolvedSearchParams[SearchParametro.LOCATION] || null

    if (!year && !location) {
      return true
    } else if (year && location) {
      return p.year == Number(year) && p.location == location
    } else if (year) {
      return p.year == Number(year)
    } else if (location) {
      return p.location == location
    }
    return true
  })

  const paginatedProjects = filteredProjects.slice(start, end)

  const isPaginationVisible = filteredProjects.length > Number(perPage)

  return (
    <>
      <Banner />

      <SectionSplit>
        <Container>
          <h1 className='mb-4'>Nuestro Trabajo</h1>
          <Filtering years={years} locations={locations} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12'>
            {paginatedProjects.map((project: any, index: number) => {
              console.log('Generando enlace para', project._id)
              return (
                <Link
                  // href={`/projects/6750d3abc65c8515e1292660`}
                  href={`/projects/${project._id}`}
                  key={project._id || index}
                >
                  <Project {...project} />
                </Link>
              )
            })}
          </div>
          {isPaginationVisible && (
            <PaginationControl
              page={page}
              perPage={perPage}
              hasNextPage={projects.length > end}
              hasPrevPage={start > 0}
              totalPages={totalPages}
            />
          )}
        </Container>
      </SectionSplit>
    </>
  )
}

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
