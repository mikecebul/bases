import prisma from "@/lib/prisma";

export async function getAllBoard() {
  const boardMembers = await prisma.boardMember.findMany({
    orderBy: {
      order: "asc",
    },
  });
  return boardMembers;
}
export async function getAllActiveBoard() {
  const boardMembers = await prisma.boardMember.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      order: "asc",
    },
  });
  return boardMembers;
}

export async function getBoardBySlug(slug: string) {
  const boardMember = await prisma.boardMember.findFirst({
    where: {
      slug: slug,
    },
  });
  return boardMember;
}
