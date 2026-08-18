/**
 * Canais de contato e redes sociais.
 *
 * `email` e `whatsapp` são os textos do frame Contato (23:579), copiados do
 * Figma — repare que o e-mail do design difere do que aparece em outros
 * lugares, então vale conferir qual é o certo.
 *
 * Os endereços de LinkedIn e GitHub não estão no design; vieram do que já
 * usávamos na seção Sobre Mim, e ficam aqui para os dois lugares não
 * divergirem.
 */
export const CONTATO = {
  email: "juliavt403@gmail.com",
  whatsapp: "+55 (31) 99975-6732",
  /** Só os dígitos, no formato que o wa.me espera. */
  whatsappHref: "https://wa.me/5531999756732",
  linkedin: "https://www.linkedin.com/in/juliadesouzaventura/",
  github: "https://github.com/juliaszventura",
} as const;
