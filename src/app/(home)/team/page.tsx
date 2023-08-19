import Team from "@/components/team";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Learn about the BASES staff and boardmembers which make our facility unique.",
};

async function getStaffMembers() {  
  const staffMembers = await prisma.staffMember.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      order: "asc",
    },
  });
  return staffMembers
}

async function getBoardMembers() {  
  const boardMembers = await prisma.boardMember.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      order: "asc",
    },
  });
  return boardMembers
}

export default async function Page() {
  const staffMemberData = await getStaffMembers();
  const boardMemberData = await getBoardMembers();

  const [staffMembers, boardMembers] = await Promise.all([
    staffMemberData,
    boardMemberData,
  ]);

  return (
    <>
      <Team staffMembers={staffMembers} boardMembers={boardMembers} />
    </>
  );
}
