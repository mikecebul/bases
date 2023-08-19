import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BioPopover from "./bioPopover";
import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import DeleteStaffMemberButton from "./deleteStaffMemberButton";

async function getStaffMembers() {
  const staffMembers = await prisma.staffMember.findMany({
    orderBy: {
      order: "asc",
    },
  });
  return staffMembers;
}

export async function StaffMembersTable() {
  const staffMembers = await getStaffMembers();

  return (
    <div className="max-w-7xl p-8">
      <div className="flex justify-between items-center pb-4">
        <p className=" text-xl font-semi-bold">Staff Members</p>
        <div className="flex items-center">
          <Link
            className="flex items-center gap-4 group"
            href="/admin/staff/create"
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
            A list of your staff members.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Qualifications</TableHead>
              <TableHead>Bio</TableHead>
              <TableHead className="text-center">Image</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="">Edit</TableHead>
              <TableHead className="">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffMembers.map((person) => (
              <TableRow key={person.id}>
                <TableCell className="font-medium">{person.name}</TableCell>
                <TableCell className="font-medium">{person.role}</TableCell>
                <TableCell>{person.qualifications}</TableCell>
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
                <TableCell>
                  {person.status === "PUBLISHED" ? (
                    <div
                      className={cn(
                        buttonVariants(),
                        "bg-green-600 hover:bg-green-600"
                      )}
                    >
                      <p>Published</p>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        buttonVariants(),
                        "bg-yellow-500 hover:bg-yellow-500 text-black"
                      )}
                    >
                      <p>Draft</p>
                    </div>
                  )}
                </TableCell>
                <TableCell className="">
                  <Link
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon" }),
                      ""
                    )}
                    href={`/admin/staff/edit/${person.id}`}
                  >
                    <Icons.pencil className="" />
                  </Link>
                </TableCell>
                <TableCell className="">
                  <DeleteStaffMemberButton id={person.id} name={person.name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
