import ProjectCard from "@/components/sections/ProjectCard";
import FadeInUp from "@/components/ui/FadeInUp";
import { PROJETOS } from "@/data/projetos";

const TITULO_GRADIENTE =
  "linear-gradient(to right, #00c8ef 56.731%, #0f51f5 100%)";

export default function Projetos() {
  return (
    <section
      id="projetos"
      className="px-6 pb-16 pt-[38px] font-poppins md:pb-24"
    >
      <FadeInUp className="mx-auto w-full max-w-[979px]">
        <h2 className="text-center text-[32px] font-extrabold leading-[1.2] text-white md:text-[40px] md:leading-[63.357px]">
          Explore meus{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: TITULO_GRADIENTE }}
          >
            Projetos
          </span>
        </h2>

        <p className="mt-[10px] text-center text-[15px] font-normal leading-[20px] text-[#8e97a4]">
          Uma seleção dos projetos que desenvolvi ao longo da graduação.
          <br />
          <span className="font-medium text-white">Clique nos cards</span> para
          descobrir detalhes.
        </p>

        <ul className="mt-[55px] grid grid-cols-1 gap-[17px] sm:grid-cols-2 lg:grid-cols-3">
          {PROJETOS.map((projeto) => (
            <li key={projeto.slug} className="flex">
              <ProjectCard projeto={projeto} />
            </li>
          ))}
        </ul>
      </FadeInUp>
    </section>
  );
}
