import prisma from "@/lib/prisma";
import StaffBio from "@/components/staff-bio";

export async function generateStaticParams() {
  const StaffMembers = await prisma.staffMember.findMany();
  return StaffMembers.map((person) => ({
    slug: person.slug,
  }));
}

interface Params {
  slug: string;
}

async function getStaffMember(slug: string) {
  const staffMember = await prisma.staffMember.findFirst({
    where: {
      slug: slug,
    },
  });
  return staffMember;
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;
  const staffMember = await getStaffMember(slug);

  if (!staffMember) {
    return <div className="">Staff member not found</div>;
  }

  return <StaffBio staffMember={staffMember} />;
}
