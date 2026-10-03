import { useState, useEffect, useCallback } from "react";
import { HeroSlide } from "../types/content";
import { useRoute, RoutePath } from "../router";
import { ChevronLeft, ChevronRight, PauseIcon, PlayIcon, ArrowUpRight } from "./Icons";

interface HeroSlideshowProps {
  slides?: HeroSlide[];
}

export function HeroSlideshow({ slides = [] }: HeroSlideshowProps) {
  const { navigate } = useRoute();
  const activeSlides = slides.filter((s) => s.active);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Erkennung von prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const total = activeSlides.length;

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay Timer (8 Sekunden, pausiert bei Hover, Focus oder reduced-motion)
  useEffect(() => {
    if (total <= 1 || isPaused || reducedMotion) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(timer);
  }, [total, isPaused, reducedMotion, nextSlide, currentIndex]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const delta = touchStart - touchEnd;
    if (delta > 50) {
      nextSlide();
    } else if (delta < -50) {
      prevSlide();
    }
    setTouchStart(null);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      prevSlide();
    }
  };

  if (total === 0) return null;

  const slide = activeSlides[currentIndex];

  const handleCta = (link: string) => {
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
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Aktuelle Impulse und Termine"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-hidden rounded-2xl border border-[#173530]/20 bg-[#173530] p-6 text-[#fffaf0] shadow-xl transition-all duration-300 sm:p-8"
    >
      {/* Top Bar: Eyebrow Badge & Slide Counter */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center rounded-full bg-[#e9be5b]/20 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#e9be5b]">
            {slide.badge || "Aktueller Impuls"}
          </span>
          <span className="hidden text-xs text-[#a9b9b0] sm:inline">
            · {slide.type}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Slide Zähler in edler Serife */}
          <span className="font-serif text-sm tracking-wider text-[#e9e6da]">
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>

          {/* Pause / Play Button */}
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="rounded p-1 text-[#a9b9b0] transition-colors hover:text-[#e9be5b] focus:outline-none"
            aria-label={isPaused ? "Automatischen Wechsel fortsetzen" : "Automatischen Wechsel pausieren"}
          >
            {isPaused ? <PlayIcon className="h-3.5 w-3.5" /> : <PauseIcon className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Slide Content Area */}
      <div
        role="group"
        aria-roledescription="slide"
        aria-label={`Folie ${currentIndex + 1} von ${total}`}
        className="py-5"
      >
        <h3 className="font-serif text-xl font-medium tracking-tight text-[#fffaf0] sm:text-2xl sm:leading-snug">
          {slide.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-[#e9e6da]/90">
          {slide.teaser}
        </p>

        {(slide.date || slide.location) && (
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#a9b9b0]">
            {slide.date && <span>📅 {slide.date}</span>}
            {slide.date && slide.location && <span>·</span>}
            {slide.location && <span>📍 {slide.location}</span>}
          </div>
        )}
      </div>

      {/* Bottom Controls: CTA Button & Prev/Next Arrows */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={() => handleCta(slide.ctaLink)}
          className="group inline-flex items-center gap-1.5 rounded-full bg-[#e9be5b] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#173530] transition-all hover:scale-[1.02] hover:bg-[#f3cc70] focus:outline-none"
        >
          <span>{slide.ctaLabel || "Mehr erfahren"}</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        {total > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevSlide}
              className="rounded-full border border-white/20 p-2 text-white transition-colors hover:border-[#e9be5b] hover:text-[#e9be5b] focus:outline-none"
              aria-label="Vorheriger Impuls"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="rounded-full border border-white/20 p-2 text-white transition-colors hover:border-[#e9be5b] hover:text-[#e9be5b] focus:outline-none"
              aria-label="Nächster Impuls"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Linearer Zeitbalken am unteren Rand (wird nur bei laufendem Autoplay animiert) */}
      {total > 1 && !reducedMotion && !isPaused && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
          <div
            key={currentIndex}
            className="h-full bg-[#e9be5b]"
            style={{
              animation: "progress 8000ms linear forwards",
            }}
          />
        </div>
      )}
    </section>
  );
}
