import Team from "@/components/team/team";
import { Metadata } from "next";
import { getAllActiveStaff } from "@/lib/fetch/staff";
import { getAllActiveBoard } from "@/lib/fetch/board";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Learn about the BASES staff and boardmembers which make our facility unique.",
};

export default async function Page() {
  const staffMembers = await getAllActiveStaff();
  const boardMembers = await getAllActiveBoard();

  return (
    <>
      <Team staffMembers={staffMembers} boardMembers={boardMembers} />
    </>
  );
}
