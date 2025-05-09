import type { AdminViewServerProps } from 'payload'

import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter, SetStepNav } from '@payloadcms/ui'

const AnalyticsDefaultRootView: React.FC<AdminViewServerProps> = ({
  initPageResult,
  params,
  searchParams,
}) => {
  const navItem = [
    {
      label: 'Analytics',
      url: '/analytics',
    },
  ]
  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
    >
      <SetStepNav nav={navItem} />
      <Gutter>
        <iframe
          src="https://analytics.mikecebul.dev/share/OiX0b1uO00C1Cgf3/basesmi.org"
          width="100%"
          height="100%"
          style={{ border: 'none', overflow: 'hidden', minHeight: '85dvh' }}
          title="Analytics"
          allowFullScreen
          loading="lazy"
        />
      </Gutter>
    </DefaultTemplate>
  )
}

export default AnalyticsDefaultRootView
