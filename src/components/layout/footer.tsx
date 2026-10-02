"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export function Footer() {
  const pathname = usePathname();

  // Reference site does not have megaword or footer on map or 404 pages
  if (pathname?.startsWith("/map") || pathname === "/404") {
    return null;
  }

  const isHome = pathname === "/";
  const isStudio = pathname?.startsWith("/studio");
  const isWork = pathname?.startsWith("/work");
  const isContact = pathname?.startsWith("/contact");

  return (
    <>
      <div className="megaword" aria-hidden="true">
        Paperplane
      </div>

      <footer className="footer">
        <div className="footer__brand">Paperplane</div>
        <div className="footer__links">
          {!isHome && <Link href="/">Home</Link>}
          <Link href="/studio/">Studio</Link>
          {(isStudio || isContact) && <Link href="/work/">Work</Link>}
          <Link href="/map/">India Map</Link>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
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
