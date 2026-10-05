"use client";

import { useEffect, useRef } from "react";

// Scroll-linked urgency message. The section is taller than the screen and its
// content stays pinned. On white, the headline lights up word by word; as the
// paragraph begins the page turns to ink, and the paragraph lights up in white.
const headline = [
  { text: "Once these are gone,", italic: false },
  { text: "they're gone.", italic: true },
];
const paragraph =
  "No restocks at this price. We can't buy silver at what it cost when these were made, so when the shelf is empty, the Vault Release is over.";

// Share of the scroll given to each stage
const HEADLINE = [0, 0.32];
const DARK = [0.32, 0.42];
const PARAGRAPH = [0.42, 0.85];
const DIM = 0.15;

// Light and dark values for the background and the site's three text tones
const palette = {
  "--bg": [[255, 255, 255], [20, 19, 18]],
  "--fg": [[20, 19, 18], [251, 251, 249]],
  "--fg-muted": [[140, 130, 122], [205, 200, 194]],
  "--fg-secondary": [[87, 83, 78], [228, 226, 222]],
};

const mix = (a: number[], b: number[], t: number) =>
  `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const stage = (progress: number, [start, end]: number[]) => clamp((progress - start) / (end - start));

// Light each word in turn as the stage's progress moves from 0 to 1
const reveal = (words: HTMLSpanElement[], t: number) => {
  const lit = t * words.length;
  words.forEach((word, i) => {
    word.style.opacity = String(DIM + (1 - DIM) * clamp(lit - i));
  });
};

export default function UrgencySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headlineWords = useRef<HTMLSpanElement[]>([]);
  const paragraphWords = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const section = sectionRef.current;
      const stageEl = stageRef.current;
      if (!section || !stageEl) return;

      const rect = section.getBoundingClientRect();
      const progress = clamp(-rect.top / (rect.height - window.innerHeight));

      reveal(headlineWords.current, stage(progress, HEADLINE));
      reveal(paragraphWords.current, stage(progress, PARAGRAPH));

      const dark = stage(progress, DARK);
      Object.entries(palette).forEach(([name, [light, darkValue]]) => {
        stageEl.style.setProperty(name, mix(light, darkValue, dark));
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Each word is its own span so it can light up on its own
  const words = (text: string, refs: React.RefObject<HTMLSpanElement[]>, offset = 0) =>
    text.split(" ").map((word, n) => {
      const i = offset + n;
      return (
        <span key={i} ref={(el) => { if (el) refs.current[i] = el; }} style={{ opacity: DIM }}>
          {word}{" "}
        </span>
      );
    });

  return (
    <section ref={sectionRef} className="relative h-[260svh]">
      <div
        ref={stageRef}
        className="sticky top-0 h-svh flex items-center bg-(--bg) text-(--fg) [--bg:#fff] [--fg:#141312] [--fg-muted:#8c827a] [--fg-secondary:#57534e]"
      >
        <div className="container-site text-center">
          <h2 className="font-serif text-5xl sm:text-6xl xl:text-[4.5rem] leading-[1.02] mb-8">
            <span className="block">{words(headline[0].text, headlineWords)}</span>
            <span className="block italic text-(--fg-muted)">
              {words(headline[1].text, headlineWords, headline[0].text.split(" ").length)}
            </span>
          </h2>
          <p className="text-base sm:text-[17px] leading-[1.7] text-(--fg-secondary) max-w-md mx-auto">
            {words(paragraph, paragraphWords)}
          </p>
        </div>
      </div>
    </section>
  );
}
