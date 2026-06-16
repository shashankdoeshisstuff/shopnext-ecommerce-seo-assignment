import type { Product, BreadcrumbItem } from "@/types";
import { getBaseUrl, SITE_NAME } from "./seo";

// ---------- Base Organization & Website ----------
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: getBaseUrl(),
    logo: `${getBaseUrl()}/logo.png`,
    sameAs: [
      "https://www.facebook.com/shopnext",
      "https://www.instagram.com/shopnext",
      "https://twitter.com/shopnext",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: getBaseUrl(),
    potentialAction: {
      "@type": "SearchAction",
      target: `${getBaseUrl()}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

// ---------- Product ----------
export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images,
    sku: `SKU-${product.id}`,
    brand: {
      "@type": "Brand",
      name: product.brand || "Unknown",
    },
    offers: {
      "@type": "Offer",
      url: `${getBaseUrl()}/product/${product.id}`,
      priceCurrency: "USD",
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews.length,
    },
    review: product.reviews.map((r) => ({
      "@type": "Review",
      author: r.reviewerName,
      datePublished: r.date,
      reviewBody: r.comment,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
      },
    })),
  };
}

// ---------- Breadcrumb ----------
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${getBaseUrl()}${item.href}`,
    })),
  };
}

// ---------- Collection Page (Category) ----------
export function collectionPageSchema(categoryName: string, productCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: categoryName,
    description: `Browse our collection of ${categoryName} products. Great deals and fast shipping.`,
    url: `${getBaseUrl()}/category/${categoryName.toLowerCase().replace(/\s+/g, "-")}`,
    numberOfItems: productCount,
  };
}

// ---------- ItemList (Search results, featured) ----------
export function itemListSchema(products: Product[], listName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${getBaseUrl()}/product/${product.id}`,
    })),
  };
}