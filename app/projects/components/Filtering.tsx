'use client'

import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SearchParametro } from '@/types/route'

interface FilteringProps {
  years: number[]
  locations: string[]
}

export const Filtering = ({ years, locations }: FilteringProps) => {
  const router = useRouter()
  const pathaname = usePathname()
  const searchParams = useSearchParams()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target

    const params = new URLSearchParams(searchParams?.toString())
    params.set(name, value)

    router.push(pathaname + '?' + params.toString())
  }

  return (
    <div className='flex gap-4 mb-8'>
      <select
        name='year'
        className='border border-gray-300 rounded-md px-4 py-2'
        onChange={handleChange}
        defaultValue={searchParams?.get(SearchParametro.YEAR) as string}
      >
        <option value=''>Filtar por Año</option>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        name='location'
        className='border border-gray-300 rounded-md px-4 py-2'
        onChange={handleChange}
        defaultValue={searchParams?.get(SearchParametro.LOCATION) as string}
      >
        <option value=''>Filtrar por Ubicacion</option>
        {locations.map((location, index) => (
          <option key={index} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  )
}
