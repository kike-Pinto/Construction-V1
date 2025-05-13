import React from 'react'
import { ServicePageContent } from '../modules/ServicePageContent'

export default function RenovationAndRestoration() {
  return <ServicePageContent {...data} />
}

const data = {
  title: 'RENOVACION Y RESTORACION',
  subtitle: `"Versiculus" performs the function of a general contractor and takes responsability for the quality of all construction works. The company occupies a leading position in various construction segments, such as monolithic structure concreting, renovation, and restoration.`,
  image: '/proyecto2.jpg',
  description: (
    <>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit
      expedita dolorem doloribus vel natus dicta. Inventore aut illo, adipisci
      doloremque facilis maxime sapiente, dolores at suscipit aliquam, vero
      expedita veniam.
      <br />
      <br />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum animi
      tempore ratione ipsam dicta iusto, fugiat est saepe omnis quasi labore
      alias voluptatibus beatae sint quis repellendus ullam dolores tenetur!
    </>
  ),
}
