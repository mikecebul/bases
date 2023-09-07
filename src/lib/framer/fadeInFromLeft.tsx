"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function FadeInFromLeft({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -75 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
