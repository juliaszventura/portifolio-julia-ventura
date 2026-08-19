"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";
import FadeInUp from "@/components/ui/FadeInUp";

const LINKEDIN_URL = "https://www.linkedin.com/in/juliadesouzaventura/";
const GITHUB_URL = "https://github.com/juliaszventura";

type Language = "pt" | "en";

type Copy = {
  htmlLang: string;
  title: string;
  bio: string;
  focusIntro: string;
  focusAreas: [string, string, string];
  focusJoin: string;
  linkedinLabel: string;
  githubLabel: string;
  photoAlt: string;
  switchToPt: string;
  switchToEn: string;
};

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

const GLOW_GRADIENT =
  "radial-gradient(circle closest-side, rgb(160 60 255 / 0.55) 0%, rgb(139 11 244 / 0.45) 32%, rgb(80 95 253 / 0.18) 60%, rgb(80 95 253 / 0) 82%)";

function Glow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-[85px] left-1/2 h-[440px] w-[440px] -translate-x-1/2 blur-[25px] xl:-left-[155px] xl:-top-[136px] xl:translate-x-0"
      style={{ backgroundImage: GLOW_GRADIENT }}
    />
  );
}

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
      <ArrowIcon className="shrink-0 -rotate-[38.16deg] transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
    </a>
  );
}

function CodeCard({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-[195px] w-[201px] rounded-[16px] border border-[rgb(36_40_51/0.7)] bg-[rgb(10_17_27/0.5)] text-[10px] leading-[15px] text-white ${className ?? ""}`}
    >
      <div className="relative size-full">
        <span className="absolute left-[16px] top-[11px]">&lt;/&gt; Code</span>
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

        <div className="relative overflow-hidden rounded-[30px] bg-black px-6 py-12 xl:h-[367px] xl:px-0 xl:py-0">
          <div
            role="group"
            aria-label={
              language === "pt"
                ? "Idioma do texto desta seção"
                : "Language of this section"
            }
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

            <div className="mx-auto mt-6 max-w-[598px] text-justify text-[13px] font-normal leading-[15px] text-[#8e97a4] xl:mx-0 xl:mt-[3.64px] xl:w-[598px]">
              <p>{copy.bio}</p>
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
