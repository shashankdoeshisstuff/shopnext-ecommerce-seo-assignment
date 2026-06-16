import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["Googlebot", "Bingbot"],
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}