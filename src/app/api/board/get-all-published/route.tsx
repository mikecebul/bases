import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const boardMembers = await prisma.boardMember.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        order: "asc",
      },
    });
    return new Response(JSON.stringify(boardMembers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Route API Error:", error);

    if (error.code === "P2025") {
      // Resource not found error in Prisma
      return new Response("No board members were found", {
        status: 404,
      });
    }

    return new Response(error.message, { status: 500 });
  }
}
