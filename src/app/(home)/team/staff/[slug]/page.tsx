import prisma from "@/lib/prisma";
import StaffBio from "@/components/staff-bio";
import { Metadata } from "next";

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

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = params;
  const staffMember = await prisma.staffMember.findFirst({
    where: {
      slug: slug,
    },
  });
  return {
    title: `Board Member - ${staffMember?.name}` || "Staff profile page",
    description:
      `Learn about the history and experience of our board member ${staffMember?.name}.` ||
      "Learn about our staff members education, background, and expertise.",
  };
}

export async function generateStaticParams() {
  const staffMembers = await prisma.staffMember.findMany({
    where: {
      status: "PUBLISHED",
    },
  });
  return staffMembers.map((person) => ({
    slug: person.slug,
  }));
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;
  const staffMember = await getStaffMember(slug);

  if (!staffMember) {
    return <div className="">Staff member not found</div>;
  }

  return <StaffBio staffMember={staffMember} />;
}
