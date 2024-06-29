import { AccessArgs } from "payload";

export const admins = ({ req: { user } }: AccessArgs) => {
  console.log("User:", user);
  return true;
};
