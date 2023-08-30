"use server";
import prisma, { BoardMember } from "@/lib/prisma";
import { generateSlug, getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function UpdateBoardMemberOrderAction(reorderedItems: BoardMember[]) {
  const updateBoardMemberOrderPromises = reorderedItems.map((item, index) =>
    prisma.boardMember.update({
      where: { id: item.id },
      data: { order: index },
    })
  );

  try {
    await prisma.$transaction(updateBoardMemberOrderPromises)
    // revalidatePath("/");
    // revalidatePath("/(home)/services");
  } catch (error) {
    return {
      error: getErrorMessage(
        error,
        "Oops, there was an error reordering Board Members. Please try again."
      ),
    };
  }
}
