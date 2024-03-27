/* eslint-disable react/no-unescaped-entities */
import BoardMemberBio from "@/components/team/board-member-bio";
import { getAllBoard, getBoardBySlug } from "@/lib/fetch/board";
import prisma from "@/lib/prisma";
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
  const boardMember = await getBoardBySlug(slug);
  return {
    title: `Board Member - ${boardMember?.name}` || "Board member profile page",
    description:
      `Learn about the history and experience of our board member ${boardMember?.name}.` ||
      "Learn about the history and experience of our board member",
  };
}

export async function generateStaticParams() {
  const boardMembers = await getAllBoard();
  return boardMembers.map((person) => ({
    slug: person.slug,
  }));
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;
  const boardMember = await getBoardBySlug(slug);
  if (!boardMember) {
    return <div>Board member not found</div>;
  }

  return <BoardMemberBio boardMember={boardMember} />;
}
