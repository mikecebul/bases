import BioForm from "@/components/admin/bioForm";
import prisma from "@/lib/prisma";
import { Suspense } from "react";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const getstaffMember = async (id: string) => {
    const person = await prisma.staffMember.findFirst({
      where: {
        id: id as string,
      },
    });
    return person;
  };

  const staffMember = await getstaffMember(id);
  const staffName = staffMember?.name.toLowerCase().replace(/ /g, "-");
  const pathToInvalidate = `/team/staff/${staffName}`;

  return (
    <div className="w-5/6 py-8 mx-auto">
      <Suspense fallback={<p>Loading...</p>}>
        <p className="pb-8 text-xl font-semibold">
          Edit Bio of {staffMember?.name}
        </p>

        <BioForm bio={staffMember?.bio as string[]} staffMemberId={id} pathToInvalidate={pathToInvalidate}/>
      </Suspense>
    </div>
  );
}
