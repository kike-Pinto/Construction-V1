import { Route } from '@/types/route'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Logo = () => {
  return (
    <Link href={Route.HOME}>
      <Image
        src='/logo2.png'
        alt='logo'
        width={40}
        height={40}
        className='mt-5 mb-5'
      />
    </Link>
  )
}
