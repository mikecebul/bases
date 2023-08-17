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
    <>
      <div className="">
        <h1 className="pl-8 text-4xl font-semibold pb-2">View Staff Members</h1>
        <Separator />
      </div>
      <StaffMembersTable />
    </>
  );
}
