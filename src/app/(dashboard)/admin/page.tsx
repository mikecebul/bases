import { BoardMembersTable } from "@/components/admin/boardMembersTable";
import { ServicesTable } from "@/components/admin/servicesTable";
import { StaffMembersTable } from "@/components/admin/staffMembersTable";
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
