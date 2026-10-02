"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { INDIA, CITIES, PROJECTS, INTERNATIONAL, type ProjectItem } from "@/lib/data";
import { site } from "@/lib/site";
import { StatNumber } from "@/components/ui/stat-number";

const LABELS: Record<string, [number, number, "start" | "end" | "middle"]> = {
  Delhi: [14, -14, "start"],
  Gurugram: [-14, 12, "end"],
  Noida: [14, 14, "start"],
  Mumbai: [-14, 2, "end"],
  Pune: [16, 4, "start"],
  Lonavala: [-10, 18, "end"],
  Nashik: [14, -8, "start"],
  Hyderabad: [16, 4, "start"],
  Bengaluru: [0, 26, "middle"],
  Chennai: [16, 4, "start"],
  Kochi: [16, 6, "start"],
  Goa: [-14, 4, "end"],
  Vadodara: [16, 2, "start"],
  Gandhidham: [-6, -16, "end"],
  Prayagraj: [14, -10, "start"],
};

const BRAND_LINKS: Record<string, [string, string, string?]> = {
  "Nexus Westend": ["Pune", "westend"],
  "Netflix": ["Mumbai", "young-hee"],
  "Pepsi": ["Sri Lanka", "pepsi", "intl"],
  "Jawa": ["Mumbai", "jawa"],
  "Breitling": ["Pune", "breitling"],
  "Aditya Birla Group": ["Pune", "mpower"],
  "Dynamatic Technologies": ["Bengaluru", "dynamatics"],
  "Reserve Bank of India": ["Pune", "rbi"],
  "Panchshil": ["Pune", "panchshil-17k"],
  "IPL": ["Mumbai", "mumbai-indians"],
  "Oppo": ["Delhi", "oppo"],
  "United Colors of Benetton": ["Gurugram", "benetton"],
};

const BRAND_LOGOS = [
  { num: 1, name: "Arena Animation" },
  { num: 2, name: "Nexus Westend" },
  { num: 3, name: "Netflix" },
  { num: 4, name: "Pepsi" },
  { num: 5, name: "Jawa" },
  { num: 6, name: "Phoenix Mall of Asia" },
  { num: 7, name: "Breitling" },
  { num: 9, name: "Aditya Birla Group" },
  { num: 10, name: "Dynamatic Technologies" },
  { num: 11, name: "Reserve Bank of India" },
  { num: 12, name: "Panchshil" },
  { num: 13, name: "Sunburn" },
  { num: 14, name: "Bacardi Weekender" },
  { num: 15, name: "CRED" },
  { num: 16, name: "IPL" },
  { num: 17, name: "Pulsar" },
  { num: 18, name: "JW Marriott" },
  { num: 19, name: "Ogilvy" },
  { num: 20, name: "BookMyShow" },
  { num: 21, name: "Hyundai" },
  { num: 22, name: "Oppo" },
  { num: 23, name: "United Colors of Benetton" },
  { num: 24, name: "boAt" },
  { num: 25, name: "Bisleri" },
  { num: 26, name: "ST+ART India Foundation" },
  { num: 27, name: "DNA Networks" },
];

export function IndiaMapSection() {
  return (
    <Suspense fallback={null}>
      <IndiaMapContent />
    </Suspense>
  );
}

function IndiaMapContent() {
  const searchParams = useSearchParams();
  const [craftFilter, setCraftFilter] = useState<"all" | "mural" | "sculpture">("all");
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [focusSlug, setFocusSlug] = useState<string | null>(null);
  const [customProjects, setCustomProjects] = useState<ProjectItem[] | null>(null);
  const [touchX, setTouchX] = useState<number | null>(null);
  const [lightboxData, setLightboxData] = useState<{
    images: string[];
    currentIndex: number;
    title: string;
    location: string;
  } | null>(null);

  const cityGroups = useMemo(() => {
    const map: Record<string, ProjectItem[]> = {};
    PROJECTS.filter((p) => craftFilter === "all" || p.type === craftFilter).forEach((p) => {
      if (!map[p.city]) map[p.city] = [];
      map[p.city].push(p);
    });
    return map;
  }, [craftFilter]);

  const openPlace = useCallback((place: string, slug?: string) => {
    const intlItem = INTERNATIONAL.find((i) => i.place === place || i.place.startsWith(place));
    if (intlItem && !PROJECTS.some((p) => p.city === place)) {
      setCustomProjects([{ ...intlItem, city: intlItem.place, sqft: "", note: "", type: "mural" }]);
      setActiveCity(intlItem.place);
    } else {
      setCustomProjects(null);
      setActiveCity(place);
    }
    if (slug) setFocusSlug(slug);
  }, []);

  // Handle deep links: ?city=Pune&focus=rbi
  useEffect(() => {
    const city = searchParams.get("city");
    const focus = searchParams.get("focus");
    if (city) {
      openPlace(city, focus || undefined);
    }
  }, [searchParams, openPlace]);

  // Body lock when panel or lightbox is open
  useEffect(() => {
    if (activeCity || lightboxData !== null) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [activeCity, lightboxData]);

  // Scroll to focused project in panel
  useEffect(() => {
    if (activeCity && focusSlug) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`proj-${focusSlug}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          el.classList.add("proj--flash");
          setTimeout(() => el.classList.remove("proj--flash"), 2000);
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [activeCity, focusSlug]);

  const activeCityProjects = customProjects || (activeCity ? cityGroups[activeCity] || [] : []);

  const closeLightbox = useCallback(() => {
    setLightboxData(null);
  }, []);

  const nextLightboxPhoto = useCallback(() => {
    if (!lightboxData) return;
    setLightboxData({
      ...lightboxData,
      currentIndex: (lightboxData.currentIndex + 1) % lightboxData.images.length,
    });
  }, [lightboxData]);

  const prevLightboxPhoto = useCallback(() => {
    if (!lightboxData) return;
    setLightboxData({
      ...lightboxData,
      currentIndex:
        (lightboxData.currentIndex - 1 + lightboxData.images.length) % lightboxData.images.length,
    });
  }, [lightboxData]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 45) {
      if (dx < 0) nextLightboxPhoto();
      else prevLightboxPhoto();
    }
    setTouchX(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxData) closeLightbox();
        else if (activeCity) setActiveCity(null);
      }
      if (lightboxData) {
        if (e.key === "ArrowRight") nextLightboxPhoto();
        if (e.key === "ArrowLeft") prevLightboxPhoto();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxData, activeCity, closeLightbox, nextLightboxPhoto, prevLightboxPhoto]);

  return (
    <>
      {/* PAGE TITLE */}
      <header className="head">
        <div className="head__titles">
          <p className="head__eyebrow">The Wall Map</p>
          <h1 className="head__title">
            PAINTED ACROSS <em>INDIA</em>
          </h1>
          <p className="head__sub">
            Every pin is a landmark we&apos;ve painted or built. Filter by craft, click a city, walk
            through the work.
          </p>
        </div>
        <ul className="head__stats">
          <li>
            <StatNumber value={site.stats.projects} />
            <span>projects</span>
          </li>
          <li>
            <StatNumber value={site.stats.cities} />
            <span>cities</span>
          </li>
          <li>
            <StatNumber value={site.stats.sqft} hasPlus />
            <span>sq ft painted</span>
          </li>
        </ul>
      </header>

      {/* MAP STAGE */}
      <main className="stage">
        <div className="stage__bar">
          <div className="filters" role="group" aria-label="Filter by craft">
            <button
              type="button"
              className={`chip ${craftFilter === "all" ? "is-active" : ""}`}
              onClick={() => setCraftFilter("all")}
            >
              All
            </button>
            <button
              type="button"
              className={`chip ${craftFilter === "mural" ? "is-active" : ""}`}
              onClick={() => setCraftFilter("mural")}
            >
              Murals
            </button>
            <button
              type="button"
              className={`chip ${craftFilter === "sculpture" ? "is-active" : ""}`}
              onClick={() => setCraftFilter("sculpture")}
            >
              Sculptures
            </button>
          </div>
          <p className="stage__hint">Tap a paint splat or pick a city</p>
        </div>

        <div className="stage__grid">
          <div className="stage__map" id="mapWrap">
            <svg
              id="indiaMap"
              viewBox={INDIA.viewBox}
              role="img"
              aria-label="Map of India with Paperplane mural and sculpture locations"
            >
              <defs>
                <filter id="roughPaint" x="-5%" y="-5%" width="110%" height="110%">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.015"
                    numOctaves="4"
                    seed="7"
                    result="noise"
                  />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" />
                </filter>
              </defs>

              <path className="map__country" d={INDIA.d} />

              <g id="pinLayer">
                {Object.entries(CITIES).map(([city, [cx, cy]]) => {
                  const projs = cityGroups[city];
                  if (!projs || projs.length === 0) return null;
                  const count = projs.length;
                  const labelCfg = LABELS[city] || [14, 4, "start"];
                  const [dx, dy, anchor] = labelCfg;

                  // Tape dimensions based on string length
                  const textLen = city.length * 8 + 26;
                  const tapeW = textLen + 14;
                  const tapeH = 22;
                  const tapeX = anchor === "end" ? dx - tapeW : anchor === "middle" ? dx - tapeW / 2 : dx;
                  const tapeY = dy - 11;

                  return (
                    <g
                      key={city}
                      className="pin"
                      transform={`translate(${cx}, ${cy})`}
                      role="button"
                      tabIndex={0}
                      aria-label={`${city}: ${count} projects`}
                      onClick={() => setActiveCity(city)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveCity(city);
                        }
                      }}
                    >
                      {/* Splat / Dot */}
                      <g className="pin__dotWrap">
                        <circle cx="0" cy="0" r="7.5" className="pin__dot" />
                        <circle cx="0" cy="0" r="3.5" fill="#fff" opacity="0.85" />
                      </g>

                      {/* Tape banner */}
                      <g>
                        <rect
                          x={tapeX}
                          y={tapeY}
                          width={tapeW}
                          height={tapeH}
                          rx="2"
                          className="pin__tape"
                        />
                        <text
                          x={tapeX + 8}
                          y={tapeY + 15}
                          className="pin__city text-[12px] font-bold"
                        >
                          {city}
                        </text>
                        <rect
                          x={tapeX + tapeW - 20}
                          y={tapeY + 3}
                          width="16"
                          height="16"
                          rx="8"
                          className="pin__badge"
                        />
                        <text
                          x={tapeX + tapeW - 12}
                          y={tapeY + 15}
                          textAnchor="middle"
                          className="pin__badgeNum text-[10px] font-extrabold fill-white"
                        >
                          {count}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* CITIES LIST ASIDE */}
          <aside className="stage__cities" aria-label="Cities">
            <p className="stage__label">Cities</p>
            <div className="citytapes" role="group" aria-label="Jump to a city">
              {Object.keys(cityGroups)
                .sort((a, b) => (cityGroups[b]?.length || 0) - (cityGroups[a]?.length || 0))
                .map((city) => {
                  const count = cityGroups[city]?.length || 0;
                  return (
                    <button
                      key={city}
                      type="button"
                      className="citytape"
                      onClick={() => setActiveCity(city)}
                    >
                      <span>{city}</span>
                      <b>{count}</b>
                    </button>
                  );
                })}
            </div>
          </aside>
        </div>
      </main>

      {/* BEYOND INDIA */}
      <section className="beyond" aria-labelledby="beyondTitle">
        <div className="beyond__head">
          <h2 className="side__title" id="beyondTitle">
            Beyond <em>India</em>
          </h2>
          <p className="side__blurb">The paint doesn&apos;t stop at the border.</p>
        </div>
        <div className="intl">
          {INTERNATIONAL.map((item, idx) => (
            <button
              key={item.slug}
              type="button"
              className="intl__card"
              style={{ "--tilt": `${((idx % 3) - 1) * 1.5}deg` } as React.CSSProperties}
              onClick={() =>
                setLightboxData({
                  images: item.images,
                  currentIndex: 0,
                  title: item.title,
                  location: item.place,
                })
              }
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={`/map/img/t/${item.images[0]}`}
                  alt={`${item.title}, ${item.place}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 16vw"
                />
              </div>
              <div className="intl__meta">
                <h3>{item.title}</h3>
                <span>{item.place}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* BRANDS SLIDER */}
      <section className="brandslider" aria-label="Brands we have worked with">
        <p className="brandslider__label">Brands love us</p>
        <div className="brandslider__viewport">
          <div className="brandslider__track">
            {BRAND_LOGOS.map((brand) => {
              const link = BRAND_LINKS[brand.name];
              return (
                <Image
                  key={brand.num}
                  src={`/img/brands/logo-${String(brand.num).padStart(2, "0")}.png`}
                  alt={brand.name}
                  width={170}
                  height={44}
                  className={`h-11 w-auto max-w-[170px] object-contain flex-shrink-0 ${link ? "is-linked cursor-pointer" : ""}`}
                  onClick={() => link && openPlace(link[0], link[1])}
                />
              );
            })}
            {BRAND_LOGOS.map((brand) => {
              const link = BRAND_LINKS[brand.name];
              return (
                <Image
                  key={`dup-${brand.num}`}
                  src={`/img/brands/logo-${String(brand.num).padStart(2, "0")}.png`}
                  alt=""
                  width={170}
                  height={44}
                  aria-hidden="true"
                  className={`h-11 w-auto max-w-[170px] object-contain flex-shrink-0 ${link ? "is-linked cursor-pointer" : ""}`}
                  onClick={() => link && openPlace(link[0], link[1])}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* CITY DRAWER PANEL */}
      <div
        className={`panel-backdrop ${activeCity ? "is-open" : ""}`}
        onClick={() => {
          setActiveCity(null);
          setFocusSlug(null);
        }}
      />
      <section className={`panel ${activeCity ? "is-open" : ""}`} aria-hidden={!activeCity}>
        <header className="panel__head">
          <div>
            <p className="panel__eyebrow">
              {activeCityProjects.length} landmark{activeCityProjects.length > 1 ? "s" : ""}
            </p>
            <h2 className="panel__city">{activeCity}</h2>
          </div>
          <button
            className="panel__close"
            type="button"
            aria-label="Close"
            onClick={() => {
              setActiveCity(null);
              setFocusSlug(null);
            }}
          >
            ✕
          </button>
        </header>

        <div className="panel__body">
          {activeCityProjects.map((proj) => (
            <article key={proj.slug} className="proj" id={`proj-${proj.slug}`}>
              <div className="proj__head">
                <h3>{proj.title}</h3>
                {proj.sqft && <span className="proj__sqft">{proj.sqft}</span>}
                <span className="proj__type uppercase">{proj.type}</span>
              </div>
              {proj.note && <p className="proj__note">{proj.note}</p>}
              <div className="proj__grid">
                {proj.images.map((imgName, pIdx) => (
                  <button
                    key={imgName}
                    type="button"
                    className="shot"
                    onClick={() =>
                      setLightboxData({
                        images: proj.images,
                        currentIndex: pIdx,
                        title: proj.title,
                        location: proj.city,
                      })
                    }
                  >
                    <div className="relative w-full h-[190px] overflow-hidden">
                      <Image
                        src={`/map/img/t/${imgName}`}
                        alt={`${proj.title} in ${proj.city}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 300px"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <div
        className={`lightbox ${lightboxData !== null ? "is-open" : ""}`}
        id="lightbox"
        aria-hidden={lightboxData === null}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox();
        }}
      >
        {lightboxData && (
          <>
            <button
              className="lightbox__close"
              type="button"
              aria-label="Close"
              onClick={closeLightbox}
            >
              ✕
            </button>
            {lightboxData.images.length > 1 && (
              <button
                className="lightbox__nav lightbox__nav--prev"
                type="button"
                aria-label="Previous image"
                onClick={prevLightboxPhoto}
              >
                ←
              </button>
            )}
            <figure>
              <img
                id="lbImg"
                src={`/map/img/${lightboxData.images[lightboxData.currentIndex]}`}
                alt={`${lightboxData.title}, ${lightboxData.location}`}
              />
              <figcaption>
                <span id="lbCaption">
                  {lightboxData.title} · {lightboxData.location}
                </span>{" "}
                <span id="lbIndex">
                  {lightboxData.images.length > 1
                    ? `${lightboxData.currentIndex + 1} / ${lightboxData.images.length}`
                    : ""}
                </span>
              </figcaption>
            </figure>
            {lightboxData.images.length > 1 && (
              <button
                className="lightbox__nav lightbox__nav--next"
                type="button"
                aria-label="Next image"
                onClick={nextLightboxPhoto}
              >
                →
              </button>
            )}
          </>
        )}
      </div>

      {/* FOOTER CTA */}
      <aside className="mapfoot">
        <p>Your city missing from this map?</p>
        <a
          className="mapfoot__btn"
          href={site.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Put it on the map →
        </a>
      </aside>
    </>
  );
}
