import { useState, useEffect } from "react";
import { useRoute, RoutePath } from "../router";
import { DEPLOY_BASE } from "../deployBase";
import { Content } from "../types/content";
import { ArrowUpRight } from "./Icons";

export function Header({ data }: { data: Content }) {
  const { path, navigate } = useRoute();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Theme determination: Home, Projekte and Kontakt start dark on initial load; Angebote and Über mich start light
  const isDarkInitial = path === "/" || path === "/projekte" || path === "/kontakt";
  const showDarkTheme = isDarkInitial && !hasScrolled;

  const navLinks: { label: string; to: RoutePath }[] = [
    { label: data.meta.navLabelLeistungen || "Angebote", to: "/angebote" },
    { label: data.meta.navLabelProjekte || "Projekte", to: "/projekte" },
    { label: data.meta.navLabelUeberMich || "Über mich", to: "/ueber-mich" },
  ];

  const handleLinkClick = (to: RoutePath) => {
    navigate(to);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-8 z-50 transition-all duration-300 ${
        hasScrolled
          ? "border-b border-[#173530]/10 bg-[#f6f5ef]/95 py-3 shadow-[0_1px_0_0_rgba(18,34,31,0.08)] backdrop-blur-md"
          : isDarkInitial
          ? "bg-transparent py-5"
          : "border-b border-[#173530]/10 bg-[#f6f5ef]/95 py-4 shadow-[0_1px_0_0_rgba(18,34,31,0.06)] backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Brand Logo - single source vector mark from SVG */}
        <button
          type="button"
          onClick={() => handleLinkClick("/")}
          className="group flex items-center transition-opacity hover:opacity-90 focus:outline-none"
          aria-label="Startseite aufrufen"
        >
          <img
            src={`${DEPLOY_BASE}images/logo/${
              showDarkTheme ? "logo-horizontal-on-dark.svg" : "logo-horizontal-on-light.svg"
            }?v=2`}
            alt="Diana Jeske-Siegel"
            width={420}
            height={180}
            className="h-auto w-[180px] object-contain transition-transform group-hover:scale-[1.02] sm:w-[200px]"
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Hauptnavigation">
          {navLinks.map((link) => {
            const isActive = path === link.to;
            return (
              <button
                key={link.to}
                type="button"
                onClick={() => handleLinkClick(link.to)}
                className={`nav-link text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors focus:outline-none ${
                  showDarkTheme
                    ? isActive
                      ? "text-[#e9be5b]"
                      : "text-white/85 hover:text-white"
                    : isActive
                    ? "text-[#c85d35]"
                    : "text-[#173530] hover:text-[#c85d35]"
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {/* Desktop Kontakt CTA Button */}
          <button
            type="button"
            onClick={() => handleLinkClick("/kontakt")}
            className={`group flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-all focus:outline-none ${
              showDarkTheme
                ? path === "/kontakt"
                  ? "text-[#e9be5b]"
                  : "text-white/90 hover:text-[#e9be5b]"
                : path === "/kontakt"
                ? "text-[#c85d35]"
                : "text-[#173530] hover:text-[#c85d35]"
            }`}
          >
            <span>{data.meta.navLabelKontakt || "Kontakt"}</span>
            <ArrowUpRight className="h-4 w-4 text-[#c85d35] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className={`relative z-50 p-2 focus:outline-none lg:hidden ${
            showDarkTheme ? "text-white" : "text-[#173530]"
          }`}
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Menü umschalten</span>
          <div className="relative flex h-5 w-6 flex-col justify-between">
            <span
              className={`h-0.5 w-full transition-all duration-300 ${
                showDarkTheme ? "bg-white" : "bg-[#173530]"
              } ${menuOpen ? "translate-y-2 rotate-45 !bg-[#173530]" : ""}`}
            />
            <span
              className={`h-0.5 w-full transition-all duration-300 ${
                showDarkTheme ? "bg-white" : "bg-[#173530]"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-full transition-all duration-300 ${
                showDarkTheme ? "bg-white" : "bg-[#173530]"
              } ${menuOpen ? "-translate-y-2.5 -rotate-45 !bg-[#173530]" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-[#f6f5ef] px-8 py-20 text-[#173530] transition-all duration-500 lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col gap-6 pt-6">
          <button
            type="button"
            onClick={() => handleLinkClick("/")}
            className={`text-left font-serif text-4xl transition-colors ${
              path === "/" ? "text-[#c85d35]" : "text-[#173530] hover:text-[#c85d35]"
            }`}
          >
            Start
          </button>
          {navLinks.map((link) => {
            const isActive = path === link.to;
            return (
              <button
                key={link.to}
                type="button"
                onClick={() => handleLinkClick(link.to)}
                className={`text-left font-serif text-4xl transition-colors ${
                  isActive ? "text-[#c85d35]" : "text-[#173530] hover:text-[#c85d35]"
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => handleLinkClick("/kontakt")}
            className={`mt-2 text-left font-serif text-4xl transition-colors ${
              path === "/kontakt" ? "text-[#c85d35]" : "text-[#c85d35] hover:opacity-80"
            }`}
          >
            {data.meta.navLabelKontakt || "Kontakt"}
          </button>
        </div>

        <div className="border-t border-[#173530]/15 pt-6">
          <p className="text-xs uppercase tracking-[0.16em] text-[#527267]">
            diana. — Pädagogische Praxis & Schulentwicklung
          </p>
        </div>
      </div>
    </header>
  );
}
