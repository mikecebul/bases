import StaffEditForm from "@/components/admin/staffEditForm";
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
      <h1 className="pl-8 text-4xl font-semibold pb-2">
        Editing {staffMember.name}
      </h1>
      <Separator />
      <StaffEditForm person={staffMember} />
    </>
  );
}
