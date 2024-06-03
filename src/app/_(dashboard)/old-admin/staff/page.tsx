import { StaffMembersTable } from "@/components/admin/staffMembersTable";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <>
      <div className="">
        <h1 className="pl-8 text-4xl font-semibold pb-2">View Staff Members</h1>
        <Separator />
      </div>
      <StaffMembersTable />
    </>
  );
}
