import Hero from "@/components/sections/Hero";
import SobreMim from "@/components/sections/SobreMim";
import Projetos from "@/components/sections/Projetos";
import Tecnologias from "@/components/sections/Tecnologias";

export default function Home() {
  return (
    <main>
      <Hero />
      <SobreMim />
      <Tecnologias />
      <Projetos />
      {/* demais seções virão aqui */}
    </main>
  );
}
