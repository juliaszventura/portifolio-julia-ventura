import Footer from "@/components/layout/Footer";
import Contato from "@/components/sections/Contato";
import Experiencias from "@/components/sections/Experiencias";
import Hero from "@/components/sections/Hero";
import SobreMim from "@/components/sections/SobreMim";
import Projetos from "@/components/sections/Projetos";
import Tecnologias from "@/components/sections/Tecnologias";

export default function Home() {
  return (
    // O rodapé fica fora do <main>: é conteúdo da página, mas não do
    // conteúdo principal dela.
    <>
      <main>
        <Hero />
        <SobreMim />
        <Tecnologias />
        <Projetos />
        <Experiencias />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
