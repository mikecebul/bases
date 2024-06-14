import { GlobalConfig } from "payload/types";
import IconSelect from "./IconSelect";

export const Services: GlobalConfig = {
  slug: "services",
  label: "Services",
  fields: [
    {
      name: "services",
      label: "Services",
      type: "array",
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
        // {
        //   name: "icon",
        //   type: "text",
        //   admin: {
        //     components: {
        //       Field: IconSelect,
        //     },
        //   },
        // },
      ],
      admin: {
        components: {
          RowLabel: ({ data, index }) => {
            return data?.title || `Service ${String(index).padStart(2, "0")}`;
          },
        },
      },
    },
  ],
};
