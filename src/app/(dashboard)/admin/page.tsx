import { BoardMembersTable } from "@/components/admin/team/board/boardMembersTable";
import { ServicesTable } from "@/components/admin/service/servicesTable";
import { StaffMembersTable } from "@/components/admin/team/staff/staffMembersTable";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <div className="">
      <h1 className="pb-2 pl-8 text-4xl font-semibold">Admin Dashboard</h1>
      <Separator />
      <StaffMembersTable />
      <BoardMembersTable />
      <ServicesTable />
    </div>
  );
}
