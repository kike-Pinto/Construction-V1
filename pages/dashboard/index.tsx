import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useRouter } from 'next/router'
import useAuth from '@/hooks/useAuth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const index = ({ children }: { children: React.ReactNode }) => {
  useAuth()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')

    // Si no hay token, redirige al login
    if (!token) {
      router.push('/login')
    }
  }, [])

  return (
    <div className='h-screen flex flex-col'>
      <ToastContainer />
      {/* Navbar */}
      <Navbar />
      <div className='flex flex-1'>
        <Sidebar />
        {/* Content */}
        <main className='flex-1 p-6 bg-gray-100'>{children}</main>
      </div>
    </div>
  )
}

export default index
