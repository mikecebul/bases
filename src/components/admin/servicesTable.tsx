import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import prisma from "@/lib/prisma";
import DndServices from "./dndServices";
import { Suspense } from "react";

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
        <p className=" text-xl font-semi-bold">Services</p>
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
              <Icons.plusCircle />
            </div>
          </Link>
        </div>
      </div>
      <div className="border rounded-md shadow">
        <DndServices services={services} />
      </div>
    </div>
  );
}
