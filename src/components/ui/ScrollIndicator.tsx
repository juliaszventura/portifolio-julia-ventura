"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Frame "Scroll" do Figma (node 5:209): pílula de 18 × 33 com raio 30, borda de
 * 1px em branco/30% e um ponto de 6 × 6 em branco/60%.
 *
 * No design o ponto está parado a 17px do topo. Para animar, ele parte de 8px e
 * desce 12px — a viagem passa justamente pelos 17px do design e termina em 26px,
 * dentro dos 32px úteis da pílula. Sair de 17px estouraria a borda de baixo.
 */
export default function ScrollIndicator() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span
      aria-hidden="true"
      className="relative block h-[33px] w-[18px] overflow-hidden rounded-[30px] border border-white/30"
    >
      <motion.span
        // Centralizado com `inset-x-0 mx-auto`, e não com `-translate-x-1/2`:
        // a motion escreve `transform` a cada frame para animar o y, e uma
        // classe de translate do Tailwind seria sobrescrita por ela — o ponto
        // saltaria de volta para a esquerda assim que a animação começasse.
        className={`absolute inset-x-0 mx-auto block size-[6px] rounded-full bg-white/60 ${
          // Sem animação, descansa na posição exata do design.
          shouldReduceMotion ? "top-[17px]" : "top-[8px]"
        }`}
        animate={shouldReduceMotion ? undefined : { y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      />
    </span>
  );
}
