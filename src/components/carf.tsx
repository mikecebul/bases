"use client";

import React from "react";
import { Icons } from "./icons";
import { motion } from "framer-motion";

export default function Carf() {
  return (
    <section className="grid lg:grid-cols-2 my-16 lg:my-24 px-4 2xl:container md:px-8 2xl:px-0 xl:items-center xl:text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="max-w-2xl flex justify-start items-center lg:justify-center pb-8"
      >
        <Icons.carf className="w-32 lg:w-48" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        viewport={{ once: true }}
        className="max-w-2xl flex flex-col 2xl:containe 2xl:px-0 xl:items-center text-left"
      >
        <div>
          <p className="text-base font-semibold leading-7 text-brand">
            BASES is proud to be accredited by CARF
          </p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            International accreditation demonstrates a program&apos;s quality
          </h3>
          <p className="mt-6 text-md lg:text-lg lg:leading-8 text-muted-foreground text-prose">
            BASES is proud to be accredited by CARF International Commission on
            Accreditation of Rehabilitation Facilities (CARF) International
            accreditation demonstrates a program&apos;s quality, transparency
            and commitment to the satisfaction of the persons served. CARF
            International is an independent, non-profit accreditor of health and
            human services.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
