import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/product/AddToCartButton";
import { WishlistButton } from "@/components/product/WishlistButton";
import { formatCurrency } from "@/lib/format";
import { enableDynamicRendering } from "@/lib/server-runtime";
import { getFilms, getProductBySlug, getProducts } from "@/lib/store";
import styles from "@/app/product/[slug]/page.module.css";

export async function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await enableDynamicRendering();
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const film = getFilms().find((entry) => entry.id === product.filmId);

  if (!film) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className="page-shell">
        <div className={styles.layout}>
          <section className={styles.gallery}>
            <Image
              src={product.primaryImage}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 980px) 100vw, 60vw"
              unoptimized
              className={styles.galleryImage}
            />
          </section>

          <section className={styles.info}>
            <div className={styles.meta}>
              <span>{product.category}</span>
              <span>{product.statusLabel}</span>
            </div>
            <h1 className={styles.title}>{product.title}</h1>
            <div className={styles.price}>{formatCurrency(product.price)}</div>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.buttonRow}>
              <AddToCartButton productId={product.id} />
              <WishlistButton productId={product.id} className={styles.ghostButton} />
            </div>

            <div className={styles.detailGrid}>
              <div className={styles.detailRow}>
                <span>Release</span>
                <Link href={`/film/${film.slug}`}>{film.title}</Link>
              </div>
              <div className={styles.detailRow}>
                <span>Year</span>
                <strong>{film.year}</strong>
              </div>
              <div className={styles.detailRow}>
                <span>Catalog</span>
                <strong>Portfolio demo / no checkout</strong>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
