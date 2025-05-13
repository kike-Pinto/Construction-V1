import React, { ReactNode } from 'react'
import { Container } from '@/components/Container'
import { SectionSplit } from '@/components/SectionSplit'
import { Banner } from '@/modules/Banner'
import Image from 'next/image'
import { Projects } from '@/modules/Projects'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Route } from '@/types/route'

interface ServicePageContentProps {
  title: string
  description: string | ReactNode
  image: string
  subtitle: string
}

export const ServicePageContent = ({
  title,
  description,
  image,
  subtitle,
}: ServicePageContentProps) => {
  return (
    <>
      <Banner />

      <SectionSplit>
        <Container>
          <h1 className='mb-8'>{title}</h1>

          <p className='mb-8'>{subtitle}</p>

          <div className='grid grid-cols-1 md:grid-cols-[0.35fr_0.65fr] bg-white'>
            <div className='relative h-96 md:h-full'>
              <Image
                src={image}
                alt='service image'
                fill
                className='object-cover'
              />
            </div>

            <div className='p-12'>
              <p className='mb-8'>{description}</p>

              <Link href={Route.PROJECTS}>
                <Button>Ver Proyectos</Button>
              </Link>
            </div>
          </div>
        </Container>

        <Projects />
      </SectionSplit>
    </>
  )
}
