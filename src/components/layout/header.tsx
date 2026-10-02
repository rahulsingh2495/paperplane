"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { site } from "@/lib/site";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [isSolid, setIsSolid] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const isHome = pathname === "/";
      const hero = document.getElementById("hero");
      if (isHome && hero) {
        setAtTop(window.scrollY < hero.offsetHeight - 70);
      } else {
        setAtTop(false);
      }
      setIsSolid(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const navEl = document.getElementById("nav");
      if (navEl && !navEl.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const mql = window.matchMedia("(min-width: 721px)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);
    mql.addEventListener("change", handleMediaChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
      mql.removeEventListener("change", handleMediaChange);
    };
  }, [isOpen]);

  const classes = ["nav"];
  if (isOpen) classes.push("is-open");
  if (pathname === "/" && atTop) classes.push("at-top");
  if (isSolid) classes.push("is-solid");

  return (
    <header className={classes.join(" ")} id="nav">
      <Link href="/" className="nav__logo" aria-label="Paperplane home">
        <Image
          src="/img/brand/paperplane-logo.png"
          alt="Paperplane"
          width={577}
          height={329}
          priority
        />
      </Link>

      <nav className="nav__links" id="navLinks">
        {site.nav.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link href="/contact/" className="nav__cta">
        Start a project
      </Link>

      <button
        type="button"
        className="nav__menu"
        aria-controls="navLinks"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="nav__menu-label">{isOpen ? "Close" : "Menu"}</span>
        <span className="nav__menu-icon" aria-hidden="true" />
      </button>
    </header>
  );
}
