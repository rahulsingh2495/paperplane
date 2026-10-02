"use client";

import { useEffect, useState, useRef } from "react";

interface StatNumberProps {
  value: number;
  hasPlus?: boolean;
}

export function StatNumber({ value, hasPlus }: StatNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1600;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(1, elapsed / duration);
            // Power2.out easing: 1 - (1 - progress) ^ 2
            const eased = 1 - Math.pow(1 - progress, 2);
            const current = Math.round(eased * value);
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
  }, [value, hasAnimated]);

  return (
    <b ref={ref} data-count={value}>
      {hasAnimated ? displayValue.toLocaleString("en-IN") : value.toLocaleString("en-IN")}
      {hasPlus && <sup>+</sup>}
    </b>
  );
}
