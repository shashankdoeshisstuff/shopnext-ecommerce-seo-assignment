import Link from "next/link";
import { getCategories } from "@/lib/api";
import MobileMenu from "./MobileMenu";
import SearchForm from "./SearchForm";

export default async function Header() {
  const categories = await getCategories();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-semibold text-black ">
            ShopNext
          </Link>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              <Link href="/" className="text-gray-500 hover:text-black font-normal">
                Home
              </Link>
              <Link href="/store" className="text-gray-500 hover:text-black font-normal">
                Store
              </Link>
              <div className="relative group">
                <button className="text-gray-500 hover:text-black font-normal flex items-center gap-1">
                  Categories
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    {categories.slice(0, 8).map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="block px-4 py-2 text-sm text-gray-500 hover:text-black"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
            <div className="hidden md:block w-64">
              <SearchForm />
            </div>
          </div>
          <MobileMenu categories={categories} />
        </div>
      </div>
      <div className="md:hidden px-4 pb-3">
        <SearchForm />
      </div>
    </header>
  );
}