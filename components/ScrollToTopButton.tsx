'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Mostrar u ocultar el botón basado en el scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // Función para scroll al top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className='fixed bottom-8 right-8 z-50'>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className='bg-slate-800 hover:bg-accent text-white p-3 shadow-lg transition-all duration-300 transform hover:scale-110'
          aria-label='Volver arriba'
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  )
}

export default ScrollToTopButton
