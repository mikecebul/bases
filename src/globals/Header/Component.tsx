import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { CompanyInfo, Header } from '@/payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import payloadConfig from '@payload-config'

export async function Header() {
  const payload = await getPayloadHMR({ config: payloadConfig })

  const header: Header = await payload.findGlobal({
    slug: 'header',
    depth: 1,
  })

  const { contact }: CompanyInfo = await payload.findGlobal({
    slug: 'company-info',
    depth: 1,
  })

  return <HeaderClient header={header} contact={contact} />
}
