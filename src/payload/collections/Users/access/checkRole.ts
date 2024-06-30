import type { User } from "@payload-types";

type PossiblyNullUser = User | null;

export const checkRole = (
  role: User["role"],
  user?: PossiblyNullUser
): boolean => {
  if (!user) return false;
  return user.role === role;
};

// export const checkRole = (allRoles: User['roles'] = [], user?: User): boolean => {
//   if (user) {
//     if (
//       allRoles.some((role) => {
//         return user?.roles?.some((individualRole) => {
//           return individualRole === role
//         })
//       })
//     )
//       return true
//   }

//   return false
// }
