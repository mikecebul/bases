import Team from "@/components/team";
import prisma from "@/lib/prisma";

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
