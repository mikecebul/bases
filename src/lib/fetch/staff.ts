import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getAllStaffAdmin() {
  noStore();
  const allStaff = await prisma.staffMember.findMany({
    orderBy: {
      order: "asc",
    },
  });
  return allStaff;
}
export async function getStaffByIDAdmin(id: string) {
  noStore();
  const staffByID = await prisma.staffMember.findFirst({
    where: {
      id: id as string,
    },
  });
  return staffByID;
}

export async function getAllActiveStaff() {
  const allActiveStaff = await prisma.staffMember.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      order: "asc",
    },
  });
  return allActiveStaff;
}

export async function getStaffBySlug(slug: string) {
  const staffBySlug = await prisma.staffMember.findFirst({
    where: {
      slug: slug,
    },
  });
  return staffBySlug;
}
