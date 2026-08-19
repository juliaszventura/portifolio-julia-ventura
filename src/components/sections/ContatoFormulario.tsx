"use client";

import { useState, type FormEvent } from "react";
import { SendIcon } from "@/components/ui/ContatoIcons";

const CAMPO_CLASSNAME =
  "w-full rounded-[10px] border border-[#303030] bg-[#191919] text-[12px] " +
  "leading-[20px] text-white placeholder:text-[#5f6776] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const ROTULO_CLASSNAME = "block text-[12px] leading-[20px] text-[#cacfd6]";

export default function ContatoFormulario() {
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: ligar no serviço de e-mail quando escolhermos qual.
    setEnviado(true);
  }

  return (
    <form
      noValidate={false}
      onSubmit={handleSubmit}
      className="rounded-[24px] border border-[#1e1e1e] bg-[rgb(9_9_9/0.3)] px-[27px] pb-[28px] pt-[20px]"
    >
      <label className={ROTULO_CLASSNAME} htmlFor="contato-nome">
        Nome
      </label>
      <input
        id="contato-nome"
        name="nome"
        type="text"
        required
        placeholder="Júlia"
        className={`${CAMPO_CLASSNAME} mt-[5px] h-[41px] px-[23px]`}
      />

      <label className={`${ROTULO_CLASSNAME} mt-[19px]`} htmlFor="contato-email">
        Email
      </label>
      <input
        id="contato-email"
        name="email"
        type="email"
        required
        placeholder="julia@exemplo.com.br"
        className={`${CAMPO_CLASSNAME} mt-[5px] h-[41px] px-[23px]`}
      />

      <label
        className={`${ROTULO_CLASSNAME} mt-[19px]`}
        htmlFor="contato-mensagem"
      >
        Mensagem
      </label>
      <textarea
        id="contato-mensagem"
        name="mensagem"
        required
        rows={5}
        placeholder="Me conte sobre o seu projeto..."
        className={`${CAMPO_CLASSNAME} mt-[5px] block h-[118px] resize-none px-[18px] py-[11px]`}
      />

      <button
        type="submit"
        className="mt-[19px] flex h-[45px] w-full items-center justify-center gap-[4px] rounded-[10px] bg-linear-to-r/srgb from-[#00add4] to-[#9001f3] text-[12px] font-semibold leading-[20px] text-white shadow-[0px_4px_10px_0px_rgb(233_233_233/0.25)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Enviar Mensagem
        <SendIcon />
      </button>

      {enviado && (
        <p
          role="status"
          className="mt-[12px] text-center text-[12px] leading-[20px] text-[#8e97a4]"
        >
          Envio ainda não conectado a um serviço de e-mail.
        </p>
      )}
    </form>
  );
}
