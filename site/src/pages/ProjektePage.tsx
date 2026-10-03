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
    <div className="bg-[#f6f5ef] text-[#12221f] pt-28 pb-20">
      {/* ===================== PAGE HEADER ===================== */}
      <section className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <Reveal>
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#c85d35]">
            Projektarchiv & Fallstudien
          </span>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-[#173530] sm:text-5xl lg:text-6xl">
            {d.projects.headline}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#527267]">
            Ein Einblick in konkrete Modellprojekte, medienpädagogische Initiativen und Praxiserprobungen an der Schnittstelle von Technologie, Didaktik und Demokratiebildung.
          </p>
        </Reveal>

        {/* Filter Tabs */}
        <div className="mt-10 flex flex-wrap gap-2.5 border-b border-[#173530]/10 pb-4">
          {filterTabs.map((tab) => {
            const isActive = filter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key)}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wider transition-all ${
                  isActive
                    ? "bg-[#173530] text-[#fffaf0] shadow-sm"
                    : "bg-white text-[#527267] hover:bg-[#173530]/5 hover:text-[#173530]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ===================== PROJECTS GRID ===================== */}
      <section className="mx-auto mt-12 max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-10 md:grid-cols-2">
          {filteredProjects.map((item, idx) => (
            <Reveal
              key={item.title}
              delay={idx * 100}
              className="flex flex-col justify-between rounded-2xl border border-[#173530]/15 bg-white p-8 shadow-sm transition-all hover:border-[#173530]/35 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#173530]/10 pb-4">
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#c85d35]">
                    {item.label}
                  </span>
                  {item.statusBadge && (
                    <span className="rounded-full bg-[#173530]/10 px-3 py-1 text-[0.65rem] font-semibold text-[#173530]">
                      {item.statusBadge}
                    </span>
                  )}
                </div>

                <h2 className="mt-5 font-serif text-2xl font-semibold text-[#173530]">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-[#527267]">
                  {item.fullDescription || item.copy}
                </p>

                {item.highlights && item.highlights.length > 0 && (
                  <div className="mt-6 border-t border-[#173530]/10 pt-4">
                    <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#173530]">
                      Schlüsselmerkmale:
                    </h3>
                    <ul className="mt-2.5 space-y-1.5">
                      {item.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5 text-xs text-[#527267]">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e9be5b]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.note && (
                  <div className="mt-6 rounded-lg bg-[#f6f5ef] p-4 text-xs italic text-[#527267]">
                    {item.note}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#173530]/10 pt-6">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#173530] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#fffaf0] transition-colors hover:bg-[#12221f]"
                  >
                    <span>{item.linkLabel || "Projekt öffnen"}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : null}

                <button
                  type="button"
                  onClick={() => navigate("/kontakt", { topic: `Projekt ${item.title}` })}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#173530]/20 px-4 py-2 text-xs font-semibold text-[#173530] hover:bg-[#173530]/5 transition-colors"
                >
                  <span>Frage zu diesem Projekt</span>
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== CALL TO ACTION ===================== */}
      <section className="mx-auto mt-24 max-w-5xl px-6 sm:px-10">
        <Reveal className="rounded-2xl bg-[#173530] p-10 text-center text-[#fffaf0] sm:p-14">
          <h2 className="font-serif text-3xl font-medium sm:text-4xl">
            Möchten Sie ein innovatives Bildungsprojekt gemeinsam realisieren?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#e9e6da]">
            Ich begleite Schulen, Universitäten, Stiftungen und Bildungsinitiativen bei der didaktischen Konzeption und wissenschaftlichen Reflexion digitaler Lernformate.
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => navigate("/kontakt", { topic: "Projekt oder Kooperation" })}
              className="button-primary rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em]"
            >
              <span>Kooperation anfragen</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
