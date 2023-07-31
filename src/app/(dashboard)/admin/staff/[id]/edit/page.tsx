import prisma from "@/lib/prisma";

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

  return <p>{JSON.stringify(staffMember)}</p>;
}
