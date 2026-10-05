import { useState, useEffect, useCallback } from "react";
import { HeroSlide } from "../types/content";
import { useRoute, RoutePath } from "../router";
import { ChevronLeft, ChevronRight, PauseIcon, PlayIcon, ArrowUpRight } from "./Icons";

interface HeroSlideshowProps {
  slides?: HeroSlide[];
  onSlideChange?: (index: number) => void;
}

export function HeroSlideshow({ slides = [], onSlideChange }: HeroSlideshowProps) {
  const { navigate } = useRoute();
  const activeSlides = slides.filter((s) => s.active);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // prefers-reduced-motion
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
    setCurrentIndex((prev) => {
      const next = (prev + 1) % total;
      onSlideChange?.(next);
      return next;
    });
  }, [total, onSlideChange]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => {
      const prevIdx = (prev - 1 + total) % total;
      onSlideChange?.(prevIdx);
      return prevIdx;
    });
  }, [total, onSlideChange]);

  // Autoplay (8 Sekunden)
  useEffect(() => {
    if (total <= 1 || isPaused || reducedMotion) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(timer);
  }, [total, isPaused, reducedMotion, nextSlide, currentIndex]);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
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
    <div
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
      className="relative overflow-hidden rounded-2xl border border-white/20 bg-[#12221f]/85 p-5 text-white shadow-2xl backdrop-blur-md transition-all duration-300 sm:p-6"
    >
      {/* Top Header: Badge & Controls */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#e9be5b]" />
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#e9be5b]">
            {slide.badge || "Aktueller Impuls"}
          </span>
          <span className="hidden text-[0.65rem] tracking-wider text-[#a9b9b0] sm:inline">
            / {slide.type}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-serif text-xs tracking-wider text-white/70">
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 text-white/50 transition-colors hover:text-[#e9be5b] focus:outline-none"
            aria-label={isPaused ? "Fortsetzen" : "Pausieren"}
          >
            {isPaused ? <PlayIcon className="h-3 w-3" /> : <PauseIcon className="h-3 w-3" />}
          </button>
        </div>
      </div>

      {/* Content: Compact Headline & Teaser */}
      <div
        role="group"
        aria-roledescription="slide"
        aria-label={`Folie ${currentIndex + 1} von ${total}`}
        className="py-3.5"
      >
        <h3 className="font-serif text-lg font-medium leading-snug tracking-tight text-white sm:text-xl">
          {slide.title}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/80 sm:text-[0.82rem]">
          {slide.teaser}
        </p>

        {(slide.date || slide.location) && (
          <p className="mt-2 text-[0.68rem] tracking-wider uppercase text-[#a9b9b0]">
            {slide.date} {slide.date && slide.location && "—"} {slide.location}
          </p>
        )}
      </div>

      {/* Footer: Action & Arrows */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={() => handleCta(slide.ctaLink)}
          className="group inline-flex items-center gap-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#e9be5b] transition-colors hover:text-white focus:outline-none"
        >
          <span>{slide.ctaLabel || "Mehr erfahren"}</span>
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        {total > 1 && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prevSlide}
              className="rounded-full border border-white/20 p-1.5 text-white/70 transition-colors hover:border-[#e9be5b] hover:text-[#e9be5b] focus:outline-none"
              aria-label="Vorherige"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="rounded-full border border-white/20 p-1.5 text-white/70 transition-colors hover:border-[#e9be5b] hover:text-[#e9be5b] focus:outline-none"
              aria-label="Nächste"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {total > 1 && !reducedMotion && !isPaused && (
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
          <div
            key={currentIndex}
            className="h-full bg-[#e9be5b]"
            style={{ animation: "progress 8000ms linear forwards" }}
          />
        </div>
      )}
    </div>
  );
}
