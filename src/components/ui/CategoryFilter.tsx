"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/types";

export default function CategoryFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("category", e.target.value);
    } else {
      params.delete("category");
    }
    params.delete("page"); // reset page
    router.push(`/store?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="category-select" className="text-sm font-medium text-neutral-700 whitespace-nowrap">
        Category:
      </label>
      <select
        id="category-select"
        value={currentCategory}
        onChange={handleChange}
        className="border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-500"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}