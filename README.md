# ShopNext – Premium eCommerce Store

A production‑ready, SEO‑first eCommerce store built with **Next.js**.  
Uses the [DummyJSON](https://dummyjson.com) API for products and categories.

See the live project: (https://shopnext-ecommerce-seo-assignment.vercel.app)

## Quick Start

```bash
npm install
npm run dev

---

```markdown
# SEO Implementation

This project follows enterprise eCommerce SEO best practices.

## 1. Dynamic Metadata
Every page exports `generateMetadata()` with:
- Unique title & description
- Open Graph & Twitter Card tags
- Canonical URL
- Keywords
- `robots` directives (e.g., `noindex` on empty search)

## 2. Structured Data (JSON‑LD)
All schemas are injected server‑side via `<JsonLd />`:
- **Organization** – brand panel
- **WebSite** – search action
- **Product** – price, availability, reviews
- **BreadcrumbList** – breadcrumbs in SERPs
- **CollectionPage** – category pages
- **ItemList** – featured/related products & search results

## 3. Sitemap & Robots
- `/sitemap.ts` – dynamically lists all product & category URLs
- `/robots.ts` – allows Google/Bing, disallows API paths, points to sitemap

## 4. Rendering Strategy
- **Static Generation (SSG)** – pre‑built product/category pages via `generateStaticParams`
- **Incremental Static Regeneration (ISR)** – `revalidate = 3600` keeps content fresh
- **Server Components** – minimal client‑side JavaScript

## 5. URL Structure
- `/` – Home
- `/store` – All products (filterable)
- `/category/[slug]` – Category page
- `/product/[id]` – Product detail
- `/search?q=iphone` – Search results

URLs are clean, keyword‑rich, and canonical.

## 6. On‑Page Optimisation
- Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, etc.)
- Single `<h1>` per page, logical heading hierarchy
- Breadcrumbs with schema on product/category/search pages
- Internal linking: related products, category cards, footer links
- Alt text on all product images

## 7. Performance & Accessibility
- `next/image` with `remotePatterns`, `priority`, and proper sizes
- `next/font` with `display: swap` (Noto Sans + Noto Serif)