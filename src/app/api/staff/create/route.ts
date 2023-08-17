import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { person } = await request.json();

    const newStaffMember = await prisma.staffMember.create({
      data: {
        name: person.name,
        role: person.role,
        qualifications: person.qualifications || "",
        imageUrl: person.imageUrl || "",
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

    return new Response(JSON.stringify(newStaffMember), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Route API Error:", error);

    if (error.code === "P2025") {
      // Resource not found error in Prisma
      return new Response("Staff member not found", {
        status: 404,
      });
    }

    return new Response(error.message, { status: 500 });
  }
}