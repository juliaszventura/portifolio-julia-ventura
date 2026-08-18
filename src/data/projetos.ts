import type { ProjectIconName } from "@/components/ui/ProjectIcon";

/**
 * Projetos da seção "Explore meus Projetos" (frame 45:853).
 *
 * Para adicionar um projeto, basta somar um objeto a `PROJETOS` — a grade,
 * a quebra de linha e as setinhas saem da lista. O design tem mais três
 * cards "Futuro Projeto" que ainda não entram aqui de propósito: são
 * placeholders, não projetos.
 *
 * Textos e cores conferidos no Figma, sem paráfrase.
 */
export type Projeto = {
  /** Identidade estável do projeto; também serve de key na lista. */
  slug: string;
  nome: string;
  descricao: string;
  icone: ProjectIconName;
  /**
   * Extremos do gradiente do quadrado do ícone. O ângulo e as paradas são
   * iguais nos três cards e vivem no componente.
   */
  gradiente: { de: string; para: string };
  /**
   * Destino do card. Hoje é sempre a página interna do projeto, desenhada no
   * frame "Página do Projeto" (37:618) — que ainda precisa virar rota. Fica
   * como campo, e não derivado do slug, para caber um destino externo se
   * algum projeto pedir. `null` renderiza o card sem link, em vez de link
   * morto.
   */
  href: string | null;
};

export const PROJETOS: Projeto[] = [
  {
    slug: "real-consult",
    nome: "Real Consult",
    descricao:
      "Plataforma de consulta e gestão de dados desenvolvida para a empresa VTReal, com foco em organização, extração e integridade de informações.",
    icone: "realconsult",
    gradiente: { de: "#00a7d6", para: "#005bf2" },
    href: "/projetos/real-consult",
  },
  {
    slug: "marau-hospedagens",
    nome: "Maraú Hospedagens",
    descricao:
      "Plataforma full-stack de hospedagens desenvolvida em equipe, onde usuários podem buscar, visualizar e reservar acomodações de forma simples e intuitiva.",
    icone: "marau",
    gradiente: { de: "#386bff", para: "#8a1cf4" },
    href: "/projetos/marau-hospedagens",
  },
  {
    slug: "psiplus",
    nome: "PsiPlus",
    descricao:
      "Sistema acadêmico desenvolvido para apoiar processos ligados à Psicologia, com foco em organização de dados e gestão de informações da aplicação.",
    icone: "psiplus",
    gradiente: { de: "#aa39f0", para: "#e00e79" },
    href: "/projetos/psiplus",
  },
];
