import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell us about your wall, space or idea. Paperplane paints murals and builds sculptures for brands, cities and homes across India and abroad.",
};

export default function ContactPage() {
  return (
    <main className="ct">
      <section className="ct__intro">
        <p className="eyebrow">Start a project</p>
        <h1 className="ct__title">
          Got a wall? <em>Let&apos;s talk.</em>
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
