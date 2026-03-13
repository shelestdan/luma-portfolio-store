import { NextResponse } from "next/server";

import { brand } from "@/lib/brand";
import { createProduct, getProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getProducts());
}

export async function POST(request: Request) {
  const secret = request.headers.get("x-studio-secret");
  const expectedSecret = process.env.STUDIO_SECRET ?? brand.studioSecretFallback;

  if (!secret || secret !== expectedSecret) {
    return NextResponse.json(
      { error: { message: "Invalid studio secret." } },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const product = createProduct(body);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create product.";

    return NextResponse.json({ error: { message } }, { status: 400 });
  }
}
