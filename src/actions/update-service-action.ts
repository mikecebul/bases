"use server";
import prisma, { Service } from "@/lib/prisma";
import { generateSlug, getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

type NewServiceData = {
    name: string;
    description: string;
    icon: string;
    frontpage: boolean;
    status: "DRAFT" | "PUBLISHED";
}

export async function UpdateServiceAction({
  id,
  newServiceData: service,
}: {
  id: string;
  newServiceData: NewServiceData;
}) {
  try {
    await prisma.service.update({
      where: { id },
      data: {
        status: service.status,
        frontpage: service.frontpage,
        name: service.name,
        slug: generateSlug(service.name),
        description: service.description,
        icon: service.icon,
      },
    });
    revalidatePath("/");
  } catch (error) {
    return {
      error: getErrorMessage(
        error,
        "Oops, there was an error updating the service. Please try again."
      ),
    };
  }
}
