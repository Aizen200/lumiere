"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type MouseEvent } from "react";
import ProductCard from "../../ProductCard";
import SiteHeader from "../../SiteHeader";
import {
  categories,
  collectionHref,
  enquiryLink,
  formatPrice,
  getProduct,
  productCategory,
  productsByCategory,
  type Product,
} from "../../products";

// Suggestions mix categories: take one piece from each category in turn,
// starting with the other categories, until there are four
function suggestionsFor(product: Product, count = 4) {
  const own = productCategory(product).id;
  const ids = categories.map((c) => c.id).filter((id) => id !== "all");
  const queues = [...ids.filter((id) => id !== own), own].map((id) =>
    productsByCategory[id].filter((p) => p !== product)
  );
  const picks: Product[] = [];
  for (let round = 0; picks.length < count && queues.some((q) => q.length > round); round++) {
    for (const queue of queues) {
      if (queue[round] && picks.length < count) picks.push(queue[round]);
    }
  }
  return picks;
}

// Main photograph with thumbnails beside it (below on phones). Hovering a
// thumbnail switches the photo, and hovering the photo magnifies that spot.
function Gallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const hasThumbs = product.images.length > 1;

  const handleZoom = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className={`flex flex-col-reverse gap-3 ${hasThumbs ? "lg:flex-row" : ""}`}>
      {hasThumbs && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto hide-scrollbar shrink-0">
          {product.images.map((src, i) => (
            <button
              key={src}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={`Show photograph ${i + 1} of ${product.images.length}`}
              aria-current={active === i}
              className={`relative w-16 h-20 lg:w-[72px] lg:h-[90px] shrink-0 overflow-hidden bg-sand-surface cursor-pointer ring-1 ring-offset-2 ring-offset-white transition-all ${
                active === i ? "ring-ink" : "ring-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="72px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <div
        onMouseMove={handleZoom}
        onMouseLeave={() => setZoom(null)}
        className="relative flex-1 aspect-[4/5] overflow-hidden bg-sand-surface cursor-zoom-in lg:flex-none lg:w-auto lg:h-[min(calc(100svh-12rem),580px)] lg:max-w-[calc(100%-84px)]"
      >
        <Image
          src={product.images[active]}
          alt={product.name}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-200 ease-out"
          style={zoom ? { transform: "scale(2)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
        />
        {hasThumbs && (
          <span className="absolute bottom-3 right-3 bg-white/85 px-2.5 py-1 text-xs tabular-nums text-ink">
            {active + 1} / {product.images.length}
          </span>
        )}
      </div>
    </div>
  );
}

// Same open/close pattern as the FAQ on the home page
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-ink/15">
      <summary className="list-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-6 py-5 cursor-pointer select-none">
        <h2 className="font-serif text-xl sm:text-2xl leading-snug text-ink">{title}</h2>
        <span className="relative w-4 h-4 shrink-0 text-ink" aria-hidden>
          <span className="absolute top-1/2 left-0 w-4 h-px bg-current" />
          <span className="absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
        </span>
      </summary>
      <div className="pb-6 text-[15px] leading-[1.7] text-ink-secondary">{children}</div>
    </details>
  );
}

export default function ProductView({ slug }: { slug: string }) {
  const product = getProduct(slug)!;
  const category = productCategory(product);
  const [quantity, setQuantity] = useState(1);
  const [shared, setShared] = useState(false);

  const suggestions = suggestionsFor(product);
  const saving = Math.round((1 - product.sale / product.original) * 100);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: product.name, url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-white text-ink">

      <SiteHeader />

      <section className="pt-24 lg:pt-32 pb-[3.2rem] sm:pb-[4.4rem] lg:pb-[5.6rem]">
        <div className="container-site">

          <nav aria-label="Breadcrumb" className="text-sm text-ink-muted mb-6 lg:mb-8">
            <Link href={collectionHref("all")} className="hover:text-ink transition-colors">The Vault</Link>
            <span className="mx-2" aria-hidden>/</span>
            <Link href={collectionHref(category.id)} className="hover:text-ink transition-colors">{category.label}</Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* Gallery stays in view while the details scroll */}
            <div className="lg:col-span-7 lg:sticky lg:top-28 lg:self-start">
              <Gallery product={product} />
            </div>

            <div className="lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-ink-muted mb-3">{product.pieceNo}</p>
              <h1 className="font-serif text-4xl sm:text-5xl leading-[1.05] text-ink mb-5">{product.name}</h1>

              <p className="text-lg mb-1">
                <span className="sr-only">Was </span>
                <s className="text-ink-muted">{formatPrice(product.original)}</s>
                <span className="text-ink-muted mx-2" aria-hidden>/</span>
                <span className="sr-only">now </span>
                <span className="text-ink">{formatPrice(product.sale)}</span>
              </p>
              <p className="text-sm text-ink-muted mb-8">Vault Release price, {saving}% below the original</p>

              <p className="text-base leading-[1.7] text-ink-secondary mb-8">
                {product.provenance}. Made years ago in solid 925 sterling silver at our own benches, and kept in the
                vault since, so it reaches you as it left the workshop.
              </p>

              <p className="text-sm text-ink-secondary mb-2" id="quantity-label">Quantity</p>
              <div className="flex gap-3 mb-3">
                <div role="group" aria-labelledby="quantity-label" className="flex items-center h-12 border border-ink/25">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity === 1}
                    aria-label="Decrease quantity"
                    className="w-11 h-full flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-default"
                  >
                    &minus;
                  </button>
                  <span className="w-8 text-center tabular-nums" aria-live="polite">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-11 h-full flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <a
                  href={enquiryLink(product, quantity)}
                  className="flex-1 inline-flex items-center justify-center h-12 bg-ink border border-ink text-sm tracking-[0.04em] text-sand-base hover:bg-transparent hover:text-ink transition-colors"
                >
                  Enquire now
                </a>
              </div>
              <p className="text-sm text-ink-muted mb-10">
                Ships fully insured, with its certificate of authenticity and presentation box.
              </p>

              <div className="border-t border-ink/15">
                <Accordion title="Product specifications">
                  <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2">
                    {[
                      ["Piece no.", product.pieceNo],
                      ["Category", category.label],
                      ["Material", "Solid 925 sterling silver"],
                      ["Hallmark", "Assay hallmarked"],
                      ["Detail", product.provenance],
                    ].map(([label, value]) => (
                      <div key={label} className="contents">
                        <dt className="text-ink-muted">{label}</dt>
                        <dd className="text-ink">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </Accordion>
                <Accordion title="Description">
                  <p>
                    We made this piece years ago, when silver cost much less, and kept it in our vault in cedar and
                    flannel. It is priced at what it cost us then, not at today&apos;s silver price. Every piece is
                    chased by hand, hallmarked and recorded in our ledger before it leaves us.
                  </p>
                </Accordion>
                <Accordion title="Terms & conditions">
                  <p>
                    Vault Release prices run until 31 October, or until the piece is sold. These are pieces from
                    storage, so once one is gone it won&apos;t be restocked at this price.
                  </p>
                </Accordion>
                <Accordion title="Care & return policy">
                  <p className="mb-3">
                    Returns are accepted within 30 days, as long as the piece is in its original condition and
                    packaging. Every piece also carries our lifetime workshop warranty.
                  </p>
                  <p>
                    Store it in its flannel wrap when not on display, and polish with a soft, dry cloth.
                  </p>
                </Accordion>
              </div>

              <button
                onClick={share}
                className="inline-flex items-center gap-2 mt-6 text-sm text-ink-secondary hover:text-ink transition-colors cursor-pointer"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 3v13M7 8l5-5 5 5M5 14v6h14v-6" />
                </svg>
                {shared ? "Link copied" : "Share"}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Pieces from across the vault */}
      <section className="section-y bg-sand-surface">
        <div className="container-site">
          <h2 className="font-serif text-4xl sm:text-5xl leading-[1.05] text-ink mb-10 lg:mb-14">
            You may also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 sm:gap-x-8 gap-y-12">
            {suggestions.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
