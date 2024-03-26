"use server";
import prisma, { Service } from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";

type NewServicesOrder = {
id: string;
order: number;
}[]

export async function UpdateServicesOrderAction(reorderedItems: Service[]) {
  const updateServicesOrderPromises = reorderedItems.map((item, index) =>
    prisma.service.update({
      where: { id: item.id },
      data: { order: index },
    })
  );

  try {
    await prisma.$transaction(updateServicesOrderPromises)
    // revalidatePath("/");
    // revalidatePath("/(home)/services");
  } catch (error) {
    return {
      error: getErrorMessage(
        error,
        "Oops, there was an error reordering the services. Please try again."
      ),
    };
  }
}
