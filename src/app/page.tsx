"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import StoryArchive from "./StoryArchive";
import { StoryAccordion, StoryHallmarks, StoryScroll } from "./StoryVariants";
import GiftingVideo from "./GiftingVideo";
import HeritageArchive from "./HeritageArchive";
import UrgencySection from "./UrgencySection";
import ProductCard from "./ProductCard";
import { categories, productsByCategory, type CategoryId } from "./products";

const craftPillars = [
  {
    title: "Hallmark Close-Up",
    subtitle: "British Assay Stamp",
    desc: "Independently struck assay hallmarks visible under magnification, documenting date, foundry mark, and town standard.",
    tag: "Verified Mark",
    image: "/images/silver_hallmark.jpg",
    alt: "British Assay Hallmark on Sterling Silver",
  },
  {
    title: "Sterling Standard",
    subtitle: "92.5% Pure Silver",
    desc: "Guaranteed solid sterling bullion throughout. Absolutely no electroplating, hollow flashing, or base-metal core.",
    tag: "925 Assay Pure",
    image: "/images/cat_accessories.jpg",
    alt: "925 Solid Sterling Standard",
  },
  {
    title: "Hand-Finishing",
    subtitle: "Master Artisan Chasing",
    desc: "Individually repoussé-hammered and hand-burnished by silversmiths with decades of lineage at traditional benches.",
    tag: "Artisan Finished",
    image: "/images/heritage_workshop.jpg",
    alt: "Artisan Hand Chasing and Finishing",
  },
  {
    title: "Certificate of Authenticity",
    subtitle: "Archival Registrar Folio",
    desc: "Each piece is accompanied by an embossed document of authenticity signed by our head registrar detailing catalogued provenance.",
    tag: "Serialized Registry",
    image: "/images/cat_decor.jpg",
    alt: "Certificate of Authenticity and Provenance",
  },
  {
    title: "The Presentation Box",
    subtitle: "Velvet & Cedar Casing",
    desc: "Delivered inside our signature velvet-lined heirloom presentation case with tarnish-inhibiting archival flannel wrap.",
    tag: "Heirloom Casing",
    image: "/images/cat_serveware.jpg",
    alt: "Heirloom Presentation Box and Casing",
  },
];

const giftingRows = [
  {
    title: "Weddings, anniversaries, corporate gifts, christenings.",
    body: "Any piece from the Vault can be wrapped for the occasion: our presentation box, a silk ribbon, a hand-pressed wax seal, and a note written out by our calligrapher.",
    links: [
      { label: "Request gift wrapping", href: "#faq" },
    ],
    image: "/images/campaign_frame_1.jpg",
    video:
      "https://asset.swarovski.com/videos/f_auto,q_auto,w_960,h_960,c_fill/swa-cms/videos/Nespresso_WW_AWR_TVC_Festive26_OL_Paid_Organic_30s_VID_1x1_26-27/Nespresso_WW_AWR_TVC_Festive26_OL_Paid_Organic_30s_VID_1x1_26-27_INTT-BIG.mp4",
    imagePosition: "object-center",
    alt: "Hands wearing sterling silver rings and bangles",
  },
  {
    title: "Silver that carries the moment.",
    body: "Every piece is hallmarked and recorded in our ledger before it leaves us, so the gift you give today comes with a history your family can trace.",
    links: [{ label: "Shop the collection", href: "#collections" }],
    image: "/images/campaign_frame_2.jpg",
    imagePosition: "object-[30%_center]",
    alt: "Woman wearing a sterling silver collar and ear cuff",
  },
];

const faqs = [
  {
    q: "Is it genuine sterling silver?",
    a: "Yes. Every piece is solid 925 sterling silver and carries its assay hallmark.",
  },
  {
    q: "Why is it discounted?",
    a: "We made these pieces years ago, when silver cost much less, and kept them in our vault. We're selling them at what they cost us then, not at today's silver price.",
  },
  {
    q: "Can I return it?",
    a: "Yes, within 30 days, as long as it's in its original condition and packaging. Every piece also carries our lifetime workshop warranty.",
  },
  {
    q: "How is it shipped?",
    a: "Fully insured, and someone needs to sign for it on delivery.",
  },
  {
    q: "Can I have it gift-wrapped?",
    a: "Yes. At checkout you can add our gift wrapping with a wax seal and a handwritten note.",
  },
  {
    q: "Will there be more pieces?",
    a: "No. The Vault Release is only what we have in storage. Once a piece is sold, it won't be restocked at this price.",
  },
];

export default function LandingPage() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const collectionScrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleRatio, setVisibleRatio] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const displayedProducts = productsByCategory[activeCategory];

  const updateScrollState = () => {
    const el = collectionScrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setVisibleRatio(el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1);
    setScrollProgress(maxScroll > 0 ? Math.max(0, Math.min(1, el.scrollLeft / maxScroll)) : 0);
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < maxScroll - 5);
  };

  const scrollCollection = (direction: "left" | "right") => {
    const el = collectionScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: (direction === "left" ? -1 : 1) * el.clientWidth * 0.8, behavior: "smooth" });
  };

  // Mouse drag-to-slide; touch devices already swipe the row natively
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0, lastX: 0, lastT: 0, velocity: 0 });
  const snapTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const onDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = collectionScrollRef.current;
    if (!el || e.pointerType !== "mouse" || e.button !== 0) return;
    clearTimeout(snapTimer.current);
    drag.current = { active: true, moved: false, startX: e.clientX, startScroll: el.scrollLeft, lastX: e.clientX, lastT: e.timeStamp, velocity: 0 };
  };

  const onDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = collectionScrollRef.current;
    const d = drag.current;
    if (!el || !d.active) return;
    const dx = e.clientX - d.startX;
    // Only take over once it's clearly a drag, so plain clicks on links still work
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      el.setPointerCapture(e.pointerId);
      el.style.scrollSnapType = "none";
      el.style.cursor = "grabbing";
    }
    if (!d.moved) return;
    el.scrollLeft = d.startScroll - dx;
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.velocity = (e.clientX - d.lastX) / dt;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
  };

  const onDragEnd = () => {
    const el = collectionScrollRef.current;
    const d = drag.current;
    if (!el || !d.active) return;
    d.active = false;
    if (!d.moved) return;
    el.style.cursor = "";

    // Project the flick forward, then settle on the nearest card
    const cards = el.children as HTMLCollectionOf<HTMLElement>;
    const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : el.clientWidth;
    const projected = el.scrollLeft - d.velocity * 250;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = Math.max(0, Math.min(maxScroll, Math.round(projected / step) * step));
    el.scrollTo({ left: target, behavior: "smooth" });
    snapTimer.current = setTimeout(() => (el.style.scrollSnapType = ""), 600);
  };

  const selectCategory = (id: CategoryId) => {
    setActiveCategory(id);
    collectionScrollRef.current?.scrollTo({ left: 0, behavior: "instant" });
  };

  // Re-measure after the product list changes and on resize
  useEffect(() => {
    const frame = requestAnimationFrame(updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-sand-base text-ink">

      {/* Announcement bar */}
      {showAnnouncement && (
        <aside
          aria-label="Announcement"
          className="fixed top-0 inset-x-0 h-9 z-50 bg-ink text-sand-base flex items-center justify-center px-12 text-xs tracking-[0.08em]"
        >
          <p className="truncate">
            The Vault Release: up to 50% off, until 31 October
          </p>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="absolute right-3 w-8 h-8 flex items-center justify-center text-ink-muted hover:text-sand-base transition-colors cursor-pointer"
            aria-label="Dismiss announcement"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </aside>
      )}

      {/* Navigation */}
      <header
        className={`fixed inset-x-0 z-40 bg-sand-base/90 backdrop-blur-md border-b border-sand-border transition-[top] duration-300 ${
          showAnnouncement ? "top-9" : "top-0"
        }`}
      >
        <div className="container-site flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="font-serif text-xl sm:text-2xl font-medium tracking-[0.16em] uppercase text-ink">
            Fraser &amp; Hawes
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-ink-secondary">
            <a href="#collections" className="hover:text-ink transition-colors">The Vault</a>
            <a href="#story" className="hover:text-ink transition-colors">Our story</a>
            <a href="#craft" className="hover:text-ink transition-colors">Craft</a>
            <a href="#gifting" className="hover:text-ink transition-colors">Gifting</a>
            <a href="#faq" className="hover:text-ink transition-colors">FAQ</a>
          </nav>

          <a href="#collections" className="md:hidden text-sm text-ink underline underline-offset-4">
            Shop
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white pt-[6.25rem] lg:pt-[7.25rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">

          <div className="order-2 lg:order-1 flex flex-col justify-center px-5 sm:px-8 lg:pr-16 lg:pl-[max(3rem,calc((100vw-1320px)/2+3rem))] py-14 lg:py-20">
            <h1 className="font-serif text-5xl sm:text-6xl xl:text-[4.5rem] leading-[1.02] text-ink mb-6">
              Silver made at yesterday&apos;s price. Yours today.
            </h1>
            <p className="text-base sm:text-[17px] leading-[1.7] text-ink-secondary max-w-md mb-10">
              We made these pieces years ago, before silver&apos;s price rise. Now we&apos;re passing that on, with up to 50% off.
            </p>
            <div className="flex items-center gap-8">
              <a href="#collections" className="link-line">Shop the collection</a>
              <a href="#story" className="text-[15px] text-ink-muted hover:text-ink transition-colors">
                How it works
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative aspect-[4/3] lg:aspect-auto lg:min-h-[min(calc(100svh-7.25rem),52rem)] bg-sand-surface">
            <GiftingVideo
              src="https://media.tiffany.com/is/content/tco/2024_ICONS_BC_BG_VIDEO3_Desktop_SFCC-1"
              label="Silver pieces from the collection"
            />
          </div>

        </div>
      </section>

      {/* How these pieces came to be here */}
      <StoryArchive />
      <StoryScroll />
      <StoryHallmarks />
      <StoryAccordion />

      {/* The Vault Collection */}
      <section id="collections" className="section-y bg-white">
        <div className="container-site">

          <h2 className="font-serif text-4xl sm:text-5xl leading-[1.05] text-ink mb-10 lg:mb-14">The Vault Collection</h2>

          {/* Category tabs: one equal-width bar, the selected tab filled in ink */}
          <div role="tablist" aria-label="Collection categories" className="flex gap-0.5 overflow-x-auto hide-scrollbar mb-8 lg:mb-12">
            {categories.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectCategory(tab.id)}
                  className={`flex-1 min-w-[8.5rem] h-12 px-4 text-xs uppercase tracking-[0.16em] whitespace-nowrap transition-colors cursor-pointer ${
                    isActive ? "bg-ink text-sand-base" : "bg-sand-surface text-ink-secondary hover:bg-sand-border hover:text-ink"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Product scroller */}
          <div
            ref={collectionScrollRef}
            onScroll={updateScrollState}
            onPointerDown={onDragStart}
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
            onPointerCancel={onDragEnd}
            onDragStart={(e) => e.preventDefault()}
            onClickCapture={(e) => {
              // Swallow the click that ends a drag so it doesn't open a product
              if (drag.current.moved) {
                e.preventDefault();
                e.stopPropagation();
                drag.current.moved = false;
              }
            }}
            className="flex gap-5 sm:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar cursor-grab select-none"
          >
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="snap-start shrink-0 w-[72vw] sm:w-[300px] lg:w-[calc((100%-6rem)/3.4)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Scroller controls; the bar is sized to the visible share of the row */}
          <div className="flex items-center gap-6 mt-10">
            <div
              className="flex-1 h-px bg-sand-border relative cursor-pointer"
              onClick={(e) => {
                const el = collectionScrollRef.current;
                if (!el) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                el.scrollTo({ left: ratio * (el.scrollWidth - el.clientWidth), behavior: "smooth" });
              }}
            >
              <div
                className="absolute -top-px left-0 h-[3px] bg-ink transition-[width,transform] duration-150 ease-out"
                style={{
                  width: `${visibleRatio * 100}%`,
                  transform: `translateX(${(scrollProgress * (1 - visibleRatio) / visibleRatio) * 100}%)`,
                }}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => scrollCollection("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:border-ink transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default disabled:hover:border-ink/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => scrollCollection("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:border-ink transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default disabled:hover:border-ink/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Heritage */}
      <div id="heritage">
        <HeritageArchive />
      </div>

      {/* Craft and authenticity */}
      <section id="craft" className="section-y bg-white">
        <div className="container-site">

          <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
            <h2 className="font-serif text-4xl sm:text-5xl leading-[1.05] text-ink mb-5">
              Craft and Authenticity
            </h2>
            <p className="text-base leading-[1.7] text-ink-secondary">
              Every piece in the Vault Release adheres to our highest standards of master silversmithing. A big discount reflects historical silver valuation, never lower craftsmanship.
            </p>
          </div>

          {/* Five pillars, each revealing its photograph on hover */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {craftPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group relative p-6 lg:p-7 border border-sand-border bg-sand-base flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-ink hover:-translate-y-1.5 hover:shadow-xl min-h-[340px] cursor-pointer"
              >
                {/* Photograph shown on hover */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <Image
                    src={pillar.image}
                    alt={pillar.alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="relative z-10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                  <h3 className="font-serif text-2xl leading-tight text-ink mb-2">
                    {pillar.title}
                  </h3>
                  <p className="font-serif italic text-base text-ink-muted mb-4">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-secondary">
                    {pillar.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-8 pt-4 border-t border-sand-border text-[11px] uppercase tracking-[0.16em] text-ink transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                  {pillar.tag}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Gifting: alternating image and text rows */}
      <section id="gifting" className="bg-white border-t border-sand-border">
        {giftingRows.map((row, i) => {
          const imageFirst = i % 2 === 1;
          return (
            <div key={row.title} className="grid grid-cols-1 lg:grid-cols-2">

              <div
                className={`flex flex-col justify-center px-5 sm:px-8 lg:px-[8vw] py-14 sm:py-20 lg:py-24 order-2 ${
                  imageFirst ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="max-w-[500px]">
                  <h2 className="font-serif text-4xl sm:text-[2.75rem] leading-[1.08] text-ink mb-6">
                    {row.title}
                  </h2>
                  <p className="text-base leading-[1.7] text-ink-secondary mb-10">
                    {row.body}
                  </p>
                  <div className="flex flex-col items-start gap-3">
                    {row.links.map((link) => (
                      <a key={link.label} href={link.href} className="link-line">
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`relative aspect-square order-1 bg-sand-surface ${
                  imageFirst ? "lg:order-1" : "lg:order-2"
                }`}
              >
                {row.video ? (
                  <GiftingVideo src={row.video} poster={row.image} label={row.alt} />
                ) : (
                  <Image
                    src={row.image}
                    alt={row.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className={`object-cover ${row.imagePosition}`}
                  />
                )}
              </div>

            </div>
          );
        })}
      </section>

      {/* Urgency: words light up on scroll, then the page turns dark */}
      <UrgencySection />

      {/* FAQ */}
      <section id="faq" className="section-y bg-white">
        <div className="container-site grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          <div className="lg:col-span-4 lg:sticky lg:top-36 lg:self-start">
            <h2 className="font-serif text-4xl sm:text-5xl leading-[1.05] text-ink mb-6">
              FAQ
            </h2>
            <p className="text-base leading-[1.7] text-ink-secondary max-w-xs">
              Something we haven&apos;t covered? Write to us and a member of the workshop will reply.
            </p>
            <a href="#" className="link-line inline-block mt-6">Contact us</a>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 border-t border-ink/15">
            {faqs.map((item) => (
              <details key={item.q} className="group border-b border-ink/15">
                <summary className="list-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-6 py-6 cursor-pointer select-none">
                  <h3 className="font-serif text-2xl leading-snug text-ink">{item.q}</h3>
                  <span className="relative w-4 h-4 shrink-0 text-ink" aria-hidden>
                    <span className="absolute top-1/2 left-0 w-4 h-px bg-current" />
                    <span className="absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="pb-7 pr-10 text-base leading-[1.7] text-ink-secondary max-w-2xl">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-sand-base">
        <div className="container-site pt-[3.2rem] sm:pt-16 lg:pt-[4.8rem] pb-10">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-14 sm:pb-16 lg:pb-20 border-b border-white/10">
            <h2 className="font-serif text-4xl sm:text-5xl leading-[1.05] max-w-xl">
              The vault won&apos;t stay open for long.
            </h2>
            <a
              href="#collections"
              className="self-start lg:self-auto inline-block bg-sand-base text-ink px-8 py-4 text-sm tracking-[0.04em] hover:bg-sand-border transition-colors"
            >
              Shop the collection
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 py-12 lg:py-14">
            <div className="col-span-2 sm:col-span-1">
              <p className="font-serif text-xl font-medium tracking-[0.16em] uppercase mb-3">Fraser &amp; Hawes</p>
              <p className="text-sm leading-relaxed text-white/50 max-w-[16rem]">
                Silversmiths since 1869.
              </p>
            </div>
            {[
              { heading: "Shop", links: [["The Vault", "#collections"], ["Gifting", "#gifting"], ["Private commissions", "#"]] },
              { heading: "About", links: [["Our story", "#story"], ["Craft", "#craft"], ["Hallmark registry", "#"]] },
              { heading: "Help", links: [["FAQ", "#faq"], ["Shipping & returns", "#faq"], ["Contact us", "#"]] },
            ].map((col) => (
              <div key={col.heading}>
                <p className="text-xs uppercase tracking-[0.14em] text-white/40 mb-4">{col.heading}</p>
                <ul className="space-y-2.5">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} className="text-sm text-white/75 hover:text-white transition-colors">{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Fraser &amp; Hawes Silversmiths
          </p>
        </div>
      </footer>

    </main>
  );
}
