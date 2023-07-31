import AboutSection from "@/components/about-section";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Team from "@/components/team";
import prisma from "@/lib/prisma";

async function getStaffMembers() {
  const staffMembers = await prisma.staffMember.findMany();
  return staffMembers;
}

export default async function Home() {
  const staffMembers = await getStaffMembers();
  return (
    <>
      <Hero />
      <Services />
      <Team staffMembers={staffMembers} />
    </>
  );
}
