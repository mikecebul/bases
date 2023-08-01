import prisma from "@/lib/prisma";
import StaffBio from "@/components/staff-bio";

interface Params {
  id: string;
}

async function getStaffMember(id: string) {
  const staffMember = await prisma.staffMember.findUnique({
    where: {
      id: id,
    },
  });
  return staffMember;
}

export default async function Page({ params }: { params: Params }) {
  const { id } = params;

  const staffMember = await getStaffMember(id);

  if (!staffMember) {
    return <div>Staff member not found</div>;
  }

  return <StaffBio staffMember={staffMember} />;
}
