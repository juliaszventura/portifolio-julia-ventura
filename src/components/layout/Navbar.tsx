"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import CtaButton from "@/components/ui/CtaButton";

const NAV_HEIGHT = 64;
const CONTAINER_MAX_WIDTH = "max-w-[1033px]";

const SCROLL_THRESHOLD = 50;

type NavSection = {
  id: string;
  label: string;
};

const SECTIONS: NavSection[] = [
  { id: "home", label: "Home" },
  { id: "sobre-mim", label: "Sobre mim" },
  { id: "projetos", label: "Projetos" },
  { id: "experiencias", label: "Experiências" },
];

const CONTACT_SECTION: NavSection = { id: "contato", label: "Contato" };

const CTA_CLASSNAME =
  "h-[33px] items-center justify-center rounded-[16px] bg-linear-to-r/srgb " +
  "from-cta-start to-cta-end px-[29px] text-[13px] font-bold leading-none " +
  "text-white shadow-lg shadow-cta-end/50 transition-shadow hover:shadow-cta-end/80 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const HAMBURGER_BAR_CLASSNAME =
  "absolute left-0 h-[2px] w-full rounded-full bg-white transition-all duration-200";

/** Mesmo gradiente do botão Contato: linear-gradient(90deg, #4B63FD 0%, #8F05F4 100%). */
const UNDERLINE_CLASSNAME =
  "pointer-events-none absolute -bottom-[6px] left-0 h-[2px] w-0 rounded-full " +
  "bg-linear-to-r/srgb from-cta-start to-cta-end transition-all duration-300 " +
  "group-hover:w-full group-focus-visible:w-full";

export default function Navbar() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const elements = [...SECTIONS, CONTACT_SECTION]
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [firstVisible] = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (firstVisible) setActiveId(firstVisible.target.id);
      },
      { rootMargin: `-${NAV_HEIGHT}px 0px -55% 0px` },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const handleBreakpointChange = () => {
      if (desktopQuery.matches) setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    desktopQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, [isMenuOpen]);

  const handleNavigate = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      const target = document.getElementById(id);

      if (!target) return;

      event.preventDefault();
      setIsMenuOpen(false);
      setActiveId(id);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      window.history.replaceState(null, "", `#${id}`);
    },
    [],
  );

  const renderSectionLink = (section: NavSection) => {
    const isActive = activeId === section.id;

    return (
      <li key={section.id}>
        <a
          href={`#${section.id}`}
          onClick={(event) => handleNavigate(event, section.id)}
          aria-current={isActive ? "true" : undefined}
          className={`group relative inline-block bg-linear-to-r/srgb from-cta-start to-cta-end bg-clip-text text-[13px] leading-none text-white transition-all duration-300 hover:text-transparent focus-visible:text-transparent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
            isActive
              ? "font-extrabold"
              : "font-normal hover:font-bold focus-visible:font-bold"
          }`}
        >
          {section.label}
          <span aria-hidden="true" className={UNDERLINE_CLASSNAME} />
        </a>
      </li>
    );
  };

  const hasSurface = isScrolled || isMenuOpen;

  return (
    <motion.header
      initial={{ y: shouldReduceMotion ? 0 : -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 w-full border-b font-jakarta transition-[background-color,backdrop-filter,border-color] duration-300 ${
        hasSurface
          ? "border-nav-line bg-nav-surface/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex h-16 w-full items-center px-6 ${CONTAINER_MAX_WIDTH}`}
      >
        <a
          href={`#${SECTIONS[0].id}`}
          onClick={(event) => handleNavigate(event, SECTIONS[0].id)}
          aria-label="JV — ir para o início"
          className="text-[24px] font-extrabold leading-none text-brand text-shadow-logo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          JV
        </a>

        <nav
          aria-label="Navegação principal"
          className="ml-auto hidden items-center md:flex"
        >
          <ul className="flex items-center gap-[35px]">
            {SECTIONS.map(renderSectionLink)}
          </ul>

          <CtaButton
            href={`#${CONTACT_SECTION.id}`}
            onClick={(event) => handleNavigate(event, CONTACT_SECTION.id)}
            className={`ml-[22px] inline-flex ${CTA_CLASSNAME}`}
          >
            {CONTACT_SECTION.label}
          </CtaButton>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="menu-mobile"
          className="ml-auto flex h-[33px] w-[33px] items-center justify-center md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span className="relative block h-[14px] w-[20px]">
            <span
              className={`${HAMBURGER_BAR_CLASSNAME} ${
                isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`${HAMBURGER_BAR_CLASSNAME} top-1/2 -translate-y-1/2 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`${HAMBURGER_BAR_CLASSNAME} ${
                isMenuOpen
                  ? "top-1/2 -translate-y-1/2 -rotate-45"
                  : "top-full -translate-y-full"
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            id="menu-mobile"
            key="menu-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
          >
            <nav
              aria-label="Navegação principal"
              className={`mx-auto w-full border-t border-nav-line px-6 py-[22px] ${CONTAINER_MAX_WIDTH}`}
            >
              <ul className="flex flex-col gap-[22px]">
                {SECTIONS.map(renderSectionLink)}
              </ul>

              <CtaButton
                href={`#${CONTACT_SECTION.id}`}
                onClick={(event) => handleNavigate(event, CONTACT_SECTION.id)}
                className={`mt-[22px] flex w-full ${CTA_CLASSNAME}`}
              >
                {CONTACT_SECTION.label}
              </CtaButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
