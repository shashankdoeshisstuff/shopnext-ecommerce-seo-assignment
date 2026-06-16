import type { Metadata } from "next";

export const SITE_NAME = "ShopNext";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export function getBaseUrl(): string {
  return SITE_URL;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

// Helper to generate consistent metadata
export function constructMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${getBaseUrl()}${path}`;
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords: ["ecommerce", "online shopping", "products", title],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: image ? [{ url: image, width: 1200, height: 630 }] : [],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: image ? [image] : [],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}