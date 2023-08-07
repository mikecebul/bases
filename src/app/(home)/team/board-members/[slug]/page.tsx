/* eslint-disable react/no-unescaped-entities */
"use client";

import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardSubTitle,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board Members",
  description:
  "Learn about our BASES board member's history and experience.",
};

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  const boardMembers = siteConfig.team.boardMembers;

  return boardMembers.map((person) => ({
    slug: person.slug,
  }));
}

export default function Page({ params }: { params: Params }) {
  const { slug } = params;
  console.log("Slug: ", slug);
  const boardMember = siteConfig.team.boardMembers.find(
    (person) => person.slug === slug
  );

  if (!boardMember) {
    return <div>Staff member not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full mx-auto my-2 lg:container lg:my-24"
    >
      <CardHeader className="container pt-0">
        <CardTitle>{boardMember.name}</CardTitle>
        <CardSubTitle>{boardMember.role}</CardSubTitle>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 sm:gap-16">
        <div>
          {boardMember.bio?.map((paragraph, index) => (
            <p key={index} className="mt-6 text-sm max-w-prose lg:text-base">
              {paragraph}
            </p>
          ))}
        </div>
        <Image
          src={boardMember.imageUrl}
          alt={boardMember.name}
          width={1000}
          height={1000}
          className="order-first object-top mx-auto mt-0 rounded-md sm:w-full md:w-4/5 lg:w-3/5 sm:mt-6 sm:order-last"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          href="/team"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Back
        </Link>
      </CardFooter>
    </motion.div>
  );
}
