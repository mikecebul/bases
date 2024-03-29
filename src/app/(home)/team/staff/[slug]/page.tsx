import StaffBio from "@/components/team/staff-bio";
import { Metadata } from "next";
import { getAllActiveStaff, getStaffBySlug } from "@/lib/fetch/staff";

interface Params {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = params;
  const staffMember = await getStaffBySlug(slug);
  return {
    title: `Staff Member - ${staffMember?.name}` || "Staff profile page",
    description:
      `Learn about the history and experience of our staff member ${staffMember?.name}.` ||
      "Learn about our their education, background, and expertise.",
  };
}

export async function generateStaticParams() {
  const staffMembers = await getAllActiveStaff();
  return staffMembers.map((person) => ({
    slug: person.slug,
  }));
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;
  const staffMember = await getStaffBySlug(slug);

  if (!staffMember) {
    return <div className="">Staff member not found</div>;
  }

  return <StaffBio staffMember={staffMember} />;
}
