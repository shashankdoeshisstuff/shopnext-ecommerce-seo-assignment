import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getAllProductIds, getProducts } from "@/lib/api";
import { constructMetadata, formatPrice } from "@/lib/seo";
import { productSchema, breadcrumbSchema, itemListSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductGallery from "@/components/product/ProductGallery";
import Reviews from "@/components/product/Reviews";
import AddToCartButton from "@/components/ui/AddToCartButton";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/types";
import BackButton from "@/components/ui/BackButton";

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 3600; // ISR

export async function generateStaticParams() {
  const ids = await getAllProductIds();
  return ids.map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(Number(id));
  if (!product) return {};

  return constructMetadata({
    title: `${product.title} - Buy Online at Best Price`,
    description: product.description,
    path: `/product/${product.id}`,
    image: product.thumbnail,
  });
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(Number(id));
  if (!product) notFound();

  // Fetch related products (same category, exclude current)
  const relatedRes = await getProducts({
      limit: 4,
      skip: 0,
      select: "id,title,price,thumbnail,discountPercentage,rating,category,description",
  });
  // Filter related (dummy API doesn't allow filtering, so we take first 4 not equal)
  const related = relatedRes.products.filter((p) => p.id !== product.id).slice(0, 4);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Store", href: "/store" },
    { label: product.category, href: `/category/${product.category.toLowerCase().replace(/\s+/g, "-")}` },
    { label: product.title, href: `/product/${product.id}` },
  ];

  return (
    <>
      <JsonLd data={productSchema(product)} />
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={breadcrumbItems} />
        <BackButton /> 
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery images={product.images} title={product.title} />
          <div>
            <h1 className="text-3xl font-medium text-neutral-900">{product.title}</h1>
            <p className="text-lg text-neutral-500 mt-2">{product.brand}</p>
            <div className="flex items-center mt-4 gap-4">
              <span className="text-3xl font-bold text-neutral-900">{formatPrice(product.price)}</span>
              {product.discountPercentage > 0 && (
                <span className="text-lg text-red-500 line-through">
                  {formatPrice(product.price / (1 - product.discountPercentage / 100))}
                </span>
              )}
            </div>
            <div className="flex items-center mt-3">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="ml-1 text-neutral-600">{product.rating.toFixed(1)}</span>
              <span className="ml-2 text-neutral-400">({product.reviews.length} reviews)</span>
            </div>
            <div className="mt-4">
              <p className="text-neutral-700 leading-relaxed">{product.description}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="bg-neutral-100 px-3 py-1 rounded-full">Category: {product.category}</span>
              {product.tags.map((tag) => (
                <span key={tag} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <div className="mt-4">
              <span className={product.stock > 0 ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
              </span>
            </div>
            <div className="mt-6">
              <AddToCartButton productId={product.id} className="w-full sm:w-auto py-3 px-8 text-base" />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Reviews reviews={product.reviews} />
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-medium mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <JsonLd data={itemListSchema(related, "Related Products")} />
          </section>
        )}
      </div>
    </>
  );
}