import { NextResponse } from "next/server";

import { getProductBySlug } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const product = getProductBySlug(slug);

  if (!product) {
    return NextResponse.json(
      { error: { message: "Product not found." } },
      { status: 404 },
    );
  }

  return NextResponse.json(product);
}
