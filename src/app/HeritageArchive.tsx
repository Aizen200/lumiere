"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import Image from "next/image";

export default function HeritageArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loupePos, setLoupePos] = useState({ x: 52, y: 48 });
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);

  // Smooth continuous ambient patrol for the loupe
  useEffect(() => {
    let animId: number;
    const startTime = Date.now();

    const loop = () => {
      if (!isHoveredRef.current) {
        const elapsed = (Date.now() - startTime) / 1000;
        // Lissajous curve for natural organic inspection motion
        const x = 50 + Math.sin(elapsed * 0.45) * 18 + Math.cos(elapsed * 0.22) * 8;
        const y = 50 + Math.cos(elapsed * 0.38) * 15 + Math.sin(elapsed * 0.18) * 6;
        setLoupePos({ x, y });
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    isHoveredRef.current = false;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(16, Math.min(84, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(16, Math.min(84, ((e.clientY - rect.top) / rect.height) * 100));
    setLoupePos({ x, y });
  };

  const LOUPE_RADIUS = 84;

  return (
    <section className="py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-20 bg-[#fbfbf9] border-t border-[#e8e4dc] overflow-hidden">
      <div className="max-w-[1360px] mx-auto">
        
        {/* 2-Column Luxury Heritage Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Framed Workshop Plate with Interactive Brass Loupe */}
          <div className="lg:col-span-7">
            {/* Double Outer Heirloom Frame */}
            <div className="relative p-4 sm:p-6 lg:p-7 bg-[#f4f2ec] border border-[#dcd6ca] shadow-[0_25px_60px_rgba(20,19,18,0.06)] rounded-[2px]">
              
              <div className="relative border border-[#e8e4dc] p-3 sm:p-5 bg-[#fcfbfa]">
                
                {/* Corner Hairline Accents */}
                <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-[#8c827a]" />
                <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-[#8c827a]" />
                <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-[#8c827a]" />
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-[#8c827a]" />

                {/* Interactive Inspection Canvas */}
                <div 
                  ref={containerRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-[#e8e4dc] cursor-crosshair group"
                >
                  {/* Base Layer: Foundry Workshop with Ambient Drift */}
                  <Image
                    src="/images/heritage_workshop.jpg"
                    alt="Fraser &amp; Hawes Master Silversmiths Workshop 1869"
                    fill
                    className="object-cover animate-ambient-drift filter contrast-[1.05]"
                    priority
                  />

                  {/* True Magnifying Glass Assembly: Circular Glass + Brass Bezel moving as ONE unit */}
                  <div
                    className="absolute pointer-events-none z-30 rounded-full overflow-hidden will-change-transform shadow-[0_18px_45px_rgba(20,19,18,0.45),0_4px_12px_rgba(0,0,0,0.3)]"
                    style={{
                      width: `${LOUPE_RADIUS * 2}px`,
                      height: `${LOUPE_RADIUS * 2}px`,
                      left: `${loupePos.x}%`,
                      top: `${loupePos.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Synchronized Magnified Image (Calculated inverse offset for authentic optical magnification) */}
                    <div
                      className="absolute"
                      style={{
                        width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%",
                        height: containerRef.current ? `${containerRef.current.clientHeight}px` : "100%",
                        left: `${-((loupePos.x / 100) * (containerRef.current?.clientWidth || 600)) + LOUPE_RADIUS}px`,
                        top: `${-((loupePos.y / 100) * (containerRef.current?.clientHeight || 450)) + LOUPE_RADIUS}px`,
                      }}
                    >
                      <Image
                        src="/images/hero_silver.jpg"
                        alt="Inspected Master Sterling Urn Detail"
                        fill
                        className="object-cover scale-135 brightness-108 contrast-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/15" />
                    </div>

                    {/* Integrated Brass Rim & Lens Glare */}
                    <div className="absolute inset-0 rounded-full border-[3px] border-[#c5a880] pointer-events-none shadow-[inset_0_0_15px_rgba(0,0,0,0.35)]">
                      <div className="absolute inset-1 rounded-full border border-white/50 opacity-60" />
                    </div>
                  </div>

                </div>

                {/* Subtle caption beneath artwork frame */}
                <div className="mt-3.5 flex items-center justify-between text-[10px] font-sans tracking-[0.2em] uppercase text-[#8c827a] px-1">
                  <span>Archival Plate • Workshop Circa 1869</span>
                  <span className="hidden sm:inline">Optical Magnification Active</span>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Editorial Legacy Typography Stack & Bullet Pillars */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left py-2 sm:py-6">

            {/* Prominent Serif Headline */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#141312] tracking-tight leading-[1.08] mb-6 font-normal">
              A Legacy of Art-in-Silver
            </h2>

            {/* Introductory Body Copy */}
            <p className="font-sans text-sm sm:text-[15px] text-[#57534e] max-w-lg leading-relaxed font-normal mb-8">
              With over 150 years of legacy, preserving the timeless methods of master silversmiths. Each piece is a testament to an era when craft was unhurried.
            </p>

            {/* Curated Heritage Bullet Points */}
            <div className="space-y-4 pt-2 pb-8 border-t border-b border-[#e8e4dc] my-1">
              {[
                {
                  title: "Single-Block Hand Chasing",
                  desc: "Forged and detailed by hand without computerized stamping or high-volume die-casts."
                },
                {
                  title: "925 Solid Assay Standard",
                  desc: "Independently certified sterling silver, verified by historic British &amp; Indian assay registers."
                },
                {
                  title: "Archival Vault Preservation",
                  desc: "Kept untarnished in climate-controlled cedar and flannel allocations across decades."
                }
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3.5 group">
                  {/* Subtle minimalist diamond bullet marker */}
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#8c827a] mt-2 shrink-0 group-hover:bg-[#141312] transition-colors" />
                  <div className="flex-1 text-left">
                    <span className="font-sans font-medium text-xs sm:text-sm text-[#141312] tracking-wide block mb-0.5">
                      {bullet.title}
                    </span>
                    <span className="font-sans text-xs text-[#6e6862] leading-relaxed block">
                      {bullet.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to action link with comfortable breathing space */}
            <div className="pt-6">
              <a 
                href="#collections" 
                className="group relative inline-block text-[11px] sm:text-xs font-sans font-medium uppercase tracking-[0.25em] text-[#141312] pb-1 border-b border-[#141312] hover:opacity-70 transition-opacity"
              >
                DISCOVER THE ARCHIVE &rarr;
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

