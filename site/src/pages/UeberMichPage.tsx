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
    window.open(d.meta.cvDownloadUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-[#f6f5ef] text-[#12221f]">
      {/* ===================== PAGE HEADER & BIO ===================== */}
      <section className="px-5 pt-36 pb-14 sm:px-8 sm:pt-44 sm:pb-24 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-10 sm:gap-14 lg:grid-cols-12 lg:items-start lg:gap-20">
            {/* Portrait & Meta Links (5 Spalten) */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="portrait-stage mx-auto max-w-sm lg:mx-0">
                  <div className="relative z-10 overflow-hidden bg-[#173530] shadow-xl">
                    <img
                      src={`${DEPLOY_BASE}images/portrait.jpg`}
                      alt={`${d.about.name} ${d.about.surname}`}
                      className="portrait-img h-auto w-full object-cover"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-base font-semibold tracking-[-0.01em] text-[#173530]">
                    {d.about.name} {d.about.surname}
                  </span>
                  <span className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#527267]">
                    {d.about.role}
                  </span>
                </div>

                {/* PDF Download Slot – nur sichtbar, wenn im CMS eine Vita-PDF hinterlegt ist */}
                {d.meta.cvDownloadUrl && (
                <div className="mt-8 border-t border-[#173530]/15 pt-6">
                  <button
                    type="button"
                    onClick={handleDownloadCv}
                    className="button-quiet !border-[#173530]/30 !text-[#173530] hover:!border-[#173530] hover:!bg-[#173530] hover:!text-white inline-flex w-full items-center justify-center gap-2 text-xs"
                  >
                    <DownloadIcon className="h-4 w-4 text-[#c85d35]" />
                    <span>Profil & Vita (PDF herunterladen)</span>
                  </button>
                  <p className="mt-2.5 text-center text-[0.65rem] text-[#527267]">
                    Kompakte einseitige Übersicht für Schulleitungen & Gremien
                  </p>
                </div>
                )}
              </Reveal>
            </div>

            {/* Bio Texte Rechts (7 Spalten) */}
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#c85d35]">
                  {d.about.label}
                </p>
                <h1 className="mt-4 font-serif text-[clamp(2.7rem,5vw,5rem)] leading-[0.94] tracking-[-0.065em] text-[#173530] text-balance">
                  {d.about.headline}
                </h1>

                <blockquote className="my-8 border-l-2 border-[#c85d35] pl-6 font-serif text-[clamp(1.35rem,2.2vw,1.95rem)] italic leading-[1.25] tracking-[-0.03em] text-[#173530] text-balance">
                  „{d.about.quote}“
                </blockquote>

                <div className="space-y-6 text-[0.98rem] leading-7 text-[#5c6962] text-pretty">
                  {d.about.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => navigate("/kontakt")}
                    className="button-primary"
                  >
                    <span>Gespräch anfragen</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STRUKTURIERTER LEBENSLAUF (Warmer Ocker-Block) ===================== */}
      {cv && (
        <section className="bg-[#e9be5b] px-5 py-20 sm:px-8 sm:py-32 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[1280px]">
            <Reveal className="grid gap-8 border-b border-[#173530]/25 pb-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-start lg:pb-16">
              <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#725528]">
                Werdegang & Qualifikation
              </p>
              <div>
                <h2 className="max-w-3xl font-serif text-[clamp(2.5rem,4.8vw,4.6rem)] leading-[0.94] tracking-[-0.06em] text-[#173530] text-balance">
                  Curriculum Vitae
                </h2>
                <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-[#3e492f] text-pretty">
                  Stationen aus Schulpraxis, medienpädagogischer Beratungstätigkeit, universitärer Ausbildung und kontinuierlicher Weiterbildung:
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-10 sm:mt-14 sm:gap-12 lg:grid-cols-3">
              {/* 1. Beruflicher Werdegang */}
              <div className="border-t border-[#173530]/25 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#173530]">
                  Berufliche Praxis
                </h3>
                <div className="mt-8 space-y-8">
                  {cv.career.map((item, idx) => (
                    <div key={idx} className="border-l-2 border-[#173530]/30 pl-4">
                      <span className="font-mono text-[0.68rem] font-bold uppercase text-[#725528]">
                        {item.period}
                      </span>
                      <h4 className="mt-1 font-serif text-lg font-semibold text-[#173530]">
                        {item.role}
                      </h4>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#3e492f]">
                        {item.institution}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[#3e492f]/90">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Ausbildung & Staatsexamina */}
              <div className="border-t border-[#173530]/25 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#173530]">
                  Ausbildung & Examina
                </h3>
                <div className="mt-8 space-y-8">
                  {cv.education.map((item, idx) => (
                    <div key={idx} className="border-l-2 border-[#173530]/30 pl-4">
                      <span className="font-mono text-[0.68rem] font-bold uppercase text-[#725528]">
                        {item.period}
                      </span>
                      <h4 className="mt-1 font-serif text-lg font-semibold text-[#173530]">
                        {item.title}
                      </h4>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#3e492f]">
                        {item.institution}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[#3e492f]/90">
                        {item.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Zertifikate & Spezialisierungen */}
              <div className="border-t border-[#173530]/25 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#173530]">
                  Zertifikate & Expertise
                </h3>
                <div className="mt-8 space-y-8">
                  {cv.qualifications.map((item, idx) => (
                    <div key={idx} className="border-l-2 border-[#173530]/30 pl-4">
                      <span className="font-mono text-[0.68rem] font-bold uppercase text-[#725528]">
                        {item.year}
                      </span>
                      <h4 className="mt-1 font-serif text-lg font-semibold text-[#173530]">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-[#3e492f]">
                        {item.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================== CALL TO ACTION (Signatur Terrakotta) ===================== */}
      <section className="bg-[#c85d35] px-5 py-20 text-[#fffaf0] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1120px] text-center">
          <Reveal>
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.24em] text-[#ffe0a0]">
              Persönlicher Austausch
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.6rem,5.4vw,5.4rem)] leading-[0.95] tracking-[-0.06em] text-white text-balance">
              Lassen Sie uns über Schulentwicklung sprechen.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[0.98rem] leading-7 text-white/85 text-pretty">
              Ob Impulsvortrag, Workshop-Reihe oder Prozessberatung – ich freue mich über den fachlichen Austausch zu zukunftsorientierter Bildungsarbeit.
            </p>
            <div className="mt-10">
              <button
                type="button"
                onClick={() => navigate("/kontakt")}
                className="inline-flex items-center gap-3 border border-white bg-white px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#173530] transition-all duration-300 hover:bg-transparent hover:text-white"
              >
                <span>Kontakt aufnehmen</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
