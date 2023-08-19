import { ServicesTable } from "@/components/admin/servicesTable";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default async function Page() {
  return (
    <>
      <div className="">
        <h1 className="pl-8 text-4xl font-semibold pb-2">View Services</h1>
        <Separator />
      </div>
      <ServicesTable />
    </>
  );
}
