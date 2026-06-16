import type { Product, ProductsResponse, Category } from "@/types";

const BASE_URL = "https://dummyjson.com";

// ---------- Generic fetcher ----------
async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// ---------- Products ----------
export async function getProducts(params?: {
  limit?: number;
  skip?: number;
  select?: string;
}): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.skip) searchParams.set("skip", String(params.skip));
  if (params?.select) searchParams.set("select", params.select);

  const query = searchParams.toString();
  return fetchApi<ProductsResponse>(`/products${query ? `?${query}` : ""}`);
}

export async function getProduct(id: number): Promise<Product> {
  return fetchApi<Product>(`/products/${id}`);
}

export async function searchProducts(
  query: string,
  params?: { limit?: number; skip?: number }
): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams({ q: query });
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.skip) searchParams.set("skip", String(params.skip));

  return fetchApi<ProductsResponse>(`/products/search?${searchParams.toString()}`);
}

// ---------- Categories ----------
export async function getCategories(): Promise<Category[]> {
  return fetchApi<Category[]>("/products/categories");
}

export async function getProductsByCategory(
  slug: string,
  params?: { limit?: number; skip?: number }
): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.skip) searchParams.set("skip", String(params.skip));

  return fetchApi<ProductsResponse>(
    `/products/category/${slug}${searchParams.toString() ? `?${searchParams}` : ""}`
  );
}

// ---------- All product IDs (for generateStaticParams) ----------
export async function getAllProductIds(): Promise<number[]> {
  // Fetch all products with minimal fields to get IDs
  const res = await fetchApi<ProductsResponse>("/products?limit=0&select=id");
  return res.products.map((p) => p.id);
}