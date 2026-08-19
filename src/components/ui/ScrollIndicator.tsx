"use client";

import { motion, useReducedMotion } from "motion/react";

export default function ScrollIndicator() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span
      aria-hidden="true"
      className="relative block h-[33px] w-[18px] overflow-hidden rounded-[30px] border border-white/30"
    >
      <motion.span
        className={`absolute inset-x-0 mx-auto block size-[6px] rounded-full bg-white/60 ${
          shouldReduceMotion ? "top-[17px]" : "top-[8px]"
        }`}
        animate={shouldReduceMotion ? undefined : { y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      />
    </span>
  );
}
