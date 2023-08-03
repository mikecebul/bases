import BioForm from "@/components/admin/bioForm";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }
  const getstaffMember = async (id: string) => {
    const person = await prisma.staffMember.findFirst({
      where: {
        id: id as string,
      },
    });
    return person;
  };

  const staffMember = await getstaffMember(id);
  const pathToInvalidate = `/team/staff/${staffMember?.slug}`;

  return (
    <div className="w-5/6 py-8 mx-auto">
      <p className="pb-8 text-xl font-semibold">
        Edit Bio of {staffMember?.name}
      </p>

      <BioForm
        bio={staffMember?.bio as string[]}
        staffMemberId={id}
        pathToInvalidate={pathToInvalidate}
      />
    </div>
  );
}
