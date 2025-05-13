import React from 'react'
import Image from 'next/image'
import Award from '@/public/award.png'
import { Badge } from '@/components/Badge'

export const ContactDetails = () => {
  return (
    <div>
      <div className='relative w-24 h-24'>
        <Image
          src={Award}
          alt='award'
          fill
          className='object-cover rounded-full'
        />
      </div>
      <h2 className='my-4'>CONTÁCTANOS</h2>
      <p className='text-lg mb-4'>
        Estamos aquí para ayudarte con tu proyecto. Contáctanos para obtener una
        oferta personalizada y soluciones a medida para tus necesidades.
        <br />
        <br />
        Nos especializamos en ofrecer atención personalizada para garantizar que
        tus expectativas se cumplan de manera eficaz y profesional.
        <br />
        <br />
        Nuestro equipo está listo para responder a tus preguntas y colaborar
        contigo para transformar tus ideas en realidad.
      </p>

      <Badge />
    </div>
  )
}
