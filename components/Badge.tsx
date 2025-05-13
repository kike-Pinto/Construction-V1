import React from 'react'
import Image from 'next/image'
import StarImg from '@/public/star.png'

export const Badge = () => {
  return (
    <div className='flex gap-2'>
      <div className='flex items-center gap-1'>
        {[...Array(5)].map((_, i) => (
          <Image
            key={`star${i}`}
            src={StarImg}
            alt='star'
            width={16}
            height={16}
          />
        ))}
      </div>
      <p className='text-sm text-white font-bold'>20+ proyectos exitosos</p>
    </div>
  )
}
