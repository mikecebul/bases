import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { bio, staffMemberId } = await request.json();

    const updatedStaffMember = await prisma.staffMember.update({
      where: { id: staffMemberId },
      data: { bio },
    });

    return new NextResponse(JSON.stringify(updatedStaffMember), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2025") {
      // Resource not found error in Prisma
      return new NextResponse("Staff member not found", {
        status: 404,
      });
    }

    return new NextResponse(error.message, { status: 500 });
  }
}
