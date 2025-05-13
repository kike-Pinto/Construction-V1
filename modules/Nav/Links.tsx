import React from 'react'
import { Route, SearchParametro } from '@/types/route'
import { GrInfo, GrPhone, GrProjects, GrServices } from 'react-icons/gr'
import Link from 'next/link'

interface LinksProps {
  handleLinkClick?: () => void
}

export const Links = ({ handleLinkClick }: LinksProps) => {
  return (
    <ul className='space-y-4 md:space-y-0 md:space-x-4 flex-col md:flex-row md:flex'>
      {links.map((link) => (
        <li key={link.text}>
          <Link
            onClick={handleLinkClick}
            href={link.href}
            className='flex items-center gap-2 hover:text-primary text-xl font-medium'
          >
            <link.icon size='14' className='text-primary' />
            <p>{link.text}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const links = [
  {
    href: Route.ABOUT,
    text: 'Nosotros',
    icon: GrInfo,
  },
  {
    href: Route.SERVICES,
    text: 'Servicios',
    icon: GrServices,
  },
  {
    href: `${Route.PROJECTS}?${SearchParametro?.PAGE}=1&${SearchParametro?.PER_PAGE}=6`,
    // href: Route.PROJECTS,
    text: 'Proyectos',
    icon: GrProjects,
  },
  {
    href: Route.CONTACT,
    text: 'Contacto',
    icon: GrPhone,
  },
]
