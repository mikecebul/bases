import prisma from "@/lib/prisma";

export async function getAllStaff() {
  const staffMembers = await prisma.staffMember.findMany({
    orderBy: {
      order: "asc",
    },
  });
  return staffMembers;
}

export async function getAllActiveStaff() {
  const staffMembers = await prisma.staffMember.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      order: "asc",
    },
  });
  return staffMembers;
}

export async function getStaffBySlug(slug: string) {
  const staffMember = await prisma.staffMember.findFirst({
    where: {
      slug: slug,
    },
  });
  return staffMember;
}
