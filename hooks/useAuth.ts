import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const useAuth = () => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
    }
  }, [router])
}

export default useAuth
