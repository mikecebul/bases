"use server";
import prisma from "@/lib/prisma";
import { generateSlug, getErrorMessage } from "@/lib/utils";
import { revalidatePath, revalidateTag } from "next/cache";

type FormStaffMember = {
  status: "DRAFT" | "PUBLISHED";
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

export async function UpdateStaffMemberAction({
  id,
  newStaffMemberData: person,
}: {
  id: string;
  newStaffMemberData: FormStaffMember;
}) {
  try {
    await prisma.staffMember.update({
      where: { id },
      data: {
        status: person.status,
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
    revalidateTag("staff");

    revalidatePath("/(home)/team", "page");
    revalidatePath("/(home)/team/staff/[slug]", "page");
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/team`);
    fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/team/staff/${generateSlug(
        person.name
      )}`
    );

    return {
      status: "success",
    };
  } catch (error) {
    return {
      error: getErrorMessage(
        error,
        "Oops, there was an error updating the profile. Please try again."
      ),
    };
  }
}
