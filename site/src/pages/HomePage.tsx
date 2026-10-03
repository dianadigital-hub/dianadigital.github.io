import { useState } from "react";
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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const activeSlides = d.heroSlides?.filter((s) => s.active) || [];

  return (
    <>
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative flex min-h-[94vh] flex-col justify-between overflow-hidden bg-[#12221f] px-5 pb-8 pt-28 text-white sm:px-8 sm:pb-12 sm:pt-36 lg:min-h-screen lg:px-12 lg:pb-16 lg:pt-40">
        {/* Cinematic Photographic Background with smooth crossfade */}
        {activeSlides.length > 0 ? (
          activeSlides.map((slide, idx) => {
            const imgSrc = slide.image
              ? slide.image.startsWith("http")
                ? slide.image
                : `${DEPLOY_BASE}${slide.image.replace(/^\//, "")}`
              : `${DEPLOY_BASE}images/hero.png`;
            return (
              <img
                key={slide.id || idx}
                src={imgSrc}
                alt={slide.imageAlt || slide.title || d.hero.imageAlt}
                className={`hero-image absolute inset-0 h-full w-full object-cover object-[60%_center] transition-opacity duration-1000 ease-in-out ${
                  idx === currentSlideIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />
            );
          })
        ) : (
          <img
            src={`${DEPLOY_BASE}images/hero.png`}
            alt={d.hero.imageAlt}
            className="hero-image absolute inset-0 h-full w-full object-cover object-[60%_center]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#12221f]/95 via-[#12221f]/85 to-[#12221f]/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12221f] via-transparent to-transparent pointer-events-none" />

        {/* Hero Top / Main Content Area */}
        <div className="relative z-10 mx-auto w-full max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            {/* Left: Signature Brand & Headline Typography (8 Cols) */}
            <div className="max-w-4xl lg:col-span-8">
              <p className="hero-reveal mb-4 text-[0.67rem] font-semibold uppercase tracking-[0.24em] text-[#e9be5b] sm:mb-5">
                {d.hero.tagline}
              </p>
              <h1 className="hero-reveal hero-brand font-serif text-[clamp(5.7rem,17vw,15rem)] leading-[0.67] tracking-[-0.095em]">
                {d.meta.brand}
              </h1>
              <p className="hero-reveal mt-7 max-w-2xl text-[clamp(1.45rem,3vw,2.65rem)] font-medium leading-[1.08] tracking-[-0.045em] text-white sm:mt-10 text-balance">
                {d.hero.headline}
              </p>
              <p className="hero-reveal mt-5 max-w-xl text-sm leading-6 text-white/80 sm:text-[0.98rem] sm:leading-7 text-pretty">
                {d.hero.subheadline}
              </p>

              <div className="hero-reveal mt-7 flex flex-wrap gap-3 sm:mt-9">
                <button
                  type="button"
                  onClick={() => navigate("/kontakt")}
                  className="button-primary"
                >
                  <span>{d.hero.ctaPrimary}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/angebote")}
                  className="button-quiet"
                >
                  <span>{d.hero.ctaSecondary}</span>
                </button>
              </div>
            </div>

            {/* Right: Floating Sleek News & Highlight Capsule (4 Cols) */}
            <div className="hero-reveal lg:col-span-4 lg:mb-2">
              <HeroSlideshow slides={d.heroSlides} onSlideChange={setCurrentSlideIndex} />
            </div>
          </div>
        </div>

        {/* Hero Bottom / Scroll Hint */}
        <div className="relative z-10 mx-auto w-full max-w-[1400px] pt-8">
          <button
            type="button"
            onClick={() => {
              document.querySelector("#haltung")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex w-fit items-center gap-3 text-[0.63rem] font-semibold uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 transition-colors duration-300 group-hover:border-[#e9be5b] group-hover:text-[#e9be5b]">
              <ArrowDown />
            </span>
            <span>{d.hero.scrollHint}</span>
          </button>
        </div>
      </section>

      {/* ===================== PHILOSOPHIE / HALTUNG ===================== */}
      <section id="haltung" className="relative overflow-hidden bg-[#dce8dc] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <span
          className="absolute -right-6 -top-14 font-serif text-[15rem] leading-none tracking-[-0.13em] text-[#b8d0bd]/65 sm:text-[23rem] pointer-events-none select-none"
          aria-hidden="true"
        >
          “
        </span>
        <Reveal className="relative mx-auto max-w-[1120px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(150px,0.35fr)_1fr] lg:gap-20">
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#527267]">
              {d.philosophy.label}
            </p>
            <div>
              <blockquote className="max-w-4xl font-serif text-[clamp(2.15rem,4.6vw,4.55rem)] leading-[1.02] tracking-[-0.055em] text-[#173530] text-balance">
                {d.philosophy.quote}
              </blockquote>
              <p className="mt-8 max-w-2xl text-[0.98rem] leading-7 text-[#315448] text-pretty">
                {d.philosophy.body}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================== ANGEBOTE DIGEST ===================== */}
      <section className="bg-[#f6f5ef] px-5 py-24 text-[#12221f] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="grid gap-5 border-b border-[#173530]/20 pb-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-end lg:pb-16">
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#c85d35]">
              {d.services.label}
            </p>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <h2 className="max-w-4xl font-serif text-[clamp(2.7rem,5.8vw,5.8rem)] leading-[0.93] tracking-[-0.065em] text-[#173530] text-balance">
                  {d.services.headline}
                </h2>
                <p className="mt-6 max-w-xl text-[0.98rem] leading-7 text-[#5c6962] text-pretty">
                  {d.services.subheadline}
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate("/angebote")}
                className="inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#173530] hover:text-[#c85d35]"
              >
                <span>Alle Formate ansehen</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>

          {/* Service Rows */}
          <div>
            {d.services.items.map((service) => (
              <Reveal key={service.number}>
                <article className="group grid gap-5 border-b border-[#173530]/20 py-9 sm:grid-cols-[86px_1fr_auto] sm:items-start sm:gap-8 sm:py-11">
                  <span className="font-serif text-2xl tracking-[-0.06em] text-[#c85d35]">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-[clamp(1.8rem,3.2vw,3rem)] leading-[1.05] tracking-[-0.055em] text-[#173530] text-balance">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5c6962] sm:text-[0.95rem] sm:leading-7 text-pretty">
                      {service.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/angebote")}
                    className="inline-flex w-fit items-center gap-2 self-start text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-[#173530] transition-transform duration-300 hover:translate-x-1 sm:pt-2"
                  >
                    <span>{service.action}</span>
                    <ArrowUpRight className="h-4 w-4 text-[#c85d35]" />
                  </button>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Focus Block */}
          <Reveal className="grid gap-5 pt-12 lg:grid-cols-[0.65fr_1.35fr] lg:pt-16">
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#c85d35]">
              {d.services.focus.label}
            </p>
            <div>
              <h3 className="font-serif text-[clamp(1.9rem,3.5vw,3.2rem)] leading-[1.05] tracking-[-0.055em] text-[#173530] text-balance">
                {d.services.focus.title}
              </h3>
              <p className="mt-5 max-w-2xl text-[0.98rem] leading-7 text-[#5c6962] text-pretty">
                {d.services.focus.description}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== PROJEKTE HIGHLIGHTS ===================== */}
      <section className="bg-[#173530] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="grid gap-5 border-b border-white/20 pb-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-end lg:pb-16">
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#e9be5b]">
              {d.projects.label}
            </p>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <h2 className="max-w-4xl font-serif text-[clamp(2.7rem,5.8vw,5.8rem)] leading-[0.93] tracking-[-0.065em] text-white text-balance">
                {d.projects.headline}
              </h2>
              <button
                type="button"
                onClick={() => navigate("/projekte")}
                className="inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#e9be5b] hover:text-white"
              >
                <span>Alle Fallstudien ansehen</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>

          {/* Project Rows */}
          <div>
            {d.projects.items.slice(0, 3).map((project) => (
              <Reveal key={project.title}>
                <article className="project-row grid gap-5 border-b border-white/20 py-9 sm:grid-cols-[200px_1fr_auto] sm:items-baseline sm:gap-8 sm:py-11">
                  <span className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#e9be5b]">
                    {project.label}
                  </span>
                  <div>
                    <h3 className="font-serif text-[clamp(1.7rem,2.8vw,2.65rem)] leading-[1.08] tracking-[-0.055em] text-white text-balance">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-[0.95rem] sm:leading-7 text-pretty">
                      {project.copy}
                    </p>
                    {project.note && (
                      <p className="mt-3 text-xs leading-5 text-white/60 text-pretty">
                        {project.note}
                      </p>
                    )}
                  </div>
                  <div className="sm:self-start sm:pt-2">
                    <button
                      type="button"
                      onClick={() => navigate("/projekte")}
                      className="button-quiet text-xs"
                    >
                      <span>Mehr erfahren</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== QUALIFIKATION & ERFAHRUNG ===================== */}
      <section className="bg-[#f6f5ef] px-5 py-24 text-[#12221f] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="grid gap-5 border-b border-[#173530]/20 pb-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-end lg:pb-16">
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#c85d35]">
              {d.qualifications.label}
            </p>
            <h2 className="max-w-4xl font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] tracking-[-0.06em] text-[#173530] text-balance">
              {d.qualifications.headline}
            </h2>
          </Reveal>

          <div>
            {d.qualifications.items.map(([topic, description]) => (
              <Reveal key={topic}>
                <div className="grid gap-4 border-b border-[#173530]/20 py-7 sm:grid-cols-[minmax(220px,0.85fr)_1.15fr] sm:gap-8 sm:py-9">
                  <h3 className="font-serif text-lg leading-snug tracking-[-0.035em] text-[#173530] sm:text-xl">
                    {topic}
                  </h3>
                  <p className="text-sm leading-6 text-[#5c6962] sm:text-[0.95rem] sm:leading-7 text-pretty">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ÜBER MICH ===================== */}
      <section className="bg-[#fbfaf6] px-5 py-24 text-[#12221f] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Portrait Stage */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="portrait-stage mx-auto max-w-sm">
                  <div className="relative z-10 overflow-hidden bg-[#173530] shadow-xl">
                    <img
                      src={`${DEPLOY_BASE}images/portrait.jpg`}
                      alt={`${d.about.name} ${d.about.surname}`}
                      className="portrait-img h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* About Content */}
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#c85d35]">
                  {d.about.label}
                </p>
                <h2 className="mt-3 font-serif text-[clamp(2.7rem,5.8vw,5.8rem)] leading-[0.92] tracking-[-0.065em] text-[#173530]">
                  {d.about.name} {d.about.surname}
                </h2>
                <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#c85d35]">
                  {d.about.role}
                </p>

                <p className="mt-7 font-serif text-[clamp(1.4rem,2.4vw,2.1rem)] italic leading-[1.25] tracking-[-0.03em] text-[#173530]">
                  „{d.about.quote}“
                </p>

                <div className="mt-8 space-y-5 text-sm leading-6 text-[#5c6962] sm:text-[0.95rem] sm:leading-7 text-pretty">
                  {d.about.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => navigate("/ueber-mich")}
                    className="button-primary"
                  >
                    <span>Ausführlicher Werdegang (CV)</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/kontakt")}
                    className="button-quiet !border-[#173530]/30 !text-[#173530] hover:!border-[#173530] hover:!bg-[#173530] hover:!text-white"
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
      <section className="bg-[#12221f] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1120px] text-center">
          <Reveal>
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.24em] text-[#e9be5b]">
              Zusammenarbeit & Schulentwicklung
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.6rem,5.4vw,5.4rem)] leading-[0.95] tracking-[-0.06em] text-white text-balance">
              Lassen Sie uns Schule zukunftsfähig weiterdenken.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[0.98rem] leading-7 text-white/80 text-pretty">
              Ob Fortbildung für Ihr Kollegium, Prozessbegleitung einer Steuergruppe oder fachlicher Austausch – ich freue mich auf Ihre Nachricht.
            </p>
            <div className="mt-10">
              <button
                type="button"
                onClick={() => navigate("/kontakt")}
                className="button-primary"
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
