import React from 'react'
import Image from 'next/image'

interface LabelWithIconProps {
  icon: string
  alt: string
  text: string | number
}

export const LabelWithIcon = ({ icon, alt, text }: LabelWithIconProps) => {
  return (
    <div className='flex items-center gap-2 p-2 bg-white'>
      <Image src={icon} alt={alt} width={24} height={24} />

      <p className='text-sm'>{text}</p>
    </div>
  )
}
