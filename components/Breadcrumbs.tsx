// 'use client'

// import { Route } from '@/types/route'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React from 'react'

// export const Breadcrumbs = () => {
//   const pathname = usePathname()

//   if (!pathname) {
//     return null
//   }
//   const paths = pathname.split('/').filter((path) => path !== '')

//   paths.forEach((path, index) => {
//     paths[index] = path.replace(/-/g, ' ')
//   })

//   if (Number.isInteger(Number(paths[paths.length - 1]))) {
//     paths.pop()
//   }

//   return (
//     <nav>
//       <ol className='flex items-center space-x-2 text-sm'>
//         <li>
//           <Link href={Route.HOME} className='text-white'>
//             Home
//           </Link>
//         </li>

//         {paths.map((path, index) => {
//           const href = `/${paths.slice(0, index + 1).join('/')}`
//           const isLast = index === paths.length - 1
//           path = path.charAt(0).toUpperCase() + path.slice(1)

//           return (
//             <li key={path}>
//               <div className='flex items-center'>
//                 <span className='mx-2 text-gray-400'>/</span>
//                 {isLast ? (
//                   <span className='text-white font-medium'>{path}</span>
//                 ) : (
//                   <Link href={href} className='text-white'>
//                     {path}
//                   </Link>
//                 )}
//               </div>
//             </li>
//           )
//         })}
//       </ol>
//     </nav>
//   )
// }

'use client'

import { Route } from '@/types/route'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const Breadcrumbs = () => {
  const pathname = usePathname()
  const [projectTitle, setProjectTitle] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Obtener el título del proyecto a partir del ID
  useEffect(() => {
    const fetchProjectTitle = async (id: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${id}`
        )
        if (response.ok) {
          const project = await response.json()
          setProjectTitle(project?.title || 'Proyecto no encontrado')
        }
      } catch (error) {
        console.error('Error al obtener el proyecto:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (pathname) {
      const paths = pathname.split('/').filter((path) => path !== '')
      const id = paths[paths.length - 1]
      console.log('Last path segment (ID):', id)

      // Si el último segmento parece ser un ID, busca el proyecto
      if (id) {
        fetchProjectTitle(id)
      } else {
        setIsLoading(false) // Si no hay un ID, dejamos de cargar
      }
    }
  }, [pathname])

  // Si aún estamos cargando, mostramos un indicador
  if (isLoading) {
    return <div>Loading...</div>
  }

  // Si el pathname no está disponible, no mostramos las migas
  if (!pathname) {
    return null
  }

  const paths = pathname.split('/').filter((path) => path !== '')

  // Reemplazar el ID con el título del proyecto si es necesario
  paths.forEach((path, index) => {
    if (path === pathname.split('/').at(-1) && projectTitle) {
      // Sustituimos el último segmento (el ID) con el título del proyecto
      paths[index] = projectTitle
    } else {
      paths[index] = path.replace(/-/g, ' ')
    }
  })

  return (
    <nav>
      <ol className='flex items-center space-x-2 text-sm'>
        <li>
          <Link href={Route.HOME} className='text-white'>
            Home
          </Link>
        </li>

        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join('/')}`
          const isLast = index === paths.length - 1
          path = path.charAt(0).toUpperCase() + path.slice(1)

          return (
            <li key={href}>
              <div className='flex items-center'>
                <span className='mx-2 text-gray-400'>/</span>
                {isLast ? (
                  <span className='text-white font-medium'>{path}</span>
                ) : (
                  <Link href={href} className='text-white'>
                    {path}
                  </Link>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
