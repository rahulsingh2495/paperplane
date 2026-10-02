import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: {
    absolute: "Start a Project | Paperplane Mural Art Studio",
  },
  description:
    "Tell us about your wall, space or idea. Paperplane paints murals and builds sculptures for brands, cities and homes across India and abroad.",
  openGraph: {
    type: "website",
    siteName: "Paperplane",
    title: "Start a Project | Paperplane",
    description: "Tell us about your wall, space or idea, and we'll take it from there.",
    url: "https://paperplane-psi.vercel.app/contact/",
    images: [
      {
        url: "/img/share.jpg",
        width: 1200,
        height: 630,
        alt: "Paperplane's hand-painted mural on the Dynamatic Technologies building, Bengaluru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function ContactPage() {
  return (
    <main className="ct">
      <section className="ct__intro">
        <p className="eyebrow">Start a project</p>
        <h1 className="ct__title">
          Got a wall? <em>Let’s talk.</em>
        </h1>
        <p className="ct__lead">
          Tell us a little about your space and what you have in mind. A rough idea is enough: most
          projects start with just a mood or a feeling.
        </p>

        <ul className="ct__direct">
          <li>
            <span>WhatsApp</span>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">
              {site.phone}
            </a>
          </li>
          <li>
            <span>Email</span>
            <a href={`mailto:${site.email}?subject=Project%20Enquiry`}>{site.email}</a>
          </li>
          <li>
            <span>Instagram</span>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
              @paperplane_india
            </a>
          </li>
        </ul>
      </section>

      <section className="ct__form-wrap" aria-label="Project enquiry form">
        <ContactForm />
      </section>
    </main>
  );
}
