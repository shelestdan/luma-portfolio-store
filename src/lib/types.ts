export type FilmSectionGroup =
  | "hero"
  | "in-theaters"
  | "coming-soon"
  | "watch-now"
  | "award-winners";

export type ProductCategory =
  | "Apparel"
  | "Posters"
  | "Collectibles"
  | "Books";

export interface Film {
  id: string;
  slug: string;
  title: string;
  year: string;
  statusLabel: string;
  accentColor: string;
  heroImage: string;
  posterImage: string;
  synopsis: string;
  trailerUrl: string;
  sectionGroup: FilmSectionGroup;
  sortOrder: number;
}

export interface Product {
  id: string;
  filmId: string;
  slug: string;
  title: string;
  category: ProductCategory;
  price: number;
  statusLabel: string;
  primaryImage: string;
  secondaryImage: string;
  description: string;
  featured: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface StoreSearchIndex {
  films: Film[];
  products: Product[];
}
