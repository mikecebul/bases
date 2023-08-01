"use client";

import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardSubTitle,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Params {
  name: string;
}

export async function generateStaticParams() {
  const staff = siteConfig.team.staff;

  return staff.map((person) => ({
    slug: person.name.toLowerCase().replace(/ /g, "-"),
  }));
}

export default function Page({ params }: { params: Params }) {
  const { name } = params;

  const staffMember = siteConfig.team.staff.find(
    (person) => person.name.toLowerCase().replace(/ /g, "-") === name
  );

  if (!staffMember) {
    return <div>Staff member not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full mx-auto my-2 lg:container lg:my-4"
    >
      <CardHeader className="container">
        <CardTitle>{staffMember.name}</CardTitle>
        <CardDescription>{staffMember.qualifications}</CardDescription>
        <CardSubTitle>{staffMember.role}</CardSubTitle>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 sm:gap-16">
        <div>
          {staffMember.bio?.map((paragraph, index) => (
            <p key={index} className="mt-6 text-sm max-w-prose lg:text-base">
              {paragraph}
            </p>
          ))}
          {staffMember.philosophy && (
            <div>
              <p className="mt-6 mb-3 text-lg font-bold lg:text-xl">
                Treatment Philosophy and Focus
              </p>
              <ul>
                {staffMember.philosophy?.map((item, index) => (
                  <p key={index} className="text-sm lg:text-base">
                    {item}
                  </p>
                ))}
              </ul>
            </div>
          )}
          {staffMember.education && (
            <div>
              <p className="mt-6 mb-3 text-lg font-bold lg:text-xl">
                Education and Experience
              </p>
              <ul>
                {staffMember.education?.map((item, index) => (
                  <p key={index} className="text-sm lg:text-base">
                    {item}
                  </p>
                ))}
              </ul>
            </div>
          )}
          {staffMember.specializations && (
            <div>
              <p className="mt-6 mb-3 text-lg font-bold lg:text-xl">
                Specializations:
              </p>
              <ul>
                {staffMember.specializations?.map((item, index) => (
                  <li key={index} className="text-sm lg:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Image
          src={staffMember.imageUrl}
          alt={staffMember.name}
          width={1000}
          height={1000}
          className="order-first object-top mx-auto mt-0 rounded-md sm:w-full md:w-4/5 lg:w-3/5 sm:mt-6 sm:order-last"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/#team" passHref legacyBehavior>
          <Button variant="outline">Back</Button>
        </Link>
      </CardFooter>
    </motion.div>
  );
}
