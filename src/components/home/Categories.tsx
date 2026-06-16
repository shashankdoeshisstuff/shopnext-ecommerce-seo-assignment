"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import type { Category } from "@/types";

export default function Categories({ categories }: { categories: Category[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("a")?.offsetWidth ?? 160;
    const gap = 16; // gap-4
    const scrollAmount = (cardWidth + gap) * 2; // two cards per click
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="categories" className="py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-medium text-neutral-900 text-start mb-8">
          Shop by Category
        </h2>

        <div className="relative group/scroll">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-neutral-200 rounded-full shadow-lg p-3 hover:bg-neutral-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 opacity-90 hover:opacity-100"
              aria-label="Scroll categories left"
            >
              <svg
                className="w-5 h-5 text-neutral-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Scrollable row – all links are server-rendered */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          >
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="snap-start flex-shrink-0 w-36 sm:w-44 bg-white rounded-none border border-neutral-200 shadow-none hover:shadow-sm transition-shadow p-4 flex flex-col items-center text-center group/card"
              >
                <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mb-3 group-hover/card:bg-neutral-200 transition-colors">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-medium text-neutral-800 text-sm group-hover/card:text-neutral-600 transition-colors line-clamp-2">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full border border-neutral-200 shadow-lg p-3 hover:bg-neutral-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 opacity-90 hover:opacity-100"
              aria-label="Scroll categories right"
            >
              <svg
                className="w-5 h-5 text-neutral-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}