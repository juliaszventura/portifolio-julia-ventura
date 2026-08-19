import ExperienciaItem from "@/components/sections/ExperienciaItem";
import { EXPERIENCIAS } from "@/data/experiencias";

const TITULO_GRADIENTE =
  "linear-gradient(to right, #4992ff 37.981%, #9000f3 100%)";

export default function Experiencias() {
  return (
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

        <p className="mt-[10px] text-center text-[15px] font-normal leading-[20px] text-[#8e97a4]">
          Estágios e experiências que somaram para minha formação técnica e
          profissional.
        </p>

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
