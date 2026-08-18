import type { SVGProps } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";
import CtaButton from "@/components/ui/CtaButton";
import FadeInUp from "@/components/ui/FadeInUp";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

/**
 * Hero — frames "Home" (node 1:1011, 643 × 329) e "Scroll" (node 5:209, 18 × 33).
 *
 * Medidas do Figma, todas confirmadas no metadata:
 *   "Hello, i'm" ...... Poppins SemiBold 70px, gradiente #00c8ef → #8e06f3
 *   "Júlia Ventura" ... Poppins Bold 80px, branco
 *   parágrafo ......... Poppins Regular 17px / leading 20px, #8e97a4, 643px de largura
 *   botão primário .... 202 × 51, raio 35, padding lateral 33, gap 6 até a seta
 *   botão secundário .. 183 × 51, raio 35, padding lateral 28, gap 4 até o ícone
 *   espaços verticais . 34 (título), 33 (parágrafo), 43 (botões), 144 (scroll)
 *
 * Sem foto — ela vive só na seção Sobre Mim.
 */

/** Path exato do vetor 1:1009 (16 × 16) exportado do Figma. */
const DOWNLOAD_PATH =
  "M15.2 9.6C14.9878 9.6 14.7843 9.68429 14.6343 9.83431C14.4843 9.98434 14.4 10.1878 14.4 10.4V13.6C14.4 13.8122 14.3157 14.0157 14.1657 14.1657C14.0157 14.3157 13.8122 14.4 13.6 14.4H2.4C2.18783 14.4 1.98434 14.3157 1.83431 14.1657C1.68429 14.0157 1.6 13.8122 1.6 13.6V10.4C1.6 10.1878 1.51571 9.98434 1.36569 9.83431C1.21566 9.68429 1.01217 9.6 0.8 9.6C0.587827 9.6 0.384344 9.68429 0.234315 9.83431C0.0842854 9.98434 0 10.1878 0 10.4V13.6C0 14.2365 0.252856 14.847 0.702944 15.2971C1.15303 15.7471 1.76348 16 2.4 16H13.6C14.2365 16 14.847 15.7471 15.2971 15.2971C15.7471 14.847 16 14.2365 16 13.6V10.4C16 10.1878 15.9157 9.98434 15.7657 9.83431C15.6157 9.68429 15.4122 9.6 15.2 9.6ZM7.432 10.968C7.50808 11.0408 7.5978 11.0979 7.696 11.136C7.79176 11.1783 7.8953 11.2002 8 11.2002C8.1047 11.2002 8.20824 11.1783 8.304 11.136C8.4022 11.0979 8.49192 11.0408 8.568 10.968L11.768 7.768C11.9186 7.61736 12.0033 7.41304 12.0033 7.2C12.0033 6.98696 11.9186 6.78264 11.768 6.632C11.6174 6.48136 11.413 6.39673 11.2 6.39673C10.987 6.39673 10.7826 6.48136 10.632 6.632L8.8 8.472V0.8C8.8 0.587827 8.71571 0.384344 8.56569 0.234315C8.41566 0.0842854 8.21217 0 8 0C7.78783 0 7.58434 0.0842854 7.43431 0.234315C7.28429 0.384344 7.2 0.587827 7.2 0.8V8.472L5.368 6.632C5.29341 6.55741 5.20486 6.49824 5.1074 6.45787C5.00994 6.4175 4.90549 6.39673 4.8 6.39673C4.69451 6.39673 4.59006 6.4175 4.4926 6.45787C4.39514 6.49824 4.30659 6.55741 4.232 6.632C4.15741 6.70659 4.09824 6.79514 4.05787 6.8926C4.0175 6.99006 3.99673 7.09451 3.99673 7.2C3.99673 7.30549 4.0175 7.40994 4.05787 7.5074C4.09824 7.60486 4.15741 7.69341 4.232 7.768L7.432 10.968Z";

function DownloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path d={DOWNLOAD_PATH} fill="currentColor" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      // A navbar é sticky mas ocupa 65px no fluxo (64 + 1px de borda). Só com
      // `min-h-screen` a seção somaria 100vh a esses 65px: apareceria rolagem e
      // o indicador cairia abaixo da dobra. Com `-mt-[65px]` a seção sobe para
      // o topo real da viewport — a navbar é transparente ali — e aí os 100vh
      // batem com a primeira tela: o conteúdo centra no centro da viewport, não
      // no da área abaixo da navbar, e o total da página fecha em 100vh.
      className="relative -mt-[65px] flex min-h-screen flex-col items-center justify-center px-6 font-poppins"
    >
      <FadeInUp className="flex w-full max-w-[643px] flex-col items-center text-center">
        {/* leading-[63.357px] é o que produz as caixas de 64px do design */}
        <p className="bg-linear-to-r/srgb from-[#00c8ef] to-[#8e06f3] bg-clip-text text-[40px] font-semibold leading-[1.1] text-transparent md:text-[70px] md:leading-[63.357px]">
          Hello, i&rsquo;m
        </p>

        <h1 className="mt-[34px] text-[44px] font-bold leading-[1.1] text-white md:text-[80px] md:leading-[63.357px]">
          Júlia Ventura
        </h1>

        <p className="mt-[33px] text-[15px] font-normal leading-[20px] text-[#8e97a4] md:text-[17px]">
          Estudante de Engenharia de Software focada em Análise de Dados,
          Business Intelligence e Data Engineering
        </p>

        <div className="mt-[43px] flex flex-wrap items-center justify-center gap-[17px]">
          <CtaButton
            href="#sobre-mim"
            className="inline-flex h-[51px] items-center justify-center gap-[6px] rounded-[35px] bg-linear-to-r/srgb from-[#4d62fd] to-[#8d08f4] px-[33px] text-[15px] font-medium leading-[20px] text-[#f8fbfe] shadow-lg shadow-[#8d08f4]/50 transition-shadow hover:shadow-[#8d08f4]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Descubra mais
            <ArrowIcon />
          </CtaButton>

          <CtaButton
            href="/curriculo-julia-ventura.pdf"
            download
            className="inline-flex h-[51px] items-center justify-center gap-[4px] rounded-[35px] border-[0.5px] border-white/30 bg-white/[0.08] px-[28px] text-[15px] font-medium leading-[20px] text-[#f8fbfe] transition-colors hover:bg-white/[0.14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Download CV
            <DownloadIcon />
          </CtaButton>
        </div>
      </FadeInUp>

      {/* Fora do fluxo: dentro dele, o indicador entraria na conta do
          justify-center e empurraria o bloco de conteúdo para cima. */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
