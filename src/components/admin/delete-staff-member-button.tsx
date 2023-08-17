"use client";
import { DeleteStaffMemberAction } from "@/app/actions/delete-staff-member-action";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function DeleteStaffMemberButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    const response = await DeleteStaffMemberAction(id);
    if (response.success) {
      toast({
        title: "Staff Member Deleted",
        description: "",
        action: <ToastAction altText="close">close</ToastAction>,
      });
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "Error occured",
        description: "Staff member was not deleted. Please try again",
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
  }

  return (
    <Button variant="destructive" size="icon" onClick={handleDelete}>
      <Icons.delete />
    </Button>
  );
}
