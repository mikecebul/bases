"use server";

import prisma from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function DeleteBoardMemberAction(id: string) {
  "use server";

  try {
    const deleteUser = await prisma.boardMember.delete({
      where: {
        id: id,
      },
    });
    // revalidatePath("(home)/team");
    // revalidatePath("(home)/team/board/[slug]");
    return { success: true };
  } catch (error) {
    return {
      error: getErrorMessage(
        error,
        "Oops, there was an error deleting the profile. Please try again."
      ),
    };
  }
}
