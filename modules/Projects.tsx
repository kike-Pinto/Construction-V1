import React from 'react'
import { Container } from '@/components/Container'
import { SectionName } from '@/components/SectionName'
import EmblaCarousel from '@/components/Carousel/EmblaCarousel'

const images = ['/proyecto1.jpg', '/proyecto2.jpg', '/proyecto3.avif']

// create array with image, title and href using images from images

const data = [
  {
    image: '/proyecto1.jpg',
    title: 'Projecto 1',
    link: '/project1',
  },
  {
    image: '/proyecto2.jpg',
    title: 'Projecto 2',
    link: '/project2',
  },
  {
    image: '/proyecto3.avif',
    title: 'Projecto 3',
    link: '/project3',
  },
]

export const Projects = () => {
  return (
    <section>
      <Container>
        <SectionName name='proyectos' />
        <EmblaCarousel slides={data} />
      </Container>
    </section>
  )
}
