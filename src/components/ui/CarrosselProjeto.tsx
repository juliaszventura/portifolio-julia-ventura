"use client";

import Image from "next/image";
import { useState } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";

export default function CarrosselProjeto({
  imagens,
  nomeDoProjeto,
}: {
  imagens: string[];
  nomeDoProjeto: string;
}) {
  const [atual, setAtual] = useState(0);
  const total = imagens.length;
  const irPara = (indice: number) => setAtual((indice + total) % total);

  return (
    <div>
      <div className="relative aspect-[2556/1352] w-full overflow-hidden rounded-[20px] border-2 border-[#1e1e1e]">
        <Image
          src={imagens[atual]}
          alt={`${nomeDoProjeto} — imagem ${atual + 1} de ${total}`}
          fill
          sizes="(max-width: 1024px) 100vw, 557px"
          className="object-cover"
          priority
        />
      </div>

      {total > 1 && (
        <div className="mt-[18px] flex items-center gap-[14px]">
          <BotaoDeSeta
            aoClicar={() => irPara(atual - 1)}
            rotulo="Imagem anterior"
            paraTras
          />

          <ul className="flex min-w-0 flex-1 gap-[7px]">
            {imagens.map((imagem, indice) => (
              <li key={`${imagem}-${indice}`} className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => setAtual(indice)}
                  aria-label={`Ver imagem ${indice + 1} de ${total}`}
                  aria-current={indice === atual}
                  className={`relative block h-[84px] w-full overflow-hidden rounded-[20px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    indice === atual
                      ? "border-[3px] border-[#4d60fd]"
                      : "border-[3px] border-transparent"
                  }`}
                >
                  <Image
                    src={imagem}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>

          <BotaoDeSeta
            aoClicar={() => irPara(atual + 1)}
            rotulo="Próxima imagem"
          />
        </div>
      )}
    </div>
  );
}

function BotaoDeSeta({
  aoClicar,
  rotulo,
  paraTras = false,
}: {
  aoClicar: () => void;
  rotulo: string;
  paraTras?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={aoClicar}
      aria-label={rotulo}
      className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-[#1e1e1e] text-[#8e97a4] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <ArrowIcon className={paraTras ? "rotate-180" : undefined} />
    </button>
  );
}
