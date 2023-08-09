import { StaffMembersTable } from "@/components/admin/staffMembersTable";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="px-auto py-16 flex justify-center items-center">
      <StaffMembersTable />
    </div>
  );
}
