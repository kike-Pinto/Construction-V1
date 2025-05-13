import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '@/modules/Footer'
import { NavigationLargeScreens } from '@/modules/Nav/NavigationLargeScreens'
import { Navigation } from '@/modules/Nav/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Contractor',
  description: 'Construction company',
  icons: {
    icon: '/logo2.png', // Usa tu logo existente como favicon
    apple: '/logo2.png', // También para Apple devices
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {/* Añade este div raíz */}
        <div id='root'>
          <Navigation />
          <NavigationLargeScreens />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
