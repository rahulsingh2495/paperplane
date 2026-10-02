import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Studio",
  description:
    "Paperplane is a multidisciplinary art studio at the intersection of art, space and technology: murals, sculptures, AR and CGI. Meet the people behind the plane.",
};

const TEAM = [
  {
    name: "Kartikey Sharma",
    role: "CEO, founder · multidisciplinary artist",
    img: "/studio/img/team-kartikey.jpg",
  },
  {
    name: "Vijay Gulani",
    role: "COO, co-founder",
    img: "/studio/img/team-vijay.jpg",
  },
  {
    name: "Pranav Goel",
    role: "Designer",
    img: "/studio/img/team-pranav.jpg",
  },
  {
    name: "Pankaj Dwivedi",
    role: "Muralist",
    img: "/studio/img/team-pankaj.jpg",
  },
  {
    name: "Kevin Xavier",
    role: "Illustrator",
    img: "/studio/img/team-kevin.jpg",
  },
];

const FAQS = [
  {
    q: "I only have a vague idea. Is that enough to start?",
    a: "Yes, completely. Most clients come to us with just a mood or a feeling. Our process develops that into a fully realised concept, so you don't need a brief or references before reaching out.",
  },
  {
    q: "What does the process look like?",
    a: "We start with a conversation about your space and intent, then develop concept designs. You get rounds of revisions before anything is finalised. Nothing goes on the wall or into fabrication without your approval.",
  },
  {
    q: "What's included in the price?",
    a: "Everything needed to complete the work: materials, paint, protective coatings, labour and scaffolding. The only exclusion is the wall or base structure itself. No hidden add-ons.",
  },
  {
    q: "What materials do you use for sculptures?",
    a: "Fabricated metal, fibre/FRP, stone, concrete, wood and mixed media, chosen for the environment, scale and look of the piece.",
  },
];

export default function StudioPage() {
  return (
    <main>
      {/* OPENING */}
      <section className="s-hero">
        <div className="s-hero__text">
          <p className="eyebrow">The studio</p>
          <h1 className="s-hero__title">
            We believe ideas deserve room to <em>fly.</em>
          </h1>
          <p className="s-hero__sub">
            A creative studio turning sketches into large-scale art, brand experiences and spaces
            that move people.
          </p>
        </div>
        <figure className="s-hero__img">
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image
              src="/studio/img/team-at-dynamatics.jpg"
              alt="The Paperplane team in front of the Dynamatic Technologies mural, Bengaluru"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 55vw"
            />
          </div>
          <figcaption>
            The crew at Dynamatic Technologies, Bengaluru. 24,000 sq ft, painted by hand.
          </figcaption>
        </figure>
      </section>

      {/* MANIFESTO */}
      <section className="s-manifesto">
        <p className="s-manifesto__lead">
          A multidisciplinary studio working where <em>art, space and technology</em> meet.
        </p>
        <div className="s-manifesto__cols">
          <p>
            We create large-scale murals, sculptural installations and immersive visual experiences
            that turn environments into stories. Our practice moves between the physical and the
            digital: public art, architectural environments, augmented reality and CGI.
          </p>
          <p>
            Every project is site-responsive and concept-led: a precise answer to its context,
            informed by architecture, culture and movement. From urban landmarks to brand
            environments, the work is made to be experienced, not just looked at.
          </p>
        </div>
      </section>

      {/* WHY A PAPER PLANE */}
      <section className="s-origin">
        <div className="s-origin__media">
          <div className="relative aspect-[1189/543] overflow-hidden">
            <Image
              src="/studio/img/kartikey-painting.jpg"
              alt="Paperplane artists spray-painting a mural"
              fill
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 55vw"
            />
          </div>
        </div>
        <div className="s-origin__text">
          <p className="eyebrow">Why a paper plane</p>
          <h2 className="h-lg">It started in the corner of a page.</h2>
          <p>
            A little paper plane, doodled in the corner of a school notebook, became our name. It is
            still how we work: every project starts as an idea on paper, and we don&apos;t stop until
            it flies.
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="s-team">
        <div className="s-team__head">
          <p className="eyebrow">The people behind the plane</p>
          <h2 className="h-lg">Every project starts as an idea on paper.</h2>
        </div>
        <div className="s-team__grid">
          {TEAM.map((member) => (
            <figure key={member.name} className="member">
              <div className="member__img relative">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 720px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
              <figcaption>
                <b>{member.name}</b>
                <span>{member.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="s-faq">
        <div className="s-faq__head">
          <p className="eyebrow">How we work</p>
          <h2 className="h-lg">
            Good questions
            <br />
            to ask us.
          </h2>
        </div>
        <div className="s-faq__list">
          {FAQS.map((faq, i) => (
            <details key={faq.q} open={i === 0}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="contact" id="contact">
        <p className="eyebrow">Got a wall?</p>
        <h2 className="contact__title">
          Ready to launch
          <br />
          your next <em>idea?</em>
        </h2>
        <div className="contact__actions">
          <a
            className="link-lg"
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us <span>→</span>
          </a>
          <a
            className="link-lg"
            href={`mailto:${site.email}?subject=Project%20Enquiry`}
          >
            {site.email} <span>→</span>
          </a>
          <a className="link-lg" href={`tel:${site.phone}`}>
            {site.phone} <span>→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
