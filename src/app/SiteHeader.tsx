import Link from "next/link";
import CategoryMenu from "./CategoryMenu";
import { collectionHref } from "./products";

// Header for the inner pages (product and collection); the home page has its own
// with the announcement bar
export default function SiteHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-sand-base/90 backdrop-blur-md border-b border-sand-border">
      <div className="container-site flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="font-serif text-xl sm:text-2xl font-medium tracking-[0.16em] uppercase text-ink">
          Fraser &amp; Hawes
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-ink-secondary">
          <CategoryMenu />
          <Link href="/#story" className="hover:text-ink transition-colors">Our story</Link>
          <Link href="/#craft" className="hover:text-ink transition-colors">Craft</Link>
          <Link href="/#gifting" className="hover:text-ink transition-colors">Gifting</Link>
          <Link href="/#faq" className="hover:text-ink transition-colors">FAQ</Link>
        </nav>
        <Link href={collectionHref("all")} className="md:hidden text-sm text-ink underline underline-offset-4">
          Shop
        </Link>
      </div>
    </header>
  );
}
