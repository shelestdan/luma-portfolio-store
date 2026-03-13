"use client";

import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatCurrency } from "@/lib/format";
import type { Product } from "@/lib/types";
import { useStore } from "@/components/providers/StoreProvider";
import styles from "@/components/shared/ProductCard.module.css";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, isWishlisted, toggleWishlist } = useStore();
  const wishlisted = isWishlisted(product.id);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Link href={`/product/${product.slug}`} aria-label={product.title}>
          <Image
            src={product.primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 80vw, 28vw"
            unoptimized
            className={`${styles.image} ${styles.primary}`}
          />
          <Image
            src={product.secondaryImage}
            alt={`${product.title} alternate`}
            fill
            sizes="(max-width: 768px) 80vw, 28vw"
            unoptimized
            className={`${styles.image} ${styles.secondary}`}
          />
        </Link>
        <div className={styles.overlay}>
          <span className={styles.badge}>{product.statusLabel}</span>
          <div className={styles.actions}>
            <button
              type="button"
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={`${styles.action} ${wishlisted ? styles.wishlisted : ""}`}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
            </button>
            <button
              type="button"
              aria-label="Add to cart"
              className={styles.action}
              onClick={() => addToCart(product.id)}
            >
              <ShoppingBag size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span>{product.category}</span>
          <span>{formatCurrency(product.price)}</span>
        </div>
        <Link href={`/product/${product.slug}`} className={styles.title}>
          {product.title}
        </Link>
      </div>
    </article>
  );
}
