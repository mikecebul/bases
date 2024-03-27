"use server";
import prisma, { StaffMember } from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function UpdateStaffMemberOrderAction(
  reorderedItems: StaffMember[]
) {
  const updateStaffMemberOrderPromises = reorderedItems.map((item, index) =>
    prisma.staffMember.update({
      where: { id: item.id },
      data: { order: index },
    })
  );

  try {
    await prisma.$transaction(updateStaffMemberOrderPromises);
    revalidatePath("/(home)", "layout");
    revalidatePath("/(dashboard)", "layout");
  } catch (error) {
    return {
      error: getErrorMessage(
        error,
        "Oops, there was an error reordering Staff Members. Please try again."
      ),
    };
  }
}
