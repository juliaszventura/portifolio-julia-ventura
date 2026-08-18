"use client";

import type { TargetAndTransition } from "motion/react";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Comportamento de hover/clique compartilhado pelos botões de destaque
 * (o "Contato" da Navbar e o "Descubra mais" do Hero), para que os dois
 * reajam igual.
 *
 * Cada gesto tem sua própria transição de propósito: com a mola padrão da
 * Motion (~300ms para assentar), um clique real de ~70ms mal tirava o botão
 * de 1 antes de soltar, e o feedback ficava invisível. O tap precisa
 * aterrissar dentro da duração da pressão; o hover pode ser mais lento porque
 * dura enquanto o ponteiro estiver em cima.
 */
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
      // <a> é arrastável por padrão: segurar e mover 1px inicia o drag nativo,
      // que dispara pointercancel e mata o gesto de pressão.
      draggable={false}
      whileHover={shouldReduceMotion ? undefined : HOVER}
      whileTap={shouldReduceMotion ? undefined : TAP}
      {...props}
    >
      {children}
    </motion.a>
  );
}
