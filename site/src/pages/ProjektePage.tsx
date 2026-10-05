import { useState } from "react";
import { Content } from "../types/content";
import { useRoute } from "../router";
import { DEPLOY_BASE } from "../deployBase";
import { Reveal } from "../components/Reveal";
import { ArrowUpRight } from "../components/Icons";

interface ProjektePageProps {
  data: Content;
}

type FilterCategory = "all" | "ki" | "medien" | "vr" | "schulentwicklung";

const PROJECT_META: Record<
  string,
  {
    image: string;
    imageAlt: string;
    badgeStyle: string;
    badgeLabel: string;
  }
> = {
  jobimpact: {
    image: "images/hero/hero-1-lernprojekt.webp",
    imageAlt: "JobImpact Schüler-Lernprojekt",
    badgeStyle: "bg-[#e9be5b]/20 text-[#e9be5b] border-[#e9be5b]/40",
    badgeLabel: "Flagship-Pilotprojekt",
  },
  "social-shift": {
    image: "images/hero/hero-3-workshop.webp",
    imageAlt: "Social Shift Medienbildung",
    badgeStyle: "bg-[#c85d35] text-white border-transparent",
    badgeLabel: "Förderpreis Brandenburg",
  },
  "vr-holocaust": {
    image: "images/hero/hero-4-vr-medien.webp",
    imageAlt: "Holocaustvermittlung in VR",
    badgeStyle: "bg-[#1c403a] text-[#e9be5b] border-white/20",
    badgeLabel: "Forschung & Didaktik (HU/Fraunhofer)",
  },
  steuergruppe: {
    image: "images/hero/hero-2-whiteboard.webp",
    imageAlt: "Steuergruppe Medienentwicklungsplan",
    badgeStyle: "bg-[#527267]/40 text-white border-white/20",
    badgeLabel: "Systemische Schulentwicklung",
  },
  "digitale-formate": {
    image: "images/hero.webp",
    imageAlt: "Digitale Lern- und Fortbildungsformate",
    badgeStyle: "bg-[#e9be5b]/20 text-[#e9be5b] border-[#e9be5b]/30",
    badgeLabel: "Fortbildungsreihen & Prompt-Labor",
  },
};

export function ProjektePage({ data }: ProjektePageProps) {
  const { navigate } = useRoute();
  const d = data;
  const [filter, setFilter] = useState<FilterCategory>("all");

  const filterTabs: { label: string; key: FilterCategory }[] = [
    { label: "Alle Projekte", key: "all" },
    { label: "KI & Didaktik", key: "ki" },
    { label: "Medienpädagogik", key: "medien" },
    { label: "Virtual Reality", key: "vr" },
    { label: "Schulentwicklung", key: "schulentwicklung" },
  ];

  const filteredProjects = d.projects.items.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  return (
    <div className="bg-[#173530] text-[#f6f5ef]">
      {/* ===================== PAGE HEADER ===================== */}
      <section className="px-5 pt-36 pb-12 sm:px-8 sm:pt-44 sm:pb-20 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <Reveal className="grid gap-8 border-b border-white/20 pb-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-start lg:pb-16">
            <div className="flex flex-col items-start gap-4">
              <span className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#e9be5b]">
                Projektarchiv & Fallstudien
              </span>
              <button
                type="button"
                onClick={() => navigate("/kontakt", { topic: "Projekt oder Kooperation" })}
                className="group inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#e9be5b] transition-colors hover:text-white"
              >
                <span>Kooperation anfragen</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#e9be5b] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
            <div>
              <h1 className="max-w-3xl font-serif text-[clamp(2.7rem,5.5vw,5.5rem)] leading-[0.94] tracking-[-0.065em] text-white text-balance">
                {d.projects.headline}
              </h1>
              <p className="mt-6 max-w-2xl text-[0.98rem] leading-7 text-white/80 text-pretty">
                Einblick in konkrete Modellprojekte, medienpädagogische Initiativen und Praxiserprobungen an der Schnittstelle von Technologie, Didaktik und Schulentwicklung.
              </p>
            </div>
          </Reveal>

          {/* Typographic Filter Tabs */}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-b border-white/15 pb-4" role="tablist" aria-label="Projektkategorien">
            {filterTabs.map((tab) => {
              const isActive = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(tab.key)}
                  className={`text-[0.72rem] font-semibold uppercase tracking-[0.15em] transition-colors pb-2 relative focus:outline-none ${
                    isActive
                      ? "text-[#e9be5b] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#e9be5b]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== PROJEKTE BENTO SHOWCASE ===================== */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-32 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          {/* ============ 1. FLAGSHIP HERO: Wenn JobImpact im aktuellen Filter ist ============ */}
          {filteredProjects.some((p) => p.id === "jobimpact") && (
            <Reveal className="mb-14">
              <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-[#1c403a] via-[#173530] to-[#12221f] p-8 shadow-2xl transition-all duration-500 hover:border-[#e9be5b]/60 sm:p-12">
                <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                  {/* Left Content (7 Cols) */}
                  <div className="lg:col-span-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-[#e9be5b]/20 border border-[#e9be5b]/40 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#e9be5b]">
                        Flagship-Pilotprojekt
                      </span>
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#a9c6b0]">
                        Berufsorientierung & KI
                      </span>
                    </div>

                    <h2 className="mt-5 font-serif text-[clamp(2.4rem,4.2vw,3.8rem)] leading-[1.02] tracking-[-0.05em] text-white">
                      JobImpact
                    </h2>

                    <p className="mt-4 max-w-xl text-[0.98rem] leading-7 text-white/85 text-pretty">
                      Ein digitaler Bewerbungs-Coach für Schüler:innen: Eigene Stärken entdecken, Lebenslauf, Anschreiben und Vorstellungsgespräch interaktiv üben – anonym, DSGVO-sicher und kostenlos für Schulen.
                    </p>

                    {/* Highlights */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="rounded-md bg-white/10 px-2.5 py-1 text-[0.68rem] text-white/90">
                        ✦ 100 % DSGVO-sicher & datensparsam
                      </span>
                      <span className="rounded-md bg-white/10 px-2.5 py-1 text-[0.68rem] text-white/90">
                        ✦ Interaktives Bewerbungs-Rollenspiel
                      </span>
                      <span className="rounded-md bg-white/10 px-2.5 py-1 text-[0.68rem] text-white/90">
                        ✦ Kostenfrei für öffentliche Schulen
                      </span>
                    </div>

                    {/* Founder Note in Gold */}
                    <div className="mt-7 border-l-2 border-[#e9be5b] pl-4 text-xs italic leading-relaxed text-[#e9be5b]">
                      Ein echtes Familienstück: Gemeinsam mit meinem Bruder entwickelt – aktuell im Pilotbetrieb in Berlin.
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <a
                        href="https://servermitte.tailecbf0f.ts.net/pilot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-primary"
                      >
                        <span>Pilot live testen</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => navigate("/kontakt", { topic: "Projekt oder Kooperation" })}
                        className="button-quiet text-xs"
                      >
                        <span>Schulpilot für meine Schule anfragen</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Visual Image (5 Cols) */}
                  <div className="relative overflow-hidden rounded-xl border border-white/15 lg:col-span-5">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={`${DEPLOY_BASE}images/hero/hero-1-lernprojekt.webp`}
                        alt="JobImpact Schüler-Lernprojekt"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12221f]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[0.65rem] font-semibold text-white/90">
                      <span className="rounded bg-[#173530]/90 px-2.5 py-1 backdrop-blur-sm">
                        Pilotbetrieb Berlin (Klassen 9 & 10)
                      </span>
                      <span className="text-[#e9be5b]">Praxiserprobt</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* ============ 2. WEITERE PROJEKTE IM ASYMMETRISCHEN BENTO-RASTER ============ */}
          <div className="grid gap-10 lg:grid-cols-2">
            {filteredProjects
              .filter((p) => p.id !== "jobimpact" || filter !== "all")
              .map((item, idx) => {
                const meta = PROJECT_META[item.id || ""] || {
                  image: "images/hero.webp",
                  imageAlt: item.title,
                  badgeStyle: "bg-white/10 text-white border-white/20",
                  badgeLabel: item.label,
                };

                return (
                  <Reveal key={item.title} delay={idx * 80}>
                    <article className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-b from-[#1b3d37] to-[#142c27] p-8 transition-all duration-500 hover:border-[#e9be5b]/50">
                      <div>
                        {/* Bild-Kopf */}
                        <div className="relative -mx-8 -mt-8 mb-6 aspect-[16/9] overflow-hidden border-b border-white/15">
                          <img
                            src={`${DEPLOY_BASE}${meta.image}`}
                            alt={meta.imageAlt}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#142c27] via-[#142c27]/40 to-transparent" />
                          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            <span className={`rounded-full border px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] shadow-md ${meta.badgeStyle}`}>
                              {meta.badgeLabel}
                            </span>
                            {item.statusBadge && (
                              <span className="rounded-full bg-[#173530]/90 border border-white/20 px-2.5 py-1 text-[0.6rem] font-semibold text-white/80 backdrop-blur-sm">
                                {item.statusBadge}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Textteil */}
                        <span className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#a9c6b0]">
                          {item.label}
                        </span>
                        <h2 className="mt-2.5 font-serif text-[clamp(1.75rem,2.5vw,2.4rem)] leading-[1.05] tracking-[-0.045em] text-white">
                          {item.title}
                        </h2>
                        <p className="mt-3.5 text-sm leading-relaxed text-white/80 text-pretty">
                          {item.fullDescription || item.copy}
                        </p>

                        {/* Highlights */}
                        {item.highlights && item.highlights.length > 0 && (
                          <div className="mt-6 border-t border-white/10 pt-4">
                            <span className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[#e9be5b]">
                              Schlüsselmerkmale & Fokus
                            </span>
                            <ul className="mt-2.5 space-y-2">
                              {item.highlights.map((h, hIdx) => (
                                <li key={hIdx} className="flex items-start gap-2.5 text-xs text-white/75">
                                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e9be5b]" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Note / Quote */}
                        {item.note && (
                          <div className="mt-5 border-l-2 border-[#e9be5b]/70 pl-3.5 text-xs text-[#e9be5b]">
                            {item.note}
                          </div>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button-primary text-xs"
                          >
                            <span>{item.linkLabel || "Projekt öffnen"}</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => navigate("/kontakt", { topic: "Projekt oder Kooperation" })}
                            className="button-quiet text-xs"
                          >
                            <span>Frage zu diesem Projekt</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </article>
                  </Reveal>
                );
              })}
          </div>
        </div>
      </section>

      {/* ===================== CALL TO ACTION (Signatur Terrakotta) ===================== */}
      <section className="bg-[#c85d35] px-5 py-20 text-[#fffaf0] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1120px] text-center">
          <Reveal>
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.24em] text-[#ffe0a0]">
              Zusammenarbeit & Schulentwicklung
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.6rem,5.4vw,5.4rem)] leading-[0.95] tracking-[-0.06em] text-white text-balance">
              Möchten Sie ein Bildungsprojekt gemeinsam realisieren?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[0.98rem] leading-7 text-white/85 text-pretty">
              Ich begleite Schulen, Universitäten, Stiftungen und Bildungsinitiativen bei der didaktischen Konzeption und wissenschaftlichen Reflexion innovativer Lernformate.
            </p>
            <div className="mt-10">
              <button
                type="button"
                onClick={() => navigate("/kontakt", { topic: "Projekt oder Kooperation" })}
                className="inline-flex items-center gap-3 border border-white bg-white px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#173530] transition-all duration-300 hover:bg-transparent hover:text-white"
              >
                <span>Kooperation anfragen</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
