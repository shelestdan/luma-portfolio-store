import crypto from "node:crypto";

import { z } from "zod";

import { getDb } from "@/lib/db";
import { createProductPlaceholderImage } from "@/lib/product-placeholder";
import { hasLiveApi } from "@/lib/runtime";
import { filmSeeds, productSeeds } from "@/lib/seed";
import type { Film, Product, ProductCategory } from "@/lib/types";

const productInputSchema = z.object({
  title: z.string().min(3).max(120),
  slug: z.string().min(3).max(120),
  filmId: z.string().min(3),
  category: z.enum(["Apparel", "Posters", "Collectibles", "Books"]),
  price: z.coerce.number().positive().max(9999),
  statusLabel: z.string().min(2).max(40),
  primaryImage: z.string().optional().default(""),
  secondaryImage: z.string().optional().default(""),
  description: z.string().min(10).max(400),
  featured: z.coerce.boolean().optional().default(false),
});

type ProductInput = z.input<typeof productInputSchema>;

function mapFilm(row: Record<string, unknown>): Film {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    year: String(row.year),
    statusLabel: String(row.statusLabel),
    accentColor: String(row.accentColor),
    heroImage: String(row.heroImage),
    posterImage: String(row.posterImage),
    synopsis: String(row.synopsis),
    trailerUrl: String(row.trailerUrl),
    sectionGroup: row.sectionGroup as Film["sectionGroup"],
    sortOrder: Number(row.sortOrder),
  };
}

function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    filmId: String(row.filmId),
    slug: String(row.slug),
    title: String(row.title),
    category: row.category as ProductCategory,
    price: Number(row.price),
    statusLabel: String(row.statusLabel),
    primaryImage: String(row.primaryImage),
    secondaryImage: String(row.secondaryImage),
    description: String(row.description),
    featured: Boolean(row.featured),
    createdAt: String(row.createdAt),
  };
}

function getSeedFilms() {
  return [...filmSeeds].sort(
    (left, right) => left.sortOrder - right.sortOrder || left.title.localeCompare(right.title),
  );
}

function getSeedProducts() {
  return [...productSeeds].sort(
    (left, right) =>
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime() ||
      left.title.localeCompare(right.title),
  );
}

function defaultProductImage(
  slug: string,
  mode: "front" | "back",
  category: ProductCategory,
) {
  return createProductPlaceholderImage({
    slug,
    mode,
    category,
  });
}

export function getFilms() {
  if (!hasLiveApi) {
    return getSeedFilms();
  }

  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM films ORDER BY sortOrder ASC, title ASC")
    .all() as Record<string, unknown>[];

  return rows.map(mapFilm);
}

export function getFilmBySlug(slug: string) {
  if (!hasLiveApi) {
    return getSeedFilms().find((film) => film.slug === slug) ?? null;
  }

  const db = getDb();
  const row = db
    .prepare("SELECT * FROM films WHERE slug = ?")
    .get(slug) as Record<string, unknown> | undefined;

  return row ? mapFilm(row) : null;
}

export function getProducts() {
  if (!hasLiveApi) {
    return getSeedProducts();
  }

  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM products ORDER BY datetime(createdAt) DESC, title ASC")
    .all() as Record<string, unknown>[];

  return rows.map(mapProduct);
}

export function getProductBySlug(slug: string) {
  if (!hasLiveApi) {
    return getSeedProducts().find((product) => product.slug === slug) ?? null;
  }

  const db = getDb();
  const row = db
    .prepare("SELECT * FROM products WHERE slug = ?")
    .get(slug) as Record<string, unknown> | undefined;

  return row ? mapProduct(row) : null;
}

export function getProductsByFilmId(filmId: string) {
  if (!hasLiveApi) {
    return getSeedProducts().filter((product) => product.filmId === filmId);
  }

  const db = getDb();
  const rows = db
    .prepare(
      "SELECT * FROM products WHERE filmId = ? ORDER BY featured DESC, datetime(createdAt) DESC, title ASC",
    )
    .all(filmId) as Record<string, unknown>[];

  return rows.map(mapProduct);
}

export function getHomepageData() {
  const films = getFilms();
  const products = getProducts();

  const bySlug = new Map(films.map((film) => [film.slug, film]));
  const resolveFilms = (slugs: string[]) =>
    slugs.map((slug) => bySlug.get(slug)).filter(Boolean) as Film[];

  return {
    heroFilms: resolveFilms([
      "the-secret-agent",
      "sentimental-value",
      "anora",
      "sirat",
      "arco",
    ]),
    inTheaters: resolveFilms(["epic", "nirvanna-the-band-the-show-the-movie", "sirat"]),
    comingSoon: resolveFilms(["the-secret-agent", "sentimental-value", "anora"]),
    watchNow: resolveFilms(["arco", "anora", "sirat"]),
    awardWinners: resolveFilms(["anora", "sirat", "sentimental-value"]),
    featuredShelfFilm: bySlug.get("the-secret-agent") ?? films[0],
    featuredProducts: products.filter((product) => product.filmId === "film-secret-agent").slice(0, 4),
    products,
  };
}

export function createProduct(input: ProductInput) {
  if (!hasLiveApi) {
    throw new Error("Product creation is disabled in the GitHub Pages export.");
  }

  const payload = productInputSchema.parse(input);
  const db = getDb();

  const film = db
    .prepare("SELECT id FROM films WHERE id = ?")
    .get(payload.filmId) as { id: string } | undefined;

  if (!film) {
    throw new Error("Film not found.");
  }

  const existing = db
    .prepare("SELECT id FROM products WHERE slug = ?")
    .get(payload.slug) as { id: string } | undefined;

  if (existing) {
    throw new Error("Product slug already exists.");
  }

  const createdAt = new Date().toISOString();
  const record: Product = {
    id: `product-${crypto.randomUUID()}`,
    filmId: payload.filmId,
    slug: payload.slug,
    title: payload.title,
    category: payload.category,
    price: payload.price,
    statusLabel: payload.statusLabel,
    primaryImage:
      payload.primaryImage || defaultProductImage(payload.slug, "front", payload.category),
    secondaryImage:
      payload.secondaryImage || defaultProductImage(payload.slug, "back", payload.category),
    description: payload.description,
    featured: payload.featured,
    createdAt,
  };

  db.prepare(`
    INSERT INTO products (
      id,
      filmId,
      slug,
      title,
      category,
      price,
      statusLabel,
      primaryImage,
      secondaryImage,
      description,
      featured,
      createdAt
    ) VALUES (
      @id,
      @filmId,
      @slug,
      @title,
      @category,
      @price,
      @statusLabel,
      @primaryImage,
      @secondaryImage,
      @description,
      @featured,
      @createdAt
    )
  `).run({
    ...record,
    featured: record.featured ? 1 : 0,
  });

  return record;
}

export function getSearchIndex() {
  return {
    films: getFilms(),
    products: getProducts(),
  };
}
