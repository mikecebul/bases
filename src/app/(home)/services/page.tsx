import Services from '@/components/services'
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore all the recovery services provided at BASES.",
};

async function getServices() {
  const services = await prisma.service.findMany({
    orderBy: {
      order: "asc",
    },
  });
  return services;
}

export default async function Page() {
  const services = await getServices()
  return (
    <Services services={services} />
  )
}
