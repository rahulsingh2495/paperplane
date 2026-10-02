"use client";

import { useEffect, useState, useRef } from "react";

interface StatNumberProps {
  value: number;
  hasPlus?: boolean;
}

export function StatNumber({ value, hasPlus }: StatNumberProps) {
  // Start with final value so static export and hidden/headless crawlers get exact numbers
  const [displayValue, setDisplayValue] = useState(value);
  const ref = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || animatedRef.current) return;

    // If tab is hidden (e.g. headless crawl or background tab), leave final number
    if (typeof document !== "undefined" && document.hidden) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          setDisplayValue(0);

          const duration = 1600;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = Math.max(0, now - start);
            const progress = Math.min(1, Math.max(0, elapsed / duration));
            // Power2.out easing: 1 - (1 - progress) ^ 2
            const eased = 1 - Math.pow(1 - progress, 2);
            let current = Math.round(eased * value);
            if (current <= 0 || Object.is(current, -0)) {
              current = 0;
            }
            if (current > value) {
              current = value;
            }
            setDisplayValue(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <b ref={ref} data-count={value} data-plus={hasPlus ? "" : undefined}>
      {displayValue.toLocaleString("en-IN")}
      {hasPlus && <sup>+</sup>}
    </b>
  );
}
