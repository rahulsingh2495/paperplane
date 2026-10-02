"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS, INTERNATIONAL } from "@/lib/data";

interface UnifiedItem {
  slug: string;
  title: string;
  place: string;
  sqft: string;
  note: string;
  type: "mural" | "sculpture";
  intl?: boolean;
  images: string[];
}

const FEATURED = [
  "la-bella",
  "breitling",
  "oppo",
  "benetton",
  "pepsi",
  "dynamatics",
  "young-hee",
  "mumbai-indians",
  "rbi",
  "max-underpass",
  "max-tunnel",
  "hpl",
  "panchshil-17k",
  "mos-germany",
  "mos-finland",
  "renault",
  "chargezone",
  "cafe-nur",
  "benetton-goa",
  "benetton-kochi",
];

const RATIO: Record<string, number> = {
  "dynamatics-1.jpg": 1.345,
  "sleepy-head-1.jpg": 1.897,
  "biergarten-1.jpg": 0.808,
  "max-estates-1.jpg": 2.935,
  "oppo-1.jpg": 0.927,
  "benetton-1.jpg": 0.726,
  "benetton-2.jpg": 1.592,
  "benetton-4.jpg": 1.498,
  "cafe-nur-1.jpg": 0.562,
  "kalki-1.jpg": 1.164,
  "good-homes-1.jpg": 0.884,
  "cram-bar-1.jpg": 1.288,
  "4th-peg-1.jpg": 2.215,
  "panchshil-17k-1.jpg": 1.912,
  "panchshil-5k-1.jpg": 2.255,
  "rbi-1.jpg": 2.883,
  "pivo-1.jpg": 1.779,
  "breitling-1.jpg": 1.0,
  "westend-1.jpg": 0.577,
  "westend-3.jpg": 1.429,
  "westend-4.jpg": 1.056,
  "parking-lot-1.jpg": 1.97,
  "mpower-1.jpg": 1.882,
  "wet-n-joy-1.jpg": 3.077,
  "kumbh-1.jpg": 1.58,
  "gd-goenka-1.jpg": 2.951,
  "lilleria-1.jpg": 0.707,
  "concentric-1.jpg": 1.169,
  "start-india-1.jpg": 0.93,
  "chargezone-1.jpg": 1.426,
  "renault-1.jpg": 2.204,
  "thridhara-1.jpg": 0.517,
  "jawa-1.jpg": 1.333,
  "young-hee-1.jpg": 0.384,
  "max-sculptures-1.jpg": 0.573,
  "pivo-sculpt-1.jpg": 0.853,
  "mumbai-indians-1.jpg": 1.058,
  "vault-door-1.jpg": 1.0,
  "ugam-1.jpg": 0.75,
  "westend-sculpt-1.jpg": 2.558,
  "chargezone-pondur-1.jpg": 1.502,
  "la-bella-1.jpg": 1.43,
  "mos-germany-1.jpg": 2.038,
  "mos-finland-1.jpg": 0.982,
  "indorama-1.jpg": 5.668,
  "pepsi-1.jpg": 1.639,
  "max-tunnel-1.jpg": 1.646,
  "max-underpass-1.jpg": 1.875,
  "hpl-1.jpg": 1.333,
  "prayagraj-airport-1.jpg": 1.773,
  "skill-hostel-1.jpg": 1.5,
  "san-francisco-2.jpg": 1.333,
};

const fitRatio = (r?: number) => Math.min(2.4, Math.max(0.5, r || 1.33));

export function WorkGallery() {
  const [filter, setFilter] = useState<"all" | "mural" | "sculpture">("all");
  const [lightboxState, setLightboxState] = useState<{
    itemIndex: number;
    photoIndex: number;
  } | null>(null);

  const items = useMemo(() => {
    const list: UnifiedItem[] = [];
    const seen = new Set<string>();

    PROJECTS.forEach((p) => {
      if (seen.has(p.slug)) return;
      seen.add(p.slug);
      list.push({
        slug: p.slug,
        title: p.title,
        place: p.city,
        sqft: p.sqft,
        note: p.note,
        type: p.type || "mural",
        images: p.images,
      });
    });

    INTERNATIONAL.forEach((p) => {
      list.push({
        slug: p.slug,
        title: p.title,
        place: p.place,
        sqft: "",
        note: "",
        type: "mural",
        intl: true,
        images: p.images,
      });
    });

    const rank = (s: string) => {
      const idx = FEATURED.indexOf(s);
      return idx === -1 ? 999 : idx;
    };

    return list.sort((a, b) => rank(a.slug) - rank(b.slug));
  }, []);

  const filteredItems = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((it) => it.type === filter);
  }, [items, filter]);

  const activeItem = lightboxState !== null ? items[lightboxState.itemIndex] : null;

  const nextPhoto = useCallback(() => {
    if (!lightboxState || !activeItem) return;
    setLightboxState({
      itemIndex: lightboxState.itemIndex,
      photoIndex: (lightboxState.photoIndex + 1) % activeItem.images.length,
    });
  }, [lightboxState, activeItem]);

  const prevPhoto = useCallback(() => {
    if (!lightboxState || !activeItem) return;
    setLightboxState({
      itemIndex: lightboxState.itemIndex,
      photoIndex:
        (lightboxState.photoIndex - 1 + activeItem.images.length) % activeItem.images.length,
    });
  }, [lightboxState, activeItem]);

  const closeLightbox = useCallback(() => {
    setLightboxState(null);
  }, []);

  const [touchX, setTouchX] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxState !== null) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [lightboxState]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 45) {
      if (dx < 0) nextPhoto();
      else prevPhoto();
    }
    setTouchX(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxState) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxState, closeLightbox, nextPhoto, prevPhoto]);

  return (
    <>
      <main>
        {/* HEADER */}
        <header className="wh">
          <p className="eyebrow">The portfolio</p>
          <h1 className="wh__title">
            Walls with
            <br />
            <em>stories.</em>
          </h1>
          <p className="wh__sub">
            From a cafe in Mumbai to a studio in Dubai, every project was painted by hand. Open one
            to see how it came to life.
          </p>
          <div className="wfilters" role="group" aria-label="Filter projects">
            <button
              type="button"
              className={`wchip ${filter === "all" ? "is-active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              type="button"
              className={`wchip ${filter === "mural" ? "is-active" : ""}`}
              onClick={() => setFilter("mural")}
            >
              Murals
            </button>
            <button
              type="button"
              className={`wchip ${filter === "sculpture" ? "is-active" : ""}`}
              onClick={() => setFilter("sculpture")}
            >
              Sculptures
            </button>
          </div>
        </header>

        {/* GRID */}
        <section className="wgrid" id="workGrid" aria-live="polite">
          {filteredItems.map((it) => {
            const rawIndex = items.findIndex((orig) => orig.slug === it.slug);
            const ar = fitRatio(RATIO[it.images[0]]);
            const typeLabel = it.type === "sculpture" ? "Sculpture" : it.intl ? it.place : "";
            const sub = [it.place, it.sqft].filter(Boolean).join(" · ");

            return (
              <button
                key={it.slug}
                type="button"
                className="wcard"
                style={{ "--ar": ar } as React.CSSProperties}
                onClick={() => setLightboxState({ itemIndex: rawIndex, photoIndex: 0 })}
              >
                <div className="wcard__img">
                  <img
                    src={`/map/img/t/${it.images[0]}`}
                    alt={`${it.title}, ${it.place}`}
                    loading="lazy"
                    decoding="async"
                  />
                  {it.images.length > 1 && (
                    <span className="wcard__count">{it.images.length} photos</span>
                  )}
                </div>
                <div className="wcard__meta">
                  <h3>{it.title}</h3>
                  <span>{sub}</span>
                  {typeLabel && <em className="wcard__type">{typeLabel}</em>}
                </div>
              </button>
            );
          })}
        </section>

        {/* PROJECT INDEX */}
        <section className="widx" aria-labelledby="widxTitle">
          <p className="eyebrow">Project index</p>
          <h2 className="widx__title" id="widxTitle">
            Every project, by city.
          </h2>
          <p className="widx__sub">
            51 walls and sculptures shown here, from 63 projects in all, across 15 Indian cities and 7 countries.
          </p>
          <div className="widx__grid">
            <div className="widx__city">
              <h3>Pune</h3>
              <ul>
                <li>Panchshil Group</li>
                <li>Panchshil Group II</li>
                <li>Reserve Bank of India</li>
                <li>Pivo</li>
                <li>Breitling</li>
                <li>Nexus Westend Facade</li>
                <li>Nexus Westend Atrium</li>
                <li>Nexus Westend Parking Lot</li>
                <li>Mpower · Aditya Birla</li>
                <li>Pivo <em>sculpture</em></li>
                <li>Pillars · Arch Entrance · Vault Door <em>sculpture</em></li>
                <li>Nexus Westend Sculptures <em>sculpture</em></li>
                <li>HPL Premier League</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Mumbai</h3>
              <ul>
                <li>Cafe Nur</li>
                <li>Kalki</li>
                <li>Good Homes</li>
                <li>The Cram Bar</li>
                <li>4th Peg</li>
                <li>Jawa · Yezdi</li>
                <li>Young-Hee Doll <em>sculpture</em></li>
                <li>Mumbai Indians <em>sculpture</em></li>
                <li>Skill Development Hostel</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Chennai</h3>
              <ul>
                <li>Start India</li>
                <li>Chargezone</li>
                <li>Renault Design Studio</li>
                <li>Chargezone Pondur</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Bengaluru</h3>
              <ul>
                <li>Dynamatic Technologies</li>
                <li>Sleepy Head × Go Rally</li>
                <li>Biergarten</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Delhi</h3>
              <ul>
                <li>MAX Estates</li>
                <li>Oppo India</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Gurugram</h3>
              <ul>
                <li>United Colors of Benetton</li>
                <li>MAX Estates Sculptures <em>sculpture</em></li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Noida</h3>
              <ul>
                <li>MAX Estates Tunnel</li>
                <li>MAX Estates Underpass</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Prayagraj</h3>
              <ul>
                <li>Kumbh Mela 2025</li>
                <li>Prayagraj Airport</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Vadodara</h3>
              <ul>
                <li>Lilleria House</li>
                <li>Concentric Analytics</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Gandhidham</h3>
              <ul>
                <li>GD Goenka School</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Goa</h3>
              <ul>
                <li>United Colors of Benetton</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Hyderabad</h3>
              <ul>
                <li>Thridhara</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Kochi</h3>
              <ul>
                <li>United Colors of Benetton</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Lonavala</h3>
              <ul>
                <li>Wet N Joy</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Nashik</h3>
              <ul>
                <li>Ugam Literature Festival <em>sculpture</em></li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Dubai, UAE</h3>
              <ul>
                <li>La Bella Art Studio</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Germany</h3>
              <ul>
                <li>Meeting of Styles</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Finland</h3>
              <ul>
                <li>Meeting of Styles</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Nigeria</h3>
              <ul>
                <li>Indorama</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>Sri Lanka</h3>
              <ul>
                <li>Pepsi</li>
              </ul>
            </div>
            <div className="widx__city">
              <h3>San Francisco, USA</h3>
              <ul>
                <li>Street mural</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* CTA STRIP */}
      <section className="wcta">
        <p>Prefer to explore by place?</p>
        <Link className="wcta__btn" href="/map/">
          See the India map →
        </Link>
      </section>

      {/* LIGHTBOX */}
      <div
        className={`lb ${lightboxState !== null ? "is-open" : ""}`}
        id="lb"
        aria-hidden={lightboxState === null}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox();
        }}
      >
        <button
          className="lb__close"
          id="lbClose"
          type="button"
          aria-label="Close"
          onClick={closeLightbox}
        >
          ✕
        </button>
        {activeItem && activeItem.images.length > 1 && (
          <button
            className="lb__nav lb__prev"
            id="lbPrev"
            type="button"
            aria-label="Previous"
            onClick={prevPhoto}
          >
            ←
          </button>
        )}
        <figure>
          <img
            id="lbImg"
            src={activeItem ? `/map/img/${activeItem.images[lightboxState!.photoIndex]}` : ""}
            alt={activeItem ? `${activeItem.title}, ${activeItem.place}` : ""}
          />
          <figcaption>
            <span id="lbCap">
              {activeItem ? `${activeItem.title} · ${activeItem.place}` : ""}
            </span>{" "}
            <span id="lbIdx">
              {activeItem && activeItem.images.length > 1
                ? `${lightboxState!.photoIndex + 1} / ${activeItem.images.length}`
                : ""}
            </span>
          </figcaption>
        </figure>
        {activeItem && activeItem.images.length > 1 && (
          <button
            className="lb__nav lb__next"
            id="lbNext"
            type="button"
            aria-label="Next"
            onClick={nextPhoto}
          >
            →
          </button>
        )}
      </div>
    </>
  );
}
