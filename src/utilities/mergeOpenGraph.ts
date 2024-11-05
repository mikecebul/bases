import type { Metadata } from 'next'
import { baseUrl } from './baseUrl'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  url: baseUrl,
  title: 'Substance Use and Mental Health Counseling.',
  description: 'Outpatient substance use and mental health counseling in Charlevoix, MI.',
  images: [
    {
      url: `${baseUrl}/flowers-sign-meta.webp`,
    },
  ],
  siteName: 'BASESmi',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
