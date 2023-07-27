/* eslint-disable react/no-unescaped-entities */
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
  const boardMembers = siteConfig.team.boardMembers;

  return boardMembers.map((person) => ({
    slug: person.name.toLowerCase().replace(/ /g, "-"),
  }));
}

export default function Page({ params }: { params: Params }) {
  const { name } = params;

  const boardMember = siteConfig.team.boardMembers.find(
    (person) => person.name.toLowerCase().replace(/ /g, "-") === name
  );

  if (!boardMember) {
    return <div>Staff member not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full lg:container my-2 lg:my-4 mx-auto"
    >
      <CardHeader className="container">
        <CardTitle>{boardMember.name}</CardTitle>
        <CardSubTitle>{boardMember.role}</CardSubTitle>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 sm:gap-16">
        <div>
          {boardMember.bio?.map((paragraph, index) => (
            <p key={index} className="mt-6 max-w-prose text-sm lg:text-base">
              {paragraph}
            </p>
          ))}
        </div>
        <Image
          src={boardMember.imageUrl}
          alt={boardMember.name}
          width={1000}
          height={1000}
          className="rounded-md sm:w-full md:w-4/5 lg:w-3/5 mx-auto object-top mt-0 sm:mt-6 sm:order-last order-first"
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
