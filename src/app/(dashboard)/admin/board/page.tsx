import { BoardMembersTable } from "@/components/admin/team/board/boardMembersTable";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <>
      <div className="">
        <h1 className="pb-2 pl-8 text-4xl font-semibold">View Board Members</h1>
        <Separator />
      </div>
      <BoardMembersTable />
    </>
  );
}
