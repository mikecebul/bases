import { revalidatePath } from 'next/cache'
import { GlobalConfig } from 'payload'
// import { superAdmin } from "../access/superAdmin";

export const CompanyInfo: GlobalConfig = {
  slug: 'company-info',
  label: 'Company Info',
  admin: {
    group: 'Admin',
    description: 'Update the Header, Footer, and other business information.',
    // hideAPIURL: !superAdmin,
  },
  hooks: {
    afterChange: [() => revalidatePath('/', 'layout')],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'text',
          required: true,
          defaultValue: '(231) 547-1144',
          admin: { width: '50%' },
        },
        {
          name: 'address',
          label: 'Address',
          type: 'text',
          required: true,
          defaultValue: '101 M-66 | Charlevoix, MI',
          admin: { width: '50%' },
        },
      ],
    },
  ],
}
