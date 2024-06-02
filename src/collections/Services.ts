import { lucideIcons } from "@/components/icons";
import { CollectionConfig } from "payload/types";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Service",
    plural: "Services",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "desc", "icon"],
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
      label: "Icon",
      type: "select",
      required: true,
      options: lucideIcons.map((icon) => ({
        label: icon.label,
        value: icon.value,
      })),
      admin: {
        width: "25%",
      },
    },
  ],
};
