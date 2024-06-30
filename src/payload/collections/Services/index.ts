import { CollectionConfig } from "payload";
import { IconSelect } from "./IconSelect";
import { SeedButton } from "./SeedButton/Index";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Service",
    plural: "Services",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "desc", "icon", "updatedAt"],
    components: {
      afterListTable: [SeedButton],
    },
  },
  access: {
    read: () => true,
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
      required: true,
      admin: {
        components: {
          Field: IconSelect,
        },
      },
    },
  ],
};
