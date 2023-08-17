import { BoardMembersTable } from "@/components/admin/boardMembersTable";
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
    <div>
      <BoardMembersTable />
    </div>
  );
}
