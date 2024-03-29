import StaffEditForm from "@/components/admin/team/staff/staffEditForm";
import { Separator } from "@/components/ui/separator";
import { getStaffBySlugAdmin } from "@/lib/fetch/staff";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {

  const staffMember = await getStaffBySlugAdmin(id);

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
