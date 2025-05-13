import React from 'react'
import { Container } from '@/components/Container'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { SectionName } from '@/components/SectionName'
import { Route } from '@/types/route'

export const Services = () => {
  return (
    <section>
      <Container>
        <SectionName name='servicios' />
        <div className='grid grid-cols-1 md:grid-cols-3 text-white'>
          {data.map((item, index) => {
            const isSecondItem = index === 1
            return (
              <div
                key={item.title}
                className={`flex flex-col justify-between px-4 md:px-8 py-8 md:py-4 space-y-12 ${
                  isSecondItem ? 'bg-white text-black' : 'bg-primary'
                }`}
              >
                <h3>0{index + 1}.</h3>
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <div className='flex justify-between'>
                  <Link href={item.href}>
                    <button
                      className={`border-2 ${
                        isSecondItem ? 'border-black' : 'border-white'
                      } p-4 inline-block`}
                    >
                      <FaArrowRight size='24' />
                    </button>
                  </Link>

                  <div
                    className={`relative rounded-lg w-16 h-full border-2 ${
                      isSecondItem
                        ? 'bg-primary border-primary'
                        : 'bg-white border-white'
                    }`}
                  >
                    <div
                      className={`absolute w-full h-full right-2 bottom-2 ${
                        isSecondItem ? 'bg-white' : 'bg-primary'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

const data = [
  {
    title: 'CONTRATACION GENERAL',
    href: Route.GENERAL_CONTRACTING,
    description:
      'We offer a full range of general contracting services, from pre-construction to project closeout.',
  },
  {
    title: 'RENOVACION Y RESTORACION',
    href: Route.RENOVATION_AND_RESTORATION,
    description:
      'We specialize in renovation and restoration projects, including historical renovations.',
  },
  {
    title: 'CONSTRUCCION MONOLITICA',
    href: Route.MONOLITHIC_CONSTRUCTION,
    description:
      'We are experts in monolithic construction, offering innovative solutions for complex projects.',
  },
]
