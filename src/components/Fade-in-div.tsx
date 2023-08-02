"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function FadeInDiv({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="min-h-[100dvh] flex flex-col"
    >
      {children}
    </motion.div>
  );
}
