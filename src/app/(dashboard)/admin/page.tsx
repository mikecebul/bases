import { StaffMembersTable } from "@/components/admin/staffMembersTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";

async function getStaffMembers() {
  const staffMembers = await prisma.staffMember.findMany();
  return staffMembers;
}

export default async function Page() {
  const staffMembers = await getStaffMembers();

  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <div className="col-span-11">
        <div className="">
          <StaffMembersTable staffMembers={staffMembers} />
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="col-span-1 border-r border-border h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h1 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu
          </h1>
          <Separator />
          <div className="space-y-1 py-8">
            <Button variant="ghost" className="w-full justify-start">
              Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
