import { useState } from "react";
import { Content } from "../types/content";
import { useRoute } from "../router";
import { Reveal } from "../components/Reveal";
import { ArrowUpRight } from "../components/Icons";

interface ProjektePageProps {
  data: Content;
}

type FilterCategory = "all" | "ki" | "medien" | "vr" | "schulentwicklung";

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
      <section className="px-5 pt-36 pb-16 sm:px-8 sm:pt-44 sm:pb-20 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <Reveal className="grid gap-8 border-b border-white/20 pb-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-start lg:pb-16">
            <div className="flex flex-col items-start gap-4">
              <span className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#e9be5b]">
                Projektarchiv & Fallstudien
              </span>
              <button
                type="button"
                onClick={() => navigate("/kontakt", { topic: "Projektkooperation" })}
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

      {/* ===================== PROJECTS ARCHITECTURAL LIST ===================== */}
      <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="divide-y divide-white/20">
            {filteredProjects.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 70}>
                <article className="project-row group grid gap-6 py-10 sm:py-12 lg:grid-cols-[200px_1fr_0.75fr] lg:gap-10">
                  {/* Category & Status */}
                  <div className="flex flex-col items-start gap-2 pr-4">
                    <span className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#a9c6b0] break-words">
                      {item.label}
                    </span>
                    {item.statusBadge && (
                      <span className="rounded-full border border-white/20 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-white/75">
                        {item.statusBadge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h2 className="font-serif text-[clamp(1.8rem,3vw,2.85rem)] leading-[1.05] tracking-[-0.05em] text-white text-balance">
                      {item.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-[0.95rem] leading-7 text-white/80 text-pretty">
                      {item.fullDescription || item.copy}
                    </p>

                    {item.highlights && item.highlights.length > 0 && (
                      <div className="mt-6 border-t border-white/10 pt-4">
                        <span className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[#e9be5b]">
                          Schwerpunkte & Resultate
                        </span>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {item.highlights.map((h, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5 text-xs text-white/70">
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e9be5b]" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Note / Quote & Action */}
                  <div className="self-start border-l border-[#e9be5b]/70 pl-5 lg:mt-1">
                    {item.note && (
                      <p className="text-sm leading-6 text-[#e9be5b] text-pretty">
                        {item.note}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap gap-3">
                      {item.href && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button-quiet text-xs"
                        >
                          <span>{item.linkLabel || "Projekt öffnen"}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => navigate("/kontakt", { topic: `Projekt ${item.title}` })}
                        className="inline-flex items-center gap-1.5 text-[0.67rem] font-semibold uppercase tracking-[0.15em] text-white/75 transition-colors hover:text-[#e9be5b]"
                      >
                        <span>Rückfrage stellen</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CALL TO ACTION (Signatur Terrakotta) ===================== */}
      <section className="bg-[#c85d35] px-5 py-24 text-[#fffaf0] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
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
                onClick={() => navigate("/kontakt", { topic: "Kooperationsanfrage" })}
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
