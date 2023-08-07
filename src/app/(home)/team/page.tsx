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
    orderBy: {
      order: "asc",
    },
  });
  return staffMembers;
}
export default async function Page() {
  const staffMembers = await getStaffMembers();
  return (
    <>
      <Team staffMembers={staffMembers} />
    </>
  );
}
