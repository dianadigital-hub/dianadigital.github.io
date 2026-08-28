import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { DraftBanner, PasswordGate, usePasswordGate } from "./PasswordGate";
import { LegalOverlay } from "./legal";

/* ------------------------------------------------------------------ */
/*  CMS Datenstruktur                                                  */
/* ------------------------------------------------------------------ */

type ServiceItem = { number: string; title: string; description: string; action: string };
type ProjectItem = { label: string; title: string; copy: string; note: string };
type QualificationItem = [string, string];

type Content = {
  meta: {
    brand: string; brandSubtitle: string;
    navLabelLeistungen: string; navLabelProjekte: string; navLabelUeberMich: string; navLabelKontakt: string;
  };
  hero: {
    tagline: string; headline: string; subheadline: string;
    ctaPrimary: string; ctaSecondary: string; scrollHint: string; imageAlt: string;
  };
  philosophy: { label: string; quote: string; body: string };
  services: {
    label: string; headline: string; subheadline: string; items: ServiceItem[];
    focus: { label: string; title: string; description: string };
  };
  projects: {
    label: string; headline: string; items: ProjectItem[];
  };
  qualifications: {
    label: string; headline: string; items: QualificationItem[];
  };
  about: {
    label: string; name: string; surname: string; role: string;
    headline: string; paragraphs: string[]; quote: string;
  };
  contact: {
    label: string; headline: string; body: string; topics: string[];
    successMessageContact: string; successMessageFeedback: string;
  };
};

/* ------------------------------------------------------------------ */
/*  Icons / kleine Komponenten                                         */
/* ------------------------------------------------------------------ */

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19 19 5" /><path d="M8 5h11v11" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v17M5.5 14.5 12 21l6.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = el.current; if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); } },
      { threshold: 0.14 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={el} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Haupt-App                                                           */
/* ------------------------------------------------------------------ */

export default function App() {
  const { unlocked, unlock } = usePasswordGate();
  const [data, setData] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [formMode, setFormMode] = useState<"contact" | "feedback">("contact");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [editData, setEditData] = useState<Content | null>(null);
  const [legalOpen, setLegalOpen] = useState<"datenschutz" | "impressum" | null>(null);

  /* Inhalte laden */
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}content/data.json`)
      .then((r) => r.json())
      .then((d: Content) => { setData(d); setEditData(JSON.parse(JSON.stringify(d))); })
      .catch(() => setLoading(false))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || adminOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, adminOpen]);

  if (!unlocked) return <PasswordGate onUnlock={unlock} />;

  const openContact = (topic = "") => {
    setFormMode("contact");
    setSelectedTopic(topic);
    setFormSubmitted(false);
    setMenuOpen(false);
    window.setTimeout(() => document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" }), 30);
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;
    const form = e.currentTarget;
    if (!formId) {
      console.info("VITE_FORMSPREE_ID ist nicht gesetzt – Formular wird nur simuliert, es wird nichts verschickt.");
      setFormSubmitted(true);
      return;
    }
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) { setFormSubmitted(true); form.reset(); }
    } catch {
      // ponytail: keine Fehleranzeige im UI, ergänzen falls Zustellung real mal fehlschlägt
    }
  };

  /* Admin: Daten als Datei bereitstellen */
  const downloadContent = () => {
    if (!editData) return;
    const blob = new Blob([JSON.stringify(editData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  /* Admin: einfache Textänderungen */
  const setText = (path: string, value: string) => {
    if (!editData) return;
    const clone = JSON.parse(JSON.stringify(editData));
    const keys = path.split(".");
    let current: any = clone;
    for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
    current[keys[keys.length - 1]] = value;
    setEditData(clone);
  };

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f5ef]">
        <div className="text-center">
          <span className="font-serif text-6xl tracking-[-0.1em] text-[#173530]">diana.</span>
          <p className="mt-4 text-sm text-[#527267]">Inhalte werden geladen …</p>
        </div>
      </div>
    );
  }

  const d = data;

  return (
    <main className="overflow-x-clip bg-[#f6f5ef] text-[#12221f] selection:bg-[#e9be5b] selection:text-[#12221f]">
      <DraftBanner />
      <LegalOverlay page={legalOpen} onClose={() => setLegalOpen(null)} />

      {/* ============ ADMIN TOGGLE ============ */}
      <button
        type="button"
        onClick={() => { setAdminOpen(!adminOpen); if (!adminOpen) setEditData(JSON.parse(JSON.stringify(data))); }}
        className="fixed bottom-6 right-6 z-[60] rounded-full bg-[#173530] px-5 py-2.5 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white shadow-xl transition-all hover:scale-105 hover:bg-[#12221f]"
        aria-label="Admin öffnen"
      >
        {adminOpen ? "Admin schließen" : "CMS"}
      </button>

      {/* ============ ADMIN OVERLAY ============ */}
      <div
        className={`fixed inset-0 z-[55] overflow-y-auto bg-[#12221f]/96 backdrop-blur-md transition-all duration-500 ${adminOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-4xl tracking-[-0.06em] text-[#fffaf0]">Inhalts-Editor</h2>
            <button onClick={() => setAdminOpen(false)} className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#fffaf0] hover:text-[#e9be5b]">Schließen</button>
          </div>
          <p className="mt-3 text-sm text-[#a9b9b0]">Ändere die Texte direkt und lade dann die aktualisierte Datei herunter. Die Datei muss in <code className="text-[#e9be5b]">public/content/data.json</code> gespeichert werden.</p>

          <div className="mt-8 grid gap-10">
            {/* Hero */}
            <section>
              <h3 className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#e9be5b]">Hero</h3>
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#e9e6da]">Tagline</label>
              <textarea value={editData?.hero.tagline ?? ""} onChange={e => setText("hero.tagline", e.target.value)} className="mt-1 w-full bg-[#173530]/50 p-2 text-sm text-white" />

              <label className="mt-4 block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#e9e6da]">Headline</label>
              <textarea value={editData?.hero.headline ?? ""} onChange={e => setText("hero.headline", e.target.value)} className="mt-1 w-full bg-[#173530]/50 p-2 text-sm text-white" />

              <label className="mt-4 block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#e9e6da]">Subheadline</label>
              <textarea value={editData?.hero.subheadline ?? ""} onChange={e => setText("hero.subheadline", e.target.value)} className="mt-1 w-full bg-[#173530]/50 p-2 text-sm text-white" />
            </section>

            {/* Philosophie */}
            <section>
              <h3 className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#e9be5b]">Philosophie</h3>
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#e9e6da]">Zitat</label>
              <textarea value={editData?.philosophy.quote ?? ""} onChange={e => setText("philosophy.quote", e.target.value)} className="mt-1 w-full bg-[#173530]/50 p-2 text-sm text-white" />
              <label className="mt-4 block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#e9e6da]">Text</label>
              <textarea value={editData?.philosophy.body ?? ""} onChange={e => setText("philosophy.body", e.target.value)} className="mt-1 w-full bg-[#173530]/50 p-2 text-sm text-white" />
            </section>

            {/* Services */}
            <section>
              <h3 className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#e9be5b]">Leistungen</h3>
              {editData?.services.items.map((s, i) => (
                <div key={i} className="mb-6 border border-[#173530] p-4">
                  <h4 className="text-sm font-bold text-[#fffaf0]">{s.number} {s.title}</h4>
                  <label className="mt-2 block text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-[#a9b9b0]">Beschreibung</label>
                  <textarea value={s.description} onChange={e => {
                    const arr = [...(editData?.services.items ?? [])]; arr[i].description = e.target.value; setEditData({ ...(editData as Content), services: { ...(editData?.services as any), items: arr } });
                  }} className="mt-1 w-full bg-[#173530]/50 p-2 text-sm text-white" rows={2} />
                  <label className="mt-2 block text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-[#a9b9b0]">Button-Text</label>
                  <input value={s.action} onChange={e => {
                    const arr = [...(editData?.services.items ?? [])]; arr[i].action = e.target.value; setEditData({ ...(editData as Content), services: { ...(editData?.services as any), items: arr } });
                  }} className="mt-1 w-full bg-[#173530]/50 p-2 text-sm text-white" />
                </div>
              ))}
            </section>

            {/* Über mich */}
            <section>
              <h3 className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#e9be5b]">Über mich</h3>
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#e9e6da]">Headline</label>
              <textarea value={editData?.about.headline ?? ""} onChange={e => setText("about.headline", e.target.value)} className="mt-1 w-full bg-[#173530]/50 p-2 text-sm text-white" />
              {editData?.about.paragraphs.map((p, i) => (
                <div key={i} className="mt-3">
                  <label className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-[#a9b9b0]">Absatz {i + 1}</label>
                  <textarea value={p} onChange={e => {
                    const arr = [...(editData?.about.paragraphs ?? [])]; arr[i] = e.target.value; setEditData({ ...(editData as Content), about: { ...(editData?.about as any), paragraphs: arr } });
                  }} className="mt-1 w-full bg-[#173530]/50 p-2 text-sm text-white" rows={3} />
                </div>
              ))}
              <label className="mt-4 block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#e9e6da]">Zitat</label>
              <textarea value={editData?.about.quote ?? ""} onChange={e => setText("about.quote", e.target.value)} className="mt-1 w-full bg-[#173530]/50 p-2 text-sm text-white" rows={2} />
            </section>

            {/* Kontakt */}
            <section>
              <h3 className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#e9be5b]">Kontakt</h3>
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#e9e6da]">Headline</label>
              <textarea value={editData?.contact.headline ?? ""} onChange={e => setText("contact.headline", e.target.value)} className="mt-1 w-full bg-[#173530]/50 p-2 text-sm text-white" />
            </section>
          </div>

          <div className="mt-10 border-t border-[#173530] pt-8">
            <button onClick={downloadContent} className="inline-flex items-center gap-2 rounded-full bg-[#e9be5b] px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[#173530] transition hover:scale-[1.03] hover:bg-[#fffaf0]">
              Daten als JSON herunterladen
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-[0.65rem] text-[#a9b9b0]">Download: <code className="text-[#e9be5b]">data.json</code> → in <code className="text-[#e9be5b]">public/content/data.json</code> einfügen.</p>
          </div>
        </div>
      </div>

      {/* ============ HEADER ============ */}
      <header
        className={`fixed inset-x-0 top-8 z-50 transition-all duration-500 ${
          hasScrolled ? "border-b border-[#173530]/10 bg-[#f6f5ef]/95 py-3 backdrop-blur-md" : "py-5"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#start" className={`group leading-none ${hasScrolled ? "text-[#173530]" : "text-white"}`} aria-label="Zur Startseite">
            <span className="block font-serif text-[1.45rem] tracking-[-0.08em]">{d.meta.brand}</span>
            <span className="mt-1 block pl-0.5 text-[0.51rem] font-semibold tracking-[0.22em]">{d.meta.brandSubtitle}</span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Hauptnavigation">
            {[{ label: d.meta.navLabelLeistungen, href: "#leistungen" }, { label: d.meta.navLabelProjekte, href: "#projekte" }, { label: d.meta.navLabelUeberMich, href: "#ueber-mich" }].map((item) => (
              <a key={item.href} href={item.href} className={`nav-link text-[0.72rem] font-semibold uppercase tracking-[0.14em] ${hasScrolled ? "text-[#173530]" : "text-white"}`}>
                {item.label}
              </a>
            ))}
            <button type="button" onClick={() => openContact()} className={`group flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] ${hasScrolled ? "text-[#173530]" : "text-white"}`}>
              {d.meta.navLabelKontakt} <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </nav>
          <button type="button" className={`relative z-[60] flex h-10 w-10 items-center justify-center lg:hidden ${hasScrolled || menuOpen ? "text-[#173530]" : "text-white"}`} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}>
            <span className={`absolute h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-px w-6 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div id="mobile-menu" className={`fixed inset-0 z-40 flex items-center bg-[#f6f5ef] px-8 transition-all duration-500 lg:hidden ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
        <nav className="flex w-full flex-col gap-6" aria-label="Mobile Navigation">
          {[{ label: d.meta.navLabelLeistungen, href: "#leistungen" }, { label: d.meta.navLabelProjekte, href: "#projekte" }, { label: d.meta.navLabelUeberMich, href: "#ueber-mich" }].map((item, i) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={`font-serif text-4xl text-[#173530] transition-all duration-500 ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"}`} style={{ transitionDelay: menuOpen ? `${100 + i * 70}ms` : "0ms" }}>{item.label}</a>
          ))}
          <button type="button" onClick={() => openContact()} className={`mt-3 text-left font-serif text-4xl text-[#c85d35] transition-all duration-500 ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"}`} style={{ transitionDelay: menuOpen ? "310ms" : "0ms" }}>
            {d.meta.navLabelKontakt}
          </button>
        </nav>
      </div>

      {/* ============ HERO ============ */}
      <section id="start" className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#173530] text-white">
        <img src={`${import.meta.env.BASE_URL}images/hero.png`} alt={d.hero.imageAlt} className="hero-image absolute inset-0 h-full w-full object-cover object-[60%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,27,24,0.9)_0%,rgba(8,27,24,0.65)_43%,rgba(8,27,24,0.23)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,27,24,0.38)_0%,transparent_36%)]" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col px-5 pb-10 pt-36 sm:px-8 sm:pb-12 lg:px-12 lg:pb-14">
          <div className="max-w-4xl">
            <p className="hero-reveal mb-4 text-[0.67rem] font-semibold uppercase tracking-[0.24em] text-[#e9be5b] sm:mb-5">{d.hero.tagline}</p>
            <h1 className="hero-reveal hero-brand font-serif text-[clamp(5.7rem,17vw,15rem)] leading-[0.67] tracking-[-0.095em]">{d.meta.brand}</h1>
            <p className="hero-reveal mt-7 max-w-2xl text-[clamp(1.45rem,3vw,2.65rem)] font-medium leading-[1.08] tracking-[-0.045em] text-white sm:mt-10">{d.hero.headline}</p>
            <p className="hero-reveal mt-5 max-w-xl text-sm leading-6 text-white/80 sm:text-[0.98rem] sm:leading-7">{d.hero.subheadline}</p>
            <div className="hero-reveal mt-7 flex flex-wrap gap-3 sm:mt-9">
              <button type="button" onClick={() => openContact("Fortbildung für das Kollegium")} className="button-primary">{d.hero.ctaPrimary} <ArrowUpRight className="h-4 w-4" /></button>
              <a href="#leistungen" className="button-quiet">{d.hero.ctaSecondary}</a>
            </div>
          </div>
          <a href="#haltung" className="group mt-12 flex w-fit items-center gap-3 text-[0.63rem] font-semibold uppercase tracking-[0.2em] text-white/75 sm:mt-16">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 transition-colors duration-300 group-hover:border-[#e9be5b] group-hover:text-[#e9be5b]"><ArrowDown /></span>
            {d.hero.scrollHint}
          </a>
        </div>
      </section>

      {/* ============ PHILOSOPHIE ============ */}
      <section id="haltung" className="relative overflow-hidden bg-[#dce8dc] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <span className="absolute -right-6 -top-14 font-serif text-[15rem] leading-none tracking-[-0.13em] text-[#b8d0bd]/65 sm:text-[23rem]" aria-hidden="true">“</span>
        <Reveal className="relative mx-auto max-w-[1120px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(150px,0.35fr)_1fr] lg:gap-20">
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#527267]">{d.philosophy.label}</p>
            <div>
              <blockquote className="max-w-4xl font-serif text-[clamp(2.15rem,4.6vw,4.55rem)] leading-[1.02] tracking-[-0.055em] text-[#173530]">{d.philosophy.quote}</blockquote>
              <p className="mt-8 max-w-2xl text-[0.98rem] leading-7 text-[#315448]">{d.philosophy.body}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ LEISTUNGEN ============ */}
      <section id="leistungen" className="bg-[#f6f5ef] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1280px]">
          <Reveal className="grid gap-5 border-b border-[#173530]/20 pb-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-end lg:pb-16">
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#c85d35]">{d.services.label}</p>
            <div>
              <h2 className="max-w-4xl font-serif text-[clamp(2.7rem,5.8vw,5.8rem)] leading-[0.93] tracking-[-0.065em] text-[#173530]">{d.services.headline}</h2>
              <p className="mt-6 max-w-xl text-[0.98rem] leading-7 text-[#5c6962]">{d.services.subheadline}</p>
            </div>
          </Reveal>
          <div>
            {d.services.items.map((service, index) => (
              <Reveal key={service.number} delay={index * 90}>
                <article className="group grid gap-5 border-b border-[#173530]/20 py-9 sm:grid-cols-[86px_1fr_auto] sm:items-start sm:gap-8 sm:py-11">
                  <span className="font-serif text-2xl tracking-[-0.06em] text-[#c85d35]">{service.number}</span>
                  <div>
                    <h3 className="font-serif text-[clamp(1.8rem,3.2vw,3rem)] leading-[1] tracking-[-0.055em] text-[#173530]">{service.title}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5c6962] sm:text-[0.95rem] sm:leading-7">{service.description}</p>
                  </div>
                  <button type="button" onClick={() => openContact(service.title)} className="inline-flex w-fit items-center gap-2 self-end text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-[#173530] transition-transform duration-300 hover:translate-x-1 sm:self-center">
                    {service.action} <ArrowUpRight className="h-4 w-4 text-[#c85d35]" />
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="grid gap-5 pt-12 lg:grid-cols-[0.65fr_1.35fr] lg:pt-16">
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#c85d35]">{d.services.focus.label}</p>
            <div>
              <h3 className="font-serif text-[clamp(1.9rem,3.5vw,3.2rem)] leading-[1.02] tracking-[-0.055em] text-[#173530]">{d.services.focus.title}</h3>
              <p className="mt-5 max-w-2xl text-[0.98rem] leading-7 text-[#5c6962]">{d.services.focus.description}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PROJEKTE ============ */}
      <section id="projekte" className="bg-[#173530] px-5 py-24 text-[#f6f5ef] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1280px]">
          <Reveal className="grid gap-5 border-b border-white/20 pb-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-end lg:pb-16">
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#e9be5b]">{d.projects.label}</p>
            <div>
              <h2 className="max-w-3xl font-serif text-[clamp(2.7rem,5.8vw,5.8rem)] leading-[0.93] tracking-[-0.065em]">{d.projects.headline}</h2>
            </div>
          </Reveal>
          <div className="mt-2">
            {d.projects.items.map((project, index) => (
              <Reveal key={project.title} delay={index * 80}>
                <article className="project-row group grid gap-5 border-b border-white/20 py-9 lg:grid-cols-[140px_1fr_0.72fr] lg:gap-10 lg:py-12">
                  <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#a9c6b0]">{project.label}</p>
                  <div>
                    <h3 className="font-serif text-[clamp(1.8rem,3.4vw,3.2rem)] leading-[0.98] tracking-[-0.055em]">{project.title}</h3>
                    <p className="mt-4 max-w-xl text-[0.94rem] leading-7 text-white/72">{project.copy}</p>
                  </div>
                  <p className="self-end border-l border-[#e9be5b]/70 pl-4 text-sm leading-6 text-[#e9be5b] lg:mb-1">{project.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ QUALIFIKATIONEN ============ */}
      <section className="bg-[#e9be5b] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <Reveal>
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#725528]">{d.qualifications.label}</p>
            <h2 className="mt-5 max-w-md font-serif text-[clamp(2.6rem,4.3vw,4.4rem)] leading-[0.94] tracking-[-0.06em] text-[#173530]">{d.qualifications.headline}</h2>
          </Reveal>
          <div className="border-t border-[#173530]/25">
            {d.qualifications.items.map(([title, copy], index) => (
              <Reveal key={title} delay={index * 75}>
                <article className="grid gap-3 border-b border-[#173530]/25 py-7 sm:grid-cols-[1fr_1.15fr] sm:gap-8 sm:py-8">
                  <h3 className="font-serif text-[1.35rem] leading-6 tracking-[-0.035em] text-[#173530]">{title}</h3>
                  <p className="text-sm leading-6 text-[#3e492f]">{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ÜBER MICH ============ */}
      <section id="ueber-mich" className="relative bg-[#f6f5ef] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1280px]">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(280px,0.8fr)_1.2fr] lg:gap-24">
            {/* Porträt */}
            <div className="max-w-[430px]">
              <div className="portrait-stage">
                <div className="relative z-10 overflow-hidden bg-[#dce8dc]">
                  <img src={`${import.meta.env.BASE_URL}images/portrait.jpg`} alt="Porträt von Diana Jeske-Siegel" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} className="portrait-img aspect-[4/5] w-full object-cover object-[50%_18%]" />
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 pr-4">
                <span className="text-sm font-semibold tracking-[-0.01em] text-[#173530]">{d.about.name} {d.about.surname}</span>
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.17em] text-[#527267]">{d.about.role}</span>
              </div>
            </div>
            <div>
              <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#c85d35]">{d.about.label}</p>
              <h2 className="mt-6 max-w-3xl font-serif text-[clamp(2.5rem,5.15vw,5.25rem)] leading-[0.95] tracking-[-0.067em] text-[#173530]">{d.about.headline}</h2>
              <div className="mt-9 grid max-w-4xl gap-x-14 gap-y-7 text-[0.97rem] leading-7 text-[#5c6962] sm:grid-cols-2">
                {d.about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal className="mt-20 border-l-2 border-[#c85d35] pl-6 sm:ml-[35%] sm:pl-8 lg:mt-28">
            <blockquote className="max-w-3xl font-serif text-[clamp(1.85rem,3.7vw,3.65rem)] leading-[1.05] tracking-[-0.055em] text-[#173530]">“{d.about.quote}”</blockquote>
          </Reveal>
        </div>
      </section>

      {/* ============ KONTAKT ============ */}
      <section id="kontakt" className="bg-[#c85d35] px-5 py-24 text-[#fffaf0] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal>
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#ffe0a0]">{d.contact.label}</p>
            <h2 className="mt-5 max-w-lg font-serif text-[clamp(2.8rem,5.3vw,5.4rem)] leading-[0.93] tracking-[-0.065em]">{d.contact.headline}</h2>
            <p className="mt-7 max-w-md text-[0.98rem] leading-7 text-white/80">{d.contact.body}</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex border-b border-white/35" role="tablist" aria-label="Kontaktoptionen">
              <button type="button" role="tab" aria-selected={formMode === "contact"} onClick={() => { setFormMode("contact"); setFormSubmitted(false); }} className={`form-tab ${formMode === "contact" ? "is-active" : ""}`}>Anfrage</button>
              <button type="button" role="tab" aria-selected={formMode === "feedback"} onClick={() => { setFormMode("feedback"); setFormSubmitted(false); }} className={`form-tab ${formMode === "feedback" ? "is-active" : ""}`}>Feedback geben</button>
            </div>
            {formSubmitted ? (
              <div className="py-14" aria-live="polite">
                <p className="font-serif text-4xl tracking-[-0.055em]">Vielen Dank.</p>
                <p className="mt-4 max-w-md text-[0.97rem] leading-7 text-white/80">
                  {formMode === "feedback" ? d.contact.successMessageFeedback : d.contact.successMessageContact}
                </p>
                <button type="button" onClick={() => setFormSubmitted(false)} className="mt-7 border-b border-white pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.15em]">Weitere Nachricht senden</button>
              </div>
            ) : (
              <form className="mt-9" onSubmit={submitForm}>
                <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
                  <label className="form-label">
                    <span>Name {formMode === "feedback" && <em>(optional)</em>}</span>
                    <input name="name" type="text" autoComplete="name" required={formMode === "contact"} />
                  </label>
                  <label className="form-label">
                    <span>E-Mail-Adresse</span>
                    <input name="email" type="email" autoComplete="email" required />
                  </label>
                  <label className="form-label sm:col-span-2">
                    <span>{formMode === "feedback" ? "Kontext der Zusammenarbeit" : "Worum geht es?"}</span>
                    {formMode === "contact" ? (
                      <select name="topic" value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)} required>
                        <option value="" disabled>Bitte wählen</option>
                        {d.contact.topics.map(t => <option key={t}>{t}</option>)}
                      </select>
                    ) : (
                      <input name="context" type="text" placeholder="z. B. Fortbildung, Projekt, Kooperation" />
                    )}
                  </label>
                  <label className="form-label sm:col-span-2">
                    <span>{formMode === "feedback" ? "Ihre Rückmeldung" : "Ihre Nachricht"}</span>
                    <textarea name="message" rows={4} required />
                  </label>
                </div>
                {formMode === "feedback" && (
                  <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-5 text-white/80">
                    <input className="mt-1 h-4 w-4 accent-[#173530]" type="checkbox" name="permission" />
                    <span>Meine Rückmeldung darf anonymisiert veröffentlicht werden.</span>
                  </label>
                )}
                <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-5 text-white/80">
                  <input className="mt-1 h-4 w-4 accent-[#173530]" type="checkbox" name="privacy" required />
                  <span>Ich habe den Datenschutzhinweis zur Kenntnis genommen und stimme der Verarbeitung meiner Angaben zur Kontaktaufnahme zu.</span>
                </label>
                <button type="submit" className="mt-8 inline-flex items-center gap-3 border border-white bg-white px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-[#173530] transition-all duration-300 hover:bg-transparent hover:text-white">
                  {formMode === "feedback" ? "Feedback absenden" : "Anfrage senden"} <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-[#12221f] px-5 py-10 text-[#f6f5ef] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <a href="#start" className="font-serif text-4xl leading-none tracking-[-0.08em]">{d.meta.brand}</a>
            <p className="mt-3 max-w-xs text-[0.65rem] font-medium uppercase leading-5 tracking-[0.15em] text-white/55">Digitale Unterrichtsentwicklung. KI. Medienbildung.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[0.67rem] font-semibold uppercase tracking-[0.14em] text-white/65">
            <a className="transition-colors hover:text-[#e9be5b]" href="#kontakt">Kontakt</a>
            <button type="button" className="transition-colors hover:text-[#e9be5b]" onClick={() => setLegalOpen("datenschutz")}>Datenschutz</button>
            <button type="button" className="transition-colors hover:text-[#e9be5b]" onClick={() => setLegalOpen("impressum")}>Impressum</button>
            <button type="button" className="transition-colors hover:text-[#e9be5b]" onClick={() => { setAdminOpen(true); setEditData(JSON.parse(JSON.stringify(data))); }}>CMS</button>
            <span className="text-white/35">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
