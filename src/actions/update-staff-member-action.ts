"use server";
import { getErrorMessage } from "@/lib/utils";
import { revalidateTag } from "next/cache";

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
    revalidateTag("staffMembers");
    // redirect("/admin/staff");
  } catch (error) {
    return {
      error: getErrorMessage(
        error,
        "Oops, there was an error updating the profile. Please try again."
      ),
    };
  }
}
