import { Container } from '@/components/Container'
import { SectionName } from '@/components/SectionName'
import Link from 'next/link'
import React from 'react'
import { Project } from '../../components/Project'
import { Route } from '@/types/route'

interface ProjectProps {
  _id: number
  title: string
  images: string[]
  location: string
  year: number
}

interface SimilarProjectsProps {
  projects: ProjectProps[]
}

export const SimilarProjects = ({ projects }: SimilarProjectsProps) => {
  return (
    <section>
      <Container>
        <SectionName name='proyectos similares' />

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8'>
          {projects.map((project, index) => (
            <Link
              href={`${Route.PROJECTS}/${project._id}`}
              key={project._id || index}
            >
              <Project {...project} />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
