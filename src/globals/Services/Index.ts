import { icons } from "lucide-react";
import Icon from "./Icon";
import { GlobalConfig } from "payload/types";

export const Services: GlobalConfig = {
  slug: "services",
  label: "Services",
  fields: [
    {
      name: "Services",
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
        {
          type: "row",
          fields: [
            {
              type: "text",
              name: "iconName",
              defaultValue: "CircleOff",
            },
            {
              name: "icon",
              label: "Icon",
              type: "select",
              required: true,
              options: Object.keys(icons).map((name) => ({
                label: name,
                value: name,
              })),
              admin: {
                width: "25%",
              },
            },
            {
              name: "preview",
              label: "Icon Preview",
              type: "ui",
              admin: {
                // condition: ({ _, siblingData }) => !!siblingData?.icon,
                components: {
                  Field: ({ data }) =>
                    !!data?.services.iconName
                      ? Icon(data?.services.iconName)
                      : Icon({ name: "Accessibility" }),
                },
                width: "25%",
              },
            },
          ],
        },
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
