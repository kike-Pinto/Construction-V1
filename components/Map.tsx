'use client'

import React from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css' // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility'

const position: [number, number] = [54.6872, 25.2797]

export const Map = () => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      className='h-96 w-full'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position}></Marker>
    </MapContainer>
  )
}
