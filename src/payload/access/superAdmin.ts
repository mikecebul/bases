import type { AccessArgs } from "payload";
import { checkRole } from "../collections/Users/access/checkRole";
import { useAuth } from "@payloadcms/ui";

export const superAdmin = ({ req: { user } }: AccessArgs) => {
  return checkRole("superAdmin", user);
};
