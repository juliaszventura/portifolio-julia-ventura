/**
 * Experiências da seção "Conheça minha Trajetória" (frame 19:463).
 *
 * Ordem, cargos, empresas, períodos e descrições vieram do Figma, palavra por
 * palavra. Para adicionar uma experiência basta somar um objeto: a linha do
 * tempo, os pontos e o atraso progressivo da animação saem da lista.
 */
export type Experiencia = {
  /** Identidade estável; também serve de key na lista. */
  slug: string;
  cargo: string;
  empresa: string;
  periodo: string;
  descricao: string;
};

export const EXPERIENCIAS: Experiencia[] = [
  {
    slug: "vtreal",
    cargo: "Estágio em Banco de Dados e QA",
    empresa: "VTReal",
    periodo: "Novembro/2025 - Julho/2026",
    descricao:
      "Atualização e manutenção de bancos de dados, execução de consultas SQL e automação em Python para coleta e análise de dados, garantindo organização e integridade das informações. Apoio em testes de qualidade (QA) e documentação de resultados.",
  },
  {
    slug: "teknisa",
    cargo: "Estágio em Suporte Retail",
    empresa: "Teknisa",
    periodo: "Junho/2025 - Outubro/2026",
    descricao:
      "Atendimento a clientes via chat, e-mail e telefone, com suporte para esclarecimento de dúvidas e resolução de problemas, incluindo registro e tramitação de solicitações no sistema interno da Teknisa. Apoio em consultas na base SQL e participação em treinamentos sobre os produtos da empresa.",
  },
  {
    slug: "trigma",
    cargo: "Estágio em Testes de Software e Design de Websites",
    empresa: "Trigma Inc",
    periodo: "Julho/2021 - Dezembro/2022",
    descricao:
      "Realização de testes manuais nos softwares desenvolvidos pela empresa, identificando e documentando erros para a equipe de desenvolvimento. Além disso, contribuía no design de Websites e Landing Pages, focando na usabilidade e na experiência do usuário",
  },
];
