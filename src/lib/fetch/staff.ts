import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export async function getAllStaff() {
  const staffMembers = unstable_cache(
    async () =>
      await prisma.staffMember.findMany({
        orderBy: {
          order: "asc",
        },
      }),
    ["staff"],
    { tags: ["staff"] }
  );
  return staffMembers;
}

export async function getAllActiveStaff() {
  const allActiveStaffMembers = unstable_cache(
    async () =>
      await prisma.staffMember.findMany({
        where: {
          status: "PUBLISHED",
        },
        orderBy: {
          order: "asc",
        },
      }),
    ["staff"],
    { tags: ["staff"] }
  );
  return allActiveStaffMembers;
}

export async function getStaffBySlug(slug: string) {
  const staffMember = unstable_cache(
    async (slug) =>
      await prisma.staffMember.findFirst({
        where: {
          slug: slug,
        },
      }),
    ["staff"],
    { tags: ["staff"] }
  );
  return staffMember;
}
