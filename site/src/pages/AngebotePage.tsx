import { Content } from "../types/content";
import { useRoute } from "../router";
import { Reveal } from "../components/Reveal";
import { ArrowUpRight } from "../components/Icons";

interface AngebotePageProps {
  data: Content;
}

export function AngebotePage({ data }: AngebotePageProps) {
  const { navigate } = useRoute();
  const d = data;
  const detailed = d.detailedServices;

  const handleRequestService = (serviceTitle: string) => {
    let topic = "Fortbildung für das Kollegium";
    if (serviceTitle.toLowerCase().includes("schulen")) {
      topic = "Beratung einer Schule";
    } else if (serviceTitle.toLowerCase().includes("schulleitungen")) {
      topic = "Beratung einer Schulleitung";
    }
    navigate("/kontakt", { topic });
  };

  return (
    <div className="bg-[#f6f5ef] text-[#12221f]">
      {/* ===================== PAGE HEADER ===================== */}
      <section className="px-5 pt-36 pb-20 sm:px-8 sm:pt-44 sm:pb-24 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <Reveal className="grid gap-8 border-b border-[#173530]/20 pb-14 lg:grid-cols-[0.65fr_1.35fr] lg:items-start lg:pb-16">
            <div className="flex flex-col items-start gap-4">
              <span className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#c85d35]">
                Leistungen & Fortbildungen
              </span>
              <button
                type="button"
                onClick={() => navigate("/kontakt")}
                className="group inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#173530] transition-colors hover:text-[#c85d35]"
              >
                <span>Direkt anfragen</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#c85d35] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
            <div>
              <h1 className="max-w-3xl font-serif text-[clamp(2.7rem,5.5vw,5.5rem)] leading-[0.94] tracking-[-0.065em] text-[#173530] text-balance">
                {d.services.headline}
              </h1>
              <p className="mt-6 max-w-2xl text-[0.98rem] leading-7 text-[#5c6962] text-pretty">
                {d.services.subheadline}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== DIDAKTISCHES LEITBILD (Signatur Salbeigrün) ===================== */}
      {detailed?.didacticStatement && (
        <section className="relative overflow-hidden bg-[#dce8dc] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <span
            className="absolute -right-6 -top-12 font-serif text-[14rem] leading-none tracking-[-0.13em] text-[#b8d0bd]/60 sm:text-[20rem] pointer-events-none select-none"
            aria-hidden="true"
          >
            “
          </span>
          <div className="relative mx-auto max-w-[1280px]">
            <Reveal className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
              <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#527267]">
                Didaktisches Leitbild
              </p>
              <div>
                <blockquote className="max-w-3xl font-serif text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.08] tracking-[-0.045em] text-[#173530] text-balance">
                  „{detailed.didacticStatement}“
                </blockquote>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ===================== 3 DETAIL-LEISTUNGSPROFILE (Architektonische Editorial-Module) ===================== */}
      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="space-y-16 lg:space-y-24">
            {d.services.items.map((item, idx) => (
              <Reveal key={item.number} delay={idx * 90}>
                <article className="border-b border-[#173530]/20 pb-16 lg:pb-20">
                  {/* Modulkopf: Nummer, Titel, Zielgruppe */}
                  <div className="grid gap-6 sm:grid-cols-[86px_1fr_auto] sm:items-baseline sm:gap-8">
                    <span className="font-serif text-3xl font-bold tracking-[-0.06em] text-[#c85d35]">
                      {item.number}
                    </span>
                    <div>
                      <h2 className="font-serif text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.02] tracking-[-0.055em] text-[#173530] text-balance">
                        {item.title}
                      </h2>
                      {item.targetAudience && (
                        <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#527267]">
                          Zielgruppe: {item.targetAudience}
                        </p>
                      )}
                    </div>
                    <div className="sm:self-start">
                      <button
                        type="button"
                        onClick={() => handleRequestService(item.title)}
                        className="button-primary text-xs"
                      >
                        <span>{item.action || "Anfrage stellen"}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Modulinhalt: Beschreibung & 2-Spalten-Rhythm (Themen & Formate) */}
                  <div className="mt-8 grid gap-10 sm:ml-[86px] lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
                    <div>
                      <p className="text-[0.98rem] leading-7 text-[#5c6962] text-pretty">
                        {item.description}
                      </p>

                      {/* Key Topics */}
                      {item.keyTopics && item.keyTopics.length > 0 && (
                        <div className="mt-8 border-t border-[#173530]/15 pt-6">
                          <h3 className="text-[0.67rem] font-bold uppercase tracking-[0.18em] text-[#173530]">
                            Themenschwerpunkte & Inhalte
                          </h3>
                          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                            {item.keyTopics.map((topic, tIdx) => (
                              <li key={tIdx} className="flex items-start gap-2.5 text-xs text-[#527267]">
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e9be5b]" />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Formate & Rahmen */}
                    {item.formats && item.formats.length > 0 && (
                      <div className="border-l border-[#173530]/15 pl-6 lg:pl-8">
                        <h3 className="text-[0.67rem] font-bold uppercase tracking-[0.18em] text-[#173530]">
                          Mögliche Formate
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                          {item.formats.map((fmt, fIdx) => (
                            <li key={fIdx} className="text-xs text-[#527267] flex items-center gap-2">
                              <span className="text-[#c85d35] font-serif text-sm">✦</span>
                              <span>{fmt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 4-SCHRITTE-FAHRPLAN (Warmer Ocker-Block) ===================== */}
      {detailed?.processSteps && (
        <section className="bg-[#e9be5b] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[1280px]">
            <Reveal className="grid gap-8 border-b border-[#173530]/25 pb-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-start lg:pb-16">
              <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#725528]">
                Strukturierter Ablauf
              </p>
              <div>
                <h2 className="max-w-3xl font-serif text-[clamp(2.5rem,4.8vw,4.6rem)] leading-[0.94] tracking-[-0.06em] text-[#173530] text-balance">
                  Der Fahrplan unserer Zusammenarbeit
                </h2>
                <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-[#3e492f] text-pretty">
                  Von der ersten unverbindlichen Bedarfsanalyse bis zur nachhaltigen didaktischen Verankerung in Ihrem Kollegium:
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {detailed.processSteps.map((step, sIdx) => (
                <Reveal key={step.step} delay={sIdx * 80}>
                  <div className="border-t border-[#173530]/25 pt-6">
                    <span className="font-serif text-2xl font-bold tracking-[-0.06em] text-[#725528]">
                      {step.step}
                    </span>
                    <h3 className="mt-3 font-serif text-lg leading-snug tracking-[-0.035em] text-[#173530]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-xs leading-6 text-[#3e492f] text-pretty">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== CALL TO ACTION (Signatur Terrakotta) ===================== */}
      <section className="bg-[#c85d35] px-5 py-24 text-[#fffaf0] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1120px] text-center">
          <Reveal>
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.24em] text-[#ffe0a0]">
              Individuelle Beratung & Planung
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.6rem,5.4vw,5.4rem)] leading-[0.95] tracking-[-0.06em] text-white text-balance">
              Haben Sie ein konkretes Vorhaben oder Fragen zu den Formaten?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[0.98rem] leading-7 text-white/85 text-pretty">
              Schreiben Sie mir unverbindlich über das Kontaktformular. Wir besprechen die Ausgangslage Ihrer Schule und finden das passende Konzept.
            </p>
            <div className="mt-10">
              <button
                type="button"
                onClick={() => navigate("/kontakt")}
                className="inline-flex items-center gap-3 border border-white bg-white px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#173530] transition-all duration-300 hover:bg-transparent hover:text-white"
              >
                <span>Jetzt Anfrage stellen</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
