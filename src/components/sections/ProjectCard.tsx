"use client";

import type { Variants } from "motion/react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { ProjectIcon } from "@/components/ui/ProjectIcon";
import type { Projeto } from "@/data/projetos";

export function gradienteDoIcone({ de, para }: Projeto["gradiente"]) {
  return `linear-gradient(135.6365918684162deg, ${de} 5.2831%, ${para} 91.832%)`;
}

const CARD_CLASSNAME =
  "relative flex h-full min-h-[269px] w-full flex-col rounded-[24px] " +
  "border border-[#1e1e1e] bg-[rgb(9_9_9/0.3)] pl-[29px] pr-[18px] pt-[28px] " +
  "transition-colors duration-300 group-hover:border-white/20";

export default function ProjectCard({ projeto }: { projeto: Projeto }) {
  const shouldReduceMotion = useReducedMotion();
  const gradiente = gradienteDoIcone(projeto.gradiente);

  const variantesDoCard: Variants = {
    rest: shouldReduceMotion ? {} : { y: 0, scale: 1 },
    hover: shouldReduceMotion
      ? {}
      : { y: -10, scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } },
  };

  const variantesDoSaibaMais: Variants = {
    rest: { x: shouldReduceMotion ? 0 : -10, opacity: 0 },
    hover: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  const conteudo: ReactNode = (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-10"
        style={{ backgroundImage: gradiente }}
      />

      <motion.span
        className="relative z-10 flex size-[52px] shrink-0 items-center justify-center rounded-[12px] text-white"
        style={{ backgroundImage: gradiente }}
        whileHover={
          shouldReduceMotion ? undefined : { rotate: 360, scale: 1.1 }
        }
        transition={{ duration: 0.6 }}
      >
        <ProjectIcon name={projeto.icone} className="shrink-0" />
      </motion.span>

      <h3 className="relative z-10 mt-[22px] text-[19px] font-semibold leading-none text-white">
        {projeto.nome}
      </h3>

      <p className="relative z-10 mt-[11px] text-[12px] font-normal leading-[15px] text-[#8e97a4]">
        {projeto.descricao}
      </p>

      <motion.div
        variants={variantesDoSaibaMais}
        className="relative z-10 mt-6 flex items-center gap-2 text-[13px] font-medium text-white"
      >
        Saiba mais
        <ArrowIcon />
      </motion.div>
    </>
  );

  const card = (
    <Link
      href={`/projetos/${projeto.slug}`}
      className={`${CARD_CLASSNAME} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
    >
      {conteudo}
    </Link>
  );

  return (
    <motion.div
      className="group relative w-full"
      variants={variantesDoCard}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      {card}
    </motion.div>
  );
}
