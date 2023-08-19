"use server";

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
    return { success: true };
    
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An error occurred" };
  }
}
