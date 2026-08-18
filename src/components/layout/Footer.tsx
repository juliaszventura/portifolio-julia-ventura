import RevealOnScroll from "@/components/ui/RevealOnScroll";

/**
 * Footer — frame "Footer" (node 23:580, 1023 × 40).
 *
 * O frame tem exatamente duas coisas: um traço de 1px #191919 no topo e o
 * texto de copyright centrado 20px abaixo dele, em Poppins Regular 12px /
 * leading 20, #5f6776.
 *
 * NÃO há ícones ou links sociais no rodapé do design — eles só aparecem no
 * card "Me siga nas redes sociais" da seção Contato. Se a ideia for repetir
 * os dois aqui, dá para reusar o RedeSocial de Contato.tsx.
 */
export default function Footer() {
  return (
    <footer className="px-6 pb-[20px]">
      <div className="mx-auto w-full max-w-[1023px] border-t border-[#191919] pt-[20px]">
        <RevealOnScroll>
          <p className="text-center text-[12px] font-normal leading-[20px] text-[#5f6776]">
            2026 | Developed by Júlia de Souza Ventura
          </p>
        </RevealOnScroll>
      </div>
    </footer>
  );
}
