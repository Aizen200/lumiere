"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import Image from "next/image";

const LOUPE_RADIUS = 84;

const points = [
  {
    title: "Chased by hand",
    desc: "Shaped and detailed at the bench with hammer and punch. No machine stamping, no die-casting in bulk.",
  },
  {
    title: "Solid 925 sterling",
    desc: "Every piece is hallmarked and assayed. Nothing plated, nothing hollow.",
  },
  {
    title: "Stored, not displayed",
    desc: "Kept in cedar and flannel since the day it was made, so the surface is as it left the workshop.",
  },
];

export default function HeritageArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loupePos, setLoupePos] = useState({ x: 52, y: 48 });
  const [size, setSize] = useState({ width: 600, height: 450 });
  const isHoveredRef = useRef(false);

  // Track the canvas size so the magnified layer lines up with the photo
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Slow idle drift for the loupe, only while the canvas is on screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animId = 0;
    const startTime = Date.now();

    const loop = () => {
      if (!isHoveredRef.current) {
        const t = (Date.now() - startTime) / 1000;
        const x = 50 + Math.sin(t * 0.45) * 18 + Math.cos(t * 0.22) * 8;
        const y = 50 + Math.cos(t * 0.38) * 15 + Math.sin(t * 0.18) * 6;
        setLoupePos({ x, y });
      }
      animId = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(animId);
      if (entry.isIntersecting) animId = requestAnimationFrame(loop);
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(16, Math.min(84, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(16, Math.min(84, ((e.clientY - rect.top) / rect.height) * 100));
    setLoupePos({ x, y });
  };

  return (
    <section className="section-y bg-white overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Workshop photo with magnifying loupe */}
          <figure className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseEnter={() => (isHoveredRef.current = true)}
              onMouseLeave={() => (isHoveredRef.current = false)}
              onMouseMove={handleMouseMove}
              className="relative aspect-[4/3] w-full overflow-hidden bg-sand-border cursor-crosshair"
            >
              <Image
                src="/images/heritage_workshop.jpg"
                alt="Fraser & Hawes silversmiths at work in the workshop"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover animate-ambient-drift"
              />

              <div
                className="absolute pointer-events-none z-10 rounded-full overflow-hidden shadow-[0_18px_45px_rgba(20,19,18,0.4)]"
                style={{
                  width: LOUPE_RADIUS * 2,
                  height: LOUPE_RADIUS * 2,
                  left: `${loupePos.x}%`,
                  top: `${loupePos.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className="absolute"
                  style={{
                    width: size.width,
                    height: size.height,
                    left: -(loupePos.x / 100) * size.width + LOUPE_RADIUS,
                    top: -(loupePos.y / 100) * size.height + LOUPE_RADIUS,
                  }}
                >
                  <Image
                    src="/images/hero_silver.jpg"
                    alt=""
                    fill
                    sizes="55vw"
                    className="object-cover scale-135"
                  />
                </div>
                <div className="absolute inset-0 rounded-full border-[3px] border-accent-gold shadow-[inset_0_0_15px_rgba(0,0,0,0.35)]" />
              </div>
            </div>
            <figcaption className="mt-3 text-sm text-ink-muted">
              Move over the photograph to look closer.
            </figcaption>
          </figure>

          {/* Text */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl sm:text-5xl leading-[1.05] text-ink mb-6">
              A legacy of art in silver
            </h2>
            <p className="text-base leading-[1.7] text-ink-secondary max-w-md mb-10">
              For over 150 years we&apos;ve worked the same way: slowly, by hand, one piece at a time. The methods haven&apos;t changed much, and we don&apos;t want them to.
            </p>

            <dl className="border-t border-sand-border">
              {points.map((point) => (
                <div key={point.title} className="py-5 border-b border-sand-border">
                  <dt className="text-[15px] font-medium text-ink mb-1">{point.title}</dt>
                  <dd className="text-sm leading-relaxed text-ink-secondary">{point.desc}</dd>
                </div>
              ))}
            </dl>

            <a href="#craft" className="link-line inline-block mt-10">
              How we make it
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
