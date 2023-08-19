"use server";

import prisma from "@/lib/prisma";
import { generateSlug, getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

type FormStaffMember = {
  name: string;
  role: string;
  qualifications?: string | undefined;
  imageUrl?: string | undefined;
  bio: {
    value: string;
  }[];
  philosophy: {
    value: string;
  }[];
  education: {
    value: string;
  }[];
  specializations: {
    value: string;
  }[];
};

export async function CreateStaffMemberAction({
  newStaffMemberData: person,
}: {
  newStaffMemberData: FormStaffMember;
}) {
  try {
    await prisma.staffMember.create({
      data: {
        name: person.name,
        slug: generateSlug(person.name),
        role: person.role,
        qualifications: person.qualifications || null,
        imageUrl: person.imageUrl || null,
        bio: person.bio.map((bioObj: { value: string }) => bioObj.value),
        philosophy: person.philosophy.map(
          (philosophyObj: { value: string }) => philosophyObj.value
        ),
        education: person.education.map(
          (educationObj: { value: string }) => educationObj.value
        ),
        specializations: person.specializations.map(
          (specializationObj: { value: string }) => specializationObj.value
        ),
      },
    });
    revalidatePath("/teams");
  } catch (error) {
    return {
      error: getErrorMessage(
        error,
        "Oops, there was an error updating the profile. Please try again."
      ),
    };
  }
}
