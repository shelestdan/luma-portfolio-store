import type { Film, Product } from "@/lib/types";

const placeholderProduct = (slug: string, mode: "front" | "back") =>
  `/api/placeholder/product/${slug}?mode=${mode}`;

export const filmSeeds: Film[] = [
  {
    id: "film-anora",
    slug: "anora",
    title: "Anora",
    year: "2024",
    statusLabel: "Award Winner",
    accentColor: "#f6a0d1",
    heroImage:
      "https://www.datocms-assets.com/148598/1738602282-66bfa5a7c5bdcc3a8107ddef_mikey-20madison-20as-20anora.png",
    posterImage:
      "https://www.datocms-assets.com/148598/1755114132-673f9333008bc40c6af8dfb9_2073-one-sheet.jpg",
    synopsis:
      "A bright, chaotic, and sharply romantic awards-season breakout turned into a merch-heavy cult object. In this portfolio build it anchors the collectible and apparel side of the store.",
    trailerUrl: "/film/anora",
    sectionGroup: "award-winners",
    sortOrder: 1,
  },
  {
    id: "film-secret-agent",
    slug: "the-secret-agent",
    title: "The Secret Agent",
    year: "2025",
    statusLabel: "Coming Soon",
    accentColor: "#ffae03",
    heroImage:
      "https://www.datocms-assets.com/148598/1755801155-thesecretagent_still_01-1.jpeg",
    posterImage:
      "https://www.datocms-assets.com/148598/1755801155-thesecretagent_still_01-1.jpeg",
    synopsis:
      "A moody espionage release with warm amber art direction, used here as the lead visual language for the homepage hero and the featured merch shelf.",
    trailerUrl: "/film/the-secret-agent",
    sectionGroup: "coming-soon",
    sortOrder: 2,
  },
  {
    id: "film-sentimental-value",
    slug: "sentimental-value",
    title: "Sentimental Value",
    year: "2025",
    statusLabel: "Coming Soon",
    accentColor: "#cfb1dc",
    heroImage:
      "https://www.datocms-assets.com/148598/1750178490-sentimental-value-still-1-1.jpg",
    posterImage:
      "https://www.datocms-assets.com/148598/1750178490-sentimental-value-still-1-1.jpg",
    synopsis:
      "Lavender-tinted prestige cinema framed as an emotional event release, used here to balance the homepage hero carousel with a softer but still cinematic tone.",
    trailerUrl: "/film/sentimental-value",
    sectionGroup: "coming-soon",
    sortOrder: 3,
  },
  {
    id: "film-epic",
    slug: "epic",
    title: "EPiC: Elvis Presley in Concert",
    year: "2025",
    statusLabel: "In Theaters",
    accentColor: "#ffe7be",
    heroImage:
      "https://www.datocms-assets.com/148598/1767881080-epic_key-still_01.jpg",
    posterImage:
      "https://www.datocms-assets.com/148598/1767881080-epic_key-still_01.jpg",
    synopsis:
      "Large-format performance imagery and archival energy give this section the loudest theatrical presence on the landing page.",
    trailerUrl: "/film/epic",
    sectionGroup: "in-theaters",
    sortOrder: 4,
  },
  {
    id: "film-nirvanna",
    slug: "nirvanna-the-band-the-show-the-movie",
    title: "Nirvanna The Band The Show The Movie",
    year: "2025",
    statusLabel: "In Theaters",
    accentColor: "#ffffff",
    heroImage:
      "https://www.datocms-assets.com/148598/1761851282-ntbtstm_website_cover.jpg",
    posterImage:
      "https://www.datocms-assets.com/148598/1761851282-ntbtstm_website_cover.jpg",
    synopsis:
      "A monochrome-forward theatrical title used as a contrast point against the warmer and more saturated slides.",
    trailerUrl: "/film/nirvanna-the-band-the-show-the-movie",
    sectionGroup: "in-theaters",
    sortOrder: 5,
  },
  {
    id: "film-sirat",
    slug: "sirat",
    title: "Sirāt",
    year: "2025",
    statusLabel: "Watch Now",
    accentColor: "#f5f0e6",
    heroImage:
      "https://www.datocms-assets.com/148598/1761323231-sirat_still_01_courtesyofneon-1.jpeg",
    posterImage:
      "https://www.datocms-assets.com/148598/1761323231-sirat_still_01_courtesyofneon-1.jpeg",
    synopsis:
      "A stark, award-caliber desert image used in the portfolio build to support the watch-now and award-oriented sections.",
    trailerUrl: "/film/sirat",
    sectionGroup: "watch-now",
    sortOrder: 6,
  },
  {
    id: "film-arco",
    slug: "arco",
    title: "Arco",
    year: "2025",
    statusLabel: "Watch Now",
    accentColor: "#66e6ff",
    heroImage:
      "https://www.datocms-assets.com/148598/1755800297-arco_still_01_courtesyofneon-1.jpeg",
    posterImage:
      "https://www.datocms-assets.com/148598/1755800297-arco_still_01_courtesyofneon-1.jpeg",
    synopsis:
      "A bright animated title that helps the storefront feel broader than a single film drop and supports the more playful merch items.",
    trailerUrl: "/film/arco",
    sectionGroup: "watch-now",
    sortOrder: 7,
  },
];

export const productSeeds: Product[] = [
  {
    id: "product-anora-blue-dream",
    filmId: "film-anora",
    slug: "anora-blue-dream-t-shirt",
    title: "ANORA BLUE DREAM T-Shirt",
    category: "Apparel",
    price: 30,
    statusLabel: "Available",
    primaryImage: placeholderProduct("anora-blue-dream-t-shirt", "front"),
    secondaryImage: placeholderProduct("anora-blue-dream-t-shirt", "back"),
    description:
      "Soft-touch portfolio mock apparel inspired by boutique release-store cadence. Built to showcase hover states, typography, and quick-add behavior.",
    featured: false,
    createdAt: "2026-03-13T09:00:00.000Z",
  },
  {
    id: "product-anora-brighton",
    filmId: "film-anora",
    slug: "anora-brighton-bender-t-shirt",
    title: "ANORA BRIGHTON BENDER T-Shirt",
    category: "Apparel",
    price: 30,
    statusLabel: "Available",
    primaryImage: placeholderProduct("anora-brighton-bender-t-shirt", "front"),
    secondaryImage: placeholderProduct("anora-brighton-bender-t-shirt", "back"),
    description:
      "A bold front-and-back tee treatment used to make the apparel rail feel dense, collectible, and visually complete.",
    featured: false,
    createdAt: "2026-03-13T09:01:00.000Z",
  },
  {
    id: "product-anora-five-carats",
    filmId: "film-anora",
    slug: "anora-five-carats-t-shirt",
    title: "ANORA FIVE CARATS T-Shirt",
    category: "Apparel",
    price: 30,
    statusLabel: "Available",
    primaryImage: placeholderProduct("anora-five-carats-t-shirt", "front"),
    secondaryImage: placeholderProduct("anora-five-carats-t-shirt", "back"),
    description:
      "A punchy apparel concept with casino-coded lettering and a silhouette treatment tailored for hover swaps.",
    featured: false,
    createdAt: "2026-03-13T09:02:00.000Z",
  },
  {
    id: "product-anora-cinderella",
    filmId: "film-anora",
    slug: "anora-fuckin-cinderella-t-shirt",
    title: "ANORA FUCKIN' CINDERELLA T-Shirt",
    category: "Apparel",
    price: 30,
    statusLabel: "Available",
    primaryImage: placeholderProduct("anora-fuckin-cinderella-t-shirt", "front"),
    secondaryImage: placeholderProduct("anora-fuckin-cinderella-t-shirt", "back"),
    description:
      "A portfolio-safe merch concept that leans into the loud graphic tee language of the reference shop.",
    featured: false,
    createdAt: "2026-03-13T09:03:00.000Z",
  },
  {
    id: "product-anora-full-service",
    filmId: "film-anora",
    slug: "anora-full-service-print",
    title: 'ANORA "FULL SERVICE" Signed Print',
    category: "Posters",
    price: 30,
    statusLabel: "Sold Out",
    primaryImage: placeholderProduct("anora-full-service-print", "front"),
    secondaryImage: placeholderProduct("anora-full-service-print", "back"),
    description:
      "Signed-print style poster asset used to reproduce the sold-out collectible energy of boutique release merch pages.",
    featured: true,
    createdAt: "2026-03-13T09:04:00.000Z",
  },
  {
    id: "product-anora-night-butterfly",
    filmId: "film-anora",
    slug: "anora-night-butterfly-print",
    title: "ANORA NIGHT BUTTERFLY Print",
    category: "Posters",
    price: 20,
    statusLabel: "Sold Out",
    primaryImage: placeholderProduct("anora-night-butterfly-print", "front"),
    secondaryImage: placeholderProduct("anora-night-butterfly-print", "back"),
    description:
      "Another poster-led collectible that helps the catalog look like a real campaign release rather than a single-SKU demo.",
    featured: false,
    createdAt: "2026-03-13T09:05:00.000Z",
  },
  {
    id: "product-anora-screenplay",
    filmId: "film-anora",
    slug: "anora-screenplay",
    title: "ANORA Screenplay",
    category: "Books",
    price: 35,
    statusLabel: "Pre-Order",
    primaryImage: placeholderProduct("anora-screenplay", "front"),
    secondaryImage: placeholderProduct("anora-screenplay", "back"),
    description:
      "A script object for the detail page layout, used to vary silhouettes and break up the apparel-heavy rails.",
    featured: false,
    createdAt: "2026-03-13T09:06:00.000Z",
  },
  {
    id: "product-anora-stay-jealous",
    filmId: "film-anora",
    slug: "anora-stay-jealous-t-shirt",
    title: "ANORA STAY JEALOUS T-Shirt",
    category: "Apparel",
    price: 30,
    statusLabel: "Available",
    primaryImage: placeholderProduct("anora-stay-jealous-t-shirt", "front"),
    secondaryImage: placeholderProduct("anora-stay-jealous-t-shirt", "back"),
    description:
      "A dark variant in the collection to add contrast and give the rail a stronger editorial rhythm.",
    featured: false,
    createdAt: "2026-03-13T09:07:00.000Z",
  },
  {
    id: "product-secret-agent-portuguese",
    filmId: "film-secret-agent",
    slug: "the-secret-agent-portuguese-t-shirt",
    title: "THE SECRET AGENT Portuguese T-shirt",
    category: "Apparel",
    price: 35,
    statusLabel: "Available",
    primaryImage: placeholderProduct("the-secret-agent-portuguese-t-shirt", "front"),
    secondaryImage: placeholderProduct("the-secret-agent-portuguese-t-shirt", "back"),
    description:
      "The featured shelf anchor for the homepage, built to echo the tonal warmth and urgency of the lead hero slide.",
    featured: true,
    createdAt: "2026-03-13T09:08:00.000Z",
  },
  {
    id: "product-secret-agent-poster",
    filmId: "film-secret-agent",
    slug: "the-secret-agent-limited-edition-poster",
    title: "THE SECRET AGENT Limited Edition Poster",
    category: "Posters",
    price: 55,
    statusLabel: "Pre-Order",
    primaryImage: placeholderProduct("the-secret-agent-limited-edition-poster", "front"),
    secondaryImage: placeholderProduct("the-secret-agent-limited-edition-poster", "back"),
    description:
      "A premium poster concept that gives the merch shelf a high-value hero SKU and strong lightbox-style imagery.",
    featured: true,
    createdAt: "2026-03-13T09:09:00.000Z",
  },
  {
    id: "product-arco-brothers",
    filmId: "film-arco",
    slug: "arco-brothers-t-shirt",
    title: "ARCO Brothers T-shirt",
    category: "Apparel",
    price: 35,
    statusLabel: "Available",
    primaryImage: placeholderProduct("arco-brothers-t-shirt", "front"),
    secondaryImage: placeholderProduct("arco-brothers-t-shirt", "back"),
    description:
      "An animated, color-heavy apparel concept that broadens the palette and makes the catalog feel less single-campaign.",
    featured: false,
    createdAt: "2026-03-13T09:10:00.000Z",
  },
  {
    id: "product-arco-family",
    filmId: "film-arco",
    slug: "arco-family-hoodie",
    title: "ARCO Family Hoodie",
    category: "Apparel",
    price: 65,
    statusLabel: "Available",
    primaryImage: placeholderProduct("arco-family-hoodie", "front"),
    secondaryImage: placeholderProduct("arco-family-hoodie", "back"),
    description:
      "A heavier, premium silhouette to give the product detail templates a more varied merchandising mix.",
    featured: false,
    createdAt: "2026-03-13T09:11:00.000Z",
  },
];
