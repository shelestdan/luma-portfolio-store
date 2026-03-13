"use client";

import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ProductCard } from "@/components/shared/ProductCard";
import type { Film, Product } from "@/lib/types";
import styles from "@/components/home/HomeExperience.module.css";

interface HomeExperienceProps {
  heroFilms: Film[];
  inTheaters: Film[];
  comingSoon: Film[];
  watchNow: Film[];
  awardWinners: Film[];
  featuredShelfFilm: Film;
  featuredProducts: Product[];
}

function FilmSection({
  title,
  description,
  films,
}: {
  title: string;
  description: string;
  films: Film[];
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>{title}</div>
        <p className={styles.sectionMeta}>{description}</p>
      </div>
      <div className={styles.filmGrid}>
        {films.map((film) => (
          <Link key={film.id} href={`/film/${film.slug}`} className={styles.filmCard}>
            <Image
              src={film.heroImage}
              alt={`${film.title} artwork`}
              fill
              sizes="(max-width: 900px) 90vw, 33vw"
              unoptimized
              className={styles.filmImage}
            />
            <div className={styles.filmOverlay}>
              <div className={styles.filmCardMeta}>
                <span>{film.statusLabel}</span>
                <span>{film.year}</span>
              </div>
              <div className={styles.filmCardTitle}>{film.title}</div>
              <span className={styles.filmCardAction}>
                View release
                <ArrowUpRight size={15} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function HomeExperience({
  heroFilms,
  inTheaters,
  comingSoon,
  watchNow,
  awardWinners,
  featuredShelfFilm,
  featuredProducts,
}: HomeExperienceProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroFilms.length);
    }, 5200);

    return () => {
      window.clearInterval(timer);
    };
  }, [heroFilms.length]);

  const activeFilm = heroFilms[activeIndex] ?? heroFilms[0];

  return (
    <div className={styles.home}>
      <section
        className={styles.hero}
        style={{ ["--hero-accent" as string]: activeFilm.accentColor }}
      >
        {heroFilms.map((film, index) => (
          <Image
            key={film.id}
            src={film.heroImage}
            alt={`${film.title} image`}
            fill
            priority={index === activeIndex}
            sizes="100vw"
            unoptimized
            className={styles.heroImage}
            style={{
              opacity: index === activeIndex ? 1 : 0,
              transform: index === activeIndex ? "scale(1)" : "scale(1.04)",
            }}
          />
        ))}
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <div className={styles.heroTopline}>
            <span className={styles.heroMeta}>
              <Sparkles size={14} />
              {activeFilm.statusLabel}
            </span>
            <div className={styles.heroBadgeStack}>
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span>{activeFilm.year}</span>
            </div>
          </div>
          <h1 className={styles.heroTitle}>{activeFilm.title}</h1>
          <p className={styles.heroSynopsis}>{activeFilm.synopsis}</p>
          <div className={styles.heroFooter}>
            <div className={styles.heroActions}>
              <Link href={`/film/${activeFilm.slug}`} className={styles.heroButton}>
                <Play size={17} />
                Enter release
              </Link>
              <Link href={`/product/the-secret-agent-portuguese-t-shirt`} className={styles.heroGhost}>
                Shop the drop
              </Link>
            </div>
            <div className={styles.heroNav}>
              {heroFilms.map((film, index) => (
                <button
                  key={film.id}
                  type="button"
                  className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
                  aria-label={`Show ${film.title}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={`${styles.content} page-shell`}>
        <FilmSection
          title="In Theaters"
          description="Large-format cinematic cards with the same poster-heavy pacing and section rhythm as the reference homepage."
          films={inTheaters}
        />

        <FilmSection
          title="Coming Soon"
          description="Big typographic release tiles with soft parallax hover and distinct accent colors per film campaign."
          films={comingSoon}
        />

        <FilmSection
          title="Watch Now"
          description="A lighter rail of instantly available releases that helps the homepage feel like a living catalog."
          films={watchNow}
        />

        <FilmSection
          title="Award Winners"
          description="Portfolio-friendly prestige curation to preserve the mix of hype, authority, and cinematic branding."
          films={awardWinners}
        />

        <section className={styles.featureShelf}>
          <div className={styles.featureHeader}>
            <span className="eyebrow">{featuredShelfFilm.title}</span>
            <h2>Featured merch</h2>
            <p>
              Built as a compact merch drop tied to the current hero campaign. This keeps the
              site feeling like a release-world storefront instead of a generic ecommerce grid.
            </p>
          </div>
          <div className={styles.productGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
