import FadeInUp from "@/components/ui/FadeInUp";
import { TECHNOLOGIES, TechIcon } from "@/components/ui/TechIcon";

/**
 * Tecnologias — frame "Tecnologias" (node 37:615, 940 × 100).
 *
 * Sete cards de 100 × 100 a cada 140px, ou seja, 40 de intervalo. A conta
 * fecha exata na largura do frame: 7 × 100 + 6 × 40 = 940.
 *
 * Medidas confirmadas no metadata:
 *   card ....... 100 × 100, raio 13, fundo branco 8%, borda 0,5px branco 30%
 *   ícones ..... cor #898a8c, todos centrados no card
 *                React 53 × 47 · Tailwind CSS 59 × 35 · MySQL 46 × 45
 *                Next.js, TypeScript, Python e Three.js 44 × 44
 *
 * O fundo e a borda são os mesmos do botão secundário do Hero — no Figma os
 * dois vieram do mesmo par de valores.
 */
export default function Tecnologias() {
  return (
    // Sem padding no topo de propósito: no Figma a fileira começa 97px abaixo
    // do card de Sobre Mim, que é praticamente o que os 96px do `md:py-24`
    // daquela seção já entregam. Um `pt` aqui empilharia em cima disso.
    <section id="tecnologias" className="px-6 pb-16 md:pb-24">
      <FadeInUp className="mx-auto w-full max-w-[940px]">
        {/* Abaixo de 940px + padding a fileira quebra em linhas em vez de
            encolher os cards, para os 100 × 100 do design se manterem. */}
        <ul
          aria-label="Tecnologias que uso"
          className="flex flex-wrap items-center justify-center gap-10"
        >
          {TECHNOLOGIES.map((technology) => (
            <li
              key={technology.name}
              className="flex size-[100px] shrink-0 items-center justify-center rounded-[13px] border-[0.5px] border-white/30 bg-white/[0.08] text-[#898a8c]"
            >
              <TechIcon technology={technology} className="shrink-0" />
            </li>
          ))}
        </ul>
      </FadeInUp>
    </section>
  );
}
