import type { Metadata } from "next";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ShopNext - Your Premium eCommerce Store",
    template: "%s | ShopNext",
  },
  description:
    "Shop premium products with fast delivery. Best deals on electronics, fashion, and more.",
  keywords: ["ecommerce", "online shopping", "premium products"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="min-h-screen bg-white font-sans text-gray-900 antialiased">
        {/* Capsule Pattern Background */}
        <div className="fixed inset-0 -z-20 opacity-[0.08]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="capsule-pattern"
                width="70"
                height="140"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="8"
                  y="0"
                  width="18"
                  height="120"
                  rx="12"
                  fill="none"
                  stroke="#171717"
                  strokeWidth="1"
                />
                <rect
                  x="40"
                  y="20"
                  width="18"
                  height="120"
                  rx="12"
                  fill="none"
                  stroke="#171717"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#capsule-pattern)" />
          </svg>
        </div> 

        <div className="fixed inset-0 -z-20 opacity-[0.08]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="dot-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="10" cy="10" r="1.5" fill="#171717" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-pattern)" />
          </svg>
        </div>        

        {/* Multi-Directional Fade */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white to-transparent" />
          <div className="absolute top-0 left-0 h-full w-64 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute top-0 right-0 h-full w-64 bg-gradient-to-l from-white to-transparent" />
        </div>

        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}