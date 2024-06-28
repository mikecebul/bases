import type { CollectionConfig } from "payload";
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";

export const Users: CollectionConfig = {
  slug: "users",
  // access: {
  // admin: ({ req: { user } }) => (!!user?.role ? checkRole(user.role) : false),
  // create: anyone,
  // },
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "roles",
      type: "select",
      // access: {
      //   create: admins,
      //   read: admins,
      //   update: admins,
      // },
      defaultValue: "user",
      required: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      options: [
        {
          label: "admin",
          value: "admin",
        },
        {
          label: "user",
          value: "user",
        },
      ],
    },
  ],
};
