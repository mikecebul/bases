import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icons, renderIcon } from "../icons";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import prisma from "@/lib/prisma";
import DeleteServiceButton from "./deleteServiceButton";

async function getServices() {
  const services = await prisma.service.findMany({
    orderBy: {
      order: "asc",
    },
  });
  return services;
}

export async function ServicesTable() {
  const services = await getServices();

  return (
    <div className="max-w-7xl p-8">
      <div className="flex justify-between items-center pb-4">
        <p className=" text-xl font-semi-bold">Board Members</p>
        <div className="flex items-center">
          <Link
            className="flex items-center gap-4 group"
            href="/admin/services/create"
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
          <TableCaption className="pb-2">A list of our services.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Front Page</TableHead>
              <TableHead className="">Edit</TableHead>
              <TableHead className="">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell className="font-medium">
                  {service.description}
                </TableCell>
                <TableCell className="font-medium">
                  {!!service.icon
                    ? renderIcon(service.icon)
                    : renderIcon("fallback")}
                </TableCell>
                <TableCell>
                  {service.status === "PUBLISHED" ? (
                    <div
                      className={cn(
                        buttonVariants(),
                        "bg-green-600 hover:bg-green-600 w-28"
                      )}
                    >
                      <p>Published</p>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        buttonVariants(),
                        "bg-yellow-500 hover:bg-yellow-500 text-black w-28"
                      )}
                    >
                      <p>Draft</p>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {service.frontpage ? (
                    <div
                      className={cn(
                        buttonVariants(),
                        "bg-green-600 hover:bg-green-600 w-28"
                      )}
                    >
                      <p>Yes</p>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        buttonVariants(),
                        "bg-yellow-500 hover:bg-yellow-500 text-black w-28"
                      )}
                    >
                      <p>No</p>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Link
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon" }),
                      ""
                    )}
                    href={`/admin/services/edit/${service.id}`}
                  >
                    <Icons.pencil />
                  </Link>
                </TableCell>
                <TableCell className="">
                  <DeleteServiceButton id={service.id} name={service.name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
