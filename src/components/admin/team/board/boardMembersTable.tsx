
import { Icons } from "../../../icons";
import { buttonVariants } from "../../../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import DndBoardMembers from "./dndBoardMembers";
import { getAllBoard } from "@/lib/fetch/board";

export async function BoardMembersTable() {
  const boardMembers = await getAllBoard();

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between pb-4">
        <p className="text-xl  font-semi-bold">Board Members</p>
        <div className="flex items-center">
          <Link
            className="flex items-center gap-4 group"
            href="/admin/board/create"
          >
            <p className="text-brand group-hover:text-brand/80">Add New</p>
            <div
              className={cn(
                buttonVariants({ variant: "brand", size: "icon" }),
                "group-hover:bg-brand/90"
              )}
            >
              <Icons.adduser />
            </div>
          </Link>
        </div>
      </div>
      <div className="border rounded-md shadow">
       <DndBoardMembers boardMembers={boardMembers} />
      </div>
    </div>
  );
}
