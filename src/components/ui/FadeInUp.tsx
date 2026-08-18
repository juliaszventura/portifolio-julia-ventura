"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Animação de entrada: sobe e revela.
 *
 * Existe como componente separado para receber `children` já renderizados pelo
 * servidor. Marcar a seção inteira como `"use client"` mandaria o conteúdo
 * acima da dobra para o bundle do cliente sem necessidade; passando por
 * children, só este invólucro é client.
 */
export default function FadeInUp({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
