import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <>
      <div className="megaword" aria-hidden="true">
        Paperplane
      </div>

      <footer className="footer">
        <div className="footer__brand">Paperplane</div>
        <div className="footer__links">
          <Link href="/">Home</Link>
          <Link href="/studio/">Studio</Link>
          <Link href="/work/">Work</Link>
          <Link href="/map/">India Map</Link>
          <Link href="/contact/">Contact</Link>
          <Link href="/privacy/">Privacy Policy</Link>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
        <div className="footer__copy">
          © 2026 Paperplane · Mural Art Studio, India
        </div>
      </footer>
    </>
  );
}
