import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The wall you are looking for is still blank.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="lost min-h-[calc(100vh-140px)] flex flex-col justify-center px-6 md:px-14 py-24 max-w-[1500px] mx-auto">
      <p className="eyebrow mb-6">Error 404</p>
      <h1 className="font-[var(--font-space)] font-medium uppercase text-4xl sm:text-6xl md:text-8xl leading-[0.93] tracking-[-0.025em] max-w-[14ch]">
        This wall is still <em className="not-italic text-[var(--accent)]">blank.</em>
      </h1>
      <p className="mt-6 max-w-[46ch] text-base md:text-lg leading-relaxed text-[#2a251d]">
        The page you were looking for isn&apos;t here. It may have moved, or the link may have a typo.
      </p>
      <div className="lost__links flex flex-wrap gap-x-7 gap-y-3 mt-8">
        <Link href="/" className="text-[15px] font-semibold border-b border-[#191510] py-2 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors">
          Back to the homepage
        </Link>
        <Link href="/work/" className="text-[15px] font-semibold border-b border-[#191510] py-2 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors">
          See all projects
        </Link>
        <Link href="/map/" className="text-[15px] font-semibold border-b border-[#191510] py-2 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors">
          Explore the map
        </Link>
      </div>
    </main>
  );
}
