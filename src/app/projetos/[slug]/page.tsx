import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import ArrowIcon from "@/components/ui/ArrowIcon";
import CarrosselProjeto from "@/components/ui/CarrosselProjeto";
import GithubFilledIcon from "@/components/ui/GithubFilledIcon";
import { PROJETOS, buscarProjeto } from "@/data/projetos";

export function generateStaticParams() {
  return PROJETOS.map((projeto) => ({ slug: projeto.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const projeto = buscarProjeto(slug);

  if (!projeto) return {};

  return {
    title: `${projeto.nome} | Júlia Ventura`,
    description: projeto.descricao,
  };
}

export default async function PaginaDoProjeto({
  params,
}: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const projeto = buscarProjeto(slug);

  if (!projeto) notFound();

  const gradienteDoTitulo = `linear-gradient(to right, ${projeto.gradienteTitulo.de}, ${projeto.gradienteTitulo.para})`;

  return (
    <>
      <main className="px-6 pb-16 pt-[41px] font-poppins md:pb-24">
        <div className="mx-auto w-full max-w-[1059px]">
          <Link
            href="/#projetos"
            className="inline-flex items-center gap-[6px] text-[13px] font-normal leading-[20px] text-[#8e97a4] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:ml-[19px]"
          >
            <ArrowIcon className="rotate-180" />
            Voltar para projetos
          </Link>

          <div className="mt-[26px] grid grid-cols-1 gap-[40px] lg:mt-[26px] lg:grid-cols-[481px_557px] lg:gap-[21px]">
            <div className="lg:px-[28px] lg:pt-[24px]">
              {projeto.ano && (
                <p className="text-[13px] font-normal leading-[20px] text-[#8e97a4]">
                  {projeto.ano}
                </p>
              )}

              <h1
                className={`bg-clip-text text-[32px] font-bold leading-none text-transparent md:text-[40px] ${projeto.ano ? "mt-[8px]" : ""}`}
                style={{ backgroundImage: gradienteDoTitulo }}
              >
                {projeto.nome}
              </h1>

              <p className="mt-[20px] text-justify text-[13px] font-normal leading-[15px] text-[#8e97a4]">
                {projeto.descricaoLonga ?? projeto.descricao}
              </p>

              {projeto.tecnologias.length > 0 && (
                <>
                  <h2 className="mt-[26px] text-[13px] font-semibold leading-[15px] text-white">
                    Tecnologias utilizadas
                  </h2>
                  <ul className="mt-[17px] flex flex-wrap gap-[6px]">
                    {projeto.tecnologias.map((tecnologia) => (
                      <li
                        key={tecnologia.nome}
                        className="rounded-[8px] border-[0.5px] border-white/30 bg-white/[0.08] px-[12px] py-[8px] text-[13px] font-medium leading-[15px]"
                        style={{ color: tecnologia.cor }}
                      >
                        {tecnologia.nome}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {projeto.repositorio && (
                <a
                  href={projeto.repositorio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-[54px] inline-flex h-[51px] items-center gap-[6px] rounded-[20px] bg-linear-to-r/srgb from-[#01a2d7] to-[#0063f0] pl-[21px] pr-[18px] text-[13px] font-normal leading-[15px] text-white shadow-[0px_3px_20px_-5px_#7a7a7a] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <GithubFilledIcon className="shrink-0" />
                  Ver repositório no GitHub
                  <ArrowIcon className="shrink-0 -rotate-[38.16deg] transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                </a>
              )}
            </div>

            <CarrosselProjeto
              imagens={projeto.imagens}
              nomeDoProjeto={projeto.nome}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
