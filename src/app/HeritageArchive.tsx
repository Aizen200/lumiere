"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import Image from "next/image";

export default function HeritageArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Position of the loupe center in percentages (0 to 100)
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [isInteracting, setIsInteracting] = useState(false);

  // Slow ambient breathing glide when user is not manually moving the loupe
  useEffect(() => {
    if (isInteracting) return;
    let angle = 0;
    const interval = setInterval(() => {
      angle += 0.025;
      // Gentle figure-eight or elliptical inspection pan
      const x = 50 + Math.cos(angle) * 22;
      const y = 50 + Math.sin(angle * 2) * 16;
      setLoupePos({ x, y });
    }, 40);

    return () => clearInterval(interval);
  }, [isInteracting]);

  // Track mouse movement over the archival plate
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(12, Math.min(88, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(14, Math.min(86, ((e.clientY - rect.top) / rect.height) * 100));
    setLoupePos({ x, y });
  };

  const LOUPE_RADIUS = 76; // px radius for magnifier lens

  return (
    <section className="relative w-full overflow-hidden bg-[#0c0a08] border-t border-[#26201a] py-24 md:py-32 px-6 select-none">
      {/* Background Archival Vellum Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background: "radial-gradient(circle at 35% 50%, rgba(197, 168, 128, 0.08) 0%, transparent 60%)"
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* LEFT: Archival Exhibition Plate with Antique Brass Loupe Inspection */}
        <div className="lg:col-span-6 flex justify-center">
          {/* Outer Antique Wood & Gold Filigree Frame */}
          <div className="relative w-full max-w-lg aspect-[4/3] p-3 sm:p-4 bg-[#14110e] border border-[#382f25] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(197,168,128,0.06)]">
            
            {/* Fine Inner Gold Hairline Matting */}
            <div className="absolute inset-[8px] border border-[#c5a880]/25 z-30 pointer-events-none">
              <span className="absolute -top-0.5 -left-0.5 text-[8px] text-[#c5a880]/50 select-none">⌜</span>
              <span className="absolute -top-0.5 -right-0.5 text-[8px] text-[#c5a880]/50 select-none">⌝</span>
              <span className="absolute -bottom-0.5 -left-0.5 text-[8px] text-[#c5a880]/50 select-none">⌞</span>
              <span className="absolute -bottom-0.5 -right-0.5 text-[8px] text-[#c5a880]/50 select-none">⌟</span>
            </div>

            {/* Assay Touchmark Badge in corner */}
            <div className="absolute top-5 left-5 z-40 pointer-events-none">
              <span className="font-cinzel text-[9px] tracking-widest text-[#dfcaa7] bg-[#0c0a08]/90 px-2.5 py-0.5 border border-[#c5a880]/40 shadow-md backdrop-blur-xs">
                FOUNDRY ARCHIVE • 925
              </span>
            </div>

            {/* Interactive Showcase Stage */}
            <div 
              ref={containerRef}
              onMouseEnter={() => setIsInteracting(true)}
              onMouseLeave={() => setIsInteracting(false)}
              onMouseMove={handleMouseMove}
              className="relative w-full h-full overflow-hidden bg-[#0a0908] cursor-crosshair group"
            >
              
              {/* BASE LAYER: Historical Foundry Workshop (Sepia Patina) */}
              <div className="absolute inset-0">
                <Image 
                  src="/images/heritage_workshop.jpg"
                  alt="The Fraser & Hawes Master Foundry"
                  fill
                  className="object-cover filter sepia-[0.4] contrast-[1.08] brightness-85"
                  priority
                />
                <div className="absolute inset-0 bg-[#0c0a08]/20 pointer-events-none"></div>
              </div>

              {/* LOUPE REVEAL LAYER: Polished Masterwork Sterling Silver underneath (Revealed strictly inside circular clip-path) */}
              <div 
                className="absolute inset-0 pointer-events-none z-10 transition-[clip-path] duration-75 ease-out"
                style={{
                  clipPath: `circle(${LOUPE_RADIUS}px at ${loupePos.x}% ${loupePos.y}%)`,
                }}
              >
                <Image 
                  src="/images/cat_serveware.jpg"
                  alt="Royal Sterling Silver Tea Service - Preserved Masterwork"
                  fill
                  className="object-cover filter contrast-[1.12] brightness-105 scale-110"
                  priority
                />
                {/* Silver Sheen Highlight inside Loupe */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#dfcaa7]/15 to-transparent pointer-events-none"></div>
              </div>

              {/* PHYSICAL BRASS LOUPE / MAGNIFYING GLASS BEZEL (Follows loupePos) */}
              <div 
                className="absolute z-20 pointer-events-none transition-[left,top] duration-75 ease-out"
                style={{
                  left: `${loupePos.x}%`,
                  top: `${loupePos.y}%`,
                  transform: "translate(-50%, -50%)",
                  width: `${LOUPE_RADIUS * 2}px`,
                  height: `${LOUPE_RADIUS * 2}px`,
                }}
              >
                {/* Heavy Hand-Engraved Brass Loupe Rim */}
                <div className="w-full h-full rounded-full border-[3px] border-[#dfcaa7] shadow-[0_0_0_2px_#382f25,0_0_25px_rgba(0,0,0,0.9),inset_0_0_15px_rgba(0,0,0,0.7)] relative">
                  
                  {/* Subtle Glass Reflection Arc */}
                  <div className="absolute inset-1 rounded-full border-t border-l border-white/30 opacity-70 pointer-events-none"></div>
                  
                  {/* Silversmith Lens Knurled Grip Ring */}
                  <div className="absolute -inset-[5px] rounded-full border border-[#8e795d]/60 pointer-events-none"></div>

                  {/* Curatorial Crosshair Reticle Center Pip */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                    <div className="w-2.5 h-[1px] bg-[#dfcaa7]"></div>
                    <div className="w-[1px] h-2.5 bg-[#dfcaa7] -ml-[1.5px]"></div>
                  </div>

                  {/* Tiny Engraved Assay Stamp on Rim */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#120f0c] border border-[#c5a880]/60 px-1.5 py-0 rounded-xs text-[7px] font-cinzel text-[#dfcaa7] tracking-widest whitespace-nowrap shadow-sm">
                    STERLING 925
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Plate Engraving Caption */}
            <div className="absolute bottom-5 left-6 right-6 z-30 flex justify-between items-center text-[10px] font-cinzel text-[#dfcaa7] bg-[#0c0a08]/85 backdrop-blur-xs px-3.5 py-1.5 border border-[#382f25] shadow-md pointer-events-none">
              <span className="flex items-center gap-1.5">
                <span className="text-[#c5a880]">❖</span>
                <span>Fraser &amp; Hawes Silversmiths</span>
              </span>
              <span className="text-[#c5a880] italic font-serif">
                Silversmith&apos;s Inspection Lens
              </span>
            </div>

          </div>
        </div>

        {/* RIGHT: Editorial Heritage Chronicle */}
        <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
          
          <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#c5a880]/50"></span>
            <span className="text-[11px] font-cinzel uppercase tracking-[0.35em] text-[#c5a880]">
              A Legacy Of
            </span>
            <span className="w-8 h-[1px] bg-[#c5a880]/50 lg:hidden"></span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f5f2eb] mb-6 tracking-wide uppercase leading-tight">
            Art-in-Silver
          </h2>

          <p className="font-serif italic text-lg sm:text-xl text-[#dcd5c5] leading-relaxed max-w-xl mx-auto lg:mx-0">
            With over 150 years of legacy, preserving the timeless methods of master silversmiths. Each piece is a testament to an era when craft was unhurried.
          </p>
        </div>

      </div>
    </section>
  );
}


