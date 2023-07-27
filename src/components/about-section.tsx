"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      id="about-us"
      className="relative px-4 py-16 lg:py-24 overflow-hidden isolate md:px-8 2xl:px-0 xl:overflow-visible 2xl:container"
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 xl:container xl:grid-cols-2 xl:items-start xl:gap-y-10 xl:gap-x-10 xl:px-0">
        <div className="xl:col-start-1 xl:row-start-1 xl:grid xl:w-full xl:gap-x-8 xl:px-0">
          <p className="text-base font-semibold leading-7 text-brand max-w-prose">
            Where It Started &amp; Where We&apos;ve Been
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
            Our Journey from the Beginning
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-700 max-w-prose">
            Co-founded by Scott and Celia Kelly in 1993, BASES originally began
            as a home-based operation addressing adolescent substance abuse. As
            we expanded to meet the needs of our community, we formed the Teen
            Center in 1995, providing a safe after-school space to tackle the
            rising concern of substance abuse among young people.
          </p>
        </div>
        <div className="xl:sticky xl:top-20 xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:pt-2">
          <Image
            className="object-cover w-full max-w-3xl bg-gray-900 rounded-lg shadow-lg ring-1 ring-gray-400/10 max-h-96"
            src="/Buiding_With_Sign.webp"
            alt="BASES Sign"
            width={1080}
            height={1980}
            priority
          />
        </div>
        <div className="xl:pr-4">
          <div className="text-base leading-7 text-gray-700 max-w-prose">
            <p>
              In 1997, we extended our services to the Recovery High program,
              providing substance abuse education and counseling. Although our
              primary focus was adolescent treatment until 2015, we also offered
              services for adults and provided resources in local schools,
              jails, and through community outreach.
            </p>
            <p className="mt-6">
              In 2015, after the Recovery High program ended, we transitioned
              our focus to adults. Recognizing the intricate connection between
              substance abuse, mental health, and trauma, we expanded our
              expertise to address these co-occurring issues.
            </p>
            <p className="mt-6">
              When the COVID pandemic hit, we adapted swiftly, initiating
              telehealth services that allowed us to expand our reach across
              Michigan and break down accessibility barriers to treatment. This
              commitment to evolving with the times and meeting changing needs
              is what led us to create our new domain, BASESmi.org.
            </p>
            <p className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              What’s Coming Next
            </p>
            <p className="mt-6">
              BASES has always been personal and family-oriented for Scott and
              Celia. Collectively, they have over 74 years of sobriety. They are
              living proof that recovery can have a meaningful and lasting
              impact on a family system. Everyone always talks about addiction
              and mental health being prevalent in their family tree, but the
              Kelly&apos;s strive to also teach that recovery can run in
              families, too.
            </p>
            <p className="mt-6">
              As Scott and Celia plan to consider retirement of some sort in the
              next 8 years, they plan to pass the torch to their daughter, Leah,
              who has worked for BASES for many years and been along for the
              ride since the beginning. During the next few years, Leah will
              take on more director duties. BASES will continue to strive to
              meet the needs of the community and provide quality services that
              people have come to know and expect.
            </p>
            <p className="mt-6">
              Substance use disorders are very treatable. Recovery is contagious
              and happens in families and communities. Recovery from mental
              health and trauma happens with safe, stable, and nurturing people
              and places. Call BASES to work with our counselors as you work
              toward accomplishing your goals of a healthier version of you.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
