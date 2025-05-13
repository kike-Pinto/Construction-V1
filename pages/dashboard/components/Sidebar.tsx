import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Sidebar = () => {
  const router = useRouter()

  return (
    <div className='h-full p-4 bg-gray-200 w-64'>
      <nav className='flex flex-col space-y-4'>
        <Link
          href='/dashboard/add'
          className={`p-2 rounded ${
            router.pathname === '/dashboard/add' ? 'bg-gray-400' : ''
          } hover:bg-gray-300`}
        >
          Add Project
        </Link>
        <Link
          href='/dashboard/list'
          className={`p-2 rounded ${
            router.pathname === '/dashboard/list' ? 'bg-gray-400' : ''
          } hover:bg-gray-300`}
        >
          List Projects
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar
