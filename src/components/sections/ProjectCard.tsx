"use client";

import type { Variants } from "motion/react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { ProjectIcon } from "@/components/ui/ProjectIcon";
import type { Projeto } from "@/data/projetos";

/**
 * Card da seção Projetos (frame 45:853).
 *
 * Mora fora de Projetos.tsx porque os hovers usam `motion`, e com isso só o
 * card atravessa a fronteira de cliente — a seção continua renderizando no
 * servidor, como Hero e Sobre Mim fazem com FadeInUp.
 *
 * São DOIS hovers independentes:
 *
 *   card inteiro → sobe, cresce, tinge o fundo e revela o "Saiba mais"
 *   quadradinho  → gira 360° e cresce, sozinho
 *
 * O de fora anda por variantes: o invólucro declara `whileHover="hover"` e
 * quem tiver `variants` na subárvore recebe o rótulo. A propagação é por
 * contexto do React, não pelo DOM, então atravessa o <Link> no meio sem
 * problema. O quadradinho fica de fora dela justamente por NÃO declarar
 * `variants` — só um `whileHover` próprio, que dispara no ponteiro sobre
 * ele.
 *
 * O estado de repouso é o do Figma ao pixel; os hovers são acréscimo nosso,
 * o design não tem esses estados.
 */

/** Ângulo e paradas são os mesmos nos três quadrados; só as cores mudam. */
export function gradienteDoIcone({ de, para }: Projeto["gradiente"]) {
  return `linear-gradient(135.6365918684162deg, ${de} 5.2831%, ${para} 91.832%)`;
}

/**
 * Comum ao card com e sem destino.
 *
 * Os paddings são os do Figma menos 1: padding e `absolute` contam a partir
 * da caixa interna, e a borda de 1px já empurra tudo. Assim o conteúdo cai a
 * 30 da borda externa e sobra a faixa de 266 que o design dá à descrição.
 */
const CARD_CLASSNAME =
  "relative flex h-full min-h-[269px] w-full flex-col rounded-[24px] " +
  "border border-[#1e1e1e] bg-[rgb(9_9_9/0.3)] pl-[29px] pr-[18px] pt-[28px] " +
  "transition-colors duration-300 group-hover:border-white/20";

export default function ProjectCard({ projeto }: { projeto: Projeto }) {
  const shouldReduceMotion = useReducedMotion();
  const gradiente = gradienteDoIcone(projeto.gradiente);

  // Mesma duração/curva do hover de CtaButton, para os dois reagirem igual.
  const variantesDoCard: Variants = {
    rest: shouldReduceMotion ? {} : { y: 0, scale: 1 },
    hover: shouldReduceMotion
      ? {}
      : { y: -10, scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } },
  };

  // Com movimento reduzido o "Saiba mais" ainda aparece — só não desliza.
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
      {/* Tinge o card com a mesma cor do quadradinho do ícone. `inset-0`
          para na caixa interna, então o raio vem por `inherit` em vez de um
          24 fixo, senão os cantos escapariam da borda. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-10"
        style={{ backgroundImage: gradiente }}
      />

      {/* A camada acima é `absolute` e por isso pinta na frente do conteúdo
          em fluxo; o z-10 daqui para baixo devolve a ordem. */}
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

      {/* No Figma a caixa do nome tem leading 63,357 e encavala a da
          descrição. Aqui o nome usa leading normal e as margens recolocam
          as duas linhas de base onde o design as põe: 119,3 e 144,7. */}
      <h3 className="relative z-10 mt-[22px] text-[19px] font-semibold leading-none text-white">
        {projeto.nome}
      </h3>

      <p className="relative z-10 mt-[11px] text-[12px] font-normal leading-[15px] text-[#8e97a4]">
        {projeto.descricao}
      </p>

      {/* Não é um <a>: o card inteiro já é o link, e <a> dentro de <a> é
          HTML inválido. Ocupa espaço mesmo invisível, então revelar não
          empurra nada. A seta é a mesma do Hero, aqui em branco. */}
      <motion.div
        variants={variantesDoSaibaMais}
        className="relative z-10 mt-6 flex items-center gap-2 text-[13px] font-medium text-white"
      >
        Saiba mais
        <ArrowIcon />
      </motion.div>
    </>
  );

  // O card inteiro é a área clicável, como pede o subtítulo. Projeto sem
  // destino sai como <div>: link para lugar nenhum é pior que nenhum link.
  const card = projeto.href ? (
    <Link
      href={projeto.href}
      className={`${CARD_CLASSNAME} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
    >
      {conteudo}
    </Link>
  ) : (
    <div className={CARD_CLASSNAME}>{conteudo}</div>
  );

  // O invólucro carrega o `group` (de que a borda depende) e é a origem do
  // hover do card: é ele que sobe, cresce e dispara a variante "hover".
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
