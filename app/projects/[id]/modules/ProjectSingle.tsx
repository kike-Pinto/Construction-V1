import EmblaCarousel from '@/components/Carousel/EmblaCarousel'
import { Container } from '@/components/Container'
import React from 'react'
import { LabelWithIconAndColor } from '../components/LabelWithIconAndColor'

interface ProjectsSingleProps {
  title: string
  images: string[]
  description: string
  location: string
  year: number
}

export const ProjectSingle = ({
  title,
  images,
  description,
  location,
  year,
}: ProjectsSingleProps) => {
  return (
    <section>
      <Container>
        <h3 className='mb-4'>{title}</h3>

        <EmblaCarousel slides={images} isControlVisible={false} />

        <div className='grid grid-cols-1 md:grid-cols-[0.8fr_0.2fr] gap-4 md:gap-8 mt-4'>
          <p>{description}</p>

          <div className='flex flex-wrap items-center justify-start md:justify-end gap-2'>
            <LabelWithIconAndColor
              icon='/location.png'
              alt='location'
              text={location}
            />

            <LabelWithIconAndColor
              icon='/calendar.png'
              alt='calendar'
              text={year}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
