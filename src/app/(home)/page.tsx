import Carf from "@/components/carf";
import FrontPageServices from "@/components/services-front-page";
import Hero from "@/components/hero";
import Donate from "@/components/donate";
import prisma from "@/lib/prisma";

export async function getFrontPageServices() {
  const services = await prisma.service.findMany({
    where: {
      status: "PUBLISHED",
      frontpage: true,
    },
  });
  return services;
}

export default async function Home() {
  const services = await getFrontPageServices();
  return (
    <>
      <Hero />
      <FrontPageServices services={services} />
      <Carf />
      <Donate />
    </>
  );
}
