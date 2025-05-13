import React from 'react'
import { ServicePageContent } from '../modules/ServicePageContent'

export default function GeneralContracting() {
  return <ServicePageContent {...data} />
}

const data = {
  title: 'CONSTRUCCION MONOLITICO',
  subtitle: `"Versiculus" performs the function of a general contractor and takes responsability for the quality of all construction works. The company occupies a leading position in various construction segments, such as monolithic structure concreting, renovation, and restoration.`,
  image: '/proyecto3.avif',
  description: (
    <>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ad
      perspiciatis commodi id saepe repudiandae doloribus. Odit quaerat maxime
      magni nulla sint rem similique, eum, illum, veritatis veniam iusto iure?
      <br />
      <br />
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae
      maxime cum totam repellat laboriosam asperiores, libero odit ex voluptas
      cumque incidunt praesentium architecto, magnam voluptatem error accusamus
      dignissimos in provident.
    </>
  ),
}
