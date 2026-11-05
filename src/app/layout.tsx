import type { Metadata } from "next";
import { Anton, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pages, shareImage, sharedOpenGraph } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

/* Gövde metni. `latin-ext` Türkçe'ye özgü harfleri (ş, ğ, ı, İ) kapsar; yalnızca
   `latin` önyüklenirse bu harfler ayrı bir dosyadan geç gelir. */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

/* Hero ve bölüm başlıklarındaki dev, bloklu yazılar için display fontu. */
const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: pages.home.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: { ...sharedOpenGraph, title: pages.home.title },
  twitter: { card: "summary_large_image", images: [shareImage] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
