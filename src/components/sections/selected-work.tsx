import Link from "next/link";
import Image from "next/image";

const SELECTED_PROJECTS = [
  {
    title: "La Bella Art Studio",
    subtitle: "Dubai, UAE",
    img: "/map/img/t/la-bella-4.jpg",
    alt: "La Bella Art Studio mural, Dubai",
    href: "/work/",
    wide: true,
  },
  {
    title: "MAX Estates Underpass",
    subtitle: "Noida",
    img: "/map/img/t/max-underpass-1.jpg",
    alt: "MAX Estates underpass mural inspired by the Yamuna, Noida",
    href: "/map/?city=Noida&focus=max-underpass",
  },
  {
    title: "Oppo India",
    subtitle: "Delhi",
    img: "/map/img/t/oppo-1.jpg",
    alt: "Oppo India mural",
    href: "/map/?city=Delhi&focus=oppo",
  },
  {
    title: "United Colors of Benetton",
    subtitle: "Goa",
    img: "/map/img/t/benetton-1.jpg",
    alt: "United Colors of Benetton mural, Goa",
    href: "/map/?city=Goa&focus=benetton-goa",
  },
  {
    title: "Dynamatic Technologies",
    subtitle: "Bengaluru · 24,000 sq ft",
    img: "/map/img/t/dynamatics-1.jpg",
    alt: "Dynamatic Technologies mural",
    href: "/map/?city=Bengaluru&focus=dynamatics",
  },
  {
    title: "Kumbh Mela 2025",
    subtitle: "Prayagraj · 2,00,000 sq ft",
    img: "/img/home/work-kumbh.jpg",
    alt: "Kumbh Mela mural",
    href: "/map/?city=Prayagraj&focus=kumbh",
  },
  {
    title: "Young-Hee Doll × Netflix",
    subtitle: "Mumbai · Sculpture",
    img: "/map/img/t/young-hee-2.jpg",
    alt: "Young-Hee doll sculpture for Netflix's Squid Game",
    href: "/map/?city=Mumbai&focus=young-hee",
  },
  {
    title: "MAX Estates Sculptures",
    subtitle: "Gurugram · Sculpture",
    img: "/map/img/t/max-sculptures-2.jpg",
    alt: "Bronze family sculptures at MAX Estates",
    href: "/map/?city=Gurugram&focus=max-sculptures",
  },
  {
    title: "Pepsi",
    subtitle: "Sri Lanka",
    img: "/map/img/t/pepsi-1.jpg",
    alt: "Pepsi beach mural",
    href: "/map/?city=Sri%20Lanka&focus=pepsi",
  },
  {
    title: "Reserve Bank of India",
    subtitle: "Pune · 4,000 sq ft",
    img: "/map/img/t/rbi-5.jpg",
    alt: "Reserve Bank of India mural with a torii gate and cherry blossoms",
    href: "/map/?city=Pune&focus=rbi",
  },
];

export function SelectedWork() {
  return (
    <section className="work" id="work" data-rail="Work">
      <div className="work__head">
        <p className="eyebrow">Selected work</p>
        <h2 className="h-lg">
          Every wall
          <br />
          tells a story.
        </h2>
      </div>

      <div className="work__grid">
        {SELECTED_PROJECTS.map((proj) => (
          <Link
            key={proj.title}
            className={`proj ${proj.wide ? "proj--wide" : ""}`}
            href={proj.href}
          >
            <div className="proj__img relative">
              <Image
                src={proj.img}
                alt={proj.alt}
                fill
                className="object-cover"
                sizes={proj.wide ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
              />
            </div>
            <div className="proj__meta">
              <h3>{proj.title}</h3>
              <span>{proj.subtitle}</span>
              <i>Discover →</i>
            </div>
          </Link>
        ))}
      </div>

      <Link className="work__all" href="/work/">
        See all projects →
      </Link>
    </section>
  );
}
