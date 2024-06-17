import { GlobalConfig } from "payload/types";
import RowLabel from "./RowLabel";

export const ServicesPage: GlobalConfig = {
  slug: "services-page",
  label: "Services Page",
  fields: [
    {
      name: "subtitle",
      type: "text",
      defaultValue: "Redefine your recovery path",
    },
    {
      name: "title",
      type: "text",
      defaultValue: "Everything you need for a successful recovery journey",
    },
    {
      name: "description",
      type: "text",
      defaultValue:
        "With decades of experience, we&apos;ve developed services that truly serve our community&apos;s needs.",
    },
    {
      type: "array",
      name: "listOfServices",
      fields: [
        {
          name: "service",
          type: "relationship",
          relationTo: "services",
          hasMany: false,
        },
      ],
      admin: {
        components: {
          RowLabel: RowLabel,
        },
      },
    },
  ],
};
