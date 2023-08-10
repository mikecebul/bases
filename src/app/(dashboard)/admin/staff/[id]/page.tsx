import BioForm from "@/components/admin/bio-form";
import StaffForm from "@/components/admin/staffForm";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";
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

  if (!staffMember) {
    throw new Error("Staff memeber did not load");
  }

  const pathToInvalidate = `/team/staff/${staffMember.slug}`;

  return (
    <div className="flex flex-col w-2/3 gap-8">
      <div className="flex justify-start items-center gap-x-48 pb-16">
        <p className="text-xl font-semibold">Editing {staffMember.name}</p>
        <Image
          src={staffMember.imageUrl}
          alt="profile of staff member."
          width={250}
          height={250}
          className="w-24 rounded-full"
        />
      </div>

      <div className="">
        <StaffForm
          person={staffMember}
          staffMemberId={id}
          pathToInvalidate={pathToInvalidate}
        />
      </div>
    </div>
  );
}
