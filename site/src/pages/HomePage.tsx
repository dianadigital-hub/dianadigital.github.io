import { Content } from "../types/content";
import { useRoute } from "../router";
import { DEPLOY_BASE } from "../deployBase";
import { HeroSlideshow } from "../components/HeroSlideshow";
import { Reveal } from "../components/Reveal";
import { ArrowUpRight, ArrowDown } from "../components/Icons";

interface HomePageProps {
  data: Content;
}

export function HomePage({ data }: HomePageProps) {
  const { navigate } = useRoute();
  const d = data;

  return (
    <>
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#173530] text-[#fffaf0] pt-24 pb-16 sm:pt-28 sm:pb-20">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src={`${DEPLOY_BASE}images/hero.png`}
            alt=""
            className="hero-image h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173530] via-[#173530]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 w-full">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Linke Spalte: Hauptbotschaft der Marke (7 Cols) */}
            <div className="lg:col-span-7">
              <span className="hero-reveal inline-block text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#e9be5b]">
                {d.hero.tagline}
              </span>

              <h1 className="hero-reveal mt-5 font-serif text-4xl font-medium tracking-[-0.04em] text-[#fffaf0] sm:text-5xl sm:leading-[1.12] lg:text-6xl">
                {d.hero.headline}
              </h1>

              <p className="hero-reveal mt-6 max-w-xl text-base leading-relaxed text-[#e9e6da] sm:text-lg">
                {d.hero.subheadline}
              </p>

              <div className="hero-reveal mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/kontakt")}
                  className="button-primary rounded-full px-6 py-3"
                >
                  <span>{d.hero.ctaPrimary}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/angebote")}
                  className="button-quiet rounded-full px-6 py-3"
                >
                  <span>{d.hero.ctaSecondary}</span>
                </button>
              </div>
            </div>

            {/* Rechte Spalte: Redaktionelle Impuls-Bühne / Slideshow (5 Cols) */}
            <div className="hero-reveal lg:col-span-5">
              <HeroSlideshow slides={d.heroSlides} />
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="mt-12 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#a9b9b0]">
            <span className="h-4 w-4 animate-bounce text-[#e9be5b]">
              <ArrowDown />
            </span>
            <span>{d.hero.scrollHint}</span>
          </div>
        </div>
      </section>

      {/* ===================== PHILOSOPHIE / HALTUNG ===================== */}
      <section className="bg-[#f6f5ef] py-20 text-[#12221f] sm:py-28">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <Reveal>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#c85d35]">
              {d.philosophy.label}
            </span>
            <blockquote className="mt-4 font-serif text-2xl font-medium leading-snug tracking-tight text-[#173530] sm:text-3xl lg:text-4xl">
              „{d.philosophy.quote}“
            </blockquote>
            <p className="mt-6 text-base leading-relaxed text-[#527267] sm:text-lg">
              {d.philosophy.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===================== ANGEBOTE DIGEST ===================== */}
      <section className="border-t border-[#173530]/10 bg-[#fbfaf6] py-20 text-[#12221f] sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#527267]">
                {d.services.label}
              </span>
              <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#173530] sm:text-4xl">
                {d.services.headline}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/angebote")}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#173530] hover:text-[#c85d35]"
            >
              <span>Alle Formate & Ablauf ansehen</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {d.services.items.map((item, idx) => (
              <Reveal key={item.number} delay={idx * 120} className="flex flex-col justify-between rounded-xl border border-[#173530]/10 bg-white p-8 shadow-sm transition-all hover:border-[#173530]/30 hover:shadow-md">
                <div>
                  <span className="font-serif text-2xl font-bold text-[#e9be5b]">
                    {item.number}
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-semibold text-[#173530]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#527267]">
                    {item.description}
                  </p>
                </div>
                <div className="mt-8 border-t border-[#173530]/10 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate("/angebote")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#173530] hover:text-[#c85d35]"
                  >
                    <span>Details & Bausteine</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Fokus Box */}
          <Reveal className="mt-12 rounded-2xl bg-[#173530] p-8 text-[#fffaf0] sm:p-12">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#e9be5b]">
              {d.services.focus.label}
            </span>
            <h3 className="mt-2 font-serif text-2xl font-medium sm:text-3xl">
              {d.services.focus.title}
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#e9e6da] sm:text-base">
              {d.services.focus.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===================== PROJEKTE HIGHLIGHTS ===================== */}
      <section className="bg-[#f6f5ef] py-20 text-[#12221f] sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#527267]">
                {d.projects.label}
              </span>
              <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#173530] sm:text-4xl">
                {d.projects.headline}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/projekte")}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#173530] hover:text-[#c85d35]"
            >
              <span>Alle Fallstudien im Projektarchiv</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-12 divide-y divide-[#173530]/15">
            {d.projects.items.slice(0, 3).map((item, idx) => (
              <Reveal key={item.title} delay={idx * 100}>
                <div className="project-row flex flex-col justify-between gap-4 py-8 lg:flex-row lg:items-baseline">
                  <div className="w-full shrink-0 lg:w-56">
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#c85d35]">
                      {item.label}
                    </span>
                  </div>
                  <div className="max-w-2xl flex-1">
                    <h3 className="font-serif text-xl font-semibold text-[#173530] sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#527267]">
                      {item.copy}
                    </p>
                    {item.note && (
                      <p className="mt-2 text-xs italic text-[#527267]/80">
                        {item.note}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 self-start pt-2">
                    <button
                      type="button"
                      onClick={() => navigate("/projekte")}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#173530]/20 px-4 py-1.5 text-xs font-semibold text-[#173530] hover:border-[#173530] hover:bg-[#173530] hover:text-white transition-colors"
                    >
                      <span>Mehr erfahren</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ÜBER MICH & QUALIFIKATION TEASER ===================== */}
      <section className="border-t border-[#173530]/10 bg-[#fbfaf6] py-20 text-[#12221f] sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Portrait (5 Cols) */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="portrait-stage mx-auto max-w-sm">
                  <div className="relative z-10 overflow-hidden rounded-lg bg-[#173530] shadow-xl">
                    <img
                      src={`${DEPLOY_BASE}images/portrait.jpg`}
                      alt={`${d.about.name} ${d.about.surname}`}
                      className="portrait-img h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Bio & Vita Teaser (7 Cols) */}
            <div className="lg:col-span-7">
              <Reveal>
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#527267]">
                  {d.about.label}
                </span>
                <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#173530] sm:text-4xl">
                  {d.about.name} {d.about.surname}
                </h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#c85d35]">
                  {d.about.role}
                </p>

                <p className="mt-5 text-base leading-relaxed text-[#527267]">
                  {d.about.paragraphs[0]}
                </p>

                {/* Qualifikations-Auszug */}
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {d.qualifications.items.slice(0, 2).map(([title, desc], idx) => (
                    <div key={idx} className="rounded-lg border border-[#173530]/10 bg-white p-4">
                      <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-[#173530]">
                        {title}
                      </h4>
                      <p className="mt-1 text-xs text-[#527267]">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => navigate("/ueber-mich")}
                    className="inline-flex items-center gap-2 rounded-full bg-[#173530] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#fffaf0] shadow transition-all hover:bg-[#12221f]"
                  >
                    <span>Ausführliche Biografie & Lebenslauf</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/kontakt")}
                    className="inline-flex items-center gap-2 rounded-full border border-[#173530]/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#173530] hover:bg-[#173530]/5"
                  >
                    <span>Kontakt aufnehmen</span>
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FAST CONTACT BANNER ===================== */}
      <section className="bg-[#173530] py-16 text-[#fffaf0] sm:py-20">
        <div className="mx-auto max-w-5xl px-6 text-center sm:px-10">
          <Reveal>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#e9be5b]">
              Zusammenarbeit & Schulentwicklung
            </span>
            <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">
              Lassen Sie uns Schule zukunftsfähig weiterdenken.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#e9e6da]">
              Ob Fortbildung für Ihr Kollegium, Prozessbegleitung einer Steuergruppe oder fachlicher Austausch – ich freue mich auf Ihre Nachricht.
            </p>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => navigate("/kontakt")}
                className="button-primary rounded-full px-8 py-3.5 text-xs"
              >
                <span>Jetzt Nachricht senden</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
