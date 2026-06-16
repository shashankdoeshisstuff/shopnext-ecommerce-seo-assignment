import type { Product } from "@/types";
import ProductGrid from "@/components/ui/ProductGrid";
import Link from "next/link";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl  text-start font-medium text-neutral-900">Featured Products</h2>
          <Link
            href="/store"
            className="text-neutral-600 hover:text-neutral-700 font-medium"
          >
            View All →
          </Link>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}