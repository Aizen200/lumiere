import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "../../products";
import CollectionView from "./CollectionView";

// Only the vault's own categories have pages; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[category]">): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  return {
    title: `${category.label} | Fraser & Hawes`,
    description: `${category.blurb} Solid 925 sterling silver from the Vault Release.`,
  };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[category]">) {
  const category = getCategory((await params).category);
  if (!category) notFound();
  return <CollectionView id={category.id} />;
}
