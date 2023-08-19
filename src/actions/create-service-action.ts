"use server";

import prisma from "@/lib/prisma";
import { generateSlug, getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

type NewServiceData = {
  name: string;
  description: string;
  icon: string | undefined;
  frontpage: boolean;
  status: "DRAFT" | "PUBLISHED";
};

export async function CreateServiceAction({
  values: service,
}: {
  values: NewServiceData;
}) {
  try {
    await prisma.service.create({
      data: {
        status: service.status,
        frontpage: service.frontpage,
        name: service.name,
        slug: generateSlug(service.name),
        description: service.description,
        icon: service.icon || "user",
      },
    });
    revalidatePath("/");
    revalidatePath("/services");
  } catch (error) {
    return {
      error: getErrorMessage(
        error,
        "Oops, there was an error updating the profile. Please try again."
      ),
    };
  }
}
