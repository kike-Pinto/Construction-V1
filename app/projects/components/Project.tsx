import React from 'react'
import { LabelWithIcon } from './LabelWithIcon'
import Image from 'next/image'

interface ProjectProps {
  title: string
  year: number
  location: string
  images: string[]
}

export const Project = ({ title, year, location, images }: ProjectProps) => {
  return (
    <div>
      <div className='relative h-80 w-full transform transition-transform hover:scale-105 hover:opacity-70'>
        <div className='w-full max-h-64 overflow-hidden rounded'>
          <Image
            src={images[0]}
            alt={`Imagen del proyecto: ${title}`}
            width={500}
            height={300}
            className='object-cover w-full h-full'
          />
        </div>

        <div className='absolute bottom-1 right-1 gap-1'>
          <div className='flex gap-1'>
            <LabelWithIcon
              text={location}
              icon='/location.png'
              alt='location'
            />
            <LabelWithIcon text={year} icon='/calendar.png' alt='calendar' />
          </div>
        </div>
      </div>

      <p className='text-xl font-semibold'>{title}</p>
    </div>
  )
}
