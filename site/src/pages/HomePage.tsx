import { useState, useEffect, useCallback, useMemo } from "react";
import { Content } from "../types/content";
import { useRoute, RoutePath } from "../router";
import { DEPLOY_BASE } from "../deployBase";
import { Reveal } from "../components/Reveal";
import { ArrowUpRight, ArrowDown, ChevronLeft, ChevronRight, PauseIcon, PlayIcon } from "../components/Icons";

interface HomePageProps {
  data: Content;
}

interface HeroStoryItem {
  id: string;
  tagline: string;
  headline: string;
  subheadline: string;
  image: string;
  imageAlt: string;
  ctaPrimaryLabel: string;
  ctaPrimaryLink: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryLink?: string;
}

export function HomePage({ data }: HomePageProps) {
  const { navigate } = useRoute();
  const d = data;

  // Erstelle die Liste der Hero-Stories:
  // Folie 0 ist das fundamentale Marken-Leitbild (Startzustand aus Version 1).
  // Danach folgen die thematischen Bild- & Themen-Geschichten.
  const stories: HeroStoryItem[] = useMemo(() => {
    const list: HeroStoryItem[] = [
      {
        id: "brand-intro",
        tagline: d.hero.tagline,
        headline: d.hero.headline,
        subheadline: d.hero.subheadline,
        image: "images/hero.webp",
        imageAlt: d.hero.imageAlt,
        ctaPrimaryLabel: d.hero.ctaPrimary,
        ctaPrimaryLink: "/kontakt",
        ctaSecondaryLabel: d.hero.ctaSecondary,
        ctaSecondaryLink: "/angebote",
      },
    ];

    if (d.heroSlides && d.heroSlides.length > 0) {
      d.heroSlides
        .filter((s) => s.active)
        .forEach((s) => {
          list.push({
            id: s.id,
            tagline: s.badge ? `${s.badge} · ${s.type}` : s.type,
            headline: s.title,
            subheadline: s.teaser,
            image: s.image || "images/hero.webp",
            imageAlt: s.imageAlt || s.title,
            ctaPrimaryLabel: s.ctaLabel || "Mehr erfahren",
            ctaPrimaryLink: s.ctaLink || "/projekte",
            ctaSecondaryLabel: "Alle Angebote",
            ctaSecondaryLink: "/angebote",
          });
        });
    }

    return list;
  }, [d]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const total = stories.length;

  const goToSlide = useCallback(
    (nextIdx: number) => {
      if (isTransitioning || nextIdx === currentIndex) return;
      setIsTransitioning(true);
      // Nach 400ms Text-Ausblendung wird der Index gewechselt und der neue Text eingeblendet
      setTimeout(() => {
        setCurrentIndex(nextIdx);
        setIsTransitioning(false);
      }, 450);
    },
    [currentIndex, isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % total);
  }, [currentIndex, goToSlide, total]);

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + total) % total);
  }, [currentIndex, goToSlide, total]);

  // Autoplay (12 Sekunden Verweildauer)
  useEffect(() => {
    if (total <= 1 || isPaused || reducedMotion) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 12000);

    return () => clearInterval(timer);
  }, [total, isPaused, reducedMotion, nextSlide]);

  const current = stories[currentIndex];

  const handleLink = (link: string) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else if (link.startsWith("#/")) {
      navigate(link.replace(/^#/, "") as RoutePath);
    } else if (link.startsWith("/")) {
      navigate(link as RoutePath);
    } else {
      navigate(("/" + link) as RoutePath);
    }
  };

  return (
    <>
      {/* ===================== HERO SECTION ===================== */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative flex min-h-[94vh] flex-col justify-between overflow-hidden bg-[#12221f] px-5 pb-8 pt-28 text-white sm:px-8 sm:pb-12 sm:pt-36 lg:min-h-screen lg:px-12 lg:pb-16 lg:pt-40"
      >
        {/* ================= BACKGROUND IMAGES (Crossfade) ================= */}
        {stories.map((story, idx) => {
          const imgSrc = story.image.startsWith("http")
            ? story.image
            : `${DEPLOY_BASE}${story.image.replace(/^\//, "")}`;
          return (
            <img
              key={story.id || idx}
              src={imgSrc}
              alt={story.imageAlt}
              className={`hero-image absolute inset-0 h-full w-full object-cover object-[60%_center] transition-opacity duration-1000 ease-in-out ${
                idx === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            />
          );
        })}

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#12221f]/95 via-[#12221f]/85 to-[#12221f]/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12221f] via-transparent to-transparent pointer-events-none" />

        {/* ================= MAIN EDITORIAL HERO CONTENT ================= */}
        <div className="relative z-10 mx-auto w-full max-w-[1400px]">
          <div className="max-w-4xl">
            {/* Steady Brand Title */}
            <h1 className="hero-reveal hero-brand font-serif text-[clamp(5.7rem,17vw,15rem)] leading-[0.67] tracking-[-0.095em]">
              {d.meta.brand}
            </h1>

            {/* Dynamic Animated Content Slot */}
            <div
              className={`transition-all duration-500 ease-out ${
                isTransitioning
                  ? "-translate-y-3 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              {/* Tagline / Eyebrow */}
              <p className="mt-8 text-[0.67rem] font-semibold uppercase tracking-[0.24em] text-[#e9be5b] sm:mt-10">
                {current.tagline}
              </p>

              {/* Dynamic Headline */}
              <p className="mt-4 max-w-2xl text-[clamp(1.45rem,3vw,2.65rem)] font-medium leading-[1.08] tracking-[-0.045em] text-white sm:mt-6 text-balance">
                {current.headline}
              </p>

              {/* Dynamic Subheadline */}
              <p className="mt-5 max-w-xl text-sm leading-6 text-white/80 sm:text-[0.98rem] sm:leading-7 text-pretty">
                {current.subheadline}
              </p>

              {/* Dynamic Action Buttons */}
              <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
                <button
                  type="button"
                  onClick={() => handleLink(current.ctaPrimaryLink)}
                  className="button-primary"
                >
                  <span>{current.ctaPrimaryLabel}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                {current.ctaSecondaryLabel && current.ctaSecondaryLink && (
                  <button
                    type="button"
                    onClick={() => handleLink(current.ctaSecondaryLink!)}
                    className="button-quiet"
                  >
                    <span>{current.ctaSecondaryLabel}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= HERO BOTTOM CONTROLS & PAGINATION ================= */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          {/* Scroll Hint Left */}
          <button
            type="button"
            onClick={() => {
              document.querySelector("#haltung")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-3 text-[0.63rem] font-semibold uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 transition-colors duration-300 group-hover:border-[#e9be5b] group-hover:text-[#e9be5b]">
              <ArrowDown />
            </span>
            <span>{d.hero.scrollHint}</span>
          </button>

          {/* Minimal Editorial Slide Pagination Right */}
          {total > 1 && (
            <div className="flex items-center gap-4">
              {/* Progress Line Bars */}
              <div className="flex items-center gap-1.5">
                {stories.map((story, sIdx) => {
                  const isActive = sIdx === currentIndex;
                  return (
                    <button
                      key={story.id}
                      type="button"
                      onClick={() => goToSlide(sIdx)}
                      className="group relative py-2 focus:outline-none"
                      aria-label={`Zu Thema ${sIdx + 1} wechseln`}
                    >
                      <div
                        className={`h-0.5 transition-all duration-500 ${
                          isActive
                            ? "w-8 bg-[#e9be5b]"
                            : "w-4 bg-white/30 group-hover:bg-white/60"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Counter Number */}
              <span className="font-serif text-xs tracking-widest text-white/70">
                {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>

              {/* Arrows & Pause Button */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="rounded-full border border-white/20 p-1.5 text-white/70 transition-colors hover:border-[#e9be5b] hover:text-[#e9be5b] focus:outline-none"
                  aria-label="Vorheriges Thema"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="rounded-full border border-white/20 p-1.5 text-white/70 transition-colors hover:border-[#e9be5b] hover:text-[#e9be5b] focus:outline-none"
                  aria-label="Nächstes Thema"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-1 text-white/40 transition-colors hover:text-[#e9be5b] focus:outline-none"
                  aria-label={isPaused ? "Wechsel fortsetzen" : "Wechsel pausieren"}
                >
                  {isPaused ? <PlayIcon className="h-3 w-3" /> : <PauseIcon className="h-3 w-3" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Global Subtle Progress Line across the very bottom */}
        {total > 1 && !reducedMotion && !isPaused && (
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5 pointer-events-none">
            <div
              key={currentIndex}
              className="h-full bg-[#e9be5b]/70"
              style={{ animation: "progress 12000ms linear forwards" }}
            />
          </div>
        )}
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
        <div className="mx-auto max-w-[1280px]">
          <Reveal className="grid gap-8 border-b border-[#173530]/20 pb-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-start lg:pb-16">
            <div className="flex flex-col items-start gap-4">
              <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#c85d35]">
                {d.services.label}
              </p>
              <button
                type="button"
                onClick={() => navigate("/angebote")}
                className="group inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#173530] transition-colors hover:text-[#c85d35]"
              >
                <span>Alle Formate ansehen</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#c85d35] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>

            <div>
              <h2 className="max-w-3xl font-serif text-[clamp(2.7rem,5.5vw,5.5rem)] leading-[0.94] tracking-[-0.065em] text-[#173530] text-balance">
                {d.services.headline}
              </h2>
              <p className="mt-6 max-w-xl text-[0.98rem] leading-7 text-[#5c6962] text-pretty">
                {d.services.subheadline}
              </p>
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
      <section className="bg-[#173530] px-5 py-24 text-[#f6f5ef] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1280px]">
          <Reveal className="grid gap-8 border-b border-white/20 pb-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-start lg:pb-16">
            <div className="flex flex-col items-start gap-4">
              <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#e9be5b]">
                {d.projects.label}
              </p>
              <button
                type="button"
                onClick={() => navigate("/projekte")}
                className="group inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#e9be5b] transition-colors hover:text-white"
              >
                <span>Alle Fallstudien ansehen</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#e9be5b] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
            <div>
              <h2 className="max-w-3xl font-serif text-[clamp(2.7rem,5.5vw,5.5rem)] leading-[0.94] tracking-[-0.065em] text-white text-balance">
                {d.projects.headline}
              </h2>
            </div>
          </Reveal>

          {/* Project Rows */}
          <div className="mt-2">
            {d.projects.items.slice(0, 3).map((project, index) => (
              <Reveal key={project.title} delay={index * 80}>
                <article className="project-row group grid gap-5 border-b border-white/20 py-9 lg:grid-cols-[200px_1fr_0.75fr] lg:gap-10 lg:py-12">
                  <p className="pr-4 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#a9c6b0] break-words">
                    {project.label}
                  </p>
                  <div>
                    <h3 className="font-serif text-[clamp(1.75rem,3vw,2.85rem)] leading-[1.08] tracking-[-0.045em] text-balance text-white">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-[0.94rem] leading-7 text-white/72 text-pretty">
                      {project.copy}
                    </p>
                  </div>
                  <div className="self-start border-l border-[#e9be5b]/70 pl-4 lg:mt-1">
                    <p className="text-sm leading-6 text-[#e9be5b] text-pretty">
                      {project.note}
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate("/projekte")}
                      className="mt-3 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:text-[#e9be5b]"
                    >
                      <span>Projekt ansehen</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ÜBER MICH ===================== */}
      <section className="bg-[#f6f5ef] px-5 py-24 text-[#12221f] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1280px]">
          <Reveal className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-20">
            <div>
              <div className="portrait-stage mx-auto max-w-sm lg:mx-0">
                <div className="relative z-10 overflow-hidden bg-[#173530] shadow-xl">
                  <img
                    src={`${DEPLOY_BASE}images/portrait.jpg`}
                    alt={`${d.about.name} ${d.about.surname}`}
                    className="portrait-img h-auto w-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 pr-4">
                <span className="text-sm font-semibold tracking-[-0.01em] text-[#173530]">
                  {d.about.name} {d.about.surname}
                </span>
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-[#527267]">
                  {d.about.role}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#c85d35]">
                {d.about.label}
              </p>
              <h2 className="mt-6 max-w-3xl font-serif text-[clamp(2.5rem,5.15vw,5.25rem)] leading-[0.95] tracking-[-0.067em] text-[#173530] text-balance">
                {d.about.headline}
              </h2>
              <div className="mt-9 grid max-w-4xl gap-x-14 gap-y-7 text-[0.97rem] leading-7 text-[#5c6962] sm:grid-cols-2 text-pretty">
                {d.about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
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
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-20 border-l-2 border-[#c85d35] pl-6 sm:ml-[35%] sm:pl-8 lg:mt-28">
            <blockquote className="max-w-3xl font-serif text-[clamp(1.85rem,3.7vw,3.65rem)] leading-[1.05] tracking-[-0.055em] text-[#173530] text-balance">
              “{d.about.quote}”
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ===================== QUALIFIKATION & ERFAHRUNG (Warmer Ocker-Block) ===================== */}
      <section className="bg-[#e9be5b] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <Reveal>
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-[#725528]">
              {d.qualifications.label}
            </p>
            <h2 className="mt-5 max-w-md font-serif text-[clamp(2.6rem,4.3vw,4.4rem)] leading-[0.94] tracking-[-0.06em] text-[#173530] text-balance">
              {d.qualifications.headline}
            </h2>
          </Reveal>
          <div className="border-t border-[#173530]/25">
            {d.qualifications.items.map(([title, copy], index) => (
              <Reveal key={title} delay={index * 75}>
                <article className="grid gap-3 border-b border-[#173530]/25 py-7 sm:grid-cols-[1fr_1.15fr] sm:gap-8 sm:py-8">
                  <h3 className="font-serif text-[1.35rem] leading-6 tracking-[-0.035em] text-[#173530] text-balance">
                    {title}
                  </h3>
                  <p className="text-sm leading-6 text-[#3e492f] text-pretty">
                    {copy}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAST CONTACT BANNER (Signatur Terrakotta) ===================== */}
      <section className="bg-[#c85d35] px-5 py-24 text-[#fffaf0] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-[1120px] text-center">
          <Reveal>
            <p className="text-[0.67rem] font-semibold uppercase tracking-[0.24em] text-[#ffe0a0]">
              Zusammenarbeit & Schulentwicklung
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.6rem,5.4vw,5.4rem)] leading-[0.95] tracking-[-0.06em] text-white text-balance">
              Lassen Sie uns Schule zukunftsfähig weiterdenken.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[0.98rem] leading-7 text-white/85 text-pretty">
              Ob Fortbildung für Ihr Kollegium, Prozessbegleitung einer Steuergruppe oder fachlicher Austausch – ich freue mich auf Ihre Nachricht.
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
    </>
  );
}
