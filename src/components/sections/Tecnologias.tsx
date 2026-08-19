import FadeInUp from "@/components/ui/FadeInUp";
import { TECHNOLOGIES, TechIcon } from "@/components/ui/TechIcon";

export default function Tecnologias() {
  return (
    <section id="tecnologias" className="px-6 pb-16 md:pb-24">
      <FadeInUp className="mx-auto w-full max-w-[940px]">
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
