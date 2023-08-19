"use server";

import prisma from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function DeleteStaffMemberAction(id: string) {
  "use server";

  try {
    const deleteUser = await prisma.staffMember.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/team");
    revalidatePath("/team/staff/[slug]");
    return { success: true };
    
  } catch (error) {
    return {
      error: getErrorMessage(
        error,
        "Oops, there was an error deleting the staff member. Please try again."
      ),
    };
  }
}
