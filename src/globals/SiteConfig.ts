import { GlobalConfig } from "payload/types";

export const SiteConfig: GlobalConfig = {
  slug: "site-config",
  label: "Site Config",
  fields: [
    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      required: true,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      required: true,
    },
  ],
};
