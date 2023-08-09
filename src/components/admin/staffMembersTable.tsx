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

async function getStaffMembers() {
  const staffMembers = await prisma.staffMember.findMany();
  return staffMembers;
}

export async function StaffMembersTable() {
  const staffMembers = await getStaffMembers();

  return (
    <div className="max-w-7xl p-8">
      <p className="pb-4 text-xl font-semi-bold">Staff Members</p>
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
              <TableHead className="">Edit</TableHead>
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
                  <Image
                    src={person.imageUrl}
                    width={1000}
                    height={1000}
                    alt="Profile of row item"
                    className="w-12 rounded-full"
                  />
                </TableCell>
                <TableCell className="">
                  <Link
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon" }),
                      ""
                    )}
                    href={`/admin/staff/${person.id}`}
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
