import type { Metadata } from "next";
import { searchProducts } from "@/lib/api";
import { constructMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import ProductGrid from "@/components/ui/ProductGrid";
import Pagination from "@/components/ui/Pagination";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BackButton from "@/components/ui/BackButton";

interface Props {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q || "";
  return constructMetadata({
    title: query ? `Search results for "${query}"` : "Search Products",
    description: query
      ? `Find the best deals on ${query}. Browse our collection of premium products matching "${query}".`
      : "Search our catalog of premium products.",
    path: `/search${query ? `?q=${encodeURIComponent(query)}` : ""}`,
    noIndex: !query, // Don't index empty search
  });
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, page } = await searchParams;
  const query = q?.trim() || "";
  const currentPage = Number(page) || 1;
  const limit = 12;

  if (!query) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Search Products</h1>
        <form className="max-w-md mx-auto" action="/search">
          <input
            type="search"
            name="q"
            placeholder="What are you looking for?"
            className="w-full border rounded-lg px-4 py-2"
          />
          <button type="submit" className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg">Search</button>
        </form>
      </div>
    );
  }

  const skip = (currentPage - 1) * limit;
  const res = await searchProducts(query, { limit, skip });
  const products = res.products;
  const total = res.total;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search", href: "/search" }]} />
      <BackButton /> 
      <h1 className="text-3xl font-bold mb-2">Search Results for "{query}"</h1>
      <p className="text-gray-600 mb-8">{total} product(s) found</p>
      <ProductGrid products={products} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/search"
        searchParams={new URLSearchParams({ q: query })}
      />
      {products.length > 0 && <JsonLd data={itemListSchema(products, `Search: ${query}`)} />}
    </div>
  );
}