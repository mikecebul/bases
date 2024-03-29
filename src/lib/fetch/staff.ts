import prisma from "@/lib/prisma";
import { unstable_cache, unstable_noStore as noStore } from "next/cache";

export async function getAllStaff() {
  noStore();
  const allStaff = await prisma.staffMember.findMany({
    orderBy: {
      order: "asc",
    },
  });
  return allStaff;
}

export const getAllActiveStaff = unstable_cache(
  async () =>
    await prisma.staffMember.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        order: "asc",
      },
    }),
  ["staff", "active"],
  { tags: ["staff"] }
);

export const getStaffBySlug = unstable_cache(
  async (slug: string) =>
    await prisma.staffMember.findFirst({
      where: {
        slug: slug,
      },
    }),
  ["staff", "slug"],
  { tags: ["staff"] }
);
