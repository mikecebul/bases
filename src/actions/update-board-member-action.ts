"use server";
import { getErrorMessage } from "@/lib/utils";
import { revalidateTag } from "next/cache";

type FormBoardMember = {
  status: "DRAFT" | "PUBLISHED";
  name: string;
  role: string;
  imageUrl?: string;
  bio: {
    value: string;
  }[];
};

export async function UpdateBoardMemberAction({
  id,
  newBoardMemberData: person,
}: {
  id: string;
  newBoardMemberData: FormBoardMember;
}) {
  try {
    await prisma.boardMember.update({
      where: { id },
      data: {
        status: person.status,
        name: person.name,
        role: person.role,
        imageUrl: person.imageUrl || null,
        bio: person.bio.map((bioObj: { value: string }) => bioObj.value),
      },
    });
    revalidateTag("boardMembers");
  } catch (error) {
    return {
      error: getErrorMessage(
        error,
        "Oops, there was an error updating the profile. Please try again."
      ),
    };
  }
}
