import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import BioPopover from "./bioPopover";
import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

async function getBoardMembers() {
  const boardMembers = await prisma.boardMember.findMany({
    orderBy: {
      order: "asc",
    },
  });
  return boardMembers;
}

export async function BoardMembersTable() {
  const boardMembers = await getBoardMembers();

  return (
    <div className="max-w-7xl p-8">
      <div className="flex justify-between items-center pb-4">
        <p className=" text-xl font-semi-bold">Board Members</p>
        <div className="flex items-center">
          <Link
            className="flex items-center gap-4 group"
            href="/admin/board/create"
          >
            <p className="text-brand group-hover:text-brand/80">Add New</p>
            <div
              className={cn(
                buttonVariants({ variant: "brand", size: "icon" }),
                "group-hover:bg-brand/90"
              )}
            >
              <Icons.adduser />
            </div>
          </Link>
        </div>
      </div>
      <div className="border rounded-md shadow">
        <Table className="">
          <TableCaption className="pb-2">
            A list of your Board members.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Bio</TableHead>
              <TableHead className="text-center">Image</TableHead>
              <TableHead className="">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {boardMembers.map((person) => (
              <TableRow key={person.id}>
                <TableCell className="font-medium">{person.name}</TableCell>
                <TableCell className="font-medium">{person.role}</TableCell>
                <TableCell>
                  <BioPopover bio={person.bio} />
                </TableCell>
                <TableCell className="flex items-center justify-center">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={person.imageUrl || undefined}
                      alt="Profile of row item"
                    />
                    <AvatarFallback>
                      <Icons.user />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="">
                  <Link
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon" }),
                      ""
                    )}
                    href={`/admin/board/edit/${person.id}`}
                  >
                    <Icons.pencil />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
