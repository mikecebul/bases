"use client";
import { DeleteStaffMemberAction } from "@/app/actions/delete-staff-member-action";
import { Icons } from "../icons";
import { Button, buttonVariants } from "../ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";

export default function DeleteStaffMemberButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Icons.delete />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanelty delete{" "}
            <strong>{name}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogCancel
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={handleDelete}
          className={cn(buttonVariants({ variant: "destructive" }))}
        >
          Delete
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
}
