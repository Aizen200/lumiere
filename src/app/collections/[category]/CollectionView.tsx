"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../../ProductCard";
import SiteHeader from "../../SiteHeader";
import { getCategory, productsByCategory, type CategoryId } from "../../products";

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
] as const;

type SortId = (typeof sorts)[number]["id"];

// Same look as the header's Collections menu: small tracked caps that open a
// white panel, with the chosen option underlined
function SortMenu({ value, onChange }: { value: SortId; onChange: (id: SortId) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = sorts.find((s) => s.id === value)!;

  // Close on a click elsewhere or on Escape
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-3 h-10 text-xs uppercase tracking-[0.16em] cursor-pointer group"
      >
        <span className="text-ink-muted">Sort by</span>
        <span className="text-ink group-hover:underline underline-offset-[6px] decoration-1">{current.label}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className={`text-ink transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <ul
        role="listbox"
        aria-label="Sort by"
        className={`absolute right-0 top-full mt-3 z-20 min-w-60 bg-white border border-sand-border shadow-[0_20px_40px_rgba(20,19,18,0.08)] py-3 transition-all duration-200 ${
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
        }`}
      >
        {sorts.map((s) => {
          const active = s.id === value;
          return (
            <li key={s.id} role="option" aria-selected={active}>
              <button
                onClick={() => {
                  onChange(s.id);
                  setOpen(false);
                }}
                className={`w-full text-left px-6 py-2.5 font-serif text-lg transition-colors cursor-pointer ${
                  active ? "text-ink underline underline-offset-[6px] decoration-1" : "text-ink-secondary hover:text-ink"
                }`}
              >
                {s.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function CollectionView({ id }: { id: CategoryId }) {
  const category = getCategory(id)!;
  const [sort, setSort] = useState<SortId>("featured");

  const products = [...productsByCategory[id]];
  if (sort === "price-asc") products.sort((a, b) => a.sale - b.sale);
  if (sort === "price-desc") products.sort((a, b) => b.sale - a.sale);

  return (
    <main className="min-h-screen bg-white text-ink">
      <SiteHeader />

      {/* Banner */}
      <section className="relative mt-16 lg:mt-20 h-56 sm:h-64 lg:h-80 overflow-hidden bg-ink">
        <Image
          src={category.banner}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45 scale-105 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/50" />
        <div className="relative h-full container-site flex flex-col items-center justify-center text-center text-white">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/70 mb-4">The Vault Release</p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-none mb-4">{category.label}</h1>
          <p className="text-sm sm:text-base text-white/80 max-w-md">{category.blurb}</p>
        </div>
      </section>

      <section className="pt-8 lg:pt-10 pb-[3.2rem] sm:pb-[4.4rem] lg:pb-[5.6rem]">
        <div className="container-site">

          {/* Sort */}
          <div className="border-b border-sand-border pb-4 mb-10 lg:mb-12">
            <div className="flex justify-end">
              <SortMenu value={sort} onChange={setSort} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 sm:gap-x-8 gap-y-12 lg:gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
