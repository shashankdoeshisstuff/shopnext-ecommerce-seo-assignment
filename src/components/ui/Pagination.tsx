"use client";

import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: URLSearchParams;
}

export default function Pagination({ currentPage, totalPages, basePath, searchParams }: Props) {
  const buildHref = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", String(page));
    return `${basePath}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-12">
      {currentPage > 1 && (
        <Link href={buildHref(currentPage - 1)} className="px-3 py-2 border border-neutral-200 hover:bg-neutral-100">
          Previous
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          className={`px-3 py-2 border ${
            page === currentPage
              ? "bg-black text-white border-black"
              : "border-neutral-200 hover:bg-neutral-100"
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={buildHref(currentPage + 1)} className="px-3 py-2 border border-neutral-200 hover:bg-neutral-100">
          Next
        </Link>
      )}
    </nav>
  );
}