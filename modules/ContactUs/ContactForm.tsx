'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      // Aquí va tu lógica para enviar el formulario (por ejemplo, usando `sendForm`)
      // Simularemos un envío exitoso:
      console.log(data)

      // Resetear el formulario después de un envío exitoso
      reset()
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-6 bg-white text-black p-8 rounded-lg'
    >
      <div className='space-y-2'>
        <p className='text-base font-extrabold'>Nombre</p>
        <Input
          type='text'
          required
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
      </div>

      <div className='space-y-2'>
        <p className='text-base font-extrabold'>Email</p>
        <Input
          type='email'
          required
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
      </div>

      <div className='space-y-2'>
        <p className='text-base font-extrabold'>Telefono</p>
        <Input
          type='number'
          required
          {...register('phone', { required: 'Phone is required' })}
        />
        {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
      </div>

      <div className='space-y-2'>
        <p className='text-base font-extrabold'>Mensaje</p>
        <textarea
          required
          {...register('message', { required: 'Message is required' })}
          className='p-2'
        />
        {errors.message && (
          <p className='text-red-500'>{errors.message.message}</p>
        )}
      </div>

      <div className='flex justify-center'>
        <SubmitButton isSubmitting={isSubmitting} />
      </div>

      {isSubmitSuccessful && (
        <div className='flex items-center space-x-2 text-green-500'>
          <BiCheckCircle />
          <p aria-live='polite' className='text-base'>
            Your message has been sent successfully!
          </p>
        </div>
      )}

      {errors.message && (
        <div className='flex items-center space-x-2 text-red-500'>
          <BiErrorCircle />
          <p aria-live='polite' className='text-base'>
            Se Produjo un error al enviar su mensaje
          </p>
        </div>
      )}
    </form>
  )
}

const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <Button type='submit' disabled={isSubmitting}>
      {isSubmitting ? 'Enviando...' : 'Enviar'}
    </Button>
  )
}
