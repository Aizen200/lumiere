"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import StoryArchive from "./StoryArchive";
import HeritageArchive from "./HeritageArchive";

export default function LandingPage() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  // Category Tab Filter State ("all" | "divinity" | "decor" | "serveware" | "accessories")
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Tiffany & Co. Scroller State
  const collectionScrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 68 products divided into four categories
  // 1. Divinity
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
    { 
      id: 109, 
      name: "Sterling Silver Diya Lamp", 
      original: 34000, 
      sale: 17000, 
      images: ["/images/cat_divinity.jpg", "/images/hero_silver.jpg", "/images/cat_decor.jpg"],
      pieceNo: "DIV-05",
      provenance: "Fluted Pedestal • Solid 925 Standard"
    },
    { 
      id: 110, 
      name: "Engraved Kalash Urn", 
      original: 68000, 
      sale: 34000, 
      images: ["/images/cat_divinity.jpg", "/images/cat_serveware.jpg", "/images/silver_hallmark.jpg"],
      pieceNo: "DIV-06",
      provenance: "Temple Relief Repoussé"
    },
    { 
      id: 111, 
      name: "Silver Bell with Nandi Finial", 
      original: 28000, 
      sale: 14000, 
      images: ["/images/cat_divinity.jpg", "/images/hero_silver.jpg", "/images/cat_accessories.jpg"],
      pieceNo: "DIV-07",
      provenance: "Acoustic Silver Casting • Hallmarked"
    },
    { 
      id: 112, 
      name: "Sacred Panchamrit Cup", 
      original: 22000, 
      sale: 11000, 
      images: ["/images/cat_divinity.jpg", "/images/cat_decor.jpg", "/images/silver_hallmark.jpg"],
      pieceNo: "DIV-08",
      provenance: "Gold Wash Interior • 925 Bullion"
    },
  ];

  // 2. Art and Home Decor
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
    { 
      id: 113, 
      name: "Art Deco Silver Centerpiece", 
      original: 98000, 
      sale: 49000, 
      images: ["/images/cat_decor.jpg", "/images/hero_silver.jpg", "/images/cat_serveware.jpg"],
      pieceNo: "DEC-05",
      provenance: "Geometric Pierced Border"
    },
    { 
      id: 114, 
      name: "Hand-Chased Silver Goblet Set", 
      original: 64000, 
      sale: 32000, 
      images: ["/images/cat_decor.jpg", "/images/cat_accessories.jpg", "/images/silver_hallmark.jpg"],
      pieceNo: "DEC-06",
      provenance: "Set of 4 • Acanthus Leaf Chasing"
    },
    { 
      id: 115, 
      name: "Heirloom Silver Mantle Clock", 
      original: 135000, 
      sale: 67500, 
      images: ["/images/cat_decor.jpg", "/images/hero_silver.jpg", "/images/cat_divinity.jpg"],
      pieceNo: "DEC-07",
      provenance: "Swiss Movement • Sterling Repoussé"
    },
    { 
      id: 116, 
      name: "Sterling Silver Fruit Basket", 
      original: 78000, 
      sale: 39000, 
      images: ["/images/cat_decor.jpg", "/images/silver_hallmark.jpg", "/images/cat_serveware.jpg"],
      pieceNo: "DEC-08",
      provenance: "Swing Handle • Rococo Detailing"
    },
  ];

  // 3. Serveware, Bar and Corporate
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
      original: 28000, 
      sale: 14000, 
      images: ["/images/cat_serveware.jpg", "/images/silver_hallmark.jpg", "/images/cat_accessories.jpg"],
      pieceNo: "SRV-04",
      provenance: "Turned Mahogany Base • 925 Rim"
    },
    { 
      id: 117, 
      name: "Silver Champagne Cooler", 
      original: 110000, 
      sale: 55000, 
      images: ["/images/cat_serveware.jpg", "/images/hero_silver.jpg", "/images/cat_decor.jpg"],
      pieceNo: "SRV-05",
      provenance: "Double Walled • Insulated Sterling"
    },
    { 
      id: 118, 
      name: "Cocktail Shaker & Jigger", 
      original: 58000, 
      sale: 29000, 
      images: ["/images/cat_serveware.jpg", "/images/cat_accessories.jpg", "/images/silver_hallmark.jpg"],
      pieceNo: "SRV-06",
      provenance: "Engraved Measurement Lines • Bayonet Seal"
    },
    { 
      id: 119, 
      name: "Sterling Gravy Boat & Stand", 
      original: 42000, 
      sale: 21000, 
      images: ["/images/cat_serveware.jpg", "/images/hero_silver.jpg", "/images/cat_divinity.jpg"],
      pieceNo: "SRV-07",
      provenance: "Georgian Scroll Handle • 925 Assay"
    },
    { 
      id: 120, 
      name: "Salver Serving Platter", 
      original: 88000, 
      sale: 44000, 
      images: ["/images/cat_serveware.jpg", "/images/silver_hallmark.jpg", "/images/cat_decor.jpg"],
      pieceNo: "SRV-08",
      provenance: "Piecrust Border • Cast Claw Feet"
    },
  ];

  // 4. Personal and Desk Accessories
  const accessoriesProducts = [
    { 
      id: 7, 
      name: "Engine-Turned Cigarette Case", 
      original: 42000, 
      sale: 21000, 
      images: ["/images/cat_accessories.jpg", "/images/hero_silver.jpg", "/images/silver_hallmark.jpg"],
      pieceNo: "ACC-01",
      provenance: "Barleycorn Engraved Pattern"
    },
    { 
      id: 8, 
      name: "Sterling Silver Flask", 
      original: 52000, 
      sale: 26000, 
      images: ["/images/cat_accessories.jpg", "/images/cat_decor.jpg", "/images/silver_hallmark.jpg"],
      pieceNo: "ACC-02",
      provenance: "Curved Hip Fitting • Bayonet Cap"
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
    { 
      id: 121, 
      name: "Silver Desk Blotter & Inkwell", 
      original: 62000, 
      sale: 31000, 
      images: ["/images/cat_accessories.jpg", "/images/hero_silver.jpg", "/images/cat_decor.jpg"],
      pieceNo: "ACC-05",
      provenance: "Hinged Cap • Cut Crystal & 925"
    },
    { 
      id: 122, 
      name: "Engraved Bookmark & Clip", 
      original: 14000, 
      sale: 7000, 
      images: ["/images/cat_accessories.jpg", "/images/silver_hallmark.jpg", "/images/cat_serveware.jpg"],
      pieceNo: "ACC-06",
      provenance: "Hand-Engraved Monogram Standard"
    },
    { 
      id: 123, 
      name: "Sterling Silver Money Clip", 
      original: 16000, 
      sale: 8000, 
      images: ["/images/cat_accessories.jpg", "/images/hero_silver.jpg", "/images/cat_divinity.jpg"],
      pieceNo: "ACC-07",
      provenance: "Spring-Tensioned Sterling Chasing"
    },
    { 
      id: 124, 
      name: "Antique Card Holder Case", 
      original: 36000, 
      sale: 18000, 
      images: ["/images/cat_accessories.jpg", "/images/cat_decor.jpg", "/images/silver_hallmark.jpg"],
      pieceNo: "ACC-08",
      provenance: "Push-Release Clasp • Striped Guilloche"
    },
  ];

  // Product Card with FACET 3-Angle View Dissolve & Micro-Zoom
  const ProductCard = ({ product }: { product: any }) => {
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const percentOff = Math.round((1 - product.sale / product.original) * 100);

    const switchView = (idx: number) => {
      if (idx === activeImgIndex || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveImgIndex(idx);
        setIsTransitioning(false);
      }, 160);
    };

    return (
      <div 
        onMouseEnter={() => setHoveredCardId(product.id)}
        onMouseLeave={() => setHoveredCardId(null)}
        className="group flex flex-col text-left transition-all duration-300"
      >
        {/* Clean Minimal Product Image Container */}
        <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-[#ffffff] p-4 flex items-center justify-center transition-all duration-500 group-hover:scale-[1.02]">
          
          {/* Primary Image with 3-Angle Dissolve */}
          <div className="relative w-full h-full">
            <Image 
              src={product.images[activeImgIndex]} 
              alt={product.name} 
              fill 
              className={`object-contain transition-all duration-700 ease-out ${
                isTransitioning ? "opacity-30 blur-[1px]" : "opacity-100 blur-0"
              }`}
            />
          </div>

          {/* 3-View Angle Selector Bars */}
          <div className="absolute bottom-2 left-0 w-full flex justify-center items-center gap-1.5 z-20">
            {product.images.map((_: any, imgIdx: number) => (
              <button
                key={imgIdx}
                onClick={(e) => {
                  e.stopPropagation();
                  switchView(imgIdx);
                }}
                className={`transition-all duration-300 cursor-pointer ${
                  activeImgIndex === imgIdx
                    ? "w-5 h-[2px] bg-[#141312]"
                    : "w-2 h-[2px] bg-[#141312]/20 hover:bg-[#141312]/60"
                }`}
                aria-label={`View perspective ${imgIdx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Product Title in Bold Uppercase / Headline font like reference image */}
        <h3 className="font-sans font-bold text-xs sm:text-sm text-[#141312] uppercase tracking-[0.06em] mb-1.5 line-clamp-1">
          {product.name}
        </h3>

        {/* Price Row: Rs. formatted on left, strike-through original on right */}
        <div className="flex items-center gap-2 font-sans">
          <span className="text-[#141312] font-bold text-xs sm:text-sm tracking-tight">
            Rs. {product.sale.toLocaleString('en-IN')}.00
          </span>
          <span className="text-[#8c827a] line-through text-xs font-normal">
            Rs. {product.original.toLocaleString('en-IN')}.00
          </span>
        </div>
      </div>
    );
  };

  // Filtered products list for current category
  const displayedProducts = activeCategory === "all"
    ? [...divinityProducts, ...decorProducts, ...servewareProducts, ...accessoriesProducts]
    : activeCategory === "divinity"
    ? divinityProducts
    : activeCategory === "decor"
    ? decorProducts
    : activeCategory === "serveware"
    ? servewareProducts
    : accessoriesProducts;

  // Tiffany & Co. scroller handlers
  const handleScroll = () => {
    if (!collectionScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = collectionScrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const progress = Math.max(0, Math.min(1, scrollLeft / maxScroll));
    setScrollProgress(progress);
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < maxScroll - 5);
  };

  const scrollCollection = (direction: "left" | "right") => {
    if (!collectionScrollRef.current) return;
    const scrollAmount = 360;
    collectionScrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  // Re-check scroll state whenever activeCategory changes or window resizes
  useEffect(() => {
    const checkScrollState = () => {
      if (!collectionScrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = collectionScrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setCanScrollRight(scrollLeft < maxScroll - 5);
      } else {
        setCanScrollRight(false);
      }
      setCanScrollLeft(scrollLeft > 5);
    };

    if (collectionScrollRef.current) {
      collectionScrollRef.current.scrollTo({ left: 0, behavior: "instant" });
    }
    setScrollProgress(0);
    setCanScrollLeft(false);

    // Measure right after DOM update
    const timer = setTimeout(checkScrollState, 50);
    window.addEventListener("resize", checkScrollState);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScrollState);
    };
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-[#fbfbf9] text-[#141312]">
      
      {/* 1. Announcement Bar */}
      {showAnnouncement && (
        <aside aria-label="Announcement" className="fixed top-0 left-0 w-full bg-[#141312] text-[#fbfbf9] z-50 px-6 py-2.5 flex items-center justify-center text-[11px] font-sans tracking-[0.2em] uppercase">
          <span>The Vault Release: Up to 50% Off. Strictly Limited Pieces. Ends October 31.</span>
          <button 
            onClick={() => setShowAnnouncement(false)} 
            className="absolute right-6 text-[#8c827a] hover:text-[#fbfbf9] transition-colors cursor-pointer"
            aria-label="Dismiss announcement"
          >
            ✕
          </button>
        </aside>
      )}

      {/* 2. Elevated Translucent Navigation */}
      <header className={`fixed w-full z-40 transition-all duration-300 bg-[#fbfbf9]/90 backdrop-blur-md border-b border-[#e8e4dc] ${showAnnouncement ? 'top-[37px]' : 'top-0'}`}>
        <div className="flex justify-between items-center px-6 sm:px-12 py-5 max-w-[1440px] mx-auto">
          {/* Left: Brand Name */}
          <a href="#" className="font-serif text-2xl sm:text-3xl tracking-[0.2em] uppercase text-[#141312]">
            Fraser &amp; Hawes
          </a>

          {/* Right / Center: Navigation Links */}
          <nav className="hidden md:flex gap-10 items-center text-xs font-sans uppercase tracking-[0.2em] text-[#57534e]">
            <a href="#collections" className="hover:text-[#141312] transition-colors">The Vault</a>
            <a href="#story" className="hover:text-[#141312] transition-colors">Our Story</a>
            <a href="#heritage" className="hover:text-[#141312] transition-colors">Heritage</a>
            <a href="#craft" className="hover:text-[#141312] transition-colors">Craft &amp; Authenticity</a>
            <a href="#faq" className="hover:text-[#141312] transition-colors">Archive FAQ</a>
          </nav>
        </div>
      </header>

      {/* 3. Hero Section (Exact Tiffany & Co. Layout: Left Editorial Panel + Right Large Masterpiece Visual) */}
      <section className="pt-28 sm:pt-36 pb-14 sm:pb-20 bg-[#ffffff] border-b border-[#e8e4dc]">
        <div className="w-full pl-6 sm:pl-12 lg:pl-20 pr-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Tiffany Style Editorial Text & Underlined CTA */}
            <div className="lg:col-span-4 pr-6 sm:pr-10 lg:pr-6 flex flex-col justify-center text-center lg:text-left items-center lg:items-start py-8 lg:py-16">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#141312] leading-[1.1] tracking-tight mb-5 font-normal">
                Silver made at yesterday&apos;s price. Yours today.
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#141312]/80 max-w-md leading-relaxed mb-8 font-normal">
                Fraser &amp; Hawes crafted these pieces years ago, before silver&apos;s rise. We&apos;re passing that advantage on, with up to 50% off.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a 
                  href="#collections" 
                  className="group relative inline-block text-[11px] sm:text-xs font-sans font-medium uppercase tracking-[0.25em] text-[#141312] pb-1 border-b border-[#141312] hover:opacity-70 transition-opacity"
                >
                  SHOP THE COLLECTION
                </a>
                <a 
                  href="#story" 
                  className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.25em] text-[#8c827a] hover:text-[#141312] transition-colors"
                >
                  HOW IT WORKS
                </a>
              </div>
            </div>

            {/* Right Column: Hero Masterpiece Visual */}
            <div className="lg:col-span-8 w-full">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden bg-[#f4f2ec] border border-[#e8e4dc] group">
                <Image 
                  src="/images/hero_silver.jpg" 
                  alt="Fraser &amp; Hawes Sterling Silver Masterpiece" 
                  fill 
                  priority 
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-103" 
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. How These Pieces Came to Be Here (The Story) */}
      <StoryArchive />

      {/* 4. The Vault Collection (Segmented Tab Bar + Dynamic Category Image Replacement) */}
      <section id="collections" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#ffffff]">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-5xl font-serif text-[#141312] tracking-tight font-normal">
              The Vault Collection
            </h2>
          </div>

          {/* Luxury Minimalist Category Filter Bar */}
          <div className="w-full flex justify-center mb-12 sm:mb-16">
            <div className="inline-flex items-center p-1.5 bg-[#f4f2ec] border border-[#e8e4dc] rounded-full overflow-x-auto max-w-full hide-scrollbar shadow-[inset_0_1px_3px_rgba(20,19,18,0.04)]">
              {[
                { id: "all", label: "ALL" },
                { id: "divinity", label: "DIVINITY" },
                { id: "decor", label: "ART & DECOR" },
                { id: "serveware", label: "SERVEWARE" },
                { id: "accessories", label: "ACCESSORIES" },
              ].map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-5 sm:px-8 py-2.5 text-xs font-sans tracking-[0.18em] uppercase transition-all duration-300 rounded-full cursor-pointer whitespace-nowrap ${
                      isActive 
                        ? "bg-[#141312] text-[#fbfbf9] font-medium shadow-sm" 
                        : "text-[#57534e] hover:text-[#141312] hover:bg-[#eae6dc]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Products Horizontal Slider Container */}
          <div className="relative">
            <div 
              ref={collectionScrollRef}
              onScroll={handleScroll}
              className="flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth no-scrollbar hide-scrollbar pb-2 pt-2 select-none"
              style={{ 
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none"
              }}
            >
              {displayedProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="min-w-[260px] sm:min-w-[300px] md:min-w-[320px] max-w-[340px] flex-shrink-0"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Tiffany & Co. Style Scroller Component (< ─── >) */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 mt-8 sm:mt-12">
              {/* Left Arrow Button */}
              <button
                onClick={() => scrollCollection("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`p-2 transition-opacity duration-200 cursor-pointer ${
                  canScrollLeft ? "opacity-100 hover:opacity-60 text-[#141312]" : "opacity-25 cursor-not-allowed text-[#141312]"
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              {/* Progress Track Bar */}
              <div 
                className="w-48 sm:w-80 md:w-96 h-[2px] bg-[#e5e5e5] relative cursor-pointer overflow-hidden rounded-full"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  if (collectionScrollRef.current) {
                    const maxScroll = collectionScrollRef.current.scrollWidth - collectionScrollRef.current.clientWidth;
                    collectionScrollRef.current.scrollTo({
                      left: ratio * maxScroll,
                      behavior: "smooth"
                    });
                  }
                }}
              >
                {/* Active Indicator Bar */}
                <div 
                  className="h-full bg-[#141312] transition-all duration-150 ease-out"
                  style={{
                    width: "25%",
                    transform: `translateX(${scrollProgress * 300}%)`,
                  }}
                />
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={() => scrollCollection("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`p-2 transition-opacity duration-200 cursor-pointer ${
                  canScrollRight ? "opacity-100 hover:opacity-60 text-[#141312]" : "opacity-25 cursor-not-allowed text-[#141312]"
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Heritage Strip ("A legacy of Art-in-silver with over 150 years of legacy") */}
      <div id="heritage">
        <HeritageArchive />
      </div>

      {/* 6. Craft and Authenticity (Hallmark close-up, sterling standard, hand-finishing, certificate, presentation box) */}
      <section id="craft" className="py-24 sm:py-28 md:py-32 px-6 sm:px-10 lg:px-16 bg-[#f4f2ec] border-t border-[#e8e4dc]">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-6xl text-[#141312] tracking-tight mb-4">
              Craft and Authenticity
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#57534e] max-w-xl mx-auto leading-relaxed">
              Every piece in the Vault Release adheres to our highest standards of master silversmithing. A big discount reflects historical silver valuation, never lower craftsmanship.
            </p>
          </div>

          {/* Staggered Focus-Isolated Exhibition Pedestals (5 Pillars with Hover Artifact Image Reveal) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Hallmark Close-Up",
                subtitle: "British Assay Stamp",
                desc: "Independently struck assay hallmarks visible under magnification, documenting date, foundry mark, and town standard.",
                tag: "Verified Mark",
                image: "/images/silver_hallmark.jpg",
                alt: "British Assay Hallmark on Sterling Silver"
              },
              {
                title: "Sterling Standard",
                subtitle: "92.5% Pure Silver",
                desc: "Guaranteed solid sterling bullion throughout. Absolutely no electroplating, hollow flashing, or base-metal core.",
                tag: "925 Assay Pure",
                image: "/images/cat_accessories.jpg",
                alt: "925 Solid Sterling Standard"
              },
              {
                title: "Hand-Finishing",
                subtitle: "Master Artisan Chasing",
                desc: "Individually repoussé-hammered and hand-burnished by silversmiths with decades of lineage at traditional benches.",
                tag: "Artisan Finished",
                image: "/images/heritage_workshop.jpg",
                alt: "Artisan Hand Chasing and Finishing"
              },
              {
                title: "Certificate of Authenticity",
                subtitle: "Archival Registrar Folio",
                desc: "Each piece is accompanied by an embossed document of authenticity signed by our head registrar detailing catalogued provenance.",
                tag: "Serialized Registry",
                image: "/images/cat_decor.jpg",
                alt: "Certificate of Authenticity and Provenance"
              },
              {
                title: "The Presentation Box",
                subtitle: "Velvet & Cedar Casing",
                desc: "Delivered inside our signature velvet-lined heirloom presentation case with tarnish-inhibiting archival flannel wrap.",
                tag: "Heirloom Casing",
                image: "/images/cat_serveware.jpg",
                alt: "Heirloom Presentation Box and Casing"
              }
            ].map((pillar, idx) => (
              <div 
                key={idx}
                className="group relative p-8 border border-[#e8e4dc] bg-[#fbfbf9] flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-[#141312] hover:-translate-y-1.5 hover:shadow-xl min-h-[340px] cursor-pointer"
              >
                {/* Background Artifact Image on Hover */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <Image
                    src={pillar.image}
                    alt={pillar.alt}
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                  />
                  {/* Luxury editorial gradient overlay ensuring high text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141312]/95 via-[#141312]/75 to-[#141312]/40" />
                </div>

                {/* Card Header & Body */}
                <div className="relative z-10">
                  <h4 className="text-xl sm:text-2xl font-serif text-[#141312] group-hover:text-[#fbfbf9] mb-2 leading-snug transition-colors duration-300">
                    {pillar.title}
                  </h4>
                  <p className="text-[#8c827a] group-hover:text-[#c5a880] font-serif italic text-sm mb-4 transition-colors duration-300">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs text-[#57534e] group-hover:text-[#e8e4dc] leading-relaxed transition-colors duration-300">
                    {pillar.desc}
                  </p>
                </div>

                {/* Card Footer Tag */}
                <div className="relative z-10 mt-8 pt-4 border-t border-[#e8e4dc] group-hover:border-[#fbfbf9]/30 text-[10px] font-sans uppercase tracking-[0.2em] text-[#141312] group-hover:text-[#c5a880] transition-colors duration-300 flex items-center justify-between">
                  <span>{pillar.tag}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                    &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Bespoke Gifting */}
      <section id="gifting" className="py-24 sm:py-28 md:py-32 px-6 sm:px-10 lg:px-16 text-center bg-[#fbfbf9] border-t border-[#e8e4dc]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-5xl mb-6 leading-tight text-[#141312]">
            Weddings, anniversaries, corporate gifts, christenings.
          </h2>
          <p className="text-[#57534e] font-serif italic text-lg sm:text-xl mb-10 max-w-xl mx-auto">
            Add our signature hand-embossed wax seal, silk ribbon gift-wrap and calligraphy note.
          </p>
          <button className="bg-[#141312] text-[#fbfbf9] px-10 py-4 text-xs font-sans font-medium tracking-[0.25em] uppercase hover:bg-[#33312e] transition-colors cursor-pointer">
            Request Gift-Wrap Service
          </button>
        </div>
      </section>

      {/* 8. The Archive FAQ (Interactive Luxury Folio Accordion) */}
      <section id="faq" className="py-24 sm:py-28 md:py-32 px-6 sm:px-10 lg:px-16 bg-[#f4f2ec] border-t border-[#e8e4dc]">
        <div className="max-w-4xl mx-auto">
          
          {/* Original Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-6xl text-[#141312] mb-4 tracking-tight leading-tight">
              The Archive FAQ
            </h2>
            <div className="w-16 h-[1px] bg-[#141312]/20 mx-auto"></div>
          </div>

          {/* Interactive Luxury Accordion Register (FACET style with + / × toggle) */}
          <div className="border-t border-[#e8e4dc] divide-y divide-[#e8e4dc]">
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
              <details 
                key={idx}
                className="group py-6 sm:py-8 cursor-pointer transition-colors duration-300"
              >
                <summary className="list-none flex items-baseline justify-between gap-6 select-none focus:outline-hidden">
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="font-serif text-xl sm:text-2xl text-[#8c827a] group-open:text-[#141312] transition-colors min-w-[28px]">
                      {item.num}.
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#141312] tracking-tight group-hover:opacity-75 transition-opacity">
                      {item.q}
                    </h3>
                  </div>

                  {/* Minimalist Rotator Toggle (+ rotates to × on open) */}
                  <span className="w-8 h-8 rounded-full border border-[#e8e4dc] flex items-center justify-center text-[#141312] text-sm shrink-0 transition-transform duration-500 ease-out group-open:rotate-45 group-hover:border-[#141312] bg-[#fbfbf9]">
                    +
                  </span>
                </summary>

                <div className="pt-4 sm:pt-6 pl-10 sm:pl-14 pr-4 sm:pr-12">
                  <p className="font-sans text-xs sm:text-sm text-[#57534e] leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>

        </div>
      </section>

      {/* 9. Architectural Footer */}
      <footer className="pt-24 pb-12 px-6 sm:px-10 lg:px-16 bg-[#141312] text-[#fbfbf9] text-center">
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#8c827a] block mb-4">
            Final Notice
          </span>
          <div className="font-serif text-3xl sm:text-5xl text-[#fbfbf9] mb-8 leading-tight">
            The vault will not remain open indefinitely.
          </div>
          <a 
            href="#collections" 
            className="inline-block bg-[#fbfbf9] text-[#141312] px-10 py-4 text-xs font-sans font-medium tracking-[0.25em] uppercase hover:bg-[#e8e4dc] transition-colors"
          >
            Acquire From The Vault
          </a>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-16 border-t border-b border-[#2a2825] py-6 max-w-4xl mx-auto">
          <a href="#" className="text-xs uppercase tracking-[0.2em] font-sans text-[#8c827a] hover:text-[#fbfbf9] transition-colors">Archival Provenance</a>
          <a href="#" className="text-xs uppercase tracking-[0.2em] font-sans text-[#8c827a] hover:text-[#fbfbf9] transition-colors">Hallmark Registry</a>
          <a href="#" className="text-xs uppercase tracking-[0.2em] font-sans text-[#8c827a] hover:text-[#fbfbf9] transition-colors">Collector Concierge</a>
          <a href="#" className="text-xs uppercase tracking-[0.2em] font-sans text-[#8c827a] hover:text-[#fbfbf9] transition-colors">Private Commissions</a>
        </div>
        
        <div className="text-[11px] uppercase tracking-[0.25em] font-sans text-[#66605a]">
          &copy; {new Date().getFullYear()} Fraser &amp; Hawes Silversmiths. Tradition &amp; Integrity Since 1869.
        </div>
      </footer>

    </main>
  );
}
