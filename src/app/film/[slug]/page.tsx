import Image from "next/image";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/shared/ProductCard";
import { getFilmBySlug, getProductsByFilmId } from "@/lib/store";
import styles from "@/app/film/[slug]/page.module.css";

export const dynamic = "force-dynamic";

export default async function FilmPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const film = getFilmBySlug(slug);

  if (!film) {
    notFound();
  }

  const products = getProductsByFilmId(film.id);

  return (
    <main className={styles.page}>
      <div className="page-shell">
        <section
          className={styles.hero}
          style={{ ["--accent" as string]: film.accentColor }}
        >
          <Image
            src={film.heroImage}
            alt={`${film.title} still`}
            fill
            priority
            sizes="100vw"
            unoptimized
            className={styles.heroImage}
          />
          <div className={styles.heroShade} />
          <div className={styles.heroContent}>
            <span className={styles.eyebrowRow}>
              {film.statusLabel} · {film.year}
            </span>
            <h1 className={styles.title}>{film.title}</h1>
            <p className={styles.synopsis}>{film.synopsis}</p>
          </div>
        </section>

        <div className={styles.body}>
          <section className={styles.panel}>
            <h2>Release notes</h2>
            <p>
              This page keeps the same large-image, oversized-type ratio as the reference site,
              while reducing the content model to the minimum portfolio scope: release context,
              cinematic artwork, and directly related merch.
            </p>
          </section>

          <section className={styles.panel}>
            <h2>{film.title} merch</h2>
            <div className={styles.productGrid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
