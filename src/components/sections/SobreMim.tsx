"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";
import FadeInUp from "@/components/ui/FadeInUp";

/**
 * Sobre Mim — frames "Sobre Mim" (node 5:178, 1040 × 367) e "Codigo Sobre"
 * (node 5:173, 201 × 195).
 *
 * O card do código não é filho do card preto: no Figma ele está 24px acima e
 * 24px à esquerda dele, sobrando para fora por cima do brilho roxo. Por isso
 * os dois são irmãos aqui, com o card de código posicionado em absolute.
 *
 * A partir de `xl` (1280px, a menor largura que comporta os 1040 do card mais
 * as duas sobras de 24px) a composição é a do Figma, com cada peça na sua
 * coordenada exata; abaixo disso tudo empilha em fluxo normal.
 *
 * Medidas confirmadas no metadata e conferidas pixel a pixel no render:
 *   brilho ........... 312 × 314 em (15, 32), blur 25 (ver Glow: ampliado a pedido)
 *   foto ............. 271 × 271 em (106, 96), sombra 10/10/50 preto 50%
 *   bandeiras ........ 35 × 35 em (889, 44) e (933, 44)
 *   "Sobre Mim" ...... Poppins Bold 24px / leading 63,357 em (370, 62)
 *   parágrafo ........ Poppins Regular 13px / leading 15, #8e97a4, 598 de largura, em (370, 129)
 *   links sociais .... linha de 31px em (425, 292); o segundo grupo começa em 674
 *
 * A seção inteira é client porque as bandeiras trocam o idioma de textos que
 * ficam espalhados por ela (título, parágrafo, links). O ancestral comum
 * desses pedaços é o próprio card, então não sobra nada de servidor para
 * isolar — quebrar em wrappers só criaria indireção sem economizar bundle.
 */

const LINKEDIN_URL = "https://www.linkedin.com/in/juliadesouzaventura/";
const GITHUB_URL = "https://github.com/juliaszventura";

type Language = "pt" | "en";

type Copy = {
  /** Valor do atributo `lang` do bloco de texto. */
  htmlLang: string;
  title: string;
  bio: string;
  /** O segundo parágrafo é "{focusIntro} A, B {focusJoin} C." */
  focusIntro: string;
  focusAreas: [string, string, string];
  focusJoin: string;
  linkedinLabel: string;
  githubLabel: string;
  photoAlt: string;
  /** Rótulos acessíveis das bandeiras, escritos no idioma vigente. */
  switchToPt: string;
  switchToEn: string;
};

/**
 * Os textos em português são os do Figma, palavra por palavra. A versão em
 * inglês é tradução direta deles — se a Júlia tiver um texto próprio em
 * inglês, é só substituir aqui que o layout não muda.
 */
const COPY: Record<Language, Copy> = {
  pt: {
    htmlLang: "pt-BR",
    title: "Sobre Mim",
    bio: "Estudante de Engenharia de Software na PUC Minas, com formação técnica em Informática. Atuei como estagiária de banco de dados, trabalhando com organização, consulta e qualidade de dados (QA), além de experiência com SQL, suporte ao cliente e testes de software, o que fortaleceu minha atenção a detalhes e visão sistêmica. Inglês intermediário e espanhol básico, adquiridos em intercâmbio de 1 ano na Flórida (EUA).",
    focusIntro:
      "Atualmente explorando a área de dados, com interesse especial em ",
    focusAreas: [
      "Análise de Dados",
      "Business Intelligence",
      "Engenharia de Dados",
    ],
    focusJoin: " e ",
    linkedinLabel: "Conecte-se comigo",
    githubLabel: "Conheça meu github",
    photoAlt: "Retrato de Júlia Ventura",
    switchToPt: "Ler em português",
    switchToEn: "Ler em inglês",
  },
  en: {
    htmlLang: "en",
    title: "About Me",
    bio: "Software Engineering student at PUC Minas, with a technical degree in Information Technology. I worked as a database intern, handling data organization, querying and data quality (QA), along with experience in SQL, customer support and software testing, which sharpened my attention to detail and my systems thinking. Intermediate English and basic Spanish, acquired during a one-year exchange program in Florida (USA).",
    focusIntro:
      "Currently exploring the data field, with a particular interest in ",
    focusAreas: ["Data Analysis", "Business Intelligence", "Data Engineering"],
    focusJoin: " and ",
    linkedinLabel: "Connect with me",
    githubLabel: "Check out my github",
    photoAlt: "Portrait of Júlia Ventura",
    switchToPt: "Read in Portuguese",
    switchToEn: "Read in English",
  },
};

/**
 * Brilho por trás da foto (Ellipse 35).
 *
 * O Figma tem uma elipse de 312 × 314 em (15, 32) com gradiente LINEAR a
 * 109,1° (#505FFD 50% → #8B0BF4 50% → preto) e blur de 25. Esta versão
 * diverge do arquivo de propósito, a pedido: gradiente radial, 440 × 440 e
 * centro mais alto. As duas cores continuam sendo as do design, e o
 * `blur-[25px]` é o stdDeviation original.
 *
 * O último stop é `rgb(80 95 253 / 0)` e não `transparent` porque a palavra-
 * chave pode ser interpolada passando por preto transparente e deixar um halo
 * acinzentado na borda.
 */
const GLOW_GRADIENT =
  "radial-gradient(circle closest-side, rgb(160 60 255 / 0.55) 0%, rgb(139 11 244 / 0.45) 32%, rgb(80 95 253 / 0.18) 60%, rgb(80 95 253 / 0) 82%)";

/**
 * Fica dentro do container da foto para acompanhá-la no empilhado, então os
 * offsets do `xl` são medidos a partir dela, não do card. Como a foto está em
 * (106, 96), o alvo de (−49, −40) no card vira (−155, −136) aqui.
 *
 * Com o raio visível terminando em 82% de 220px, a bolha some 180px depois do
 * centro (171, 180): ela ocupa y 0→360 dentro dos 367 do card e só o que já
 * está transparente encosta no `overflow-hidden`, sem linha de corte à vista.
 */
function Glow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-[85px] left-1/2 h-[440px] w-[440px] -translate-x-1/2 blur-[25px] xl:-left-[155px] xl:-top-[136px] xl:translate-x-0"
      style={{ backgroundImage: GLOW_GRADIENT }}
    />
  );
}

/**
 * Bandeira clicável. A imagem entra como background porque o <img> comum
 * dispararia aviso do eslint-config-next e o next/image só serve SVG com
 * `dangerouslyAllowSVG`; o nome acessível vem do aria-label do botão.
 *
 * O anel do estado ativo é `ring`, ou seja, box-shadow: desenha para fora da
 * caixa sem ocupar espaço, então as bandeiras continuam 35 × 35 nas
 * coordenadas do Figma.
 */
function FlagButton({
  src,
  label,
  active,
  onClick,
}: {
  src: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`size-[35px] cursor-pointer rounded-full bg-contain bg-center bg-no-repeat drop-shadow-[0_5px_5px_rgb(0_0_0/0.25)] transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
        active
          ? "opacity-100 ring-2 ring-white/70 ring-offset-2 ring-offset-black"
          : "opacity-40 hover:opacity-75"
      }`}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}

function SocialLink({
  href,
  icon,
  size,
  children,
  className,
}: {
  href: string;
  icon: string;
  size: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-[6px] rounded-[4px] text-[13px] leading-[15px] text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${className ?? ""}`}
    >
      <Image
        src={icon}
        alt=""
        width={size}
        height={size}
        className="shrink-0 object-contain"
      />
      {children}
      {/* No Figma a seta é a mesma do Hero, girada -38,16° (↗). */}
      <ArrowIcon className="shrink-0 -rotate-[38.16deg] transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
    </a>
  );
}

/**
 * Card "Codigo Sobre" (201 × 195). Tamanho fixo e conteúdo em absolute: é um
 * enfeite com as linhas nas coordenadas do Figma, não um bloco de texto que
 * precise refluir.
 */
function CodeCard({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-[195px] w-[201px] rounded-[16px] border border-[rgb(36_40_51/0.7)] bg-[rgb(10_17_27/0.5)] text-[10px] leading-[15px] text-white ${className ?? ""}`}
    >
      <div className="relative size-full">
        <span className="absolute left-[16px] top-[11px]">&lt;/&gt; Code</span>
        {/* Ellipse 36: preenchimento #3b734a com contorno #051012 */}
        <span className="absolute left-[173px] top-[11px] size-[11px] rounded-full border-[0.5px] border-[#051012] bg-[#3b734a]" />
        <span className="absolute inset-x-0 top-[35px] h-px bg-[#242833]/50" />

        <span className="absolute left-[20px] top-[45px] whitespace-nowrap">
          <span className="text-[#890ef5]">const</span> developer {"{"}
        </span>
        <span className="absolute left-[30px] top-[65px] whitespace-nowrap">
          name: &ldquo;Julia&rdquo;,
        </span>
        <span className="absolute left-[30px] top-[85px] whitespace-nowrap">
          skills = [<span className="text-[#ff8660]">&ldquo;React&rdquo;</span>,{" "}
          <span className="text-[#ff8660]">&ldquo;Python&rdquo;</span>,
        </span>
        <span className="absolute left-[48px] top-[105px] whitespace-nowrap">
          <span className="text-[#ff8660]">&ldquo;Next.js&rdquo;</span>,{" "}
          <span className="text-[#ff8660]">&ldquo;Tailwind Css&rdquo;</span>],
        </span>
        <span className="absolute left-[30px] top-[127px] whitespace-nowrap">
          position:{" "}
          <span className="text-[#ff8660]">&ldquo;Building things for</span>
        </span>
        <span className="absolute left-[48px] top-[147px] whitespace-nowrap text-[#ff8660]">
          the web&rdquo;
        </span>
        <span className="absolute left-[18px] top-[167px] whitespace-nowrap">
          {"};"}
        </span>
      </div>
    </div>
  );
}

export default function SobreMim() {
  const [language, setLanguage] = useState<Language>("pt");
  const copy = COPY[language];

  return (
    <section id="sobre-mim" className="px-6 py-16 font-poppins md:py-24">
      <FadeInUp className="relative mx-auto w-full max-w-[1040px]">
        <CodeCard className="relative z-20 mx-auto mb-6 xl:absolute xl:-left-[24px] xl:-top-[24px] xl:mx-0 xl:mb-0" />

        {/* `overflow-hidden` prende o brilho dentro do retângulo: sem ele o
            blur de 25px vaza pela esquerda e pelo topo do card. */}
        <div className="relative overflow-hidden rounded-[30px] bg-black px-6 py-12 xl:h-[367px] xl:px-0 xl:py-0">
          {/* Bandeiras — canto superior direito, 72px da borda (1040 − 968). */}
          <div
            role="group"
            aria-label={
              language === "pt"
                ? "Idioma do texto desta seção"
                : "Language of this section"
            }
            // z-30 e não z-10: a caixa do <h2> ocupa a coluna de texto inteira
            // (x 370→968, y 62→125) e encosta na faixa das bandeiras (y 44→79).
            // Empatados no z-index, quem vem depois no DOM ganha — o título
            // ficava por cima e comia o clique nas bandeiras.
            className="relative z-30 mb-8 flex justify-center gap-[9px] xl:absolute xl:right-[72px] xl:top-[44px] xl:mb-0"
          >
            <FlagButton
              src="/icons/flag-br.svg"
              label={copy.switchToPt}
              active={language === "pt"}
              onClick={() => setLanguage("pt")}
            />
            <FlagButton
              src="/icons/flag-us.svg"
              label={copy.switchToEn}
              active={language === "en"}
              onClick={() => setLanguage("en")}
            />
          </div>

          {/* A foto é esticada para o quadrado de 271 × 271 (object-fill), como
              no Figma — a origem é 830 × 1024 e o design não recorta. */}
          <div className="relative z-10 mx-auto mb-10 h-[271px] w-[271px] xl:absolute xl:left-[106px] xl:top-[96px] xl:mx-0 xl:mb-0">
            <Glow />
            <Image
              src="/images/julia-ventura.png"
              alt={copy.photoAlt}
              width={271}
              height={271}
              className="relative h-full w-full object-fill object-bottom shadow-[10px_10px_50px_0_rgb(0_0_0/0.5)]"
            />
          </div>

          <div
            lang={copy.htmlLang}
            className="relative z-10 xl:h-full xl:pl-[370px] xl:pr-[72px]"
          >
            <h2 className="text-center text-[24px] font-bold leading-[1.4] text-white xl:pt-[62px] xl:text-left xl:leading-[63.357px]">
              {copy.title}
            </h2>

            {/* No Figma o parágrafo começa em y=129; o h2 acima termina em
                125,36 (62 + 63,357), daí os 3,64 que faltam. */}
            {/* A largura de 598px do design também serve de teto no empilhado:
                sem ela a linha esticaria até quase 1000px e ficaria ilegível. */}
            <div className="mx-auto mt-6 max-w-[598px] text-justify text-[13px] font-normal leading-[15px] text-[#8e97a4] xl:mx-0 xl:mt-[3.64px] xl:w-[598px]">
              <p>{copy.bio}</p>
              {/* A linha em branco entre os parágrafos é uma linha de texto
                  vazia no Figma — mesmos 15px de leading. */}
              <p className="mt-[15px]">
                {copy.focusIntro}
                <span className="font-semibold text-white">
                  {copy.focusAreas[0]}
                </span>
                ,{" "}
                <span className="font-semibold text-white">
                  {copy.focusAreas[1]}
                </span>
                {copy.focusJoin}
                <span className="font-semibold text-white">
                  {copy.focusAreas[2]}
                </span>
                .
              </p>
            </div>

            {/* Os dois grupos ficam em (425, 292) e (674, 292): a diferença de
                249px vira a largura do primeiro item, para o segundo cair no
                lugar exato sem depender da medida do texto. */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 xl:absolute xl:left-[425px] xl:top-[292px] xl:mt-0 xl:h-[31px] xl:flex-nowrap xl:gap-0">
              <SocialLink
                href={LINKEDIN_URL}
                icon="/icons/linkedin.png"
                size={31}
                className="xl:w-[249px]"
              >
                {copy.linkedinLabel}
              </SocialLink>
              <SocialLink href={GITHUB_URL} icon="/icons/github.png" size={30}>
                {copy.githubLabel}
              </SocialLink>
            </div>
          </div>
        </div>
      </FadeInUp>
    </section>
  );
}
