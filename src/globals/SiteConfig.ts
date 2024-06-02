import { AlertBox } from "@/components/AlertBox";
import { GlobalConfig } from "payload/types";

export const SiteConfig: GlobalConfig = {
  slug: "site-config",
  label: "Site Config",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Header",
          description: "Header component on top of every page.",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "phone",
                  label: "Phone Number",
                  type: "text",
                  required: true,
                  defaultValue: "(231) 547-1144",
                  admin: { width: "50%" },
                },
                {
                  name: "address",
                  label: "Address",
                  type: "text",
                  required: true,
                  defaultValue: "101 M-66 | Charlevoix, MI",
                  admin: { width: "50%" },
                },
              ],
            },
          ],
        },
        {
          label: "Hero",
          description: "Hero section with call-to-action.",
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
          description: "Choose (3) services to highlight on the home page.",
          fields: [
            {
              name: "Service",
              type: "relationship",
              relationTo: "services",
              hasMany: true,
            },
          ],
        },
      ],
    },
  ],
};
