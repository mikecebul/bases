import {
  MigrateDownArgs,
  MigrateUpArgs,
} from '@payloadcms/db-mongodb'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Find all pages with Contact blocks and add default contactInstructions and phoneHours
  const pages = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1000,
    req,
  })

  const contactInstructionsData = {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          children: [
            {
              type: 'text',
              text: 'How to Reach Us',
              format: 0,
              version: 1,
            },
          ],
          tag: 'h3',
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Please note: We do not have a front desk for walk-ins.',
              format: 1,
              version: 1,
            },
          ],
          version: 1,
        },
        {
          type: 'heading',
          children: [
            {
              type: 'text',
              text: 'Current Clients',
              format: 0,
              version: 1,
            },
          ],
          tag: 'h4',
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'If you have questions or need to discuss your counseling services, please call, email, or text your counselor directly.',
              format: 0,
              version: 1,
            },
          ],
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'If you\'re unsure who to contact, reach out to Scott (Director) at ',
              format: 0,
              version: 1,
            },
            {
              type: 'link',
              children: [
                {
                  type: 'text',
                  text: '(231) 881-0810',
                  format: 1,
                  version: 1,
                },
              ],
              fields: {
                linkType: 'custom',
                url: 'tel:2318810810',
                newTab: false,
              },
              version: 3,
            },
            {
              type: 'text',
              text: '.',
              format: 0,
              version: 1,
            },
          ],
          version: 1,
        },
        {
          type: 'heading',
          children: [
            {
              type: 'text',
              text: 'New Clients',
              format: 0,
              version: 1,
            },
          ],
          tag: 'h4',
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'We encourage you to use our secure contact form to get in touch with us.',
              format: 0,
              version: 1,
            },
          ],
          version: 1,
        },
        {
          type: 'heading',
          children: [
            {
              type: 'text',
              text: 'Phone Hours',
              format: 0,
              version: 1,
            },
          ],
          tag: 'h4',
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Our main office line ',
              format: 0,
              version: 1,
            },
            {
              type: 'link',
              children: [
                {
                  type: 'text',
                  text: '(231) 547-1144',
                  format: 1,
                  version: 1,
                },
              ],
              fields: {
                linkType: 'custom',
                url: 'tel:2315471144',
                newTab: false,
              },
              version: 3,
            },
            {
              type: 'text',
              text: ' is staffed Monday - Friday, 11:00 AM - 2:00 PM.',
              format: 0,
              version: 1,
            },
          ],
          version: 1,
        },
      ],
      indent: 0,
      format: '',
      version: 1,
    },
  }

  for (const page of pages.docs) {
    let hasChanges = false
    const updatedLayout = page.layout?.map((block: any) => {
      if (block.blockType === 'contactPage') {
        const updates: any = {}

        if (!block.contactInstructions) {
          updates.contactInstructions = contactInstructionsData
          hasChanges = true
        }

        if (!block.phoneHours) {
          updates.phoneHours = 'Monday - Friday, 11:00 AM - 2:00 PM'
          hasChanges = true
        }

        if (hasChanges) {
          return {
            ...block,
            ...updates,
          }
        }
      }
      return block
    })

    if (hasChanges) {
      await payload.update({
        collection: 'pages',
        id: page.id,
        req: {
          ...req,
          headers: {
            ...req.headers,
            'X-Payload-Migration': 'true',
          } as any,
        },
        data: {
          layout: updatedLayout,
        },
      })
    }
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Remove contactInstructions and phoneHours from all Contact blocks
  const pages = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1000,
    req,
  })

  for (const page of pages.docs) {
    let hasChanges = false
    const updatedLayout = page.layout?.map((block: any) => {
      if (block.blockType === 'contactPage') {
        if (block.contactInstructions || block.phoneHours) {
          hasChanges = true
          const { contactInstructions, phoneHours, ...rest } = block
          return rest
        }
      }
      return block
    })

    if (hasChanges) {
      await payload.update({
        collection: 'pages',
        id: page.id,
        req: {
          ...req,
          headers: {
            ...req.headers,
            'X-Payload-Migration': 'true',
          } as any,
        },
        data: {
          layout: updatedLayout,
        },
      })
    }
  }
}
