"use client";

import { useState } from "react";
import Image from "next/image";

const FILMS = [
  {
    id: "_eUAZOUVkWw",
    title: "Dynamatic Technologies",
    caption: "Bengaluru · our largest single building",
    poster: "https://i.ytimg.com/vi/_eUAZOUVkWw/maxresdefault.jpg",
  },
  {
    id: "qU03Ef3PQBo",
    title: "MAX Estates Underpass",
    caption: "Noida · inspired by the Yamuna",
    poster: "https://i.ytimg.com/vi/qU03Ef3PQBo/maxresdefault.jpg",
  },
];

export function FilmsSection() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  return (
    <section className="films" id="films" data-rail="Films">
      <div className="films__head">
        <p className="eyebrow">On film</p>
        <h2 className="h-lg">
          Watch a wall
          <br />
          come alive.
        </h2>
      </div>

      <div className="films__grid">
        {FILMS.map((film) => (
          <figure key={film.id} className="film">
            <div className="film__frame">
              {playingVideo === film.id ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${film.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={`Play video: ${film.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  className="film__play"
                  type="button"
                  onClick={() => setPlayingVideo(film.id)}
                  aria-label={`Play video: ${film.title}`}
                >
                  <Image
                    src={film.poster}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span className="film__btn" aria-hidden="true" />
                </button>
              )}
            </div>
            <figcaption>
              <b>{film.title}</b>
              <span>{film.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
