import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice, truncate } from "@/lib/seo";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="bg-white border border-neutral-200 shadow-none hover:shadow-md transition-shadow p-4 flex flex-col">
      <Link href={`/product/${product.id}`} className="block relative w-full aspect-square mb-4 overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="flex-1 flex flex-col">
        <Link href={`/product/${product.id}`} className="group">
          <h3 className="text-lg font-sans font-normal text-neutral-900 group-hover:text-black line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-neutral-500 mt-1 line-clamp-2">{truncate(product.description, 80)}</p>
        <div className="flex items-center mt-2 gap-2">
          <span className="text-lg font-bold text-black">{formatPrice(product.price)}</span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-red-500 line-through">
              {formatPrice(product.price / (1 - product.discountPercentage / 100))}
            </span>
          )}
        </div>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">★</span>
          <span className="ml-1 text-sm text-neutral-600">{product.rating.toFixed(1)}</span>
        </div>
        <div className="mt-auto pt-4 flex gap-2">
          <AddToCartButton productId={product.id} className="flex-1" />
          <Link
            href={`/product/${product.id}`}
            className="flex-1 text-center bg-neutral-100 hover:bg-neutral-200 text-neutral-800 py-2 px-4 text-sm font-medium transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}