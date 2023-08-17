import StaffCreate from "@/components/admin/staff-create";
import { Separator } from "@/components/ui/separator";

export default function CreatePage() {
  return (
    <>
      <div className="">
        <h1 className="pl-8 text-4xl font-semibold pb-2">
          Create a new staff member
        </h1>
        <Separator />
      </div>
      <StaffCreate />
    </>
  );
}
