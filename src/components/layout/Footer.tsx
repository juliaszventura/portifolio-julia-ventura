import RevealOnScroll from "@/components/ui/RevealOnScroll";

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
