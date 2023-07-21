/* eslint-disable react/no-unescaped-entities */
import { siteConfig } from "@/config/site";

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
    <div className="w-full lg:container my-2 lg:my-4 mx-auto">
      <CardHeader className="container">
        <CardTitle>{staffMember.name}</CardTitle>
        <CardDescription>{staffMember.qualifications}</CardDescription>
        <CardSubTitle>{staffMember.role}</CardSubTitle>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 sm:gap-16">
        <div>
          {staffMember.bio?.map((paragraph, index) => (
            <p key={index} className="mt-6 max-w-prose text-sm lg:text-base">
              {paragraph}
            </p>
          ))}
          {staffMember.philosophy && (
            <div>
              <p className="font-bold text-lg lg:text-xl mt-6 mb-3">
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
              <p className="font-bold text-lg lg:text-xl mt-6 mb-3">
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
              <p className="font-bold text-lg lg:text-xl mt-6 mb-3">
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
          className="rounded-md sm:w-full md:w-4/5 lg:w-3/5 mx-auto object-top mt-0 sm:mt-6 sm:order-last order-first"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/#team" passHref legacyBehavior>
          <Button variant="outline">Back</Button>
        </Link>
      </CardFooter>
    </div>
  );
}