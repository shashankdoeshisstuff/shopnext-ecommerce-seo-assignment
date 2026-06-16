import { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts, getCategories } from "@/lib/api";
import { constructMetadata } from "@/lib/seo";
import { itemListSchema, collectionPageSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import ProductGrid from "@/components/ui/ProductGrid";
import Pagination from "@/components/ui/Pagination";
import CategoryFilter from "@/components/ui/CategoryFilter";
import SortSelect from "@/components/ui/SortSelect";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BackButton from "@/components/ui/BackButton";

export const metadata: Metadata = constructMetadata({
  title: "All Products",
  description: "Browse our complete catalog of premium products. Filter by category, sort by price, and more.",
  path: "/store",
});

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function StorePage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 12;
  const category = params.category || "";
  const sort = params.sort || "";
  const searchQuery = params.search || "";

  // For simplicity, we fetch all products and apply filters/sorting manually.
  // DummyJSON doesn't support combined params natively, but this works for small datasets.
  let allProducts: Awaited<ReturnType<typeof getProducts>>["products"] = [];
  let total = 0;

  if (searchQuery) {
    // If search is provided, use search endpoint
    const skip = (page - 1) * limit;
    const res = await getProducts({ limit, skip }); // fallback to regular products if no search
    // Actually we need search: but dummyjson's search is separate; we'll simulate by fetching all and filtering.
    // Better: fetch from /products/search?q=... if query present
    // Let's implement correctly:
    if (searchQuery) {
      const searchRes = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}&limit=${limit}&skip=${(page-1)*limit}`).then(r => r.json());
      allProducts = searchRes.products;
      total = searchRes.total;
    }
  } else if (category) {
    // Fetch by category
    const skip = (page - 1) * limit;
    const res = await fetch(`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`).then(r => r.json());
    allProducts = res.products;
    total = res.total;
  } else {
    // Normal products
    const skip = (page - 1) * limit;
    const res = await getProducts({ limit, skip });
    allProducts = res.products;
    total = res.total;
  }

  // Apply sorting manually (server-side) after fetch, but only for current page; total count may be off.
  // For a real app you'd sort on server. DummyJSON doesn't support sort, so we sort the fetched page.
  if (sort && allProducts.length > 0) {
    switch (sort) {
      case "price-asc":
        allProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        allProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        allProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "title-asc":
        allProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        allProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
  }

  const totalPages = Math.ceil(total / limit);

  // Build breadcrumbs
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Store", href: "/store" },
  ];
  if (category) {
    const catObj = (await getCategories()).find(c => c.slug === category);
    breadcrumbItems.push({ label: catObj?.name || category, href: `/store?category=${category}` });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={breadcrumbItems} />
      <BackButton /> 
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {searchQuery ? `Search: "${searchQuery}"` : "All Products"}
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Suspense fallback={<div>Loading filters...</div>}>
          <CategoryFilter categories={await getCategories()} />
        </Suspense>
        <Suspense fallback={<div>Loading sort...</div>}>
          <SortSelect />
        </Suspense>
      </div>

      <ProductGrid products={allProducts} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/store"
        searchParams={new URLSearchParams(params as Record<string, string>)}
      />

      <JsonLd data={collectionPageSchema("All Products", total)} />
      {allProducts.length > 0 && <JsonLd data={itemListSchema(allProducts, "Product Catalog")} />}
    </div>
  );
}