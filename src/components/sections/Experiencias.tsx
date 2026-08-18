import ExperienciaItem from "@/components/sections/ExperienciaItem";
import { EXPERIENCIAS } from "@/data/experiencias";

/**
 * Experiências — frame "Experiencias" (node 19:463, 825 × 644).
 *
 * Medidas confirmadas no metadata:
 *   título ....... Poppins ExtraBold 40px / leading 63,357, "Trajetória" em gradiente
 *   subtítulo .... Poppins Regular 15px / leading 20, #8e97a4, centrado (ver nota no <p>)
 *   lista ........ 55px abaixo do subtítulo (ver nota no <ol>)
 *   item ......... 110 de altura (cargo, empresa/período em +25, descrição em +50)
 *   intervalo .... 59 entre itens — os pontos ficam a cada 169 no design
 *   linha ........ 1px #2b2b2b passando pelo centro dos pontos, em x = 8,5
 *
 * Sem FadeInUp aqui: o `animate` dele dispara na montagem, e esta seção só
 * aparece bem abaixo da dobra. A entrada de cada item vem de `whileInView`,
 * em ExperienciaItem.
 */

/** Gradiente do "Trajetória": #4992ff até 37,981%, daí para #9000f3. */
const TITULO_GRADIENTE =
  "linear-gradient(to right, #4992ff 37.981%, #9000f3 100%)";

export default function Experiencias() {
  return (
    // O Figma pede 102px entre o fim de Projetos e esta seção; os 96 do
    // `md:pb-24` de lá mais estes 6 fecham a conta.
    <section
      id="experiencias"
      className="px-6 pb-16 pt-[6px] font-poppins md:pb-24"
    >
      <div className="mx-auto w-full max-w-[825px]">
        <h2 className="text-center text-[32px] font-extrabold leading-[1.2] text-white md:text-[40px] md:leading-[63.357px]">
          Conheça minha{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: TITULO_GRADIENTE }}
          >
            Trajetória
          </span>
        </h2>

        {/* No Figma este vão é ~20px (título até 63,36, subtítulo em 83), mas
            o frame de Projetos usa 10 no mesmo par título/subtítulo. Vale o
            10 para os dois cabeçalhos ficarem idênticos. */}
        <p className="mt-[10px] text-center text-[15px] font-normal leading-[20px] text-[#8e97a4]">
          Estágios e experiências que somaram para minha formação técnica e
          profissional.
        </p>

        {/* O Figma pede 96px aqui, que abriam um vazio grande demais antes da
            timeline. Estes 55 são a mesma distância que o arquivo usa entre o
            subtítulo e os cards no frame de Projetos (114 → 169): encolhe o
            vão e ainda deixa as duas seções no mesmo ritmo. */}
        <ol className="mt-[55px] space-y-[59px]">
          {EXPERIENCIAS.map((experiencia, index) => (
            <ExperienciaItem
              key={experiencia.slug}
              experiencia={experiencia}
              index={index}
              ultimo={index === EXPERIENCIAS.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
