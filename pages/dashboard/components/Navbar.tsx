import React from 'react'
import { useRouter } from 'next/router'
import '../../../app/globals.css'

const Navbar = () => {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <div className='flex items-center justify-between px-6 py-4 bg-gray-800 text-white'>
      <div className='text-xl font-bold'>Construction App</div>
      <button
        onClick={handleLogout}
        className='px-4 py-2 bg-red-600 rounded hover:bg-red-700'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
