"use server";
import prisma, { StaffMember } from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";

export async function UpdateStaffMemberOrderAction(reorderedItems: StaffMember[]) {
  const updateStaffMemberOrderPromises = reorderedItems.map((item, index) =>
    prisma.staffMember.update({
      where: { id: item.id },
      data: { order: index },
    })
  );

  try {
    await prisma.$transaction(updateStaffMemberOrderPromises)
    // revalidatePath("/");
    // revalidatePath("/(home)/services");
  } catch (error) {
    return {
      error: getErrorMessage(
        error,
        "Oops, there was an error reordering Staff Members. Please try again."
      ),
    };
  }
}
