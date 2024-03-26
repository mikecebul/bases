import { ServicesTable } from "@/components/admin/service/servicesTable";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default async function Page() {
  return (
    <>
      <div className="">
        <h1 className="pb-2 pl-8 text-4xl font-semibold">View Services</h1>
        <Separator />
      </div>
      <ServicesTable />
    </>
  );
}
