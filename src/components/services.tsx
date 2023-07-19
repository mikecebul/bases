import React from "react";
import { Icons } from "./icons";
import Link from "next/link";

const features = [
  {
    name: "Detailed Substance Use Disorder Assessments",
    description:
      "We provide comprehensive substance use disorder assessments for adults and adolescents to map out the most effective treatment plan.",
    icon: Icons.arrowRight,
  },
  {
    name: "Empowering Recovery Coaching",
    description:
      "Our peer-based Recovery Coaching offers a level of support that empowers individuals to navigate their own unique recovery path.",
    icon: Icons.arrowRight,
  },
  {
    name: "Substance Use Disorder Group Therapy",
    description:
      "We offer group therapy sessions for adults utilizing DBT, CBT, and relapse prevention therapies.",
    icon: Icons.arrowRight,
  },
  {
    name: "Correctional Facility Group Therapy",
    description:
      "We facilitate CBT/DBT groups for men (Mondays) and for women (Wednesdays) at the Charlevoix County Jail.",
    icon: Icons.arrowRight,
  },
  {
    name: "Alcohol Highway Safety Education Class",
    description:
      "Our Alcohol Highway Safety Education Classes are designed for first-time OWI/OUI offenders, providing crucial knowledge and insight.",
    icon: Icons.arrowRight,
  },
  //   {
  //     name: "Zero Tolerance Education Class",
  //     description:
  //       "Our Zero Tolerance Education Classes are tailored for first-time MIP offenders, equipping them with the knowledge to make better decisions.",
  //     icon: Icons.arrowRight,
  //   },
  {
    name: "Driver’s License Appeal Assistance",
    description:
      "We provide substance use disorder evaluations for driver’s license appeal hearings. This service is offered at a $250 charge and includes a drug test, driving record analysis, evaluation, and completion of 10+ page forms.",
    icon: Icons.arrowRight,
  },
];

export default function Services() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-brand">
            Redefine your recovery path
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for a successful recovery journey
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Incorporating a unique blend of clinical expertise and compassionate
            care, we&apos;ve curated an exceptional recovery experience for you.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:container">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 xl:grid-cols-3">
            {features.map((feature) => (
              <Link
                href="/"
                className="hover:bg-accent -m-2 p-2 rounded-md"
                key={feature.name}
              >
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-primary">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-brand">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-muted-foreground">
                    {feature.description}
                  </dd>
                </div>
              </Link>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
