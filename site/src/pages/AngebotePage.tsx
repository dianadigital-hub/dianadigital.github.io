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
    <div className="bg-[#f6f5ef] text-[#12221f] pt-28 pb-20">
      {/* ===================== PAGE HEADER ===================== */}
      <section className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <Reveal>
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#c85d35]">
            Leistungen & Fortbildungen
          </span>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-[#173530] sm:text-5xl lg:text-6xl">
            {d.services.headline}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#527267]">
            {d.services.subheadline}
          </p>
          {detailed?.didacticStatement && (
            <div className="mt-6 rounded-xl border border-[#173530]/15 bg-white p-6 shadow-sm">
              <p className="font-serif text-base italic text-[#173530] sm:text-lg">
                „{detailed.didacticStatement}“
              </p>
            </div>
          )}
        </Reveal>
      </section>

      {/* ===================== 3 DETAIL-LEISTUNGSPROFILE ===================== */}
      <section className="mx-auto mt-16 max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {d.services.items.map((item, idx) => (
            <Reveal
              key={item.number}
              delay={idx * 150}
              className="flex flex-col justify-between rounded-2xl border border-[#173530]/15 bg-white p-8 shadow-sm transition-all hover:border-[#173530]/35 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#173530]/10 pb-4">
                  <span className="font-serif text-3xl font-bold text-[#e9be5b]">
                    {item.number}
                  </span>
                  {item.targetAudience && (
                    <span className="rounded-full bg-[#173530]/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-[#527267]">
                      {item.targetAudience}
                    </span>
                  )}
                </div>

                <h2 className="mt-5 font-serif text-2xl font-semibold text-[#173530]">
                  {item.title}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-[#527267]">
                  {item.description}
                </p>

                {/* Key Topics / Themenschwerpunkte */}
                {item.keyTopics && item.keyTopics.length > 0 && (
                  <div className="mt-6 border-t border-[#173530]/10 pt-4">
                    <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#173530]">
                      Themenschwerpunkte:
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {item.keyTopics.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2.5 text-xs text-[#527267]">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e9be5b]" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Typische Formate */}
                {item.formats && item.formats.length > 0 && (
                  <div className="mt-6 border-t border-[#173530]/10 pt-4">
                    <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#173530]">
                      Mögliche Formate:
                    </h3>
                    <ul className="mt-3 space-y-1.5">
                      {item.formats.map((fmt, fIdx) => (
                        <li key={fIdx} className="text-xs text-[#527267]">
                          • {fmt}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Booking CTA Button */}
              <div className="mt-8 border-t border-[#173530]/10 pt-6">
                <button
                  type="button"
                  onClick={() => handleRequestService(item.title)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#173530] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#fffaf0] shadow transition-all hover:bg-[#12221f]"
                >
                  <span>{item.action || "Angebot anfragen"}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== 4-SCHRITTE-FAHRPLAN ===================== */}
      {detailed?.processSteps && (
        <section className="mx-auto mt-24 max-w-7xl px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="border-t border-[#173530]/15 pt-16">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#c85d35]">
                Strukturierter Ablauf
              </span>
              <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#173530] sm:text-4xl">
                Der Fahrplan unserer Zusammenarbeit
              </h2>
              <p className="mt-3 max-w-2xl text-base text-[#527267]">
                Von der ersten unverbindlichen Bedarfsanalyse bis zur nachhaltigen didaktischen Verankerung in Ihrem Kollegium:
              </p>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {detailed.processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="relative rounded-xl border border-[#173530]/10 bg-white p-6 shadow-sm"
                  >
                    <span className="font-serif text-2xl font-bold text-[#e9be5b]">
                      {step.step}
                    </span>
                    <h3 className="mt-3 font-serif text-lg font-semibold text-[#173530]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#527267]">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ===================== CALL TO ACTION ===================== */}
      <section className="mx-auto mt-24 max-w-5xl px-6 sm:px-10">
        <Reveal className="rounded-2xl bg-[#173530] p-10 text-center text-[#fffaf0] sm:p-14">
          <h2 className="font-serif text-3xl font-medium sm:text-4xl">
            Haben Sie ein konkretes Vorhaben oder offene Fragen?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#e9e6da]">
            Schreiben Sie mir unverbindlich über das Kontaktformular. Wir besprechen die Rahmenbedingungen Ihrer Schule und finden das passende Format.
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => navigate("/kontakt")}
              className="button-primary rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em]"
            >
              <span>Jetzt Gespräch anfragen</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
