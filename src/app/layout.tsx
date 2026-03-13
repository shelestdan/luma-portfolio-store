import type { Metadata } from "next";
import { League_Spartan, Manrope } from "next/font/google";

import { SiteFooter } from "@/components/chrome/SiteFooter";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { brand } from "@/lib/brand";
import { hasLiveApi } from "@/lib/runtime";
import { getSearchIndex } from "@/lib/store";
import "./globals.css";

const displayFont = League_Spartan({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const uiFont = Manrope({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: brand.siteTitle,
  description: brand.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchIndex = getSearchIndex();

  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${uiFont.variable}`}>
        <StoreProvider>
          <SiteHeader initialSearchIndex={searchIndex} liveSearch={hasLiveApi} />
          {children}
          <SiteFooter />
        </StoreProvider>
      </body>
    </html>
  );
}
