import BoardEditForm from "@/components/admin/boardEditForm";
import prisma from "@/lib/prisma";
import { Separator } from "@/components/ui/separator";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
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
