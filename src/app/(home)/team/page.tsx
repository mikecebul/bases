import Team from "@/components/team/team";
import { Metadata } from "next";
import { getAllStaff } from "@/lib/fetch/staff";
import { getAllBoard } from "@/lib/fetch/board";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Learn about the BASES staff and boardmembers which make our facility unique.",
};

export default async function Page() {
  const staffMembers = await getAllStaff();
  const boardMembers = await getAllBoard();

  return (
    <>
      <Team staffMembers={staffMembers} boardMembers={boardMembers} />
    </>
  );
}
