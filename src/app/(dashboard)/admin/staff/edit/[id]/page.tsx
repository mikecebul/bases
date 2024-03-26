import StaffEditForm from "@/components/admin/team/staff/staffEditForm";
import prisma from "@/lib/prisma";
import { Separator } from "@/components/ui/separator";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
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

  return (
    <>
      <h1 className="pb-2 pl-8 text-4xl font-semibold">
        Editing {staffMember.name}
      </h1>
      <Separator />
      <StaffEditForm person={staffMember} />
    </>
  );
}
