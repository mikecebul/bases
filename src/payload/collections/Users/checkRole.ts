import { User } from "@/payload-types";

type Role = User["role"];

export const checkRole = (role: Role): boolean => {
  console.log("User Role:", role);
  // console.log("User:", user);
  return true;
};
