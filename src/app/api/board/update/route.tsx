import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { person, boardMemberId } = await request.json();

    const updatedBoardMember = await prisma.boardMember.update({
      where: { id: boardMemberId },
      data: {
        name: person.name,
        role: person.role,
        bio: person.bio.map((bioObj: { value: string }) => bioObj.value),
      },
    });

    return new Response(JSON.stringify(updatedBoardMember), {
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
