import React from 'react'

interface SectionSplitProps {
  children: React.ReactNode
}

export const SectionSplit = ({ children }: SectionSplitProps) => {
  return (
    <div className='bg-[#F6FCFF] md:py-32 py-8 space-y-12 md:space-y-32'>
      {children}
    </div>
  )
}
