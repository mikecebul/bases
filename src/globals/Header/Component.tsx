import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { CompanyInfo, Header } from '@/payload-types'

export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)()
  const companyInfo: CompanyInfo = await getCachedGlobal('company-info')()
  const { contact } = companyInfo

  return <HeaderClient header={header} contact={contact} />
}
