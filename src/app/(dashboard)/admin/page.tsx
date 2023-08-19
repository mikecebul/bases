import { BoardMembersTable } from "@/components/admin/boardMembersTable";
import { StaffMembersTable } from "@/components/admin/staffMembersTable";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <div className="">
      <h1 className="pl-8 pb-2 text-4xl font-semibold">Admin Dashboard</h1>
      <Separator />
      <StaffMembersTable />
      <BoardMembersTable />
    </div>
  );
}
