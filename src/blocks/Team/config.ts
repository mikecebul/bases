import { Block } from 'payload'

export const Team: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  fields: [
    {
      name: 'memberType',
      type: 'radio',
      defaultValue: 'staff',
      options: [
        {
          label: 'Staff Member',
          value: 'staff',
        },
        {
          label: 'Board Member',
          value: 'board',
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'teamMembers',
      type: 'relationship',
      relationTo: 'team',
      filterOptions: ({ siblingData }: { siblingData: any }) => {
        return {
          memberType: { equals: siblingData.memberType },
        }
      },
      hasMany: true,
    },
    {
      name: 'reverse',
      type: 'checkbox',
      label: 'Block on opposite side',
    },
  ],
}
