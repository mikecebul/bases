import { CollectionConfig } from "payload/types";
import { IconSelect } from "./IconSelect";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Service",
    plural: "Services",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "desc", "icon", "updatedAt"],
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "desc",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      name: "icon",
      type: "text",
      admin: {
        components: {
          Field: IconSelect,
        },
      },
    },
  ],
};
