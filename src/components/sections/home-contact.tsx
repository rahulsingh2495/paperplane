import Link from "next/link";
import { site } from "@/lib/site";

export function HomeContact() {
  return (
    <section className="contact" id="contact" data-rail="Contact">
      <p className="eyebrow">Got a wall?</p>
      <h2 className="contact__title">
        Let&apos;s paint
        <br />
        something <em>unforgettable.</em>
      </h2>
      <div className="contact__actions">
        <Link className="link-lg" href="/contact/">
          Send us your project details <span>→</span>
        </Link>
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
  );
}
