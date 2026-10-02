"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";

export default function HeritageArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(15, Math.min(85, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(15, Math.min(85, ((e.clientY - rect.top) / rect.height) * 100));
    setLoupePos({ x, y });
  };

  const LOUPE_RADIUS = 72;

  return (
    <section className="py-28 md:py-36 px-6 sm:px-10 lg:px-16 bg-[#fbfbf9] border-t border-[#e8e4dc]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left: Pure Minimalist Editorial Copy */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#8c827a] block mb-3">
            Atelier Standards • Est. 1869
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#141312] mb-6 leading-[1.12]">
            Every hallmark assayed. <span className="italic font-normal">Every curve hand-burnished.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#57534e] leading-relaxed mb-8">
            Before digital mass production, silversmithing demanded unhurried patience. Move your cursor across the inspection plate to examine the mirror-chased relief work beneath our master assay stamp.
          </p>
          
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#e8e4dc]">
            <div>
              <span className="text-2xl font-serif text-[#141312] block mb-1">92.5%</span>
              <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#8c827a]">
                Pure Silver Bullion
              </span>
            </div>
            <div>
              <span className="text-2xl font-serif text-[#141312] block mb-1">150+ Yrs</span>
              <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#8c827a]">
                Silversmith Heritage
              </span>
            </div>
          </div>
        </div>

        {/* Right: Modern Precision Loupe Inspection Frame */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="relative aspect-[4/3] bg-[#f4f2ec] overflow-hidden border border-[#e8e4dc]">
            
            <div
              ref={containerRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleMouseMove}
              className="relative w-full h-full cursor-crosshair"
            >
              {/* Workshop Base Image */}
              <div className="absolute inset-0">
                <Image
                  src="/images/heritage_workshop.jpg"
                  alt="Fraser & Hawes workshop bench"
                  fill
                  className="object-cover filter contrast-[1.03] grayscale-[20%]"
                />
              </div>

              {/* High-Resolution Sterling Reveal Layer */}
              <div
                className="absolute inset-0 pointer-events-none transition-[clip-path] duration-75 ease-out"
                style={{
                  clipPath: isHovered
                    ? `circle(${LOUPE_RADIUS}px at ${loupePos.x}% ${loupePos.y}%)`
                    : "circle(0px at 50% 50%)",
                }}
              >
                <Image
                  src="/images/silver_hallmark.jpg"
                  alt="Silver hallmark inspection detail"
                  fill
                  className="object-cover scale-110"
                />
              </div>

              {/* Minimalist Precision Lens Reticle */}
              {isHovered && (
                <div
                  className="absolute pointer-events-none z-20 -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-75 ease-out"
                  style={{
                    left: `${loupePos.x}%`,
                    top: `${loupePos.y}%`,
                    width: `${LOUPE_RADIUS * 2}px`,
                    height: `${LOUPE_RADIUS * 2}px`,
                  }}
                >
                  <div className="w-full h-full rounded-full border border-[#141312] shadow-[0_10px_25px_rgba(0,0,0,0.15)] flex items-center justify-center">
                    <div className="w-2.5 h-[1px] bg-[#141312]/60"></div>
                    <div className="w-[1px] h-2.5 bg-[#141312]/60 -ml-[1.5px]"></div>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#141312] text-[#fbfbf9] text-[8px] font-sans tracking-[0.25em] uppercase px-2 py-0.5 whitespace-nowrap">
                    Assay 925
                  </div>
                </div>
              )}

              {/* Bottom Label Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-[#141312] bg-[#fbfbf9]/95 px-4 py-2 border border-[#e8e4dc]">
                <span>Inspection Loupe</span>
                <span className="text-[#8c827a]">Hover to examine hallmark</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
