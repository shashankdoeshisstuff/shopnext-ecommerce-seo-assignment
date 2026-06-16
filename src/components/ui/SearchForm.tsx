"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto" role="search">
      <label htmlFor="search-input" className="sr-only">
        Search products
      </label>
      <div className="flex">
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-black text-sm"
        />
        <button
          type="submit"
          className="bg-black hover:bg-neutral-800 text-white px-4 py-2 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}