import ProjectCard from "@/components/sections/ProjectCard";
import FadeInUp from "@/components/ui/FadeInUp";
import { PROJETOS } from "@/data/projetos";

/**
 * Projetos — frame "Projetos" (node 45:853, 979 × 728).
 *
 * As setinhas do design NÃO são navegação da seção: o frame 45:853 põe
 * quatro elipses por cima do componente 45:852, que já trazia duas, dando
 * uma por card, sempre no canto inferior direito. São o afford de "abrir o
 * projeto", combinando com o subtítulo "Clique nos cards para descobrir
 * detalhes" — não há carrossel nem paginação no arquivo.
 *
 * Os cards apontam para /projetos/<slug>, a página desenhada no frame
 * "Página do Projeto" (37:618). ESSA ROTA AINDA NÃO EXISTE: até alguém criar
 * src/app/projetos/[slug]/page.tsx, clicar num card cai em 404.
 *
 * Medidas confirmadas no metadata:
 *   título ....... Poppins ExtraBold 40px / leading 63,357, "Projetos" em gradiente
 *   subtítulo .... Poppins Regular 15px / leading 20, #8e97a4, 10px abaixo do título
 *   grade ........ 3 × 315 com 17 de intervalo (3 × 315 + 2 × 17 = 979), 55px abaixo do subtítulo
 *   card ......... 315 × 269, raio 24, fundo #090909 a 30%, borda 1px #1e1e1e
 *   quadrado ..... 52 × 52, raio 12, gradiente 135,64° de 5,28% a 91,83%
 *   nome ......... Poppins SemiBold 19px, branco
 *   descrição .... Poppins Regular 12px / leading 15, #8e97a4, 266 de largura
 *   setinha ...... círculo 30 de #1e1e1e, seta 13 em #8e97a4, a 20 da direita e 19 do fundo
 */

/** Gradiente do "Projetos" do título: #00c8ef até 56,731%, daí para #0f51f5. */
const TITULO_GRADIENTE =
  "linear-gradient(to right, #00c8ef 56.731%, #0f51f5 100%)";

export default function Projetos() {
  return (
    // O Figma pede 134px entre a fileira de Tecnologias e esta seção; os 96
    // do `md:pb-24` de lá mais estes 38 fecham a conta.
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
