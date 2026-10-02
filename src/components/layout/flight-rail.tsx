"use client";

import { useEffect, useState } from "react";

const STOPS = [
  { id: "hero", label: "Home" },
  { id: "studio", label: "Studio" },
  { id: "work", label: "Work" },
  { id: "films", label: "Films" },
  { id: "contact", label: "Contact" },
];

export function FlightRail() {
  const [activeStop, setActiveStop] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const currentScroll = window.scrollY;
      const progress = Math.min(1, Math.max(0, currentScroll / scrollable));
      setScrollProgress(progress);

      let currentActive = 0;
      STOPS.forEach((stop, i) => {
        const el = document.getElementById(stop.id);
        if (el) {
          const top = el.getBoundingClientRect().top + currentScroll;
          if (currentScroll + window.innerHeight * 0.4 >= top) {
            currentActive = i;
          }
        }
      });
      setActiveStop(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navH = id === "hero" ? 0 : document.getElementById("nav")?.offsetHeight || 0;
    const top = el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Rail occupies 14vh to 86vh (top:14vh, height 72vh)
  const planeTopVh = 14 + scrollProgress * 72;
  const [dotPositions, setDotPositions] = useState<number[]>([14, 28, 48, 66, 86]);

  useEffect(() => {
    const updatePositions = () => {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const positions = STOPS.map((stop) => {
        const el = document.getElementById(stop.id);
        if (!el) return 14;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const frac = Math.min(1, Math.max(0, top / scrollable));
        return 14 + frac * 72;
      });
      setDotPositions(positions);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    const t = setTimeout(updatePositions, 500);
    return () => {
      window.removeEventListener("resize", updatePositions);
      clearTimeout(t);
    };
  }, []);

  return (
    <nav className="rail" id="rail" aria-label="Section navigation">
      <svg className="rail__line" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="1" y1="0" x2="1" y2="100" strokeDasharray="1.4 2.6" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="rail__dots" id="railDots">
        {STOPS.map((stop, i) => {
          const dotTopVh = dotPositions[i] ?? (14 + (i / (STOPS.length - 1)) * 72);
          return (
            <button
              key={stop.id}
              type="button"
              className={`rail__dot ${i === activeStop ? "is-active" : ""}`}
              style={{ top: `${dotTopVh}vh` }}
              aria-label={stop.label}
              onClick={() => scrollTo(stop.id)}
            >
              <span>{stop.label}</span>
            </button>
          );
        })}
      </div>

      <div
        className="rail__plane"
        id="railPlane"
        aria-hidden="true"
        style={{ top: `${planeTopVh}vh` }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M2 12 L22 3 L15 12 L22 21 Z" fill="currentColor" />
        </svg>
      </div>
    </nav>
  );
}
