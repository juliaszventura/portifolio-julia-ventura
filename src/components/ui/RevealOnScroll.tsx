"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Entrada por scroll: o elemento sobe e revela quando entra na tela.
 *
 * Os valores abaixo são a fonte única desse padrão — ExperienciaItem os
 * importa para animar seus <li>, que precisam ser `motion.li` e por isso não
 * podem usar este invólucro.
 */
export const REVEAL_INICIAL = { opacity: 0, y: 40 };
export const REVEAL_VISIVEL = { opacity: 1, y: 0 };
/** `once` para não reanimar a cada ida e volta do scroll. */
export const REVEAL_VIEWPORT = { once: true } as const;

/** Um atraso por índice faz uma lista entrar em sequência, não de uma vez. */
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
