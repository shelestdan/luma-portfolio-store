"use client";

import { Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useDeferredValue, useEffect, useState } from "react";

import { formatCurrency } from "@/lib/format";
import { brand } from "@/lib/brand";
import type { Product, StoreSearchIndex } from "@/lib/types";
import { useStore } from "@/components/providers/StoreProvider";
import styles from "@/components/chrome/SiteHeader.module.css";

function SearchResults({
  index,
  query,
  onNavigate,
}: {
  index: StoreSearchIndex;
  query: string;
  onNavigate: () => void;
}) {
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filmResults = deferredQuery
    ? index.films.filter((film) =>
        `${film.title} ${film.statusLabel}`.toLowerCase().includes(deferredQuery),
      )
    : index.films.slice(0, 3);

  const productResults = deferredQuery
    ? index.products.filter((product) =>
        `${product.title} ${product.category}`.toLowerCase().includes(deferredQuery),
      )
    : index.products.slice(0, 6);

  return (
    <div className={styles.drawerBody}>
      <div className={styles.resultList}>
        {filmResults.map((film) => (
          <Link
            key={film.id}
            href={`/film/${film.slug}`}
            className={styles.resultLink}
            onClick={onNavigate}
          >
            <span className={styles.meta}>{film.statusLabel}</span>
            <span className={styles.label}>{film.title}</span>
          </Link>
        ))}
      </div>
      <div className={styles.resultList}>
        {productResults.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className={styles.resultLink}
            onClick={onNavigate}
          >
            <span className={styles.meta}>{product.category}</span>
            <span className={styles.label}>{product.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

interface SiteHeaderProps {
  initialSearchIndex: StoreSearchIndex;
  liveSearch: boolean;
}

export function SiteHeader({ initialSearchIndex, liveSearch }: SiteHeaderProps) {
  const {
    activeDrawer,
    cart,
    wishlist,
    openDrawer,
    closeDrawer,
    removeFromCart,
    updateQuantity,
  } = useStore();
  const [searchIndex, setSearchIndex] = useState<StoreSearchIndex>(initialSearchIndex);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!liveSearch) {
      return;
    }

    let ignore = false;

    async function loadIndex() {
      const [filmsResponse, productsResponse] = await Promise.all([
        fetch("/api/films"),
        fetch("/api/products"),
      ]);

      const [films, products] = await Promise.all([
        filmsResponse.json(),
        productsResponse.json(),
      ]);

      if (!ignore) {
        setSearchIndex({ films, products });
      }
    }

    void loadIndex();

    function handleCatalogUpdate() {
      void loadIndex();
    }

    window.addEventListener("catalog-updated", handleCatalogUpdate);

    return () => {
      ignore = true;
      window.removeEventListener("catalog-updated", handleCatalogUpdate);
    };
  }, [liveSearch]);

  const cartProducts = cart
    .map((item) => ({
      item,
      product: searchIndex.products.find((product) => product.id === item.productId),
    }))
    .filter((entry): entry is { item: (typeof cart)[number]; product: Product } => Boolean(entry.product));

  const subtotal = cartProducts.reduce(
    (sum, entry) => sum + entry.product.price * entry.item.quantity,
    0,
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.cluster}>
            <button
              type="button"
              aria-label="Open menu"
              className={styles.control}
              onClick={() => openDrawer("menu")}
            >
              <Menu size={18} />
            </button>
          </div>

          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>{brand.shortName}</span>
            <span className={styles.logoText}>
              <strong>{brand.siteLabel}</strong>
              <span>{brand.tagline}</span>
            </span>
          </Link>

          <div className={styles.cluster}>
            <button
              type="button"
              aria-label="Search catalog"
              className={styles.control}
              onClick={() => openDrawer("search")}
            >
              <Search size={18} />
            </button>
            <button
              type="button"
              aria-label="Open wishlist"
              className={styles.control}
              onClick={() => openDrawer("wishlist")}
            >
              <Heart size={18} />
              {wishlist.length > 0 ? <span className={styles.badge}>{wishlist.length}</span> : null}
            </button>
            <button
              type="button"
              aria-label="Open cart"
              className={styles.control}
              onClick={() => openDrawer("cart")}
            >
              <ShoppingCart size={18} />
              {cart.length > 0 ? <span className={styles.badge}>{cart.length}</span> : null}
            </button>
          </div>
        </div>
      </header>

      <button
        type="button"
        aria-label="Close open drawer"
        className={`${styles.backdrop} ${activeDrawer ? styles.backdropVisible : ""}`}
        onClick={closeDrawer}
      />

      <section
        className={`${styles.drawer} ${styles.drawerLeft} ${activeDrawer === "menu" ? styles.drawerVisible : ""}`}
      >
        <div className={styles.drawerHeader}>
          <h2 className={styles.drawerTitle}>Menu</h2>
          <button type="button" className={styles.miniButton} onClick={closeDrawer}>
            <X size={18} />
          </button>
        </div>
        <nav className={styles.navList}>
          <Link href="/" className={styles.navLink} onClick={closeDrawer}>
            <span className={styles.meta}>Start here</span>
            <span className={styles.label}>Home</span>
          </Link>
          <Link href="/film/the-secret-agent" className={styles.navLink} onClick={closeDrawer}>
            <span className={styles.meta}>Featured release</span>
            <span className={styles.label}>The Secret Agent</span>
          </Link>
          <Link href="/product/the-secret-agent-portuguese-t-shirt" className={styles.navLink} onClick={closeDrawer}>
            <span className={styles.meta}>Featured merch</span>
            <span className={styles.label}>Shop the drop</span>
          </Link>
          <Link href="/studio/add" className={styles.navLink} onClick={closeDrawer}>
            <span className={styles.meta}>Hidden studio route</span>
            <span className={styles.label}>Add product</span>
          </Link>
        </nav>
      </section>

      <section
        className={`${styles.drawer} ${styles.drawerRight} ${activeDrawer === "search" ? styles.drawerVisible : ""}`}
      >
        <div className={styles.drawerHeader}>
          <h2 className={styles.drawerTitle}>Search</h2>
          <button type="button" className={styles.miniButton} onClick={closeDrawer}>
            <X size={18} />
          </button>
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Find films and merch"
          className={styles.searchField}
        />
        <SearchResults index={searchIndex} query={query} onNavigate={closeDrawer} />
      </section>

      <section
        className={`${styles.drawer} ${styles.drawerRight} ${activeDrawer === "wishlist" ? styles.drawerVisible : ""}`}
      >
        <div className={styles.drawerHeader}>
          <h2 className={styles.drawerTitle}>Wishlist</h2>
          <button type="button" className={styles.miniButton} onClick={closeDrawer}>
            <X size={18} />
          </button>
        </div>
        <div className={styles.drawerBody}>
          {wishlist.length === 0 ? (
            <div className={styles.empty}>
              Save products here for the portfolio-style wishlist interaction.
            </div>
          ) : (
            searchIndex.products
              .filter((product) => wishlist.includes(product.id))
              .map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className={styles.resultLink}
                  onClick={closeDrawer}
                >
                  <span className={styles.meta}>{product.category}</span>
                  <span className={styles.label}>{product.title}</span>
                </Link>
              ))
          )}
        </div>
      </section>

      <section
        className={`${styles.drawer} ${styles.drawerRight} ${activeDrawer === "cart" ? styles.drawerVisible : ""}`}
      >
        <div className={styles.drawerHeader}>
          <h2 className={styles.drawerTitle}>Cart</h2>
          <button type="button" className={styles.miniButton} onClick={closeDrawer}>
            <X size={18} />
          </button>
        </div>
        <div className={styles.drawerBody}>
          {cartProducts.length === 0 ? (
            <div className={styles.empty}>Add a few pieces to preview the cart drawer flow.</div>
          ) : (
            <>
              <div className={styles.cartList}>
                {cartProducts.map(({ item, product }) => (
                  <div key={product.id} className={styles.cartItem}>
                    <div>
                      <div className={styles.meta}>{product.category}</div>
                      <strong>{product.title}</strong>
                      <div className={styles.hint}>{formatCurrency(product.price)}</div>
                    </div>
                    <div className={styles.cartControls}>
                      <button
                        type="button"
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(product.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(product.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className={styles.quantityButton}
                        onClick={() => removeFromCart(product.id)}
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.cartFooter}>
                <div className={styles.meta}>Subtotal</div>
                <strong>{formatCurrency(subtotal)}</strong>
                <p className={styles.hint}>
                  Portfolio demo only. Checkout and payment flow are intentionally not included.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
