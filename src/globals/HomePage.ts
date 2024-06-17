import { AlertBox } from "@/components/AlertBox";
import { GlobalConfig } from "payload/types";
import RowLabel from "./ServicesPage/RowLabel";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home Page",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          description: "Hero section on the home page with the call to action.",
          fields: [
            {
              name: "title",
              label: "Title",
              type: "text",
              required: true,
              defaultValue: "Substance Use and Mental Health Counseling",
            },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              required: true,
              defaultValue:
                "We bridge the gap to recovery, offering flexible and personalized services both in-person and via telehealth.",
            },
            {
              type: "group",
              name: "cta",
              label: "Call-to-action Button",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "title",
                      label: "Title",
                      type: "text",
                      required: true,
                      defaultValue: "Explore Our Services",
                      admin: { width: "50%" },
                    },
                    {
                      name: "link",
                      label: "Link",
                      type: "text",
                      required: true,
                      defaultValue: "/services",
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  name: "alert",
                  type: "ui",
                  admin: {
                    components: {
                      Field: AlertBox,
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Services",
          description: "Choose the top 3 services on the home page.",
          fields: [
            {
              type: "array",
              name: "listOfServices",
              minRows: 3,
              maxRows: 3,
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
        },
      ],
    },
  ],
};
