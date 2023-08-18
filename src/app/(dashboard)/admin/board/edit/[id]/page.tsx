import BoardEditForm from "@/components/admin/boardEditForm";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const getBoardMember = async (id: string) => {
    const person = await prisma.boardMember.findFirst({
      where: {
        id: id as string,
      },
    });
    return person;
  };

  const boardMember = await getBoardMember(id);

  if (!boardMember) {
    throw new Error("Staff memeber did not load");
  }

  const pathToInvalidate = `/team/board-members/${boardMember.slug}`;

  return (
    <>
      <h1 className="pl-8 text-4xl font-semibold pb-2">
        Editing {boardMember.name}
      </h1>
      <Separator />
      <BoardEditForm person={boardMember} />
    </>
  );
}
