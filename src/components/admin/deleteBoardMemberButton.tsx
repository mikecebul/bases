"use client";
import { DeleteBoardMemberAction } from "@/actions/delete-board-member-action";
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
import { cn, generateSlug, revalidate } from "@/lib/utils";

export default function DeleteBoardMemberButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    const response = await DeleteBoardMemberAction(id);
    if (response.success) {
      toast({
        title: "Board Member Deleted",
        description: "",
        action: <ToastAction altText="close">close</ToastAction>,
      });
      // router.refresh()      
      // await revalidate("/team");
      // await revalidate(`/team/board/${generateSlug(name)}`);
    } else {
      toast({
        variant: "destructive",
        title: "Error occured",
        description: "Board member was not deleted. Please try again",
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
