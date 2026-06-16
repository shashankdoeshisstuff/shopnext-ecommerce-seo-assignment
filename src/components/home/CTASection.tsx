import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 bg-transparent border-t border-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl md:text-3xl font-serif font-medium text-neutral-900 mb-4">
          Join Our Newsletter
        </h2>
        <p className="text-md text-neutral-500 max-w-2xl mx-auto mb-8 leading-relaxed">
          Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-900 text-neutral-900 placeholder-neutral-400"
          />
          <button
            type="submit"
            className="bg-neutral-900 hover:bg-black text-white px-6 py-3 font-medium transition-colors"
          >
            Subscribe
          </button>
        </form>
        <div className="mt-6">
          <Link
            href="/store"
            className="inline-block bg-neutral-900 hover:bg-black text-white px-8 py-3 font-medium transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}