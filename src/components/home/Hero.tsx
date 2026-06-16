import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-normal leading-tight font-serif">
            Discover Premium Products for Your Lifestyle
          </h1>
          <p className="mt-4 text-lg text-neutral-300">
            Shop the latest trends in electronics, fashion, and more. Free shipping on orders over $50.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/store"
              className="bg-white text-black px-6 py-3 font-semibold hover:bg-neutral-200 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/#categories"
              className="border border-white text-white px-6 py-3 font-semibold hover:bg-white hover:text-black transition-colors"
            >
              Browse Categories
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 relative h-64 lg:h-96 w-full">
          <img
            src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
            alt="Featured product"
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}