import Team from "@/components/team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Learn about the BASES staff and boardmembers which make our facility unique.",
};

async function getStaffMembers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/staff/get-all-published`,
    {
      next: { tags: ["staffMembers"] },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch published staff memebers");
  }
  return res.json();
}

async function getBoardMembers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/board/get-all-published`,
    {
      next: { tags: ["boardMembers"] },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch published board memebers");
  }
  return res.json();
}

export default async function Page() {
  const staffMemberData = await getStaffMembers();
  const boardMemberData = await getBoardMembers();

  const [staffMembers, boardMembers] = await Promise.all([
    staffMemberData,
    boardMemberData,
  ]);

  return (
    <>
      <Team staffMembers={staffMembers} boardMembers={boardMembers} />
    </>
  );
}
