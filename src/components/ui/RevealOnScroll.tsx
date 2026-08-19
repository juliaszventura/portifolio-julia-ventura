"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const REVEAL_INICIAL = { opacity: 0, y: 40 };
export const REVEAL_VISIVEL = { opacity: 1, y: 0 };
export const REVEAL_VIEWPORT = { once: true } as const;

export function revealTransicao(delay = 0) {
  return { duration: 0.6, delay };
}

export default function RevealOnScroll({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : REVEAL_INICIAL}
      whileInView={REVEAL_VISIVEL}
      viewport={REVEAL_VIEWPORT}
      transition={revealTransicao(delay)}
    >
      {children}
    </motion.div>
  );
}
