/* eslint-disable react/no-unescaped-entities */
import BoardMemberBio from "@/components/board-member-bio";
import { siteConfig } from "@/config/site";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

interface Params {
  slug: string;
}

async function getBoardMember(slug: string) {
  const boardMember = await prisma.boardMember.findFirst({
    where: {
      slug: slug,
    },
  });
  return boardMember;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = params;
  const boardMember = await prisma.boardMember.findFirst({
    where: {
      slug: params.slug,
    },
  });
  return {
    title: `Board Member - ${boardMember?.name}` || "Board member profile page",
    description:
      `Learn about the history and experience of our board member ${boardMember?.name}.` ||
      "Learn about the history and experience of our board member",
  };
}

export async function generateStaticParams() {
  const boardMembers = await prisma.boardMember.findMany({
    where: {
      status: "PUBLISHED"
    }
  });
    return boardMembers.map((person) => ({
    slug: person.slug,
  }));
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;
  const boardMember = await getBoardMember(slug)
  if (!boardMember) {
    return <div>Board member not found</div>;
  }

  return <BoardMemberBio boardMember={boardMember} />;
}
