/* eslint-disable react/no-unescaped-entities */
import BoardMemberBio from "@/components/board-member-bio";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board Members",
  description: "Learn about our BASES board member's history and experience.",
};

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  const boardMembers = siteConfig.team.boardMembers;

  return boardMembers.map((person) => ({
    slug: person.slug,
  }));
}

export default function Page({ params }: { params: Params }) {
  const { slug } = params;
  const boardMember = siteConfig.team.boardMembers.find(
    (person) => person.slug === slug
  );

  if (!boardMember) {
    return <div>Staff member not found</div>;
  }

  return <BoardMemberBio boardMember={boardMember} />;
}
