"use client";

import Image from "next/image";
import { useState } from "react";
import StoryArchive from "./StoryArchive";
import HeritageArchive from "./HeritageArchive";

export default function LandingPage() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  // Products with 3 authentic archival views per product
  const divinityProducts = [
    { 
      id: 1, 
      name: "Ornate Silver Ganesha", 
      original: 45000, 
      sale: 22500, 
      images: ["/images/cat_divinity.jpg", "/images/hero_silver.jpg", "/images/silver_hallmark.jpg"],
      pieceNo: "DIV-01",
      provenance: "Calcutta Assay • 925 Sterling"
    },
    { 
      id: 2, 
      name: "Silver Pooja Thali", 
      original: 60000, 
      sale: 30000, 
      images: ["/images/cat_divinity.jpg", "/images/cat_decor.jpg", "/images/silver_hallmark.jpg"],
      pieceNo: "DIV-02",
      provenance: "Victorian Engraved Border"
    },
    { 
      id: 101, 
      name: "Antique Krishna Idol", 
      original: 75000, 
      sale: 37500, 
      images: ["/images/cat_divinity.jpg", "/images/hero_silver.jpg", "/images/cat_serveware.jpg"],
      pieceNo: "DIV-03",
      provenance: "Chased Solid Bullion"
    },
    { 
      id: 102, 
      name: "Silver Lakshmi Murti", 
      original: 55000, 
      sale: 27500, 
      images: ["/images/cat_divinity.jpg", "/images/silver_hallmark.jpg", "/images/cat_accessories.jpg"],
      pieceNo: "DIV-04",
      provenance: "Hand-Burnished Archive Piece"
    },
  ];

  const decorProducts = [
    { 
      id: 3, 
      name: "Victorian Silver Vase", 
      original: 85000, 
      sale: 42500, 
      images: ["/images/cat_decor.jpg", "/images/hero_silver.jpg", "/images/silver_hallmark.jpg"],
      pieceNo: "DEC-01",
      provenance: "London Hallmarked Masterwork"
    },
    { 
      id: 4, 
      name: "Vintage Candelabra", 
      original: 120000, 
      sale: 60000, 
      images: ["/images/cat_decor.jpg", "/images/cat_serveware.jpg", "/images/silver_hallmark.jpg"],
      pieceNo: "DEC-02",
      provenance: "Five-Light Ornate Casting"
    },
    { 
      id: 103, 
      name: "Silver Rose Bowl", 
      original: 48000, 
      sale: 24000, 
      images: ["/images/cat_decor.jpg", "/images/hero_silver.jpg", "/images/cat_divinity.jpg"],
      pieceNo: "DEC-03",
      provenance: "Fluted Repoussé Edge"
    },
    { 
      id: 104, 
      name: "Ornate Picture Frame", 
      original: 32000, 
      sale: 16000, 
      images: ["/images/cat_decor.jpg", "/images/silver_hallmark.jpg", "/images/cat_accessories.jpg"],
      pieceNo: "DEC-04",
      provenance: "Velvet Backed Sterling Mount"
    },
  ];

  const servewareProducts = [
    { 
      id: 5, 
      name: "Royal Tea Service", 
      original: 150000, 
      sale: 75000, 
      images: ["/images/cat_serveware.jpg", "/images/hero_silver.jpg", "/images/silver_hallmark.jpg"],
      pieceNo: "SRV-01",
      provenance: "Three-Piece Hallmarked Set"
    },
    { 
      id: 6, 
      name: "Executive Bar Tray", 
      original: 48000, 
      sale: 24000, 
      images: ["/images/cat_serveware.jpg", "/images/cat_decor.jpg", "/images/silver_hallmark.jpg"],
      pieceNo: "SRV-02",
      provenance: "Heavy Gauge Mirror Polish"
    },
    { 
      id: 105, 
      name: "Silver Ice Bucket", 
      original: 95000, 
      sale: 47500, 
      images: ["/images/cat_serveware.jpg", "/images/hero_silver.jpg", "/images/cat_divinity.jpg"],
      pieceNo: "SRV-03",
      provenance: "Lion Head Handle Accents"
    },
    { 
      id: 106, 
      name: "Vintage Wine Coaster", 
      original: 22000, 
      sale: 11000, 
      images: ["/images/cat_serveware.jpg", "/images/silver_hallmark.jpg", "/images/cat_accessories.jpg"],
      pieceNo: "SRV-04",
      provenance: "Turned Mahogany Base"
    },
  ];

  const accessoriesProducts = [
    { 
      id: 7, 
      name: "Sterling Desk Clock", 
      original: 55000, 
      sale: 27500, 
      images: ["/images/cat_accessories.jpg", "/images/hero_silver.jpg", "/images/silver_hallmark.jpg"],
      pieceNo: "ACC-01",
      provenance: "Swiss Escapement Movement"
    },
    { 
      id: 8, 
      name: "Hallmarked Silver Pen", 
      original: 28000, 
      sale: 14000, 
      images: ["/images/cat_accessories.jpg", "/images/cat_decor.jpg", "/images/silver_hallmark.jpg"],
      pieceNo: "ACC-02",
      provenance: "Pinstripe Hand-Engine Turned"
    },
    { 
      id: 107, 
      name: "Silver Cufflinks Box", 
      original: 38000, 
      sale: 19000, 
      images: ["/images/cat_accessories.jpg", "/images/hero_silver.jpg", "/images/cat_serveware.jpg"],
      pieceNo: "ACC-03",
      provenance: "Cedar Lined Sterling Casing"
    },
    { 
      id: 108, 
      name: "Antique Letter Opener", 
      original: 18000, 
      sale: 9000, 
      images: ["/images/cat_accessories.jpg", "/images/silver_hallmark.jpg", "/images/cat_divinity.jpg"],
      pieceNo: "ACC-04",
      provenance: "Hallmarked Blade Standard"
    },
  ];

  // Component to render individual product card with 3 switchable images and authentic vintage luxury interactions
  const ProductCard = ({ product }: { product: any }) => {
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [isImageTransitioning, setIsImageTransitioning] = useState(false);
    const percentOff = Math.round((1 - product.sale / product.original) * 100);

    const switchImage = (newIdx: number) => {
      if (newIdx === activeImgIndex || isImageTransitioning) return;
      setIsImageTransitioning(true);
      setTimeout(() => {
        setActiveImgIndex(newIdx);
        setIsImageTransitioning(false);
      }, 240);
    };

    return (
      <div className="text-center group relative">
        {/* Exhibition Plate Framing with Vintage Patina Shadow */}
        <div className="relative aspect-[4/5] mb-5 overflow-hidden border border-[#332a22] bg-[#14110e] shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(197,168,128,0.03)] transition-all duration-700 ease-out group-hover:border-[#c5a880]/60 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.95),0_0_30px_rgba(197,168,128,0.12)]">
          
          {/* Antique inner gold hairline border with micro-glow on hover */}
          <div className="absolute inset-[6px] border border-[#c5a880]/20 z-20 pointer-events-none transition-all duration-700 group-hover:border-[#c5a880]/50">
            {/* Fine Corner Accents */}
            <span className="absolute -top-0.5 -left-0.5 text-[8px] text-[#c5a880]/40 group-hover:text-[#c5a880] transition-colors duration-500 select-none">⌜</span>
            <span className="absolute -top-0.5 -right-0.5 text-[8px] text-[#c5a880]/40 group-hover:text-[#c5a880] transition-colors duration-500 select-none">⌝</span>
            <span className="absolute -bottom-0.5 -left-0.5 text-[8px] text-[#c5a880]/40 group-hover:text-[#c5a880] transition-colors duration-500 select-none">⌞</span>
            <span className="absolute -bottom-0.5 -right-0.5 text-[8px] text-[#c5a880]/40 group-hover:text-[#c5a880] transition-colors duration-500 select-none">⌟</span>
          </div>

          {/* Assay Touchmark Badge */}
          <div className="absolute top-3 left-3 z-30 pointer-events-none">
            <span className="font-cinzel text-[9px] tracking-widest text-[#dfcaa7] bg-[#0c0a08]/90 px-2.5 py-0.5 border border-[#c5a880]/40 shadow-sm backdrop-blur-xs">
              {product.pieceNo} • 925
            </span>
          </div>

          {/* Luxury Vintage Silver Sheen / Light Reflection Sweep on Hover */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden">
            <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-[#dfcaa7]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-in-out"></div>
          </div>

          {/* Image Display with Smooth Photographic Dissolve */}
          <div className="relative w-full h-full overflow-hidden bg-[#0c0a08]">
            <Image 
              src={product.images[activeImgIndex]} 
              alt={product.name} 
              fill 
              className={`object-cover filter contrast-[1.05] brightness-95 transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-100 ${
                isImageTransitioning ? "opacity-30 scale-95 blur-xs" : "opacity-100 scale-100 blur-0"
              }`} 
            />
            {/* Subtle Vignette on Edges */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#0c0a08]/10 to-[#0c0a08]/40 pointer-events-none group-hover:opacity-30 transition-opacity duration-700"></div>
          </div>

          {/* 3 Images Carousel Angle Selectors (Antique Brass Pips) */}
          <div className="absolute bottom-3 left-0 w-full flex justify-center items-center gap-2.5 z-30">
            {product.images.map((_: any, imgIdx: number) => (
              <button
                key={imgIdx}
                onClick={(e) => {
                  e.stopPropagation();
                  switchImage(imgIdx);
                }}
                className={`transition-all duration-500 rounded-full cursor-pointer flex items-center justify-center ${
                  activeImgIndex === imgIdx
                    ? "w-5 h-2 bg-gradient-to-r from-[#8e795d] to-[#c5a880] shadow-[0_0_8px_rgba(197,168,128,0.7)]"
                    : "w-2 h-2 bg-[#2a221a] border border-[#8e795d]/40 hover:border-[#c5a880] hover:bg-[#3d3328]"
                }`}
                aria-label={`View plate angle ${imgIdx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-xl sm:text-2xl text-[#f5f2eb] mb-1.5 tracking-wide group-hover:text-[#dfcaa7] transition-colors duration-300">
          {product.name}
        </h3>

        {/* Provenance note */}
        <p className="text-[11px] font-cinzel uppercase tracking-[0.2em] text-[#8e795d] mb-3 group-hover:text-[#a49c90] transition-colors duration-300">
          {product.provenance}
        </p>

        {/* Valuation & Advantage Pricing */}
        <div className="flex flex-col justify-center items-center gap-1.5">
          <div className="flex items-baseline gap-3">
            <span className="text-[#6d6152] line-through text-xs font-serif tracking-wider">
              ₹{product.original.toLocaleString('en-IN')}
            </span>
            <span className="text-[#f5f2eb] font-serif text-xl tracking-wide group-hover:text-[#dfcaa7] transition-colors duration-300">
              ₹{product.sale.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Vintage Cartouche Discount Tag with Warm Shimmer */}
          <span className="inline-block border border-[#3d3328] bg-[#14110e] text-[#c5a880] text-[10px] font-cinzel font-semibold tracking-[0.2em] uppercase px-3.5 py-0.5 mt-0.5 shadow-xs transition-all duration-300 group-hover:border-[#c5a880]/50 group-hover:bg-[#1a1612]">
            {percentOff}% Historical Benefit
          </span>
        </div>
      </div>
    );
  };

  const renderProductGrid = (products: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 max-w-[1400px] mx-auto px-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );

  return (
    <main className="min-h-screen bg-[#0c0b0a] text-[#f5f2eb] selection:bg-[#c5a880]/30 selection:text-[#f5f2eb]">
      {/* 1. Announcement bar */}
      {showAnnouncement && (
        <div className="fixed top-0 left-0 w-full bg-[#181512] border-b border-[#383127] text-[#dfcaa7] z-50 px-4 py-2.5 flex items-center justify-center min-h-[42px] shadow-md">
          <button 
            onClick={() => setShowAnnouncement(false)} 
            className="absolute left-4 text-[#8e795d] hover:text-[#dfcaa7] transition-colors"
            aria-label="Close"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="1" y1="1" x2="13" y2="13" strokeLinecap="round" />
              <line x1="13" y1="1" x2="1" y2="13" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-center font-cinzel">
            <span className="text-[#c5a880] hidden sm:inline">❖</span>
            <span>The Vault Release: Up to 50% Off. Strictly Limited Pieces. Ends October 31.</span>
            <span className="text-[#c5a880] hidden sm:inline">❖</span>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <header className={`fixed w-full z-40 transition-all duration-300 bg-[#0c0b0a]/85 backdrop-blur-md border-b border-[#2a2520] ${showAnnouncement ? 'top-[42px]' : 'top-0'}`}>
        <div className="flex justify-between items-center px-8 py-5 max-w-[1440px] mx-auto">
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-[0.25em] uppercase text-[#f5f2eb]">
              Fraser & Hawes
            </span>
          </div>
          <nav className="hidden md:flex gap-10 items-center">
            <a href="#collections" className="text-xs uppercase tracking-[0.2em] text-[#dcd5c5] hover:text-[#c5a880] transition-colors font-cinzel">The Vault</a>
            <a href="#story" className="text-xs uppercase tracking-[0.2em] text-[#dcd5c5] hover:text-[#c5a880] transition-colors font-cinzel">Our Story</a>
            <a href="#gifting" className="text-xs uppercase tracking-[0.2em] text-[#dcd5c5] hover:text-[#c5a880] transition-colors font-cinzel">Gifting</a>
            <a href="#faq" className="text-xs uppercase tracking-[0.2em] text-[#dcd5c5] hover:text-[#c5a880] transition-colors font-cinzel">Archive FAQ</a>
          </nav>
        </div>
      </header>

      {/* 2. Hero */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#0c0b0a]">
        {/* Full-width Background Image showing the entire silver artifact */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <Image 
            src="/images/hero_silver.jpg" 
            alt="Fraser & Hawes Sterling Silver Urn" 
            fill 
            className="object-cover object-center filter contrast-[1.05]" 
            priority 
          />
        </div>
        
        {/* Dark vintage vignette overlay with subtle warm ambient tint */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#0c0b0a]/60 to-[#0c0b0a]/90 z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[#0c0b0a]/40 z-10 pointer-events-none"></div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#c5a880]/60"></span>
            <span className="text-[11px] font-cinzel uppercase tracking-[0.35em] text-[#c5a880]">
              The Masterwork Release • Est. 1869
            </span>
            <span className="w-8 h-[1px] bg-[#c5a880]/60"></span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl mb-6 text-[#f5f2eb] drop-shadow-md leading-[1.15]">
            Silver made at yesterday&apos;s price. <span className="italic text-[#dfcaa7]">Yours today.</span>
          </h1>

          <p className="text-base sm:text-xl text-[#dcd5c5] mb-10 max-w-2xl mx-auto font-light leading-relaxed font-serif">
            Fraser & Hawes crafted these pieces years ago, before silver&apos;s rise. We&apos;re passing that advantage on, with up to 50% off.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#collections" 
              className="relative px-10 py-4 text-xs font-cinzel font-semibold tracking-[0.25em] uppercase text-[#0c0b0a] bg-[#c5a880] hover:bg-[#dfcaa7] border border-[#c5a880] transition-all duration-300 shadow-xl"
            >
              Shop the Vault
            </a>
            <a 
              href="#story" 
              className="text-[#dcd5c5] hover:text-[#c5a880] text-xs font-cinzel tracking-[0.2em] uppercase border-b border-[#8e795d] hover:border-[#c5a880] pb-1 transition-colors"
            >
              How it works &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* 3. Story Archive (Scroll-driven) */}
      <div id="story">
        <StoryArchive />
      </div>

      {/* 4. Product grid (4 categories) */}
      <section id="collections" className="py-32 bg-[#0c0b0a] border-t border-[#2a2520]">
        
        {/* Curatorial Collection Header */}
        <div className="text-center mb-16 px-4">
          <span className="text-[10px] font-cinzel uppercase tracking-[0.35em] text-[#c5a880] block mb-3">
            ❖ Historical Inventory • 68 Certified Pieces ❖
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-[#f5f2eb] mb-4">
            The Vault Collection
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#dcd5c5] max-w-2xl mx-auto mb-8">
            Divided into four curated folios. Every piece preserved in pure hallmarked 925 sterling.
          </p>
          <div className="w-24 h-[1px] bg-[#c5a880]/40 mx-auto mb-12"></div>

          {/* Curator's Quick-Jump Index Ribbon */}
          <div className="inline-flex flex-wrap justify-center items-center gap-3 sm:gap-6 border border-[#2a2520] bg-[#14110e] px-6 py-3 max-w-4xl mx-auto shadow-lg">
            <a href="#cat-divinity" className="text-xs uppercase tracking-[0.2em] font-cinzel text-[#8e795d] hover:text-[#c5a880] transition-colors">
              I. Divinity <span className="text-[10px] text-[#c5a880]">(13)</span>
            </a>
            <span className="text-[#3d3328] hidden sm:inline">•</span>
            <a href="#cat-decor" className="text-xs uppercase tracking-[0.2em] font-cinzel text-[#8e795d] hover:text-[#c5a880] transition-colors">
              II. Art &amp; Decor <span className="text-[10px] text-[#c5a880]">(30)</span>
            </a>
            <span className="text-[#3d3328] hidden sm:inline">•</span>
            <a href="#cat-serveware" className="text-xs uppercase tracking-[0.2em] font-cinzel text-[#8e795d] hover:text-[#c5a880] transition-colors">
              III. Serveware &amp; Bar <span className="text-[10px] text-[#c5a880]">(17)</span>
            </a>
            <span className="text-[#3d3328] hidden sm:inline">•</span>
            <a href="#cat-accessories" className="text-xs uppercase tracking-[0.2em] font-cinzel text-[#8e795d] hover:text-[#c5a880] transition-colors">
              IV. Accessories <span className="text-[10px] text-[#c5a880]">(8)</span>
            </a>
          </div>
        </div>

        {/* ================= CATEGORY 1: DIVINITY ================= */}
        <div id="cat-divinity" className="pt-16 pb-28 border-b border-[#221c17] scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-14 px-4">
            <span className="text-[10px] font-cinzel uppercase tracking-[0.35em] text-[#c5a880] block mb-2">
              Exhibition Folio I • Sacred Antiquities
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-[#f5f2eb] mb-2 tracking-wide">
              Divinity
            </h3>
            <p className="text-[#8e795d] text-xs font-cinzel tracking-[0.25em] uppercase mb-4">
              13 Certified Pieces Preserved
            </p>
            <div className="w-12 h-[1px] bg-[#c5a880]/30 mx-auto"></div>
          </div>
          {renderProductGrid(divinityProducts)}
        </div>

        {/* ================= CATEGORY 2: ART AND HOME DECOR ================= */}
        <div id="cat-decor" className="pt-24 pb-28 border-b border-[#221c17] scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-14 px-4">
            <span className="text-[10px] font-cinzel uppercase tracking-[0.35em] text-[#c5a880] block mb-2">
              Exhibition Folio II • Architectural &amp; Interior Silver
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-[#f5f2eb] mb-2 tracking-wide">
              Art and Home Decor
            </h3>
            <p className="text-[#8e795d] text-xs font-cinzel tracking-[0.25em] uppercase mb-4">
              30 Certified Pieces Preserved
            </p>
            <div className="w-12 h-[1px] bg-[#c5a880]/30 mx-auto"></div>
          </div>
          {renderProductGrid(decorProducts)}
        </div>

        {/* ================= CATEGORY 3: SERVEWARE, BAR AND CORPORATE ================= */}
        <div id="cat-serveware" className="pt-24 pb-28 border-b border-[#221c17] scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-14 px-4">
            <span className="text-[10px] font-cinzel uppercase tracking-[0.35em] text-[#c5a880] block mb-2">
              Exhibition Folio III • Banqueting &amp; Cellar Traditions
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-[#f5f2eb] mb-2 tracking-wide">
              Serveware, Bar and Corporate
            </h3>
            <p className="text-[#8e795d] text-xs font-cinzel tracking-[0.25em] uppercase mb-4">
              17 Certified Pieces Preserved
            </p>
            <div className="w-12 h-[1px] bg-[#c5a880]/30 mx-auto"></div>
          </div>
          {renderProductGrid(servewareProducts)}
        </div>

        {/* ================= CATEGORY 4: PERSONAL AND DESK ACCESSORIES ================= */}
        <div id="cat-accessories" className="pt-24 pb-12 scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-14 px-4">
            <span className="text-[10px] font-cinzel uppercase tracking-[0.35em] text-[#c5a880] block mb-2">
              Exhibition Folio IV • Private Regalia &amp; Scrivenery
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-[#f5f2eb] mb-2 tracking-wide">
              Personal and Desk Accessories
            </h3>
            <p className="text-[#8e795d] text-xs font-cinzel tracking-[0.25em] uppercase mb-4">
              8 Certified Pieces Preserved
            </p>
            <div className="w-12 h-[1px] bg-[#c5a880]/30 mx-auto"></div>
          </div>
          {renderProductGrid(accessoriesProducts)}
        </div>

      </section>

      {/* 5. Heritage strip */}
      <div className="py-24 bg-[#141210] border-t border-[#2a2520]">
        <HeritageArchive />
      </div>

      {/* 6. Craft and authenticity */}
      <section className="py-32 px-4 bg-[#0e0d0c] border-y border-[#2a2520] text-center">
        <div className="text-center mb-16">
          <span className="text-[10px] font-cinzel uppercase tracking-[0.3em] text-[#c5a880] block mb-2">Hallmark of Guarantee</span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#f5f2eb]">Craft and Authenticity</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="flex-1 p-10 border border-[#383127] bg-[#141210] relative shadow-lg group hover:border-[#c5a880]/50 transition-colors">
            <div className="absolute inset-[6px] border border-[#c5a880]/20 pointer-events-none"></div>
            <div className="text-2xl text-[#c5a880] mb-4 font-serif">❖</div>
            <h4 className="text-xs font-cinzel font-semibold tracking-[0.25em] uppercase text-[#f5f2eb] mb-2">Hallmark Close-Up</h4>
            <p className="text-[#dcd5c5] font-serif text-lg italic mb-2">925 Sterling Standard</p>
            <p className="text-xs text-[#8e795d] leading-relaxed">Independently assayed and certified to contain a minimum 92.5% pure silver.</p>
          </div>

          {/* Card 2 */}
          <div className="flex-1 p-10 border border-[#383127] bg-[#141210] relative shadow-lg group hover:border-[#c5a880]/50 transition-colors">
            <div className="absolute inset-[6px] border border-[#c5a880]/20 pointer-events-none"></div>
            <div className="text-2xl text-[#c5a880] mb-4 font-serif">⚖</div>
            <h4 className="text-xs font-cinzel font-semibold tracking-[0.25em] uppercase text-[#f5f2eb] mb-2">Hand-Finishing</h4>
            <p className="text-[#dcd5c5] font-serif text-lg italic mb-2">Artisan Excellence</p>
            <p className="text-xs text-[#8e795d] leading-relaxed">Individually chased and hand-burnished by master silversmiths with decades of training.</p>
          </div>

          {/* Card 3 */}
          <div className="flex-1 p-10 border border-[#383127] bg-[#141210] relative shadow-lg group hover:border-[#c5a880]/50 transition-colors">
            <div className="absolute inset-[6px] border border-[#c5a880]/20 pointer-events-none"></div>
            <div className="text-2xl text-[#c5a880] mb-4 font-serif">✦</div>
            <h4 className="text-xs font-cinzel font-semibold tracking-[0.25em] uppercase text-[#f5f2eb] mb-2">Certificate of Provenance</h4>
            <p className="text-[#dcd5c5] font-serif text-lg italic mb-2">With Presentation Box</p>
            <p className="text-xs text-[#8e795d] leading-relaxed">Delivered in velvet-lined archival presentation casings with certified archival serial numbers.</p>
          </div>
        </div>
      </section>

      {/* 7. Gifting */}
      <section id="gifting" className="py-32 px-4 text-center bg-[#0c0b0a] border-b border-[#2a2520]">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] font-cinzel uppercase tracking-[0.3em] text-[#c5a880] block mb-3">
            Bespoke Presentation
          </span>
          <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight text-[#f5f2eb]">
            Weddings, anniversaries, corporate gifts, christenings.
          </h2>
          <p className="text-[#dcd5c5] font-serif italic text-lg mb-10 max-w-xl mx-auto">
            Add our signature hand-embossed wax seal, silk ribbon gift-wrap and calligraphy note.
          </p>
          <button className="bg-transparent border border-[#c5a880] text-[#c5a880] px-10 py-4 text-xs font-cinzel font-semibold tracking-[0.25em] uppercase hover:bg-[#c5a880] hover:text-[#0c0b0a] transition-all duration-300">
            Request Gift-Wrap Service
          </button>
        </div>
      </section>

      {/* 9. The Archive FAQ (Vintage Curatorial Folio Register) */}
      <section id="faq" className="py-32 px-4 sm:px-6 bg-[#0a0908] border-t border-[#26201a] relative overflow-hidden">
        {/* Archival ambient radiance */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: "radial-gradient(circle at 50% 30%, rgba(197, 168, 128, 0.08) 0%, transparent 70%)"
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#c5a880]/50"></span>
              <span className="text-[10px] font-cinzel uppercase tracking-[0.35em] text-[#c5a880]">
                Inquiries &amp; Clarifications
              </span>
              <span className="w-8 h-[1px] bg-[#c5a880]/50"></span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f5f2eb] mb-4 tracking-wide leading-tight">
              The Archive FAQ
            </h2>

            <div className="w-16 h-[1px] bg-[#c5a880]/40 mx-auto"></div>
          </div>

          {/* Archival Folio Ledger Cards */}
          <div className="space-y-4">
            {[
              {
                num: "I",
                q: "Is it genuine sterling silver?",
                a: "Yes, absolutely. Every piece is hallmarked 925 sterling silver according to stringent British assay standards."
              },
              {
                num: "II",
                q: "Why the discount?",
                a: "These pieces were crafted years ago when the raw cost of silver was much lower, preserved securely in our vault. We pass that historical pricing advantage directly to our collectors."
              },
              {
                num: "III",
                q: "Returns and warranty?",
                a: "Our standard lifetime silversmith warranty applies. You may return any item in its original presentation state within 30 days."
              },
              {
                num: "IV",
                q: "Shipping and insurance?",
                a: "All vault shipments are fully insured against loss in transit and require a direct signature upon delivery."
              },
              {
                num: "V",
                q: "Can I gift-wrap?",
                a: "Yes. You can select our signature premium archival gift wrapping, wax-seal stamping, and handwritten message during checkout."
              },
              {
                num: "VI",
                q: "Are there more pieces coming?",
                a: "No. The Vault Release is strictly limited to the historical inventory currently catalogued. Once claimed, these editions will not be restocked at this price."
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="group relative bg-[#13100d] border border-[#2b241c] p-6 sm:p-8 transition-all duration-500 hover:border-[#c5a880]/50 hover:bg-[#171410] shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
              >
                {/* Antique Fine Inner Gold Hairline */}
                <div className="absolute inset-[6px] border border-[#c5a880]/15 pointer-events-none transition-colors duration-500 group-hover:border-[#c5a880]/35">
                  <span className="absolute -top-0.5 -left-0.5 text-[8px] text-[#c5a880]/40 group-hover:text-[#c5a880] transition-colors select-none">⌜</span>
                  <span className="absolute -top-0.5 -right-0.5 text-[8px] text-[#c5a880]/40 group-hover:text-[#c5a880] transition-colors select-none">⌝</span>
                  <span className="absolute -bottom-0.5 -left-0.5 text-[8px] text-[#c5a880]/40 group-hover:text-[#c5a880] transition-colors select-none">⌞</span>
                  <span className="absolute -bottom-0.5 -right-0.5 text-[8px] text-[#c5a880]/40 group-hover:text-[#c5a880] transition-colors select-none">⌟</span>
                </div>

                <div className="flex items-start gap-5 sm:gap-7 relative z-10">
                  {/* Roman Numeral Callout */}
                  <span className="font-serif text-2xl sm:text-3xl text-[#c5a880]/70 group-hover:text-[#c5a880] transition-colors select-none pt-0.5 min-w-[28px]">
                    {item.num}.
                  </span>

                  <div className="flex-1">
                    <h4 className="text-xl sm:text-2xl font-serif text-[#f5f2eb] mb-2.5 tracking-wide group-hover:text-[#dfcaa7] transition-colors">
                      {item.q}
                    </h4>
                    <p className="text-[#a49c90] font-serif text-base sm:text-lg italic leading-relaxed group-hover:text-[#dcd5c5] transition-colors">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Final CTA & Footer */}
      <footer className="py-28 px-4 text-center bg-[#100e0d] border-t border-[#2a2520]">
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-cinzel uppercase tracking-[0.35em] text-[#c5a880] block mb-4">Final Notice</span>
          <div className="font-serif text-3xl md:text-5xl tracking-wide text-[#f5f2eb] mb-8 leading-tight">
            The vault will not remain open indefinitely.
          </div>
          <a 
            href="#collections" 
            className="inline-block bg-[#c5a880] text-[#0c0b0a] px-12 py-4 text-xs font-cinzel font-semibold tracking-[0.25em] uppercase hover:bg-[#dfcaa7] border border-[#c5a880] transition-all duration-300 shadow-xl"
          >
            Acquire From The Vault
          </a>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-14 mb-16 border-t border-b border-[#2a2520] py-6 max-w-4xl mx-auto">
          <a href="#" className="text-xs uppercase tracking-[0.2em] font-cinzel text-[#8e795d] hover:text-[#dfcaa7] transition-colors">Archival Provenance</a>
          <a href="#" className="text-xs uppercase tracking-[0.2em] font-cinzel text-[#8e795d] hover:text-[#dfcaa7] transition-colors">Hallmark Registry</a>
          <a href="#" className="text-xs uppercase tracking-[0.2em] font-cinzel text-[#8e795d] hover:text-[#dfcaa7] transition-colors">Collector Concierge</a>
          <a href="#" className="text-xs uppercase tracking-[0.2em] font-cinzel text-[#8e795d] hover:text-[#dfcaa7] transition-colors">Private Commissions</a>
        </div>
        
        <div className="text-[11px] uppercase tracking-[0.3em] font-cinzel text-[#6d6356]">
          &copy; {new Date().getFullYear()} Fraser & Hawes Silversmiths. Tradition & Integrity Since 1869.
        </div>
      </footer>
    </main>
  );
}
