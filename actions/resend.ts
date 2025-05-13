'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendForm(
  prevState: { message: string },
  formData: FormData
) {
  const schema = z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email(),
    message: z.string().min(1),
  })

  const parse = schema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!parse.success) {
    return { message: 'error' }
  }

  const { name, phone, email, message } = parse.data

  try {
    const { error } = await resend.emails.send({
      from: `${phone} - ${name} <onboarding@resend.dev>`,
      to: 'ejecutar.programacion@gmail.com',
      subject: `New message from ${name}`,
      html: `<p>${email}:<br /><br /> ${message}</p>,`,
    })

    if (error) {
      return { message: 'error' }
    }

    return { message: 'success' }
  } catch (error) {
    return { message: 'error' }
  }
}
