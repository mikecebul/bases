import { GlobalConfig } from "payload/types";
import { revalidatePath } from "next/cache";

export const ServicesPage: GlobalConfig = {
  slug: "services-page",
  label: "Services Page",
  hooks: {
    afterChange: [() => revalidatePath("/(frontend)/services", "page")],
  },
  fields: [
    {
      name: "subtitle",
      type: "text",
      defaultValue: "Redefine your recovery path",
      required: true,
    },
    {
      name: "title",
      type: "text",
      defaultValue: "Everything you need for a successful recovery journey",
      required: true,
    },
    {
      name: "description",
      type: "text",
      defaultValue:
        "With decades of experience, we&apos;ve developed services that truly serve our community&apos;s needs.",
      required: true,
    },
    {
      name: "listOfServices",
      label: "List of services",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
      required: true,
    },
  ],
};
