"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  REVEAL_INICIAL,
  REVEAL_VIEWPORT,
  REVEAL_VISIVEL,
  revealTransicao,
} from "@/components/ui/RevealOnScroll";
import type { Experiencia } from "@/data/experiencias";

/**
 * Item da linha do tempo de Experiências (frame 19:463).
 *
 * Mora fora de Experiencias.tsx porque a entrada usa `motion`, e com isso só
 * o item atravessa a fronteira de cliente — a seção continua renderizando no
 * servidor, como as outras fazem.
 *
 * Coordenadas do Figma, medidas a partir do topo do cargo:
 *   ponto ......... 17 × 17 em (0, +1,5) — centro alinhado ao da linha do cargo
 *   cargo ......... Poppins SemiBold 16px / leading 20, branco, a 45 da esquerda
 *   empresa ....... Poppins SemiBold 15px / leading 20, #8f02f3, em +25
 *   separador ..... 5 × 5 #8f02f3, centrado na linha da empresa
 *   período ....... Poppins Regular 15px / leading 20, #8e97a4
 *   descrição ..... Poppins Regular 15px / leading 20, #8e97a4, em +50, 780 de largura
 *
 * Os pontos ficam a cada 169px no design (199, 368, 537) e o bloco de texto
 * tem 110 de altura, então o intervalo entre itens é 59 — o `space-y` da
 * lista em Experiencias.tsx.
 */

/** Distância do centro de um ponto ao centro do próximo: 110 do item + 59 do intervalo. */
const ATE_O_PROXIMO_PONTO = 69;

export default function ExperienciaItem({
  experiencia,
  index,
  ultimo,
}: {
  experiencia: Experiencia;
  index: number;
  /** O último item não desenha o traço, que não tem ponto para alcançar. */
  ultimo: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.li
      className="relative pl-[45px]"
      // Mesmo padrão de RevealOnScroll, importado de lá para não divergir —
      // aqui precisa ser um `motion.li`, então não dá para usar o invólucro.
      initial={shouldReduceMotion ? false : REVEAL_INICIAL}
      whileInView={REVEAL_VISIVEL}
      viewport={REVEAL_VIEWPORT}
      transition={revealTransicao(index * 0.1)}
    >
      {/* Traço vertical (#2b2b2b, 1px). Vai do centro deste ponto ao centro
          do próximo: com `top-[10px]`, um `bottom` negativo de 69 dá altura
          = altura do item + 59, sem depender da altura real do texto. */}
      {!ultimo && (
        <span
          aria-hidden="true"
          className="absolute left-[8px] top-[10px] w-px bg-[#2b2b2b]"
          style={{ bottom: -ATE_O_PROXIMO_PONTO }}
        />
      )}

      {/* 17px de ponto numa linha de 20px: 1,5 de recuo alinha os centros. */}
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
