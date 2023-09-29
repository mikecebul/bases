import prisma from "@/lib/prisma";
import { Separator } from "@/components/ui/separator";
import ServiceEditForm from "@/components/admin/ServiceEditForm";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const getService = async (id: string) => {
    const service = await prisma.service.findFirst({
      where: {
        id: id as string,
      },
    });
    return service;
  };

  const service = await getService(id);

  if (!service) {
    throw new Error("Service did not load");
  }

  return (
    <>
      <h1 className="pb-2 pl-8 text-4xl font-semibold">
        Editing {service.name}
      </h1>
      <Separator />
      <ServiceEditForm service={service} />
    </>
  );
}
