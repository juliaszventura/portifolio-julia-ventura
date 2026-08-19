"use client";

import type { TargetAndTransition } from "motion/react";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentPropsWithoutRef } from "react";

const HOVER: TargetAndTransition = {
  scale: 1.05,
  transition: { duration: 0.2, ease: "easeOut" },
};

const TAP: TargetAndTransition = {
  scale: 0.95,
  transition: { duration: 0.06, ease: "easeOut" },
};

type CtaButtonProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "onAnimationStart" | "onAnimationEnd" | "onDrag" | "onDragStart" | "onDragEnd"
>;

export default function CtaButton({ children, ...props }: CtaButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      draggable={false}
      whileHover={shouldReduceMotion ? undefined : HOVER}
      whileTap={shouldReduceMotion ? undefined : TAP}
      {...props}
    >
      {children}
    </motion.a>
  );
}
