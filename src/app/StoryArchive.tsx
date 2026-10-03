"use client";

import Image from "next/image";
import { useState } from "react";

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

  const handleTurnPage = (direction: "next" | "prev") => {
    if (isFlipping) return;
    setFlipDirection(direction);
    setIsFlipping(true);
    setAnimatingPhase("leaving");

    setTimeout(() => {
      if (direction === "next") {
        setCurrentPage((prev) => (prev === pages.length - 1 ? 0 : prev + 1));
      } else {
        setCurrentPage((prev) => (prev === 0 ? pages.length - 1 : prev - 1));
      }
      setAnimatingPhase("entering");

      setTimeout(() => {
        setIsFlipping(false);
        setAnimatingPhase("idle");
      }, 500);
    }, 450);
  };

  const current = pages[currentPage];

  return (
    <section id="story" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#f4f2ec] text-[#141312] border-t border-[#e8e4dc] overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Curatorial Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-5xl font-serif text-[#141312] tracking-tight font-normal">
            How These Pieces Came to Be Here
          </h2>
        </div>

        {/* 3D Book Ledger Container */}
        <div className="perspective-book relative w-full">
          
          {/* Book Outer Binding Frame in Warm Sand / Heirloom Linen */}
          <div className="relative w-full bg-[#fbfbf9] border border-[#dcd6ca] p-3 sm:p-5 lg:p-7 shadow-[0_20px_50px_rgba(20,19,18,0.08)] rounded-[2px]">
            
            {/* Fine Inset Hairline Border */}
            <div className="border border-[#e8e4dc] p-4 sm:p-8 lg:p-10 relative bg-[#fcfbfa]">
              
              {/* Corner Accents */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-[#8c827a]" />
              <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-[#8c827a]" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-[#8c827a]" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-[#8c827a]" />

              {/* Two Open Pages Spread Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 relative items-stretch">
                
                {/* ================= LEFT PAGE (IMAGE) ================= */}
                <div className={`lg:col-span-6 pr-0 lg:pr-8 pb-10 lg:pb-0 flex flex-col justify-center relative ${
                  isFlipping && flipDirection === "prev" && animatingPhase === "leaving"
                    ? "page-flip-curl-prev"
                    : isFlipping && flipDirection === "next" && animatingPhase === "entering"
                    ? "page-flip-enter-next"
                    : ""
                }`}>
                  
                  {/* Left Page Inner Shadow / Gutter Gradient */}
                  <div className="hidden lg:block absolute top-0 right-0 w-12 h-full book-inner-left-gutter pointer-events-none z-20" />

                  {/* Left Plate Framed Image */}
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full bg-[#f4f2ec] border border-[#e8e4dc] p-2 relative group">
                    {/* Inset Photo Corners */}
                    <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#8c827a]/80 z-20" />
                    <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#8c827a]/80 z-20" />
                    <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#8c827a]/80 z-20" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#8c827a]/80 z-20" />

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
                <div className="hidden lg:block lg:col-span-1 relative">
                  <div className="absolute inset-0 flex justify-center items-center">
                    {/* Spine Ridge Column */}
                    <div className="w-8 h-[105%] -my-2 book-spine-gradient border-x border-[#dcd6ca] shadow-[inset_0_0_8px_rgba(20,19,18,0.06)] flex flex-col justify-around items-center py-8">
                      <div className="w-[1px] h-6 bg-[#dcd6ca]" />
                      <div className="w-[1px] h-6 bg-[#dcd6ca]" />
                      <div className="w-[1px] h-6 bg-[#dcd6ca]" />
                      <div className="w-[1px] h-6 bg-[#dcd6ca]" />
                    </div>
                  </div>
                </div>

                {/* ================= RIGHT PAGE (EDITORIAL TEXT & FLIP CONTROLS) ================= */}
                <div className={`lg:col-span-5 pl-0 lg:pl-8 pt-8 lg:pt-0 flex flex-col justify-between relative ${
                  isFlipping && flipDirection === "next" && animatingPhase === "leaving"
                    ? "page-flip-curl-next"
                    : isFlipping && flipDirection === "prev" && animatingPhase === "entering"
                    ? "page-flip-enter-prev"
                    : ""
                }`}>
                  
                  {/* Right Page Inner Shadow / Gutter Gradient */}
                  <div className="hidden lg:block absolute top-0 left-0 w-12 h-full book-inner-right-gutter pointer-events-none z-20" />

                  {/* Right Page Body Content */}
                  <div className="flex-1 flex flex-col justify-center py-4">
                    
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
                    <p className="font-sans text-xs sm:text-sm text-[#57534e] leading-relaxed mb-6 font-normal">
                      {current.body}
                    </p>

                  </div>

                  {/* Bottom Turn Page Navigation Matching Reference Image */}
                  <div className="flex items-center justify-between pt-6 border-t border-[#e8e4dc]">
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
                            handleTurnPage(idx > currentPage ? "next" : "prev");
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

