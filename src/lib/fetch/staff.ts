import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getAllStaff = unstable_cache(
  async () =>
    await prisma.staffMember.findMany({
      orderBy: {
        order: "asc",
      },
    }),
  ["staff"],
  { tags: ["staff"] }
);

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
  ["staff"],
  { tags: ["staff"] }
);

export const getStaffBySlug = unstable_cache(
  async (slug: string) =>
    await prisma.staffMember.findFirst({
      where: {
        slug: slug,
      },
    }),
  ["staff"],
  { tags: ["staff"] }
);
