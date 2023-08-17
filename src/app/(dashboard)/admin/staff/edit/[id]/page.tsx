import StaffForm from "@/components/admin/staffForm";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UploadStaffProfilePicture from "@/components/admin/upload-staff-profile-picture";

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
      <UploadStaffProfilePicture person={staffMember} />

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
