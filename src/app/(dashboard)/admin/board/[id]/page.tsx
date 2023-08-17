import BoardForm from "@/components/admin/boardForm";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UploadBoardProfilePicture from "@/components/admin/upload-board-profile-picture";

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

  const pathToInvalidate = `/team/staff/${boardMember.slug}`;

  return (
    <div className="flex flex-col w-2/3 gap-8">
      <UploadBoardProfilePicture person={boardMember} />

      <div className="">
        <BoardForm
          person={boardMember}
          boardMemberId={id}
          pathToInvalidate={pathToInvalidate}
        />
      </div>
    </div>
  );
}
