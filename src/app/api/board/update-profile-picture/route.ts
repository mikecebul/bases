import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const { id, url } = await request.json();

    const updatedProfilePicture = await prisma.boardMember.update({
      where: {
        id,
      },
      data: {
        imageUrl: url,
      },
    });

    return new Response(JSON.stringify(updatedProfilePicture), {
      status: 200,
      headers: { "Content-Type": "application.json" },
    });
  } catch (error: any) {
    console.error("Route API Error:", error);

    if (error.code === "P2025") {
      // Resource not found error in Prisma
      return new Response("Board member not found", {
        status: 404,
      });
    }

    return new Response(error.message, { status: 500 });
  }
}
