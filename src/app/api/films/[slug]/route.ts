import { NextResponse } from "next/server";

import { getFilmBySlug } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const film = getFilmBySlug(slug);

  if (!film) {
    return NextResponse.json(
      { error: { message: "Film not found." } },
      { status: 404 },
    );
  }

  return NextResponse.json(film);
}
