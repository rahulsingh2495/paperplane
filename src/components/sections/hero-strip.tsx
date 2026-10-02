"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const STRIP_ITEMS = [
  {
    title: "La Bella Art Studio",
    location: "Dubai",
    href: "/work/",
    img: "/img/home/hero-la-bella.jpg",
    alt: "La Bella Art Studio mural, Dubai",
  },
  {
    title: "Dynamatic",
    location: "Bengaluru",
    href: "/map/?city=Bengaluru&focus=dynamatics",
    img: "/img/home/hero-dynamatics.jpg",
    alt: "Dynamatic Technologies mural, Bengaluru",
  },
  {
    title: "Chargezone",
    location: "Pondur",
    href: "/map/?city=Chennai&focus=chargezone-pondur",
    img: "/img/home/hero-chargezone.jpg",
    alt: "Chargezone mural, Pondur",
  },
  {
    title: "Benetton",
    location: "Gurugram",
    href: "/map/?city=Gurugram&focus=benetton",
    img: "/img/home/hero-benetton.jpg",
    alt: "United Colors of Benetton mural, Gurugram",
  },
  {
    title: "Nexus Westend",
    location: "Pune",
    href: "/map/?city=Pune&focus=parking-lot",
    img: "/img/home/hero-parking.jpg",
    alt: "Nexus Westend parking lot mural, Pune",
  },
  {
    title: "Jawa Yezdi",
    location: "Mumbai",
    href: "/map/?city=Mumbai&focus=jawa",
    img: "/img/home/hero-jawa.jpg",
    alt: "Jawa Yezdi showroom mural, Mumbai",
  },
];

export function HeroStrip() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % STRIP_ITEMS.length);
    }, 2000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, isPlaying]);

  return (
    <section className="hero" id="hero" data-rail="Home">
      <div className="hero__top">
        <h1 className="hero__title" aria-label="We paint walls that cities remember.">
          <span className="reveal-line">
            <span>
              We paint walls<span className="wide-only"> that</span>
            </span>
          </span>
          <span className="reveal-line">
            <span>
              <span className="narrow-only" aria-hidden="true" />
              cities <em>remember.</em>
            </span>
          </span>
        </h1>
        <p className="hero__eyebrow">
          <span>◦</span> Mural Art Studio · India
        </p>
      </div>

      <div
        className={`strip ${isPlaying ? "is-playing" : ""}`}
        id="strip"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {STRIP_ITEMS.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`strip__item ${isActive ? "is-active" : ""}`}
              onMouseEnter={() => {
                setActiveIndex(idx);
                setIsPlaying(false);
              }}
              onClick={(e) => {
                if (!isActive) {
                  e.preventDefault();
                  setActiveIndex(idx);
                }
              }}
              onFocus={() => setActiveIndex(idx)}
            >
              <Image
                src={item.img}
                alt={item.alt}
                fill
                priority={idx === 0}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <span className="strip__cap">
                <b>{item.title}</b> {item.location}
                <i>View →</i>
              </span>
              <span className="strip__bar" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
