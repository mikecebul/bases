import StaffForm from "@/components/admin/staffForm";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UploadStaffProfilePicture from "@/components/admin/upload-staff-profile-picture";
import { Separator } from "@/components/ui/separator";

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
    <>
      <h1 className="pl-8 text-4xl font-semibold pb-2">
        Editing {staffMember.name}
      </h1>
      <Separator />

      <div className="px-8">
        <UploadStaffProfilePicture person={staffMember} />

        <StaffForm
          person={staffMember}
          staffMemberId={id}
          pathToInvalidate={pathToInvalidate}
        />
      </div>
    </>
  );
}
