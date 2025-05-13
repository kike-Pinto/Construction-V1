import React from 'react'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import Link from 'next/link'
import { FaArrowDown } from 'react-icons/fa'
import { HeroCarousel } from './HeroCarousel'
import { Badge } from '@/components/Badge'

export const Hero = () => {
  return (
    <div className='relative h-screen w-full pt-12 md:pt-0 overflow-hidden'>
      <HeroCarousel />
      <Container className='relative z-10 flex flex-col justify-between h-full text-white'>
        <div />
        <div>
          <Badge />
          <h1 className='my-4'>
            CONSTRUIMOS CON <br />
            <span className='text-primary'>PRECISION</span>
          </h1>

          <p className='mb-8 md:max-w-3xl'>
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ratione
            omnis voluptatibus porro aliquam magnam necessitatibus rem nulla
            autem natus ipsam repellat tempore tempora ea culpa, ipsum fugit
            reiciendis consequatur. */}
            Nos especializamos en estructuras metálicas, ofreciendo soluciones
            de alta calidad en diseño, fabricación y montaje. Trabajamos con
            fierros y soldaduras para proyectos industriales, comerciales y
            residenciales.
          </p>

          <Button />
        </div>

        <div>
          <Link
            href='/'
            className='inline-block rounded-full p-2 bg-transparent text-white border-2 border-white shadow-lg animate-bounce'
          >
            <FaArrowDown size='24' />
          </Link>
        </div>
      </Container>
    </div>
  )
}
