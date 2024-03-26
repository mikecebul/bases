"use server";

import prisma from "@/lib/prisma";
import { generateSlug, getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

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
  try {
    await prisma.boardMember.create({
      data: {
        name: person.name,
        slug: generateSlug(person.name),
        role: person.role,
        imageUrl: person.imageUrl || null,
        bio: person.bio.map((bioObj: { value: string }) => bioObj.value),
      },
    });
    // revalidatePath("/(home)/team");
    // revalidatePath("/(home)/team/board/[slug]");
  } catch (error) {
    return {
      error: getErrorMessage(
        error,
        "Oops, there was an error updating the profile. Please try again."
      ),
    };
  }
}
