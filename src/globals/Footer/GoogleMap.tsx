'use client'

import { CompanyInfo } from '@/payload-types'
import { APIProvider, InfoWindow, Map } from '@vis.gl/react-google-maps'
import { LandPlot } from 'lucide-react'


export const GoogleMap = ({ contact }: { contact: CompanyInfo['contact'] }) => {
  const { name, physicalAddress: { coordinates, street, cityStateZip } } = contact
  const defaultPosition = { lat: 45.30352, lng: -85.25986 }

  const position = coordinates
    ? { lat: coordinates[0], lng: coordinates[1] }
    : defaultPosition

  return (
    <div className="h-[350px]">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <Map
          defaultZoom={15}
          defaultCenter={position}
          disableDefaultUI
          fullscreenControl

        >
          <InfoWindow
            position={position}
            shouldFocus={false}
            headerContent={
              <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-4">
                  <h3 className="text-base font-bold text-balance leading-5">{name}</h3>
                </div>
              </div>
            }
          >
            <div className="flex flex-col pt-2">
              <p className="text-sm text-gray-500">{street}</p>
              <p className="text-sm text-gray-500">{cityStateZip}</p>
            </div>
          </InfoWindow>
        </Map>
      </APIProvider>
    </div>
  )
}