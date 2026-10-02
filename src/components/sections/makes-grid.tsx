import Link from "next/link";

const MAKES = [
  {
    title: "Murals",
    body: "Hand-painted, large-format art for facades, interiors and streets, at any scale, in any style.",
    img: "/img/home/card-murals.jpg",
    alt: "Hand-painted street-scene mural for United Colors of Benetton",
    href: "/work/",
    external: false,
  },
  {
    title: "Sculptures",
    body: "Dimensional installations and objects that stop foot traffic and anchor a space.",
    img: "/img/home/card-sculptures.jpg",
    alt: "Bronze sculpture of a family picnic with their dog, MAX Estates",
    href: "/work/",
    external: false,
  },
  {
    title: "Augmented Reality",
    body: "Walls that come alive through a phone: static art that moves, plays and responds.",
    img: "/img/home/card-ar.jpg",
    alt: "Road Rash augmented-reality T-shirt",
    href: "https://www.instagram.com/reel/CzOUOHSsq2g/",
    external: true,
  },
  {
    title: "CGI & VFX",
    body: "Impossible art rendered real, for film, launches and social. Millions of views and counting.",
    img: "/img/home/card-cgi.jpg",
    alt: "CGI octopus climbing a glass building, for Arena Animation",
    href: "https://www.instagram.com/paperplane_india",
    external: true,
  },
];

export function MakesGrid() {
  return (
    <section className="makes" aria-label="What we make">
      <div className="makes__head">
        <p className="eyebrow">What we make</p>
        <h2 className="h-lg">
          We transform
          <br />
          spaces.
        </h2>
      </div>

      <div className="makes__grid">
        {MAKES.map((item) => {
          if (item.external) {
            return (
              <a
                key={item.title}
                className="make"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="make__img">
                  <img
                    src={item.img}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <h3 className="make__title">{item.title}</h3>
                </div>
                <p className="make__body">{item.body}</p>
              </a>
            );
          }

          return (
            <Link key={item.title} className="make" href={item.href}>
              <div className="make__img">
                <img
                  src={item.img}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="make__title">{item.title}</h3>
              </div>
              <p className="make__body">{item.body}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
