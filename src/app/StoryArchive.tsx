"use client";

import Image from "next/image";
import { useState } from "react";

export default function StoryArchive() {
  const [currentPage, setCurrentPage] = useState(0);

  const stories = [
    {
      num: "01",
      eyebrow: "Historical Provenance",
      title: "Silver forged at yesterday's bullion rates.",
      body: "Crafted years prior to current market valuations, these pieces preserve the density, hand-chasing, and assay hallmarks of our original London and Calcutta workbenches.",
      image: "/images/heritage_workshop.jpg",
      label: "Fraser & Hawes Workshop Archive • Circa 1974",
    },
    {
      num: "02",
      eyebrow: "Vault Preservation",
      title: "Preserved in sealed cedar & velvet cases.",
      body: "Never displayed on commercial retail floors or touched by casual hands. Held in climate-regulated vaults under constant temperature to prevent patina decay.",
      image: "/images/cat_decor.jpg",
      label: "Archival Vault Folio • Assayed Ingot Spec",
    },
    {
      num: "03",
      eyebrow: "Direct Allocation",
      title: "Direct advantage passed to collectors today.",
      body: "Rather than melt or recalculate at modern inflated bullion rates, we release these 68 certified pieces with up to 50% historical valuation advantage.",
      image: "/images/cat_divinity.jpg",
      label: "925 Sterling Touchmark • Certified Series",
    },
  ];

  const current = stories[currentPage];

  return (
    <section className="py-28 md:py-36 px-6 sm:px-10 lg:px-16 bg-[#f4f2ec] border-t border-[#e8e4dc]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#e8e4dc] gap-6">
          <div>
            <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#8c827a] block mb-3">
              The Vault Chronicle
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#141312] tracking-tight">
              Why this release exists.
            </h2>
          </div>
          <p className="font-sans text-sm text-[#57534e] max-w-md leading-relaxed">
            A rare alignment of historical bullion value and silversmithing heritage, documented in three chapters.
          </p>
        </div>

        {/* 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetric Portrait Image with Clean Framing */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-[#e8e4dc]">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover transition-transform duration-1000 ease-out hover:scale-103"
                priority
              />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-[#141312] bg-[#fbfbf9]/90 backdrop-blur-xs px-4 py-2 border border-[#e8e4dc]/80">
                <span>{current.label}</span>
                <span className="text-[#8c827a]">Assay Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Tab Switcher */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Step Indicators */}
            <div className="flex items-center gap-8 mb-10 pb-4 border-b border-[#e8e4dc]">
              {stories.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`text-xs font-sans tracking-[0.2em] uppercase transition-colors relative pb-2 -mb-2 cursor-pointer ${
                    currentPage === idx
                      ? "text-[#141312] font-medium"
                      : "text-[#8c827a] hover:text-[#141312]"
                  }`}
                >
                  <span>{item.num}</span>
                  {currentPage === idx && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#141312]" />
                  )}
                </button>
              ))}
            </div>

            <div className="min-h-[220px]">
              <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#8c827a] block mb-3">
                {current.eyebrow}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#141312] mb-4 leading-tight">
                {current.title}
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#57534e] leading-relaxed mb-8">
                {current.body}
              </p>
            </div>

            {/* Quiet navigation arrows */}
            <div className="flex items-center gap-4 pt-6 border-t border-[#e8e4dc]">
              <button
                onClick={() => setCurrentPage((prev) => (prev === 0 ? stories.length - 1 : prev - 1))}
                className="w-10 h-10 border border-[#e8e4dc] hover:border-[#141312] flex items-center justify-center text-[#141312] transition-colors text-sm"
                aria-label="Previous story"
              >
                &larr;
              </button>
              <button
                onClick={() => setCurrentPage((prev) => (prev === stories.length - 1 ? 0 : prev + 1))}
                className="w-10 h-10 border border-[#e8e4dc] hover:border-[#141312] flex items-center justify-center text-[#141312] transition-colors text-sm"
                aria-label="Next story"
              >
                &rarr;
              </button>
              <span className="text-[11px] font-sans tracking-[0.2em] text-[#8c827a] uppercase ml-2">
                Chapter {currentPage + 1} of {stories.length}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
