import { NextResponse } from "next/server";

import { slugToLabel } from "@/lib/format";
import { buildProductPlaceholderSvg } from "@/lib/product-placeholder";
import { getFilms, getProductBySlug } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode") === "back" ? "back" : "front";
  const product = getProductBySlug(slug);
  const fallbackTitle = slugToLabel(slug);
  const films = getFilms();
  const film = product
    ? films.find((entry) => entry.id === product.filmId)
    : null;

  const svg = buildProductPlaceholderSvg({
    slug,
    mode,
    title: product?.title ?? fallbackTitle,
    category: product?.category ?? "Apparel",
    collection: film?.title ?? "Portfolio Drop",
    accent: film?.accentColor,
  });

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
