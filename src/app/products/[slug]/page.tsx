import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProducts, getProduct, productSlug } from "../../products";
import ProductView from "./ProductView";

// Only the pieces in the vault have pages; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return allProducts.map((product) => ({ slug: productSlug(product) }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: `${product.name} | Fraser & Hawes`,
    description: `${product.name} (${product.pieceNo}), solid 925 sterling silver from the Vault Release.`,
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return <ProductView slug={productSlug(product)} />;
}
