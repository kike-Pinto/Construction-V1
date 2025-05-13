import React, { useState } from 'react'
import { useRouter } from 'next/router'
import '../app/globals.css'

const login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('token', data.token)
      router.push('/dashboard')
    } else {
      setError(data.error || 'Credenciales incorrectas')
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded'
      >
        <h1 className='text-2xl font-bold text-center'>Iniciar Sesion</h1>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300'
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300'
        />
        <button
          type='submit'
          className='w-full p-3 text-white bg-blue-600 rounded hover:bg-blue-700'
        >
          Iniciar Sesion
        </button>
      </form>
    </div>
  )
}

export default login
