"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { site } from "@/lib/site";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header className={`nav ${isOpen ? "is-open" : ""}`} id="nav">
      <Link href="/" className="nav__logo" aria-label="Paperplane home">
        <Image
          src="/img/brand/paperplane-logo.png"
          alt="Paperplane"
          width={577}
          height={329}
          priority
          className="h-11 w-auto block"
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
