"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { enquiryLink, formatPrice, productSlug, type Product } from "./products";

// Product card; the angle switcher only shows when a piece has several photographs
export default function ProductCard({ product }: { product: Product }) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  return (
    <article className="group h-full flex flex-col">
      <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-sand-surface">
        <Image
          src={product.images[activeImgIndex]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 300px, 72vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Angle switcher */}
        <div className={`absolute bottom-0 inset-x-0 justify-center gap-1 pb-3 ${product.images.length > 1 ? "flex" : "hidden"}`}>
          {product.images.map((_, imgIdx) => (
            <button
              key={imgIdx}
              onClick={() => setActiveImgIndex(imgIdx)}
              aria-label={`View angle ${imgIdx + 1}`}
              className="py-2 px-0.5 cursor-pointer"
            >
              <span
                className={`block h-[2px] transition-all duration-300 ${
                  activeImgIndex === imgIdx ? "w-5 bg-white" : "w-2.5 bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-4 mb-4">
        <h3 className="text-[15px] text-ink leading-snug">{product.name}</h3>
        <p className="relative shrink-0 text-[15px] whitespace-nowrap">
          <span className="sr-only">Was </span>
          <s className="text-ink-muted">{formatPrice(product.original)}</s>
          <span className="text-ink-muted mx-1.5" aria-hidden>/</span>
          <span className="sr-only">now </span>
          <span className="text-ink">{formatPrice(product.sale)}</span>
        </p>
      </div>
      <div className="flex gap-2 mt-auto">
        <Link
          href={`/products/${productSlug(product)}`}
          className="inline-flex items-center justify-center h-11 px-5 border border-ink bg-ink text-[13px] tracking-[0.02em] whitespace-nowrap text-sand-base hover:bg-transparent hover:text-ink transition-colors"
        >
          View product
        </Link>
        <a
          href={enquiryLink(product)}
          className="inline-flex items-center justify-center h-11 px-5 border border-ink/25 text-[13px] tracking-[0.02em] whitespace-nowrap text-ink hover:bg-ink hover:border-ink hover:text-sand-base transition-colors"
        >
          Enquire now
        </a>
      </div>
    </article>
  );
}
