import { Access, AccessArgs, FieldAccess } from "payload";
import { checkRole } from "../collections/Users/access/checkRole";

export const admins: Access = ({ req: { user } }: AccessArgs) => {
  return checkRole("superAdmin", user) || checkRole("admin", user);
};
export const fieldLevelAdmins: FieldAccess = ({
  req: { user },
}: AccessArgs) => {
  return checkRole("superAdmin", user) || checkRole("admin", user);
};
