"use client";

import Image from "next/image";
import { useState } from "react";

export default function StoryArchive() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const pages = [
    {
      roman: "I",
      folio: "Folio 18",
      title: "Crafted earlier",
      subtitle: "at lower silver costs",
      image: "/images/heritage_workshop.jpg",
      caption: "Plate I • Fraser & Hawes Master Foundry",
    },
    {
      roman: "II",
      folio: "Folio 24",
      title: "Never sold",
      subtitle: "kept in our vaults",
      image: "/images/cat_decor.jpg",
      caption: "Plate II • Cedar & Velvet Reserve Case",
    },
    {
      roman: "III",
      folio: "Folio 31",
      title: "Released now",
      subtitle: "with the price advantage passed to you",
      image: "/images/cat_divinity.jpg",
      caption: "Plate III • Assayed 925 Direct Allocation",
    },
  ];

  const handleTurnPage = (direction: "next" | "prev") => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      if (direction === "next") {
        setCurrentPage((prev) => (prev + 1) % pages.length);
      } else {
        setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
      }
      setIsFlipping(false);
    }, 450);
  };

  const current = pages[currentPage];

  return (
    <section className="py-24 md:py-36 px-4 sm:px-6 bg-[#0a0908] border-t border-[#26201a] relative overflow-hidden select-none">
      {/* Background warm library atmosphere */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle at 50% 40%, rgba(197, 168, 128, 0.12) 0%, transparent 70%)"
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header with client's exact sentence */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#c5a880]/50"></span>
            <span className="text-[10px] font-cinzel uppercase tracking-[0.35em] text-[#c5a880]">
              Silversmith Ledger • Archive Record
            </span>
            <span className="w-8 h-[1px] bg-[#c5a880]/50"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#f5f2eb] mb-4 tracking-wide leading-tight">
            How These Pieces Came To Be Here
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#dcd5c5] max-w-2xl mx-auto">
            This section is what makes the discount believable rather than suspicious.
          </p>
        </div>

        {/* ================= PHYSICAL ARCHIVAL BOOK / LEDGER ================= */}
        <div className="relative max-w-4xl mx-auto perspective-1000">
          
          {/* Subtle Candlelight Radiance behind the ledger */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#c5a880]/5 via-[#dfcaa7]/10 to-[#c5a880]/5 rounded-lg blur-2xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '4s' }} />

          {/* Book Binding / Outer Leather & Gold Filigree Cover */}
          <div className="bg-[#12100d] border border-[#3d3328] rounded-sm shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(197,168,128,0.08)] p-3 sm:p-5 relative transition-all duration-700">
            
            {/* Vintage Double Hairline Inset with Ornate Corner Accents */}
            <div className="absolute inset-[8px] border border-[#c5a880]/20 pointer-events-none rounded-sm">
              <span className="absolute -top-1 -left-1 text-[10px] text-[#c5a880]/60 select-none">⌜</span>
              <span className="absolute -top-1 -right-1 text-[10px] text-[#c5a880]/60 select-none">⌝</span>
              <span className="absolute -bottom-1 -left-1 text-[10px] text-[#c5a880]/60 select-none">⌞</span>
              <span className="absolute -bottom-1 -right-1 text-[10px] text-[#c5a880]/60 select-none">⌟</span>
            </div>
            
            {/* The Open Ledger Spread */}
            <div className="relative bg-[#171410] border border-[#2b241c] grid grid-cols-1 md:grid-cols-12 min-h-[480px] overflow-hidden rounded-xs">
              
              {/* Central Spine Shadow with 3D Depth & Stitched Thread Impression */}
              <div className="hidden md:flex absolute left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 pointer-events-none z-30 justify-center items-stretch">
                <div className="w-full bg-gradient-to-r from-[#0c0a08]/80 via-[#060504]/95 to-[#0c0a08]/80 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] flex flex-col justify-around items-center py-6 opacity-85">
                  <div className="w-[1px] h-8 bg-[#8e795d]/30" />
                  <div className="w-[1px] h-8 bg-[#8e795d]/30" />
                  <div className="w-[1px] h-8 bg-[#8e795d]/30" />
                  <div className="w-[1px] h-8 bg-[#8e795d]/30" />
                </div>
              </div>

              {/* LEFT PAGE: Photographic Archival Plate with Vintage Dissolve & Corner Mounts */}
              <div className="md:col-span-6 p-6 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#26201a] relative bg-gradient-to-br from-[#171410] to-[#120f0d]">
                
                {/* Folio Header */}
                <div className="flex justify-between items-center text-[#8e795d] font-cinzel text-[10px] tracking-[0.25em] uppercase pb-3 border-b border-[#26201a]">
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#c5a880]">✦</span>
                    {current.folio}
                  </span>
                  <span>Fraser &amp; Hawes Archives</span>
                </div>

                {/* Framed Sepia/Silver Plate with Page Turn Animation */}
                <div 
                  className={`my-6 relative aspect-[4/3] w-full border border-[#3d3328] p-2 bg-[#0e0c0a] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isFlipping ? "opacity-20 scale-[0.96] -rotate-1 brightness-75" : "opacity-100 scale-100 rotate-0 brightness-100"
                  }`}
                >
                  {/* Photo Corner Mounts (Antique Photo Album Style) */}
                  <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#8e795d]/70 z-20 pointer-events-none" />
                  <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#8e795d]/70 z-20 pointer-events-none" />
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#8e795d]/70 z-20 pointer-events-none" />
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#8e795d]/70 z-20 pointer-events-none" />

                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={current.image}
                      alt={current.title}
                      fill
                      className="object-cover filter sepia-[0.3] contrast-[1.08] brightness-90 transition-transform duration-1000 ease-out"
                      priority
                    />
                    <div className="absolute inset-0 bg-radial from-transparent via-[#0c0a08]/20 to-[#0c0a08]/50 pointer-events-none"></div>
                  </div>
                </div>

                {/* Plate Caption with Antique Wax Seal Stamp */}
                <div className="flex justify-between items-center">
                  <span className="font-serif italic text-xs text-[#a49c90]">
                    {current.caption}
                  </span>
                  <div className="w-6 h-6 rounded-full border border-[#8e795d]/40 flex items-center justify-center text-[9px] font-cinzel text-[#c5a880]/70 select-none">
                    925
                  </div>
                </div>
              </div>

              {/* RIGHT PAGE: The Handwritten Ledger Entry with Page Turn Slide */}
              <div 
                className={`md:col-span-6 p-6 sm:p-12 flex flex-col justify-between relative bg-gradient-to-bl from-[#181511] to-[#13110e] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isFlipping ? "opacity-20 translate-x-4 brightness-75" : "opacity-100 translate-x-0 brightness-100"
                }`}
              >
                {/* Folio Page Number */}
                <div className="flex justify-between items-center text-[#8e795d] font-cinzel text-[10px] tracking-[0.25em] uppercase pb-3 border-b border-[#26201a]">
                  <span>Folio Record {current.roman}</span>
                  <span className="text-[#c5a880]/90">0{currentPage + 1} / 03</span>
                </div>

                {/* Central Manuscript Text with Golden Shimmer */}
                <div className="my-auto py-6">
                  {/* Roman Numeral Callout */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-serif text-5xl sm:text-6xl text-[#c5a880] leading-none opacity-90">
                      {current.roman}
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-[#c5a880]/40 to-transparent" />
                  </div>

                  {/* Step Title */}
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#f5f2eb] mb-3 tracking-wide leading-tight drop-shadow-sm">
                    {current.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="font-serif italic text-xl sm:text-2xl text-[#dfcaa7] leading-relaxed">
                    {current.subtitle}
                  </p>

                  <div className="w-16 h-[1px] bg-[#c5a880]/30 my-6"></div>

                  <div className="flex items-center gap-2 text-[10px] font-cinzel uppercase tracking-[0.25em] text-[#8e795d]">
                    <span className="text-[#c5a880]">❖</span>
                    <span>Official Vault Ledger Standard</span>
                  </div>
                </div>

                {/* Bottom Page-Turn Controls (Styled like vintage leather bookmark tabs) */}
                <div className="pt-4 border-t border-[#26201a] flex items-center justify-between">
                  <button
                    onClick={() => handleTurnPage("prev")}
                    disabled={currentPage === 0 || isFlipping}
                    className={`text-xs font-cinzel uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 py-1.5 px-2.5 rounded-xs cursor-pointer ${
                      currentPage === 0
                        ? "text-[#4a4237] cursor-not-allowed opacity-40"
                        : "text-[#8e795d] hover:text-[#c5a880] hover:bg-[#201b15]/60"
                    }`}
                  >
                    <span>&larr;</span>
                    <span>Turn Back</span>
                  </button>

                  {/* Wax Seal Pips */}
                  <div className="flex items-center gap-2.5">
                    {pages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (currentPage !== i && !isFlipping) {
                            handleTurnPage(i > currentPage ? "next" : "prev");
                          }
                        }}
                        className={`transition-all duration-500 rounded-full cursor-pointer flex items-center justify-center ${
                          currentPage === i 
                            ? "w-4 h-4 rounded-full border border-[#c5a880] bg-[#c5a880]/20 shadow-[0_0_8px_rgba(197,168,128,0.5)]" 
                            : "w-2 h-2 rounded-full bg-[#3d3328] hover:bg-[#8e795d]"
                        }`}
                        aria-label={`Jump to page ${i + 1}`}
                      >
                        {currentPage === i && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleTurnPage("next")}
                    disabled={currentPage === pages.length - 1 || isFlipping}
                    className={`text-xs font-cinzel uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 py-1.5 px-2.5 rounded-xs cursor-pointer ${
                      currentPage === pages.length - 1
                        ? "text-[#4a4237] cursor-not-allowed opacity-40"
                        : "text-[#c5a880] hover:text-[#dfcaa7] hover:bg-[#201b15]/60"
                    }`}
                  >
                    <span>Next Page</span>
                    <span>&rarr;</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
