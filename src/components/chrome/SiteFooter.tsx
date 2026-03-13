import Link from "next/link";

import { brand } from "@/lib/brand";
import styles from "@/components/chrome/SiteFooter.module.css";

const columns = [
  {
    title: "Films",
    links: [
      { href: "/", label: "Featured releases" },
      { href: "/film/the-secret-agent", label: "The Secret Agent" },
      { href: "/film/anora", label: "Anora" },
    ],
  },
  {
    title: "Shop",
    links: [
      { href: "/product/the-secret-agent-portuguese-t-shirt", label: "Apparel" },
      { href: "/product/anora-full-service-print", label: "Posters" },
      { href: "/product/anora-screenplay", label: "Books" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/studio/add", label: "Add product" },
      { href: "/", label: "Portfolio demo" },
      { href: "/film/sentimental-value", label: "Release pages" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { href: "https://www.neonrated.com/", label: brand.referenceLabel },
      { href: "https://www.instagram.com/neonrated/", label: "Instagram" },
      { href: "https://www.youtube.com/neonrated", label: "YouTube" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="page-shell">
        <section className={styles.newsletter}>
          <div className={styles.newsletterHeading}>{brand.newsletterTitle}</div>
          <p>
            A presentation-only subscription block to preserve the density and rhythm of
            the reference footer. No live email workflow is connected.
          </p>
          <div className={styles.newsletterForm}>
            <input
              className={styles.newsletterInput}
              placeholder="Enter your email address"
              aria-label="Enter your email address"
            />
            <button type="button" className={styles.newsletterButton}>
              Subscribe
            </button>
          </div>
        </section>

        <div className={styles.grid}>
          {columns.map((column) => (
            <div key={column.title} className={styles.column}>
              <div className={styles.columnTitle}>{column.title}</div>
              {column.links.map((link) =>
                link.href.startsWith("http") ? (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <div className={styles.logoBand}>
            <div className={styles.logoTrack}>
              <div className={styles.logoWord}>{brand.shortName}</div>
              <div className={styles.logoWord}>{brand.shortName}</div>
              <div className={styles.logoWord}>{brand.shortName}</div>
            </div>
          </div>
          <div className={styles.metaRow}>
            <span>Website by Codex, shaped as a boutique cinema portfolio build.</span>
            <span>{brand.demoNote}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
