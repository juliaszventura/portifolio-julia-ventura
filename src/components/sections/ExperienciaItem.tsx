"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  REVEAL_INICIAL,
  REVEAL_VIEWPORT,
  REVEAL_VISIVEL,
  revealTransicao,
} from "@/components/ui/RevealOnScroll";
import type { Experiencia } from "@/data/experiencias";

const ATE_O_PROXIMO_PONTO = 69;

export default function ExperienciaItem({
  experiencia,
  index,
  ultimo,
}: {
  experiencia: Experiencia;
  index: number;
  ultimo: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.li
      className="relative pl-[45px]"
      initial={shouldReduceMotion ? false : REVEAL_INICIAL}
      whileInView={REVEAL_VISIVEL}
      viewport={REVEAL_VIEWPORT}
      transition={revealTransicao(index * 0.1)}
    >
      {!ultimo && (
        <span
          aria-hidden="true"
          className="absolute left-[8px] top-[10px] w-px bg-[#2b2b2b]"
          style={{ bottom: -ATE_O_PROXIMO_PONTO }}
        />
      )}

      <span
        aria-hidden="true"
        className="absolute left-0 top-[1.5px] size-[17px] rounded-full bg-[#8f02f3]"
      />

      <h3 className="text-[16px] font-semibold leading-[20px] text-white">
        {experiencia.cargo}
      </h3>

      <p className="mt-[5px] flex flex-wrap items-center gap-x-[5px] text-[15px] leading-[20px]">
        <span className="font-semibold text-[#8f02f3]">
          {experiencia.empresa}
        </span>
        <span
          aria-hidden="true"
          className="size-[5px] shrink-0 rounded-full bg-[#8f02f3]"
        />
        <span className="font-normal text-[#8e97a4]">
          {experiencia.periodo}
        </span>
      </p>

      <p className="mt-[5px] text-[15px] font-normal leading-[20px] text-[#8e97a4]">
        {experiencia.descricao}
      </p>
    </motion.li>
  );
}
