import type { ProjectIconName } from "@/components/ui/ProjectIcon";

export type Tecnologia = {
  nome: string;
  cor: string;
};

export type Projeto = {
  slug: string;
  nome: string;
  descricao: string;
  descricaoLonga?: string;
  ano: string | null;
  icone: ProjectIconName;
  gradiente: { de: string; para: string };
  gradienteTitulo: { de: string; para: string };
  tecnologias: Tecnologia[];
  repositorio: string | null;
  imagens: string[];
};

const PLACEHOLDER = "/images/projeto-placeholder.png";
const CARROSSEL_PROVISORIO = [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER];

export const PROJETOS: Projeto[] = [
  {
    slug: "psiplus",
    nome: "PsiPlus",
    descricao:
      "Sistema acadêmico desenvolvido para apoiar processos ligados à Psicologia, com foco em organização de dados e gestão de informações da aplicação.",
    ano: null,
    icone: "psiplus",
    gradiente: { de: "#aa39f0", para: "#e00e79" },
    gradienteTitulo: { de: "#aa39f0", para: "#e00e79" },
    tecnologias: [],
    repositorio: null,
    imagens: CARROSSEL_PROVISORIO,
  },
  {
    slug: "real-consult",
    nome: "Real Consult",
    descricao:
      "Plataforma de consulta e gestão de dados desenvolvida para a empresa VTReal, com foco em organização, extração e integridade de informações.",
    descricaoLonga:
      "Plataforma web desenvolvida na disciplina de Trabalho Interdisciplinar 3, para a VT Real, referência nacional em auditoria e certificação de vale-transporte. Centraliza toda a operação financeira, analítica e gerencial da empresa: automatiza o cálculo de economia gerada para os clientes, consolida faturamento e consumo, e oferece dashboards dinâmicos com métricas em tempo real, exportáveis em PDF e Excel — substituindo processos manuais e fragmentados por uma visão única e confiável dos dados.",
    ano: "2025",
    icone: "realconsult",
    gradiente: { de: "#00a7d6", para: "#005bf2" },
    gradienteTitulo: { de: "#01a4d7", para: "#005cf2" },
    tecnologias: [
      { nome: "Next.js", cor: "#008da8" },
      { nome: "Tailwind CSS", cor: "#8f02f3" },
      { nome: "Chart.js/Recharts", cor: "#4b63fd" },
      { nome: "Axios", cor: "#00be5c" },
      { nome: "Java", cor: "#4b63fd" },
      { nome: "Spring Boot", cor: "#00c8ef" },
      { nome: "MySQL", cor: "#e00e79" },
      { nome: "JWT", cor: "#ffe62e" },
      { nome: "Git", cor: "#ff8660" },
    ],
    repositorio: null,
    imagens: CARROSSEL_PROVISORIO,
  },
  {
    slug: "marau-hospedagens",
    nome: "Maraú Hospedagens",
    descricao:
      "Plataforma full-stack de hospedagens desenvolvida em equipe, onde usuários podem buscar, visualizar e reservar acomodações de forma simples e intuitiva.",
    ano: null,
    icone: "marau",
    gradiente: { de: "#386bff", para: "#8a1cf4" },
    gradienteTitulo: { de: "#386bff", para: "#8a1cf4" },
    tecnologias: [],
    repositorio: null,
    imagens: CARROSSEL_PROVISORIO,
  },
];

export function buscarProjeto(slug: string) {
  return PROJETOS.find((projeto) => projeto.slug === slug);
}
