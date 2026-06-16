import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getProductsByCategory } from "@/lib/api";
import { constructMetadata } from "@/lib/seo";
import { breadcrumbSchema, collectionPageSchema, itemListSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductGrid from "@/components/ui/ProductGrid";
import Pagination from "@/components/ui/Pagination";
import SortSelect from "@/components/ui/SortSelect";
import BackButton from "@/components/ui/BackButton";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};

  return constructMetadata({
    title: `${category.name} - Shop Premium ${category.name} Online`,
    description: `Explore our wide range of ${category.name}. Great prices, fast shipping, and top quality.`,
    path: `/category/${slug}`,
  });
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page, sort } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 12;

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const skip = (currentPage - 1) * limit;
  const res = await getProductsByCategory(slug, { limit, skip });
  let products = res.products;
  const total = res.total;

  // Sort manually (dummyjson limitation)
  if (sort && products.length > 0) {
    switch (sort) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        products.sort((a, b) => b.rating - a.rating);
        break;
      case "title-asc":
        products.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        products.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
  }

  const totalPages = Math.ceil(total / limit);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Store", href: "/store" },
    { label: category.name, href: `/category/${slug}` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={breadcrumbItems} />
      <BackButton /> 
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
      <p className="text-gray-600 mb-8">
        Discover our premium selection of {category.name.toLowerCase()}. Quality products at unbeatable prices.
      </p>
      <div className="flex justify-end mb-8">
        <SortSelect />
      </div>
      <ProductGrid products={products} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/category/${slug}`}
        searchParams={new URLSearchParams(sort ? { sort } : {})}
      />
      <JsonLd data={collectionPageSchema(category.name, total)} />
      {products.length > 0 && <JsonLd data={itemListSchema(products, `${category.name} Products`)} />}
    </div>
  );
}