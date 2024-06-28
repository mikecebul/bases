import { AlertBox } from "@/components/AlertBox";
import { revalidatePath } from "next/cache";
import { GlobalConfig } from "payload";

export const SiteConfig: GlobalConfig = {
  slug: "site-config",
  label: "Site Config",
  hooks: {
    afterChange: [() => revalidatePath("/", "layout")],
  },
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
      ],
    },
  ],
};
