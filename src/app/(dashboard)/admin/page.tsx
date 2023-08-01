import { StaffMembersTable } from "@/components/admin/staffMembersTable";

export default async function Page() {
  return (
    <div className="xl:px-32 py-16 flex justify-center items-center">
      <StaffMembersTable />
    </div>
  );
}
