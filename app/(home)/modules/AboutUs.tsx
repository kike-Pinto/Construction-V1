import React from 'react'
import { Container } from '@/components/Container'
import { SectionName } from '@/components/SectionName'

export const AboutUs = () => {
  return (
    <section>
      <Container>
        <SectionName name='Acerca de Nosotros' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12'>
          <h2 className='font-medium'>
            NUESTRO EQUIPO ESTÁ LISTO PARA CONSTRUIR TUS SUEÑOS
          </h2>
          <p>
            Nuestro equipo está listo para convertir tus sueños en realidad, con
            experiencia, dedicación y compromiso en cada proyecto, creando
            estructuras sólidas y funcionales que superan expectativas.
            ¡Construyamos juntos!
          </p>
        </div>

        <div className='relative'>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-100' />
          <video
            src='/estructurasMetalicas2.mp4'
            muted
            autoPlay
            loop
            className='object-cover h-[200px] md:h-[450px] w-full'
          />
        </div>

        <div className='grid grid-cols-2 md:flex justify-between gap-4 md:gap-8 mt-4'>
          {data.map((item) => (
            <div key={item.title} className='text-center'>
              <h2 className='mb-2 text-primary'>{item.title}</h2>
              <p className='text-sm'>{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

const data = [
  {
    title: '20+',
    description: 'AÑOS DE EXPERIENCIA',
  },
  {
    title: '250+',
    description: 'PROJECTOS COMPLETADOS',
  },
  {
    title: '55+',
    description: 'MILLIONES DE PESOS EN INGRESOS ',
  },
  {
    title: '30+',
    description: 'EMPLEADOS',
  },
]
