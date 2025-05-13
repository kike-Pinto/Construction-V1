import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { SectionName } from '@/components/SectionName'
import Image from 'next/image'
import React from 'react'

export const Career = () => {
  return (
    <section>
      <Container>
        <SectionName name='carrera' />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <h2 className='mb-4'>ÚNETE A NUESTRO EQUIPO</h2>
            <Image
              src='/worker.jpg'
              alt='worker'
              sizes='100vw'
              width={0}
              height={0}
              className='h-auto w-full mb-4 md:hidden'
            />

            <div className='space-y-4 mb-4'>
              <p>
                En nuestra empresa, valoramos el talento y la dedicación. Únete
                a un equipo apasionado por transformar ideas en realidades
                tangibles.
              </p>
              <p>
                Ofrecemos un entorno de trabajo dinámico, oportunidades de
                crecimiento y desarrollo profesional para construir un futuro
                sólido juntos.
              </p>
              <p>
                Tu compromiso y habilidades son esenciales para nuestros
                proyectos innovadores. Sé parte de un equipo que marca la
                diferencia.
              </p>
            </div>
            <Button />
          </div>

          <div className='relative hidden md:block'>
            <Image
              src='/worker.jpg'
              alt='worker'
              sizes='100vw'
              width={0}
              height={0}
              className='h-auto w-full'
            />

            <Image
              src='/dots.png'
              alt='dots'
              width={200}
              height={200}
              className='absolute left-0 bottom-0 transform -translate-x-1/2 translate-y-1/2'
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
