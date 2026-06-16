import { getCategories, getProducts } from "@/lib/api";
import { constructMetadata } from "@/lib/seo";
import { itemListSchema, websiteSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export const revalidate = 3600; // ISR

export const metadata = constructMetadata({
  title: "Home",
  description:
    "Discover the latest premium products at unbeatable prices. Shop electronics, fashion, home goods, and more.",
  path: "/",
});

export default async function HomePage() {
  const [categories, featuredRes] = await Promise.all([
    getCategories(),
    getProducts({ limit: 8, select: "id,title,price,discountPercentage,rating,thumbnail,description,category" }),
  ]);

  return (
    <>
      <JsonLd data={itemListSchema(featuredRes.products, "Featured Products")} />
      <Hero />
      <Categories categories={categories} />
      <FeaturedProducts products={featuredRes.products} />
      <Testimonials />
      <CTASection />
    </>
  );
}