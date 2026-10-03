import { useState, useEffect } from "react";
import { useRoute, RoutePath } from "../router";
import { DEPLOY_BASE } from "../deployBase";
import { Content } from "../types/content";

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

  const navLinks: { label: string; to: RoutePath }[] = [
    { label: data.meta.navLabelLeistungen || "Angebote", to: "/angebote" },
    { label: data.meta.navLabelProjekte || "Projekte", to: "/projekte" },
    { label: data.meta.navLabelUeberMich || "Über mich", to: "/ueber-mich" },
    { label: data.meta.navLabelKontakt || "Kontakt", to: "/kontakt" },
  ];

  const handleLinkClick = (to: RoutePath) => {
    navigate(to);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        hasScrolled ? "bg-[#f6f5ef]/95 shadow-[0_1px_0_0_rgba(18,34,31,0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleLinkClick("/")}
          className="group flex flex-col text-left transition-opacity hover:opacity-85 focus:outline-none"
          aria-label="Startseite aufrufen"
        >
          <img
            src={`${DEPLOY_BASE}images/logo/logo-horizontal-on-light.svg`}
            alt={data.meta.brand}
            className="h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
          <span className="mt-1 text-[0.62rem] font-semibold tracking-[0.24em] text-[#527267]">
            {data.meta.brandSubtitle}
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-9">
          {navLinks.map((link) => {
            const isActive = path === link.to;
            return (
              <button
                key={link.to}
                type="button"
                onClick={() => handleLinkClick(link.to)}
                className={`relative text-[0.8rem] font-medium tracking-[0.06em] transition-colors focus:outline-none ${
                  isActive ? "font-semibold text-[#173530]" : "text-[#527267] hover:text-[#173530]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-[#e9be5b]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex md:items-center">
          <button
            type="button"
            onClick={() => handleLinkClick("/kontakt")}
            className="rounded-full bg-[#173530] px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#fffaf0] shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-[#12221f] hover:shadow"
          >
            Zusammenarbeit anfragen
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 p-2 text-[#173530] focus:outline-none md:hidden"
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Menü umschalten</span>
          <div className="relative flex h-5 w-6 flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-[#173530] transition-all duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-[#173530] transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-[#173530] transition-all duration-300 ${
                menuOpen ? "-translate-y-2.5 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-[#173530] px-8 py-24 text-[#fffaf0] transition-all duration-500 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col gap-7 pt-4">
          <button
            type="button"
            onClick={() => handleLinkClick("/")}
            className={`text-left font-serif text-3xl transition-colors ${
              path === "/" ? "text-[#e9be5b]" : "text-[#fffaf0] hover:text-[#e9be5b]"
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
                className={`text-left font-serif text-3xl transition-colors ${
                  isActive ? "text-[#e9be5b]" : "text-[#fffaf0] hover:text-[#e9be5b]"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        <div className="border-t border-[#fffaf0]/15 pt-8">
          <button
            type="button"
            onClick={() => handleLinkClick("/kontakt")}
            className="w-full rounded-full bg-[#e9be5b] px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-[#173530] shadow-md transition-transform active:scale-95"
          >
            Zusammenarbeit anfragen
          </button>
          <p className="mt-4 text-center text-[0.7rem] tracking-[0.1em] text-[#a9b9b0]">
            diana. — Pädagogische Praxis & Schulentwicklung
          </p>
        </div>
      </div>
    </header>
  );
}
