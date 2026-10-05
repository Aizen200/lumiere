"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Alternative layouts for "How these pieces came to be here", built to compare
// against the book in StoryArchive.tsx. Same three chapters and photographs.
const chapters = [
  {
    roman: "I",
    label: "Made",
    title: "Crafted earlier",
    subtitle: "at lower silver costs",
    headline: ["Crafted earlier.", "Priced then."],
    body: "Fraser & Hawes crafted these pieces years ago, before silver's recent rise in market value. Every gram of solid 925 bullion was cast and hand-chased at historical metal rates.",
    image: "/images/heritage_workshop.jpg",
    caption: "Plate I · Fraser & Hawes Master Foundry",
  },
  {
    roman: "II",
    label: "Kept",
    title: "Never sold",
    subtitle: "kept in our vaults",
    headline: ["Never sold.", "Kept in our vault."],
    body: "Preserved securely in sealed velvet and cedar casings within our private vault. Never displayed in commercial retail turnover or subjected to surface wear.",
    image: "/images/cat_decor.jpg",
    caption: "Plate II · Cedar & Velvet Climate Reserve",
  },
  {
    roman: "III",
    label: "Released",
    title: "Released now",
    subtitle: "with the price advantage passed to you",
    headline: ["Released now.", "At yesterday's price."],
    body: "Rather than recalculating at modern inflated market valuations, we pass that original silver advantage directly on to our collectors with up to 50% benefit.",
    image: "/images/cat_divinity.jpg",
    caption: "Plate III · Assayed 925 Collector Allocation",
  },
];

/* ------------------------------------------------------------------ */
/* Option B: the photograph stays put while the chapters scroll past   */
/* ------------------------------------------------------------------ */
export function StoryScroll() {
  const [active, setActive] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  // A chapter becomes active when it crosses the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    chapterRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-y bg-white">
      <div className="container-site grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

        <figure className="hidden lg:block lg:col-span-6 lg:sticky lg:top-32 lg:self-start">
          <div className="relative h-[calc(100svh-12rem)] max-h-[44rem] overflow-hidden bg-sand-surface">
            {chapters.map((chapter, i) => (
              <Image
                key={chapter.image}
                src={chapter.image}
                alt={chapter.title}
                fill
                sizes="50vw"
                className={`object-cover transition-opacity duration-700 ${active === i ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <figcaption className="pt-4 text-sm text-ink-muted">{chapters[active].caption}</figcaption>
        </figure>

        <div className="lg:col-span-5 lg:col-start-8">
          <h2 className="font-serif text-4xl sm:text-5xl leading-[1.05] text-ink mb-10 lg:mb-0">
            How these pieces came to be here
          </h2>

          {chapters.map((chapter, i) => (
            <div
              key={chapter.roman}
              ref={(el) => { chapterRefs.current[i] = el; }}
              data-index={i}
              className={`py-10 lg:py-0 lg:min-h-[min(70svh,36rem)] flex flex-col justify-center border-t border-sand-border lg:border-0 first:border-0 transition-opacity duration-500 ${
                active === i ? "lg:opacity-100" : "lg:opacity-35"
              }`}
            >
              <div className="relative aspect-[4/3] mb-8 overflow-hidden bg-sand-surface lg:hidden">
                <Image src={chapter.image} alt={chapter.title} fill sizes="100vw" className="object-cover" />
              </div>
              <span className="font-serif text-2xl text-ink-muted mb-3">{chapter.roman}</span>
              <h3 className="font-serif text-3xl sm:text-4xl leading-[1.08] text-ink">{chapter.title}</h3>
              <p className="font-serif italic text-xl text-ink-muted mb-6">{chapter.subtitle}</p>
              <p className="text-base leading-[1.7] text-ink-secondary max-w-md">{chapter.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Option C: three chapters, each under its own hallmark-style stamp   */
/* ------------------------------------------------------------------ */

// Assay marks come in different cartouches, so each chapter gets its own shape
const stampShapes = [
  <path key="shield" d="M3 3h42v20c0 12-9 19-21 22C12 42 3 35 3 23z" />,
  <ellipse key="oval" cx="24" cy="24" rx="21" ry="17" />,
  <path key="cut" d="M10 6h28l7 7v22l-7 7H10l-7-7V13z" />,
];

function Hallmark({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 -rotate-3 text-ink" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      {stampShapes[index]}
      <text x="24" y="29" textAnchor="middle" fill="currentColor" stroke="none" className="font-serif" fontSize="14">
        {chapters[index].roman}
      </text>
    </svg>
  );
}

export function StoryHallmarks() {
  return (
    <section className="section-y bg-white">
      <div className="container-site">

        <h2 className="font-serif text-4xl sm:text-5xl leading-[1.05] text-ink mb-10 lg:mb-14 max-w-xl">
          How these pieces came to be here
        </h2>

        {/* Columns share equal padding; the negative margin keeps the outer edges on the container */}
        <div className="border-t border-ink/15">
        <ol className="grid grid-cols-1 md:grid-cols-3 md:-mx-8">
          {chapters.map((chapter, i) => (
            <li
              key={chapter.roman}
              className={`pt-6 pb-10 md:pb-0 md:px-8 ${i > 0 ? "border-t md:border-t-0 md:border-l border-ink/15" : ""}`}
            >
              <div className="flex items-center gap-4 mb-6">
                <Hallmark index={i} />
                <span className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">{chapter.label}</span>
              </div>
              <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-sand-base">
                <Image src={chapter.image} alt={chapter.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl leading-[1.1] text-ink">{chapter.title}</h3>
              <p className="font-serif italic text-lg text-ink-muted mb-4">{chapter.subtitle}</p>
              <p className="text-[15px] leading-[1.7] text-ink-secondary">{chapter.body}</p>
            </li>
          ))}
        </ol>
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Option D: headline wrapped around the photograph, accordion beside  */
/* ------------------------------------------------------------------ */
export function StoryAccordion() {
  const [open, setOpen] = useState(0);
  const [first, second] = chapters[open].headline;

  return (
    <section className="section-y bg-ink text-sand-base">
      <div className="container-site grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* The photograph, with the chapter's headline running over its top and bottom edges */}
        <div className="lg:col-span-6 flex flex-col items-center text-center" aria-hidden>
          <p key={`a${open}`} className="animate-fade-in relative z-10 font-serif text-5xl sm:text-6xl xl:text-[4.5rem] leading-[0.95] -mb-[0.5em] max-w-[9ch]">
            {first}
          </p>
          <div className="relative w-[80%] max-w-[26rem] aspect-[7/8] overflow-hidden bg-white/5">
            {chapters.map((chapter, i) => (
              <Image
                key={chapter.image}
                src={chapter.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 26rem, 80vw"
                className={`object-cover transition-opacity duration-700 ${open === i ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="absolute inset-0 bg-ink/25" />
          </div>
          <p key={`b${open}`} className="animate-fade-in relative z-10 font-serif text-5xl sm:text-6xl xl:text-[4.5rem] leading-[0.95] -mt-[0.5em] max-w-[9ch]">
            {second}
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <h2 className="font-serif text-4xl sm:text-5xl leading-[1.05] mb-10 lg:mb-14">
            How these pieces came to be here
          </h2>

          <div className="border-t border-white/20">
            {chapters.map((chapter, i) => {
              const isOpen = open === i;
              return (
                <div key={chapter.roman} className={`border-b transition-colors ${isOpen ? "border-white/60" : "border-white/20"}`}>
                  <button
                    onClick={() => setOpen(i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 py-5 text-left text-[13px] uppercase tracking-[0.1em] cursor-pointer"
                  >
                    <span>{chapter.title}, {chapter.subtitle}.</span>
                    <span className="shrink-0 tabular-nums text-white/70">[ {isOpen ? "−" : "+"} ]</span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="pb-7 text-base leading-[1.7] text-white/70 max-w-md">{chapter.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
