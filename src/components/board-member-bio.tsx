"use client";

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
import { SiteConfig } from "@/config/site";

export default function BoardMemberBio({
  boardMember,
}: {
  boardMember: SiteConfig["team"]["boardMembers"][number];
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full my-24 2xl:container lg:my-32 lg:px-0"
    >
      <CardHeader className="pt-0 2xl:container px-4 md:px-8 2xl:px-0">
        <CardTitle>{boardMember.name}</CardTitle>
        <CardSubTitle>{boardMember.role}</CardSubTitle>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 sm:gap-16 px-4 md:px-8 2xl:px-0">
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
      <CardFooter className="flex justify-between px-4 md:px-8 2xl:px-0">
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
