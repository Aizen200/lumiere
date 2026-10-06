"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categories, collectionHref } from "./products";

// "Collections" item in the header: opens on hover or click and lists every
// category, underlining the one being viewed
export default function CategoryMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mouseClick = useRef(false);
  const pathname = usePathname();

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
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        // A mouse already opened it on hover, so only touch and keyboard toggle it here
        onPointerDown={(e) => (mouseClick.current = e.pointerType === "mouse")}
        onClick={() => {
          if (mouseClick.current) setOpen(true);
          else setOpen((o) => !o);
          mouseClick.current = false;
        }}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1.5 hover:text-ink transition-colors cursor-pointer ${
          pathname.startsWith("/collections") ? "text-ink" : ""
        }`}
      >
        Collections
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
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* pt bridges the gap so the panel doesn't close on the way down */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-5 transition-all duration-200 ${
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
        }`}
      >
        <ul className="min-w-56 bg-white border border-sand-border shadow-[0_20px_40px_rgba(20,19,18,0.08)] py-3">
          {categories.map((c) => {
            const href = collectionHref(c.id);
            const active = pathname === href;
            return (
              <li key={c.id}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-2.5 font-serif text-lg transition-colors ${
                    active ? "text-ink underline underline-offset-[6px] decoration-1" : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  {c.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
