"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category } from "@/types";

export default function MobileMenu({ categories }: { categories: Category[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg z-40">
          <nav className="px-4 py-4 flex flex-col gap-4">
            <Link href="/" className="text-gray-500 hover:text-black" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/store" className="text-gray-500 hover:text-black" onClick={() => setIsOpen(false)}>
              Store
            </Link>
            <div>
              <span className="font-semibold text-gray-800">Categories</span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="text-gray-600 hover:text-black text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}