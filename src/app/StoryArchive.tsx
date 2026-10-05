"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Must match the page-flip animation durations in globals.css
const FLIP_OUT_MS = 380;
const FLIP_IN_MS = 520;

// How long each spread stays open before the book turns itself
const AUTOPLAY_MS = 4000;

export default function StoryArchive() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

  const pages = [
    {
      roman: "I",
      record: "FOLIO RECORD 1",
      pageNo: "01 / 03",
      folioBadge: "FOLIO 18",
      subline: "FRASER & HAWES ARCHIVES",
      title: "Crafted earlier",
      subtitle: "at lower silver costs",
      body: "Fraser & Hawes crafted these pieces years ago, before silver's recent rise in market value. Every gram of solid 925 bullion was cast and hand-chased at historical metal rates.",
      image: "/images/heritage_workshop.jpg",
      caption: "Plate I • Fraser & Hawes Master Foundry",
      footerTag: "OFFICIAL VAULT LEDGER STANDARD"
    },
    {
      roman: "II",
      record: "FOLIO RECORD 2",
      pageNo: "02 / 03",
      folioBadge: "FOLIO 24",
      subline: "FRASER & HAWES ARCHIVES",
      title: "Never sold",
      subtitle: "kept in our vaults",
      body: "Preserved securely in sealed velvet and cedar casings within our private vault. Never displayed in commercial retail turnover or subjected to surface wear.",
      image: "/images/cat_decor.jpg",
      caption: "Plate II • Cedar & Velvet Climate Reserve",
      footerTag: "OFFICIAL VAULT LEDGER STANDARD"
    },
    {
      roman: "III",
      record: "FOLIO RECORD 3",
      pageNo: "03 / 03",
      folioBadge: "FOLIO 31",
      subline: "FRASER & HAWES ARCHIVES",
      title: "Released now",
      subtitle: "with the price advantage passed to you",
      body: "Rather than recalculating at modern inflated market valuations, we pass that original silver advantage directly on to our collectors with up to 50% benefit.",
      image: "/images/cat_divinity.jpg",
      caption: "Plate III • Assayed 925 Collector Allocation",
      footerTag: "OFFICIAL VAULT LEDGER STANDARD"
    },
  ];

  const [animatingPhase, setAnimatingPhase] = useState<"idle" | "leaving" | "entering">("idle");

  const handleTurnPage = (direction: "next" | "prev", target?: number) => {
    if (isFlipping) return;
    const nextPage =
      target ??
      (direction === "next"
        ? (currentPage + 1) % pages.length
        : (currentPage - 1 + pages.length) % pages.length);

    setFlipDirection(direction);
    setIsFlipping(true);
    setAnimatingPhase("leaving");

    // Swap content while the turning page is edge-on, then let the new page settle
    setTimeout(() => {
      setCurrentPage(nextPage);
      setAnimatingPhase("entering");

      setTimeout(() => {
        setIsFlipping(false);
        setAnimatingPhase("idle");
      }, FLIP_IN_MS);
    }, FLIP_OUT_MS);
  };

  // Autoplay: turn the page on a timer while the book is on screen, pausing
  // while the reader hovers or focuses it. A manual turn restarts the timer.
  const sectionRef = useRef<HTMLElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || !isInView || isFlipping) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => handleTurnPage("next"), AUTOPLAY_MS);
    return () => clearTimeout(timer);
    // handleTurnPage is recreated each render; currentPage covers its changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isPaused, isInView, isFlipping]);

  const current = pages[currentPage];

  return (
    <section ref={sectionRef} id="story" className="section-y bg-white text-ink overflow-hidden">
      <div className="container-site">
        
        {/* Curatorial Header */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="font-serif text-4xl sm:text-5xl leading-[1.05] text-ink">
            How These Pieces Came to Be Here
          </h2>
        </div>

        {/* 3D Book Ledger Container */}
        <div
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          
          {/* Book Outer Binding Frame in Warm Sand / Heirloom Linen */}
          <div className="relative w-full bg-[#fbfbf9] border border-[#dcd6ca] p-2 sm:p-3 lg:p-4 shadow-[0_20px_50px_rgba(20,19,18,0.08)] rounded-[2px]">
            
            {/* Fine Inset Hairline Border */}
            <div className="border border-[#e8e4dc] px-5 py-6 sm:p-8 lg:px-12 lg:py-14 relative bg-[#fcfbfa]">
              
              {/* Corner Accents */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-[#8c827a]" />
              <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-[#8c827a]" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-[#8c827a]" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-[#8c827a]" />

              {/* Two Open Pages Spread Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 relative items-stretch">
                
                {/* ================= LEFT PAGE (IMAGE) ================= */}
                <div className={`lg:col-span-6 lg:pr-10 pb-8 lg:pb-0 -mx-[15px] -mt-[19px] sm:-mx-[27px] sm:-mt-[27px] lg:-ml-[43px] lg:mr-0 lg:-my-[51px] flex flex-col justify-center relative ${
                  isFlipping && flipDirection === "prev" && animatingPhase === "leaving"
                    ? "page-flip-curl-prev"
                    : isFlipping && flipDirection === "next" && animatingPhase === "entering"
                    ? "page-flip-enter-next"
                    : ""
                }`}>
                  
                  {/* Left Page Inner Shadow / Gutter Gradient */}
                  <div className="hidden lg:block absolute top-0 right-0 w-12 h-full book-inner-left-gutter pointer-events-none z-20" />

                  {/* Left plate image, running out to the frame's corner marks */}
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:flex-1 lg:min-h-[24rem] w-full bg-[#f4f2ec] group">
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={current.image}
                        alt={current.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-103"
                        priority
                      />
                    </div>
                  </div>

                </div>

                {/* ================= CENTER SPINE OF THE BOOK ================= */}
                <div className="hidden lg:block lg:col-span-1 relative lg:-my-[51px]">
                  <div className="absolute inset-0 flex justify-center items-center">
                    {/* Spine Ridge Column */}
                    <div className="w-8 h-full book-spine-gradient border-x border-[#dcd6ca] shadow-[inset_0_0_8px_rgba(20,19,18,0.06)] flex flex-col justify-around items-center py-8">
                      <div className="w-[1px] h-6 bg-[#dcd6ca]" />
                      <div className="w-[1px] h-6 bg-[#dcd6ca]" />
                      <div className="w-[1px] h-6 bg-[#dcd6ca]" />
                      <div className="w-[1px] h-6 bg-[#dcd6ca]" />
                    </div>
                  </div>
                </div>

                {/* ================= RIGHT PAGE (EDITORIAL TEXT & FLIP CONTROLS) ================= */}
                <div className={`lg:col-span-5 lg:pl-10 lg:-mr-[43px] lg:pr-[43px] lg:-my-[51px] lg:py-[51px] flex flex-col justify-between relative ${
                  isFlipping && flipDirection === "next" && animatingPhase === "leaving"
                    ? "page-flip-curl-next"
                    : isFlipping && flipDirection === "prev" && animatingPhase === "entering"
                    ? "page-flip-enter-prev"
                    : ""
                }`}>
                  
                  {/* Right Page Inner Shadow / Gutter Gradient */}
                  <div className="hidden lg:block absolute top-0 left-0 w-12 h-full book-inner-right-gutter pointer-events-none z-20" />

                  {/* Right Page Body Content */}
                  <div className="flex-1 flex flex-col justify-center pb-8 lg:py-6">
                    
                    {/* Roman Numeral Callout with Rule */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-serif text-4xl sm:text-5xl text-[#141312] leading-none">
                        {current.roman}
                      </span>
                      <div className="flex-1 h-[1px] bg-[#e8e4dc]" />
                    </div>

                    {/* Main Title */}
                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#141312] font-normal tracking-tight mb-2">
                      {current.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="font-serif text-xl sm:text-2xl text-[#8c827a] font-normal mb-6">
                      {current.subtitle}
                    </p>

                    <div className="w-10 h-[1px] bg-[#e8e4dc] mb-6" />

                    {/* Body Text */}
                    <p className="font-sans text-[15px] text-[#57534e] leading-[1.7] max-w-md font-normal">
                      {current.body}
                    </p>

                  </div>

                  {/* Bottom Turn Page Navigation Matching Reference Image */}
                  <div className="flex items-center justify-between pt-5 border-t border-[#e8e4dc]">
                    {/* Turn Back Button */}
                    <button
                      onClick={() => handleTurnPage("prev")}
                      disabled={isFlipping}
                      className="group flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.25em] text-[#8c827a] hover:text-[#141312] transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
                      <span>TURN BACK</span>
                    </button>

                    {/* Page Indicator Dots */}
                    <div className="flex items-center gap-3">
                      {pages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (idx === currentPage || isFlipping) return;
                            handleTurnPage(idx > currentPage ? "next" : "prev", idx);
                          }}
                          className={`transition-all duration-300 cursor-pointer ${
                            currentPage === idx
                              ? "w-4 h-4 rounded-full border border-[#141312] flex items-center justify-center"
                              : "w-2 h-2 rounded-full bg-[#dcd6ca] hover:bg-[#8c827a]"
                          }`}
                          aria-label={`Go to page ${idx + 1}`}
                        >
                          {currentPage === idx && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#141312]" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Next Page Button */}
                    <button
                      onClick={() => handleTurnPage("next")}
                      disabled={isFlipping}
                      className="group flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.25em] text-[#8c827a] hover:text-[#141312] transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <span>NEXT PAGE</span>
                      <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

