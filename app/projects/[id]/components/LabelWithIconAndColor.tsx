import Image from 'next/image'
import React from 'react'

interface LabelWithIconAndColorProps {
  icon: string
  alt: string
  text: string | number
}

export const LabelWithIconAndColor = ({
  icon,
  alt,
  text,
}: LabelWithIconAndColorProps) => {
  return (
    <div className='flex items-center gap-2 p-2 bg-primary'>
      <Image src={icon} alt={alt} width={24} height={24} />
      <p className='text-sm'>{text}</p>
    </div>
  )
}
