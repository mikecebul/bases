import { BoardMembersTable } from "@/components/admin/boardMembersTable";
import { StaffMembersTable } from "@/components/admin/staffMembersTable";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="">
      <h1 className="pl-8 pb-2 text-4xl font-semibold">Admin Dashboard</h1>
      <Separator />
      <StaffMembersTable />
      <BoardMembersTable />
    </div>
  );
}
