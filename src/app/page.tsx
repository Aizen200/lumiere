"use client";

import Image from "next/image";
import { useState } from "react";
import StoryArchive from "./StoryArchive";
import HeritageArchive from "./HeritageArchive";

export default function LandingPage() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeCategory, setActiveCategory] = useState<"divinity" | "decor" | "serveware" | "accessories">("divinity");

  const categories = [
    { id: "divinity", name: "Divinity", count: 13, folio: "Folio I" },
    { id: "decor", name: "Art & Decor", count: 30, folio: "Folio II" },
    { id: "serveware", name: "Serveware & Bar", count: 17, folio: "Folio III" },
    { id: "accessories", name: "Personal Accessories", count: 8, folio: "Folio IV" },
  ] as const;

  const productsByCategory = {
    divinity: [
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
    ],
    decor: [
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
    ],
    serveware: [
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
    ],
    accessories: [
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
    ],
  };

  const ProductCard = ({ product }: { product: any }) => {
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const percentOff = Math.round((1 - product.sale / product.original) * 100);

    return (
      <div className="group flex flex-col text-left">
        {/* Modern Framed Aspect Container */}
        <div className="relative aspect-[4/5] mb-5 overflow-hidden bg-[#f4f2ec] border border-[#e8e4dc] transition-colors duration-500 group-hover:border-[#141312]">
          
          {/* Piece Identifier Tag */}
          <div className="absolute top-3 left-3 z-20">
            <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#141312] bg-[#fbfbf9]/95 px-2.5 py-1 border border-[#e8e4dc]">
              {product.pieceNo}
            </span>
          </div>

          {/* Discount Pill */}
          <div className="absolute top-3 right-3 z-20">
            <span className="text-[10px] font-sans tracking-[0.15em] uppercase text-[#141312] bg-[#fbfbf9]/95 px-2 py-1 border border-[#e8e4dc]">
              -{percentOff}%
            </span>
          </div>

          {/* Primary Image with Fluid Zoom */}
          <div className="relative w-full h-full">
            <Image 
              src={product.images[activeImgIndex]} 
              alt={product.name} 
              fill 
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-104"
            />
          </div>

          {/* Minimalist Multi-View Angle Selector */}
          <div className="absolute bottom-3 left-0 w-full flex justify-center items-center gap-1.5 z-20">
            {product.images.map((_: any, imgIdx: number) => (
              <button
                key={imgIdx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImgIndex(imgIdx);
                }}
                className={`transition-all duration-300 cursor-pointer ${
                  activeImgIndex === imgIdx
                    ? "w-5 h-[2px] bg-[#141312]"
                    : "w-2 h-[2px] bg-[#141312]/30 hover:bg-[#141312]/70"
                }`}
                aria-label={`View angle ${imgIdx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Product Meta */}
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="font-serif text-xl sm:text-2xl text-[#141312] tracking-tight group-hover:opacity-75 transition-opacity">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-[#8c827a] line-through text-xs font-sans">
              ₹{product.original.toLocaleString('en-IN')}
            </span>
            <span className="text-[#141312] font-sans font-medium text-sm">
              ₹{product.sale.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Provenance note */}
        <p className="text-[11px] font-sans tracking-[0.15em] uppercase text-[#8c827a]">
          {product.provenance}
        </p>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#fbfbf9] text-[#141312]">
      
      {/* 1. Understated Announcement Bar */}
      {showAnnouncement && (
        <aside aria-label="Announcement" className="fixed top-0 left-0 w-full bg-[#141312] text-[#fbfbf9] z-50 px-6 py-2.5 flex items-center justify-center text-[11px] font-sans tracking-[0.2em] uppercase">
          <span>The Vault Release • 68 Certified Pieces • Up to 50% Historical Advantage</span>
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
          {/* Left: Collections */}
          <nav className="hidden md:flex gap-8 items-center text-xs font-sans uppercase tracking-[0.2em] text-[#57534e]">
            <a href="#collections" className="hover:text-[#141312] transition-colors">The Vault</a>
            <a href="#chronicle" className="hover:text-[#141312] transition-colors">Chronicle</a>
            <a href="#craft" className="hover:text-[#141312] transition-colors">Savoir-Faire</a>
            <a href="#services" className="hover:text-[#141312] transition-colors">Concierge</a>
          </nav>

          {/* Center: Brand Wordmark */}
          <a href="#" className="font-serif text-2xl sm:text-3xl tracking-[0.2em] uppercase text-[#141312] -ml-2 md:ml-0">
            Fraser &amp; Hawes
          </a>

          {/* Right: Modern Luxury Utility */}
          <div className="flex items-center gap-6 text-xs font-sans uppercase tracking-[0.18em] text-[#57534e]">
            <span className="hidden sm:inline text-[#8c827a]">Est. 1869</span>
            <a href="#collections" className="text-[#141312] hover:opacity-70 transition-opacity">
              Folio (68)
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Section: Editorial High-Fashion Split */}
      <section className="pt-36 sm:pt-44 pb-20 sm:pb-28 px-6 sm:px-10 lg:px-16 border-b border-[#e8e4dc]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            
            {/* Left: Typography Statement */}
            <div className="lg:col-span-7 flex flex-col justify-end">
              <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#8c827a] block mb-4">
                Assayed 925 Sterling Silver • Archive Allocation
              </span>

              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[1.02] tracking-tight text-[#141312] mb-8">
                Silver made at yesterday&apos;s price. <span className="italic font-normal">Yours today.</span>
              </h1>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                <a 
                  href="#collections" 
                  className="px-8 py-4 bg-[#141312] text-[#fbfbf9] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#33312e] transition-colors"
                >
                  Acquire From The Vault
                </a>
                <a 
                  href="#chronicle" 
                  className="text-xs font-sans uppercase tracking-[0.2em] text-[#141312] border-b border-[#141312] pb-1 hover:opacity-60 transition-opacity"
                >
                  The Historical Context &rarr;
                </a>
              </div>
            </div>

            {/* Right: Macro Image with Refined Ratio */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] bg-[#f4f2ec] overflow-hidden border border-[#e8e4dc] group">
                <Image 
                  src="/images/hero_silver.jpg" 
                  alt="Fraser & Hawes Sterling Silver Master Urn" 
                  fill 
                  className="object-cover object-center transition-transform duration-1200 ease-out group-hover:scale-104" 
                  priority 
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#fbfbf9]/90 backdrop-blur-xs px-4 py-2 border border-[#e8e4dc] flex justify-between items-center text-[10px] font-sans tracking-[0.2em] uppercase text-[#141312]">
                  <span>Plate 01 — Master Urn</span>
                  <span className="text-[#8c827a]">Assay Hallmarked</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Story Chronicle */}
      <div id="chronicle">
        <StoryArchive />
      </div>

      {/* 5. Main Collection Explorer (FACET Navigation + Tiffany Editorial Presentation) */}
      <section id="collections" className="py-28 md:py-36 px-6 sm:px-10 lg:px-16 bg-[#fbfbf9]">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Curatorial Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#e8e4dc] gap-6">
            <div>
              <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#8c827a] block mb-3">
                Current Catalogue • 68 Assayed Masterpieces
              </span>
              <h2 className="text-4xl sm:text-6xl font-serif text-[#141312] tracking-tight">
                The Vault Folios
              </h2>
            </div>

            {/* Contemporary Category Switcher (Facet style) */}
            <div className="flex flex-wrap items-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-xs font-sans tracking-[0.18em] uppercase px-4 py-2 border transition-all duration-300 cursor-pointer ${
                    activeCategory === cat.id
                      ? "border-[#141312] bg-[#141312] text-[#fbfbf9]"
                      : "border-[#e8e4dc] bg-transparent text-[#57534e] hover:border-[#141312] hover:text-[#141312]"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic 4-Column Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {productsByCategory[activeCategory].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bottom Folio Status Note */}
          <div className="mt-20 pt-8 border-t border-[#e8e4dc] flex flex-col sm:flex-row justify-between items-center text-xs font-sans tracking-[0.2em] uppercase text-[#8c827a] gap-4">
            <span>Showing verified vault records for {categories.find(c => c.id === activeCategory)?.folio}</span>
            <span>Allocations released on first-confirmed basis</span>
          </div>

        </div>
      </section>

      {/* 6. Loupe Inspection / Savoir-Faire */}
      <div id="craft">
        <HeritageArchive />
      </div>

      {/* 7. Craftsmanship Triad (Quiet Minimal Pillars) */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#f4f2ec] border-t border-[#e8e4dc]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            
            <div className="border-t border-[#141312] pt-6">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#8c827a] block mb-2">
                Standard 01
              </span>
              <h3 className="font-serif text-2xl text-[#141312] mb-3">
                Assayed 925 Bullion
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#57534e] leading-relaxed">
                Independently assayed and certified to contain a minimum 92.5% pure silver with authentic historical hallmarks intact.
              </p>
            </div>

            <div className="border-t border-[#141312] pt-6">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#8c827a] block mb-2">
                Standard 02
              </span>
              <h3 className="font-serif text-2xl text-[#141312] mb-3">
                Unhurried Hand-Chasing
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#57534e] leading-relaxed">
                Individually chased, repoussé-formed, and burnished by master artisans trained in generational English and Indian techniques.
              </p>
            </div>

            <div className="border-t border-[#141312] pt-6">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#8c827a] block mb-2">
                Standard 03
              </span>
              <h3 className="font-serif text-2xl text-[#141312] mb-3">
                Certificate &amp; Presentation
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#57534e] leading-relaxed">
                Shipped in velvet-lined cedar presentation boxes with an individual registrar number and historical provenance certificate.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Private Concierge & Gifting */}
      <section id="services" className="py-28 md:py-36 px-6 sm:px-10 lg:px-16 bg-[#fbfbf9] border-t border-[#e8e4dc]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#8c827a] block mb-3">
              Private Services
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif text-[#141312] mb-6 leading-tight">
              Bespoke presentation, private viewings, and heirloom care.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#57534e] max-w-xl leading-relaxed mb-8">
              Whether acquiring a centerpiece for an estate, commemorating a milestone, or commissioning custom engraved silver, our concierge assists collectors individually.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3.5 bg-[#141312] text-[#fbfbf9] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#33312e] transition-colors cursor-pointer">
                Request Private Consultation
              </button>
              <button className="px-8 py-3.5 border border-[#e8e4dc] text-[#141312] text-xs font-sans uppercase tracking-[0.2em] hover:border-[#141312] transition-colors cursor-pointer">
                Signature Gift Wrap Details
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 border border-[#e8e4dc] p-8 sm:p-10 bg-[#f4f2ec]">
            <h3 className="font-serif text-2xl text-[#141312] mb-6 pb-4 border-b border-[#e8e4dc]">
              Atelier Inquiries
            </h3>
            <ul className="space-y-4 font-sans text-xs uppercase tracking-[0.18em] text-[#57534e]">
              <li className="flex justify-between py-2 border-b border-[#e8e4dc]/60">
                <span>Insured Global Transit</span>
                <span className="text-[#141312]">Complimentary</span>
              </li>
              <li className="flex justify-between py-2 border-b border-[#e8e4dc]/60">
                <span>Vault Authenticity Card</span>
                <span className="text-[#141312]">Included</span>
              </li>
              <li className="flex justify-between py-2 border-b border-[#e8e4dc]/60">
                <span>Direct Assay Verification</span>
                <span className="text-[#141312]">925 Sterling</span>
              </li>
              <li className="flex justify-between py-2">
                <span>Bespoke Wax-Seal Gifting</span>
                <span className="text-[#141312]">On Request</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 9. Minimalist Editorial FAQ */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#f4f2ec] border-t border-[#e8e4dc]">
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-16">
            <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#8c827a] block mb-2">
              Assistance &amp; Policies
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#141312]">
              Frequently Addressed Inquiries
            </h2>
          </div>

          <div className="divide-y divide-[#e8e4dc]">
            {[
              {
                q: "Is every item genuine hallmarked 925 sterling silver?",
                a: "Yes. Every single artifact in this release is certified solid sterling silver (minimum 92.5% pure elemental silver). None of these pieces are plated."
              },
              {
                q: "Why are these historical pieces offered at up to 50% advantage?",
                a: "These pieces were commissioned and crafted when bullion was valued significantly lower than today. Having remained sealed in our climate vaults, we pass that original raw-material price directly forward."
              },
              {
                q: "How are orders packaged and insured during transit?",
                a: "Each piece is wrapped in tarnish-inhibiting archival flannel, placed into our signature presentation box, and transported via armored, fully insured white-glove carriers requiring signature."
              },
              {
                q: "Can pieces be viewed in person prior to acquisition?",
                a: "Private viewings can be arranged by appointment at our archival salon. Contact the concierge to reserve a private allocation."
              }
            ].map((faq, i) => (
              <div key={i} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                <div className="md:col-span-5">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#141312] leading-snug">
                    {faq.q}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="font-sans text-xs sm:text-sm text-[#57534e] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Architectural Footer */}
      <footer className="pt-20 pb-12 px-6 sm:px-10 lg:px-16 bg-[#141312] text-[#fbfbf9]">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#2a2825]">
            <div className="md:col-span-6">
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.2em] uppercase block mb-4">
                Fraser &amp; Hawes
              </span>
              <p className="font-sans text-xs tracking-[0.15em] uppercase text-[#8c827a] max-w-md leading-relaxed">
                Silversmiths and master craftspeople since 1869. Preserving the legacy of British and Indian fine metalwork.
              </p>
            </div>

            <div className="md:col-span-3">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#8c827a] block mb-4">
                Folios &amp; Categories
              </span>
              <ul className="space-y-2.5 text-xs font-sans tracking-[0.15em] uppercase text-[#d6d0c7]">
                <li><a href="#collections" className="hover:text-[#fbfbf9] transition-colors">Divinity Collection</a></li>
                <li><a href="#collections" className="hover:text-[#fbfbf9] transition-colors">Art &amp; Home Decor</a></li>
                <li><a href="#collections" className="hover:text-[#fbfbf9] transition-colors">Serveware &amp; Cellar</a></li>
                <li><a href="#collections" className="hover:text-[#fbfbf9] transition-colors">Desk &amp; Accessories</a></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#8c827a] block mb-4">
                Client Relations
              </span>
              <ul className="space-y-2.5 text-xs font-sans tracking-[0.15em] uppercase text-[#d6d0c7]">
                <li><a href="#services" className="hover:text-[#fbfbf9] transition-colors">Private Viewings</a></li>
                <li><a href="#craft" className="hover:text-[#fbfbf9] transition-colors">Assay &amp; Hallmarks</a></li>
                <li><a href="#services" className="hover:text-[#fbfbf9] transition-colors">Bespoke Engraving</a></li>
                <li><a href="#services" className="hover:text-[#fbfbf9] transition-colors">Insured Delivery</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-sans tracking-[0.2em] uppercase text-[#8c827a] gap-4">
            <span>&copy; {new Date().getFullYear()} Fraser &amp; Hawes. All rights reserved.</span>
            <span>London • Calcutta • Private Vaults</span>
          </div>

        </div>
      </footer>

    </main>
  );
}
