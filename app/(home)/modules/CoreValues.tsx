import Image from 'next/image'
import React from 'react'

export const CoreValues = () => {
  return (
    <section className='bg-neutral-950 text-white'>
      <div className='grid grid-cols-1 md:grid-cols-3'>
        {data.map((item, index) => {
          const isSecondItem = index === 1

          return (
            <div
              key={item.title}
              className={`flex flex-col items-center p-8 ${
                isSecondItem && 'bg-primary text-black'
              }`}
            >
              <div className='flex flex-col items-center gap-4 text-center'>
                <div
                  className={`w-20 h-20 border-2 ${
                    isSecondItem ? 'border-black' : 'border-white'
                  } rounded-full flex items-center justify-center`}
                >
                  <Image src={item.img} alt='icon' width={43} height={34} />
                </div>
                <h3>{item.title}</h3>
                <p className='max-w-sm'>{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

const data = [
  {
    img: '/excellence.png',
    // title: 'Excellence',
    title: 'Excelencia',
    description:
      // 'Committing to superior craftsmanship and attention to detail in every project, ensuring exceptional outcomes that stand the test of time.',
      'Comprometidos con una artesanía superior y atención al detalle en cada proyecto, garantizando resultados excepcionales que perduran en el tiempo.',
  },
  {
    img: '/innovation.png',
    // title: 'Innovation',
    title: 'Innovación',
    description:
      // 'Embracing cutting-edge technologies and creative solutions to deliver modern, efficient, and sustainable construction results.',
      'Adoptamos tecnologías de vanguardia y soluciones creativas para ofrecer resultados de construcción modernos, eficientes y sostenibles.',
  },
  {
    img: '/customer.png',
    // title: 'Customer',
    title: 'Clientes',
    description:
      // 'Building strong relationship through clear communication, personalized service, and a relentless dedication to meeting our clients unique needs.',
      'Fomentamos relaciones sólidas a través de una comunicación clara, un servicio personalizado y una dedicación inquebrantable a satisfacer las necesidades únicas de nuestros clientes.',
  },
]
