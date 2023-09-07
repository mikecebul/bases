"use client";

import { Icons } from "./icons";
import { motion } from "framer-motion";

export default function Carf() {
  return (
    <section className="bg-brand">
      <div className="grid px-4 py-24 xl:container 2xl:px-0 lg:grid-cols-2 lg:py-32 md:px-8 xl:items-center xl:text-center">
        <motion.div
          initial={{ opacity: 0, x: "var(--x-from)" }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-start max-w-2xl pb-8 lg:justify-center [--x-from:40px] sm:[--x-from:-40px]"
        >
          <Icons.carf className="w-32 lg:w-48" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: "var(--y-from)" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col max-w-2xl text-left 2xl:container 2xl:px-0 xl:items-center text-accent/90 [--y-from:40px]"
        >
          <p className="text-base font-semibold leading-7 text-brand-foreground">
            BASES is proud to be accredited by CARF
          </p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Quality shown by global accreditation
          </h3>
          <p className="mt-6 text-md lg:text-lg lg:leading-8 text-accent/70 text-prose">
            BASES is proud to be accredited by CARF International Commission on
            Accreditation of Rehabilitation Facilities (CARF) International
            accreditation demonstrates a program&apos;s quality, transparency
            and commitment to the satisfaction of the persons served. CARF
            International is an independent, non-profit accreditor of health and
            human services.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
