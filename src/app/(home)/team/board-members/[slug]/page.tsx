/* eslint-disable react/no-unescaped-entities */
import BoardMemberBio from "@/components/board-member-bio";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

interface Params {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = params;
  const boardMember = siteConfig.team.boardMembers.find(
    (person) => person.slug === slug
  );
  return {
    title: `Board Member - ${boardMember?.name}` || "Board member profile page",
    description: `Learn about the history and experience of our board member ${boardMember?.name}.` || "Learn about the history and experience of our board member",
  };
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
