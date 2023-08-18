"use server";

import { getErrorMessage } from "@/lib/utils";
import { revalidateTag } from "next/cache";

type FormBoardMember = {
  name: string;
  role: string;
  imageUrl?: string | undefined;
  bio: {
    value: string;
  }[];
};

export async function CreateBoardMemberAction({
  newBoardMemberData: person,
}: {
  newBoardMemberData: FormBoardMember;
}) {
  const slug = person.name
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^\w-]+/g, "");

  try {
    await prisma.boardMember.create({
      data: {
        name: person.name,
        slug: slug,
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
