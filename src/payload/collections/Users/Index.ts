import type { CollectionConfig } from "payload";
import { ensureFirstUserIsSuperAdmin } from "./hooks/ensureFirstUserIsSuperAdmin";
import { anyone, fieldLevelAnyone } from "@/payload/access/anyone";
import { admins } from "@/payload/access/admins";
import { checkRole } from "./access/checkRole";
import { RoleSelect } from "./RoleSelect";
import { roleSelectMutate } from "./access/roleSelectMutate";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: ({ req: { user } }) =>
      !!user?.role ? checkRole(user.role, user) : false,
    create: admins,
    read: anyone,
    update: admins,
    delete: admins,
  },
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
      name: "role",
      type: "text",
      defaultValue: "user",
      required: true,
      access: {
        create: roleSelectMutate,
        read: fieldLevelAnyone,
        update: roleSelectMutate,
      },
      admin: {
        components: {
          Field: RoleSelect,
        },
      },
      hooks: {
        beforeChange: [ensureFirstUserIsSuperAdmin],
      },
    },
  ],
};
