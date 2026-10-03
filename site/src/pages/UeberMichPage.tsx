import { Content } from "../types/content";
import { useRoute } from "../router";
import { DEPLOY_BASE } from "../deployBase";
import { Reveal } from "../components/Reveal";
import { ArrowUpRight, DownloadIcon } from "../components/Icons";

interface UeberMichPageProps {
  data: Content;
}

export function UeberMichPage({ data }: UeberMichPageProps) {
  const { navigate } = useRoute();
  const d = data;
  const cv = d.curriculumVitae;

  const handleDownloadCv = () => {
    const url = d.meta.cvDownloadUrl || `${DEPLOY_BASE}assets/diana-jeske-siegel-vita.pdf`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-[#f6f5ef] text-[#12221f] pt-28 pb-20">
      {/* ===================== PAGE HEADER & BIO ===================== */}
      <section className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Portrait Links (4 Cols) */}
          <div className="lg:col-span-4">
            <Reveal>
              <div className="portrait-stage mx-auto max-w-sm">
                <div className="relative z-10 overflow-hidden rounded-xl bg-[#173530] shadow-xl">
                  <img
                    src={`${DEPLOY_BASE}images/portrait.jpg`}
                    alt={`${d.about.name} ${d.about.surname}`}
                    className="portrait-img h-auto w-full object-cover"
                  />
                </div>
              </div>

              {/* PDF Download Slot */}
              <div className="mt-8 text-center sm:text-left">
                <button
                  type="button"
                  onClick={handleDownloadCv}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#173530]/20 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#173530] shadow-sm transition-all hover:border-[#173530] hover:bg-[#173530] hover:text-white"
                >
                  <DownloadIcon className="h-4 w-4" />
                  <span>Profil & Vita (PDF)</span>
                </button>
                <p className="mt-2 text-center text-[0.65rem] text-[#527267]">
                  Kompakte einseitige Übersicht für Schulleitungen & Gremien
                </p>
              </div>
            </Reveal>
          </div>

          {/* Bio Texte Rechts (8 Cols) */}
          <div className="lg:col-span-8">
            <Reveal>
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#c85d35]">
                {d.about.label}
              </span>
              <h1 className="mt-2 font-serif text-4xl font-medium tracking-tight text-[#173530] sm:text-5xl">
                {d.about.name} {d.about.surname}
              </h1>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#c85d35]">
                {d.about.role}
              </p>

              <blockquote className="mt-6 border-l-2 border-[#e9be5b] pl-5 font-serif text-xl italic leading-relaxed text-[#173530]">
                „{d.about.quote}“
              </blockquote>

              <div className="mt-8 space-y-4 text-base leading-relaxed text-[#527267]">
                {d.about.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== STRUKTURIERTER LEBENSLAUF (CV) ===================== */}
      {cv && (
        <section className="mx-auto mt-24 max-w-7xl px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="border-t border-[#173530]/15 pt-16">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#c85d35]">
                Werdegang & Qualifikation
              </span>
              <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#173530] sm:text-4xl">
                Curriculum Vitae
              </h2>
              <p className="mt-3 max-w-2xl text-base text-[#527267]">
                Stationen aus Schulpraxis, Beratungstätigkeit, universitärer Ausbildung und kontinuierlicher Weiterbildung:
              </p>

              <div className="mt-14 grid gap-12 lg:grid-cols-3">
                {/* 1. Beruflicher Werdegang */}
                <div className="rounded-2xl border border-[#173530]/15 bg-white p-7 shadow-sm">
                  <h3 className="border-b border-[#173530]/10 pb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#173530]">
                    Berufliche Praxis
                  </h3>
                  <div className="mt-6 space-y-6">
                    {cv.career.map((item, idx) => (
                      <div key={idx} className="relative border-l-2 border-[#173530]/20 pl-4">
                        <span className="text-[0.68rem] font-bold text-[#c85d35]">
                          {item.period}
                        </span>
                        <h4 className="mt-1 font-serif text-base font-semibold text-[#173530]">
                          {item.role}
                        </h4>
                        <p className="text-xs font-medium text-[#527267]">
                          {item.institution}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-[#527267]/90">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Ausbildung & Staatsexamina */}
                <div className="rounded-2xl border border-[#173530]/15 bg-white p-7 shadow-sm">
                  <h3 className="border-b border-[#173530]/10 pb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#173530]">
                    Ausbildung & Staatsexamina
                  </h3>
                  <div className="mt-6 space-y-6">
                    {cv.education.map((item, idx) => (
                      <div key={idx} className="relative border-l-2 border-[#173530]/20 pl-4">
                        <span className="text-[0.68rem] font-bold text-[#c85d35]">
                          {item.period}
                        </span>
                        <h4 className="mt-1 font-serif text-base font-semibold text-[#173530]">
                          {item.title}
                        </h4>
                        <p className="text-xs font-medium text-[#527267]">
                          {item.institution}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-[#527267]/90">
                          {item.details}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Zertifikate & Spezialisierungen */}
                <div className="rounded-2xl border border-[#173530]/15 bg-white p-7 shadow-sm">
                  <h3 className="border-b border-[#173530]/10 pb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#173530]">
                    Zertifikate & Expertise
                  </h3>
                  <div className="mt-6 space-y-6">
                    {cv.qualifications.map((item, idx) => (
                      <div key={idx} className="relative border-l-2 border-[#e9be5b] pl-4">
                        <span className="text-[0.68rem] font-bold text-[#173530]">
                          {item.year}
                        </span>
                        <h4 className="mt-1 font-serif text-base font-semibold text-[#173530]">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-[#527267]">
                          {item.details}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ===================== CALL TO ACTION ===================== */}
      <section className="mx-auto mt-24 max-w-5xl px-6 sm:px-10">
        <Reveal className="rounded-2xl bg-[#173530] p-10 text-center text-[#fffaf0] sm:p-14">
          <h2 className="font-serif text-3xl font-medium sm:text-4xl">
            Lassen Sie uns ins Gespräch kommen
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#e9e6da]">
            Ich freue mich über den fachlichen Austausch zu zukunftsorientierter Schulentwicklung und digitaler Unterrichtsqualität.
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => navigate("/kontakt")}
              className="button-primary rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em]"
            >
              <span>Kontakt aufnehmen</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
