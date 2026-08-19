import type { ComponentType, SVGProps } from "react";
import ContatoFormulario from "@/components/sections/ContatoFormulario";
import {
  EmailIcon,
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/ui/ContatoIcons";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { CONTATO } from "@/data/contato";

const TITULO_GRADIENTE =
  "linear-gradient(to right, #bd6bfd 34.615%, #e7006b 100%)";

function gradienteDoIcone(de: string, para: string) {
  return `linear-gradient(135.4373617330866deg, ${de} 9.4898%, ${para} 92.414%)`;
}

const CARD_CLASSNAME =
  "rounded-[18px] border border-[#1e1e1e] bg-[rgb(9_9_9/0.3)]";

function CanalDeContato({
  Icone,
  gradiente,
  rotulo,
  valor,
  href,
}: {
  Icone: ComponentType<SVGProps<SVGSVGElement>>;
  gradiente: string;
  rotulo: string;
  valor: string;
  href: string;
}) {
  return (
    <div className={`${CARD_CLASSNAME} flex gap-[18px] px-[24px] py-[20px]`}>
      <span
        className="mt-[3px] flex h-[39px] w-[40px] shrink-0 items-center justify-center rounded-[10px] text-white"
        style={{ backgroundImage: gradiente }}
      >
        <Icone />
      </span>

      <div className="min-w-0">
        <p className="text-[13px] font-semibold leading-[20px] text-white">
          {rotulo}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[5px] block truncate text-[12px] font-normal leading-[20px] text-[#8e97a4] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {valor}
        </a>
      </div>
    </div>
  );
}

function RedeSocial({
  Icone,
  href,
  nome,
}: {
  Icone: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
  nome: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={nome}
      className="flex h-[39px] w-[40px] items-center justify-center rounded-[10px] border border-[#303030] bg-[#191919] text-[#505050] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <Icone />
    </a>
  );
}

export default function Contato() {
  return (
    <section id="contato" className="px-6 pb-16 font-poppins md:pb-24">
      <div className="mx-auto w-full max-w-[1002px]">
        <RevealOnScroll>
          <h2 className="text-center text-[32px] font-extrabold leading-[1.2] text-white md:text-[40px] md:leading-[63.357px]">
            Vamos Construir{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: TITULO_GRADIENTE }}
            >
              Algo Juntos
            </span>
          </h2>

          <p className="mt-[10px] text-center text-[15px] font-normal leading-[20px] text-[#8e97a4]">
            Tem uma oportunidade, projeto ou ideia em mente? Ficarei feliz em
            conversar.
          </p>
        </RevealOnScroll>

        <div className="mt-[62px] grid grid-cols-1 gap-[40px] lg:grid-cols-2">
          <RevealOnScroll>
            <ContatoFormulario />
          </RevealOnScroll>

          <div className="space-y-[22px]">
            <RevealOnScroll delay={0.1}>
              <CanalDeContato
                Icone={EmailIcon}
                gradiente={gradienteDoIcone("#3c69ff", "#8821f5")}
                rotulo="Email"
                valor={CONTATO.email}
                href={`mailto:${CONTATO.email}`}
              />
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <CanalDeContato
                Icone={WhatsappIcon}
                gradiente={gradienteDoIcone("#ac39f0", "#de147d")}
                rotulo="Whatsapp"
                valor={CONTATO.whatsapp}
                href={CONTATO.whatsappHref}
              />
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className={`${CARD_CLASSNAME} px-[24px] py-[22px]`}>
                <p className="text-[13px] font-semibold leading-[20px] text-white">
                  Me siga nas redes sociais
                </p>
                <div className="mt-[11px] flex gap-[12px]">
                  <RedeSocial
                    Icone={GithubIcon}
                    href={CONTATO.github}
                    nome="GitHub"
                  />
                  <RedeSocial
                    Icone={LinkedinIcon}
                    href={CONTATO.linkedin}
                    nome="LinkedIn"
                  />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
